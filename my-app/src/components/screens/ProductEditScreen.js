import React, { useState, useEffect } from 'react'
import  FormContainer from '../FormContainer'
import Loader from '../Loader'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../../actions/productAction'
import axios from 'axios'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants'
import Message from '../Message'

function ProductEditScreen() {
    /** gettting the user id from url */
    const { id } = useParams()

    const dispatch = useDispatch()
    const history = useNavigate()

    /** States */
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)
    const [countInStock, setCountInStock] = useState(0)
    const [category, setCategory] = useState('')

    /** getting some part of the state from the redux store */
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, product, error } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {
        loading: loadingUpdate,
        success: successUpdate,
        error: errorUpdate,
    } = productUpdate

    useEffect(() => {
        // check if product was updated
        if (successUpdate) {
            dispatch({
                type: PRODUCT_UPDATE_RESET
            })
            history('/productlist')
        } else {
            if (!product.name || product._id !== Number(id)) {
                dispatch(listProductDetails(id))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [dispatch, id, history, product, successUpdate])

    /** Handler */
    const submitHandler = (event) => {
        event.preventDefault()

        // dispatch to update product
        dispatch(
            updateProduct({
                _id: id,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description
            })
        ) 
    }

    const uploadFileHandler = async(event) => {
        const file = event.target.files[0]

        if (file) {
            setImage(URL.createObjectURL(file))
        }

        const formData = new FormData()

        formData.append('image', file)
        formData.append('product_id', id)

        setUploading(true)

        try {
            const config = {
                header: {
                    "Content-type": 'multipart/form-data',
                }
            }

            const { data } = await axios.post(
                '/api/products/upload/',
                formData,
                config
            )

            setImage(data)
            setUploading(false)
        } catch(error) {
            setUploading(false)
        }
    }

  return (
    <div>

        <Link to='/productlist'>Go Back</Link>

        <FormContainer>
            <h1>Edit Product</h1>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Price</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter Price'
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='fileUpload'>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Image'
                            value={image}
                            onChange={(event) => setImage(event.target.value)}
                        />

                        <Form.Control
                            type='file'
                            accept='.jpg,.jpeg,.png'
                            onChange={uploadFileHandler} 
                            className='mb-2'
                        />

                        {uploading && <Loader />}
                        {image && <img src={image} alt='preview' className='img-fluid mt-2' />}
                    </Form.Group>

                    <Form.Group controlId='brand'>
                        <Form.Label>Brand</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Brand'
                            value={brand}
                            onChange={(event) => setBrand(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Stock</Form.Label>
                        <Form.Control 
                            type='number'
                            placeholder='Enter Stock'
                            value={countInStock}
                            onChange={(event) => setCountInStock(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Category</Form.Label>
                        <Form.Control 
                            type='text'
                            placeholder='Enter Category'
                            value={category}
                            onChange={(event) => setCategory(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as='textarea'
                            placeholder='Enter Description'
                            rows={5}
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Update
                    </Button>

                </Form>
            )}
        </FormContainer>

    </div>
  )
}

export default ProductEditScreen