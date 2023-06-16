import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import FormContainer from '../FormContainer'
import Checkout from '../Checkout'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom'

export default function PaymentScreen() {

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const history = useNavigate()
    const dispatch = useDispatch()

    if (!shippingAddress.address) {
        history('/login/shipping')
    }

    const submitHandler = (event) => {
        event.preventDefault()

        dispatch(savePaymentMethod(paymentMethod))
        history('/placeorder')
    }
    
  return (
    <FormContainer>
        <Checkout step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label>
                <Col>
                    <Form.Check
                        type='radio'
                        label='PayPal or Credit Card'
                        id='paypal'
                        name='paymentMethod'
                        checked
                        onChange={(event) => setPaymentMethod(event.target.value)}
                    ></Form.Check>
                </Col>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}
