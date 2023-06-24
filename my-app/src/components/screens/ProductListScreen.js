import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Message from '../Message'
import Loader from '../Loader'
import Paginator from '../Paginator'
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, createProduct, deleteProduct } from '../../actions/productAction';
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';

function ProductListScreen() {

    const dispatch = useDispatch()
    const history = useNavigate()

    /** PULLING OUT THE STATES */
    const productList = useSelector((state) => state.productList)
    const { products, page, pages, error, loading } = productList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productCreate = useSelector((state) => state.productCreate)
    const { 
        product: createdProduct,
        success: successCreate,
        loading: loadingCreate,
        error: errorCreate,
    } = productCreate

    const productDelete = useSelector((state) => state.productDelete)
    const {
        success: successDelete,
        loading: loadingDelete,
        error: errorDelete,
    } = productDelete

    // GETTING PAGE NUMBER (KEYWORD IS THE PAGE NUMBER)
    const keyword = useParams().id


    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })

        // REDIRECT PAGE IF NON ADMIN
        if (!userInfo.isAdmin) {
            history('/login')
        }

        // CHECK IF PRODUCT IS CREATED, THEN REIRECT TO EDIT PAGE
        if (successCreate) {
            history(`/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword))
        }
        // AFTER CREATING PRODUCT, LOAD IN PRODUCTS AGAIN, ADD successCreate in the dependency
        // SAME AS AFTER DELETING IN THE successDelete
    },[dispatch, history, userInfo, successCreate, createdProduct, successDelete, keyword])

    /** Hanldler */
    const delHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <div>
        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>

            <Col className='text-end'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>

        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

        {loading ? (
            <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <div>
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>

                                <td>
                                    <LinkContainer to={`/product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'>
                                            <i className='fas fa-edit'></i>
                                        </Button>
                                    </LinkContainer>

                                    <Button
                                        variant='danger'
                                        className='btn-sm'
                                        onClick={() => delHandler(product._id)}
                                    >
                                        <i className='fas fa-trash'></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <Paginator pages={pages} page={page} isAdmin={true} />
            </div>
        )}


    </div>
  )
}

export default ProductListScreen