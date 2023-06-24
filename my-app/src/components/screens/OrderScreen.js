import React, { useState, useEffect } from "react";

/* REACT ROUTER */
import { Link } from "react-router-dom";

/* REACT BOOTSTRAP */
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";

/* PAYPAL BUTTONS */
import { PayPalButton } from "react-paypal-button-v2";

/* COMPONENTS */
import Message from "../Message";
import Loader from "../Loader";

/* REACT - REDUX */
import { useDispatch, useSelector } from "react-redux";

/* ACTION CREATORS */
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";

/* ACTION TYPES */
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstant";

import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PRODUCT_DETAILS_SUCCESS } from "../../constants/productConstants";

function OrderScreen() {

    const history = useNavigate();
    const dispatch = useDispatch();
    const order_Id = useParams().id;
    console.log(order_Id)

    const [sdkReady, setSdkReady] = useState(false);

    /** PULLS ORDER DETAILS STATE FROM REDUX STORE */
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const orderPayments = useSelector((state) => state.orderPayments);
    const { loading: loadingPay, success: successPay } = orderPayments;

    const cart = useSelector((state) => state.cart)

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    /** ITEMS PRICE GETS CALCULATED, IF WE HAVE AN ORDER */
    if(!loading && !error) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => 
        acc + item.price * item.qty, 0).toFixed(2);
    }

    /** PAYPAL BUTTONS */
    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        }
        document.body.appendChild(script);
    }

    useEffect(() => {
        /** IF USER IS NOT LOGGED IN, REDIRECT TO LOGIN */
        if(!userInfo) {
            history('/login')
        }

        /** CHECK IF THERE IS AN ORDER, IF NOT DISPATCH AN ACTION TO GET ORDER DETAILS */
        if(!order || successPay || successDeliver || order._id !== Number(order_Id)) {
            dispatch({
                type: ORDER_PAY_RESET,
            })

            dispatch({
                type: ORDER_DELIVER_RESET
            })

            dispatch(getOrderDetails(order_Id));
        } else if(!order.isPaid) {
            /** ACTIVATE PAYPAL */
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS
        })

    },[dispatch, order, order_Id, successPay, successDeliver, history, userInfo]);

    /** HANDLERS */
    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={7}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p>
                            <strong>Name: </strong>
                            {order.User.name}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            <a href={`mailto:${order.User.email}`}>{order.User.email}</a>
                        </p>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address},{' '} 
                            {cart.shippingAddress.city},{" "}
                            {cart.shippingAddress.postalCode},{' '} 
                            {cart.shippingAddress.country}
                        </p>

                        {order.isDelivered ? (
                            <Message variant="success">
                                Delivered on {order.deliveredAt
                                ? order.deliveredAt.substring(0, 10)
                                : null}
                            </Message>
                        ) : (
                            <Message variant="danger">Not Delivered</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment </h2>
                        <p>
                            <strong>Payment Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? (
                            <Message variant="success">
                                Paid on {order.paidAt 
                                ? order.paidAt.substring(0, 10)
                                : null}
                            </Message>
                        ) : (
                            <Message variant="danger">Not Paid</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? (
                            <Message>Order is empty</Message>
                        ) : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        
                                        <Row>
                                            {cart.cartItems.map((cartItem, index) => (
                                                <Col md={1} key={index}>
                                                <Image
                                                    src={cartItem.image}
                                                    alt={item.name}
                                                    fluid
                                                    rounded
                                                />                                               
                                            </Col>  
                                            ))}

                                            <Col>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.qty} x ${item.price} = 
                                                ${(item.qty * item.price).toFixed(2)}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={5}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items:</Col>
                                <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping:</Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax:</Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Total:</Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? <Loader /> : (
                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    />
                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>

                    {loadingDeliver && <Loader />}

                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                        <ListGroup.Item>
                            <Button type="button" 
                            className="btn w-100" 
                            onClick={deliverHandler}
                            >
                                Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                    )}
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default OrderScreen