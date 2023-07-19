import React, { useEffect } from 'react'

/** React Router */
import { Link, useNavigate } from 'react-router-dom'

/** React Redux */
import { useDispatch, useSelector } from 'react-redux'

/** React Bootstrap */
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'

/** Components */
import Checkout from '../Checkout'
import Message from '../Message'

/** Action Types */
import { ORDER_MAKE_RESET } from '../../constants/orderConstant'

/** Action Creators */
import { makeOrder } from '../../actions/orderActions'


export default function PlaceOrderScreen() {

    const history = useNavigate()
    const dispatch = useDispatch()

    /** pulling the state from the redux store */
    const orderMake = useSelector((state) => state.orderMake)
    const { order, success, error } = orderMake
    const cart = useSelector((state) => state.cart)

    // price calculations, setting an attribute to our cart object, it won't update
    // our state, it's just for this page
    cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2)

    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2)
    cart.taxPrice = Number(0.082 * cart.itemsPrice).toFixed(2)

    cart.totalPrice = (Number(cart.shippingPrice) + 
                Number(cart.itemsPrice) +  
                Number(cart.taxPrice)).toFixed(2)

    // redirect
    if (!cart.paymentMethod) {
        history('/payment')
    }

    /** if order is successful with the id, send the user to 
     *  users account to view the order
     */
    useEffect(() => {
      if (success) {
        history(`/order/${order._id}`)

        // Reset the state
        dispatch({
          type: ORDER_MAKE_RESET,
        })
      }
      // disable next line
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success, history])

    /** Handler */
    const placeOrder = () => {
      dispatch(
        makeOrder({
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        })
      )
    }

  return (
    <div>
      <Checkout step1 step2 step3 step4 />

      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                <strong> Shipping Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}, {''}
                {cart.shippingAddress.postalCode}, {''}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>

              {cart.cartItems.length === 0 ? (
                <Message variant='info'>Your Cart Is Empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty } X ${ item.price} = $
                          {( item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>

                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>

                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>

                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='w-100'
                  disabled={cart.cartItems === 0}
                  onClick={placeOrder}
                >
                  Place order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
