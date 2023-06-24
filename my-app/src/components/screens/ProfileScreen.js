import React, {useState, useEffect} from 'react'
import { Row, Col, Button, Form, Table } from 'react-bootstrap'
import Loader from '../Loader'
import Message from '../Message'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { getProfile, updateProfile } from '../../actions/userActions'
import { LinkContainer } from 'react-router-bootstrap'
import { listMyOrders } from '../../actions/orderActions'

function ProfileScreen() {
    /* states */
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()

    /* Pulling userProfile state from the redux store */
    const userProfile = useSelector(state => state.userProfile)
    const { loading, error, user } = userProfile

    /* we need to make sure that the user is logged in, so we pull out the 
    userLogin from the redux store */
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const history = useNavigate()

    // if success is true it will reset the state
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    /** pulling out order details to display on the screen */
    const orderList = useSelector((state) => state.orderList)
    const { loading: loadingOrders, error: errorOrders, orders } = orderList

    /* show data profile when user is logged in */
    useEffect(() => {
        if (!userInfo) {
           history('/login')
        } else {
            if (!user || !user.name || success || userInfo._id !== user._id) {
                dispatch({ type: 'USER_UPDATE_PROFILE_RESET' })

                // fetching user data
                dispatch(getProfile('profile'))

                // Fettching the user order details
                dispatch(listMyOrders())
            } else {
                // we have the userInfo, so we can show the profile
                setName(user.name)
                setEmail(user.email)  
            }
        }
    }, [dispatch, history, user, userInfo, success])

    /* submit handler */
    const submitHandler = (event) => {
        event.preventDefault()

        // if password doesn't match, then disable submit
        if (password !== confirmPassword) {
            setMessage('Password do not match')
        } else {
            dispatch(updateProfile({
                _id: user._id,
                name: name,
                email: email,
                password: password,
            }))
            setMessage('')
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type='name' placeholder='Enter Name' 
                        value={name}onChange={(event) => setName(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control required type='email' placeholder='Enter email' 
                        value={email}onChange={(event) => setEmail(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type='password' placeholder='Enter password' 
                        value={password}onChange={(event) => setPassword(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmPassword'>
                        <Form.Label>confirmPassword</Form.Label>
                        <Form.Control required type='confirmPassword' 
                        placeholder='Enter Confirm password' value={confirmPassword} 
                        onChange={(event) => setConfirmPassword(event.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>

                {loadingOrders ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant='danger'>{errorOrders}</Message>
                ) : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>

                                    <td>
                                        ${order.createdAt ? order.createdAt
                                        .substring(0, 10) : null}
                                    </td>

                                    <td>
                                        <td>${order.totalPrice}</td>
                                    </td>

                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt ? (
                                                order.paidAt.substring(0, 10)
                                            ) : null
                                        ) : (
                                            <i className='fas fa-times' 
                                            style={{ color: 'red' }}></i>
                                        )}
                                    </td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button className='btn-sm' variant='light'>
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )

}
export default ProfileScreen