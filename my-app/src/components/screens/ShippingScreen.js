import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import Checkout from '../Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom'

export default function ShippingScreen() {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()
    const history = useNavigate()

    const submitHandler = (event) => {
        event.preventDefault()

        dispatch(
            saveShippingAddress({
                address,
                city,
                postalCode,
                country,
            })
        )
        history('/payment')
    }

  return (
    <FormContainer>
        <Checkout step1 step2 />

        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Enter Address'
                    value={address ? address : ''}
                    onChange={(event) => setAddress(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Enter City'
                    value={city ? city : ''}
                    onChange={(event) => setCity(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='postalCode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Enter Postal Code'
                    value={postalCode ? postalCode : ''}
                    onChange={(event) => setPostalCode(event.target.value)}
                />
            </Form.Group>

            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control 
                    required
                    type='text'
                    placeholder='Enter Country'
                    value={country ? country : ''}
                    onChange={(event) => setCountry(event.target.value)}
                />
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
                Countinue
            </Button>
        </Form>
    </FormContainer>
  )
}
