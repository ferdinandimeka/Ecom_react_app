import axios from 'axios'
import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
ORDER_MAKE_FAIL, ORDER_MAKE_REQUEST, ORDER_MAKE_SUCCESS, ORDER_PAY_REQUEST,
ORDER_PAY_FAIL, ORDER_PAY_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_REQUEST,
ORDER_DELIVER_SUCCESS, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
ORDER_ALL_LIST_REQUEST, ORDER_ALL_LIST_SUCCESS, ORDER_ALL_LIST_FAIL } 
from '../constants/orderConstant'
import { CART_CLEAR_ITEMS } from '../constants/cartConstants'

/**************************** ACTIONS *************************/

/** create order in placeorder screen component */
export const makeOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MAKE_REQUEST,
        })

        // pulling out the current user, we needed to be logged in
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // making API call to save the order details
        const { data } = await axios.post(`/api/orders/add/`, order, config)

        // if post request is successful dispatch and send payload to the reducer
        dispatch({
            type: ORDER_MAKE_SUCCESS,
            payload: data,
        })

        // clear cart info stored in state and local storage after order is placed
        dispatch({
            type: CART_CLEAR_ITEMS,
            payload: data,
        })
        localStorage.removeItem("cartItems")

    } catch(error) {
        dispatch({
            type: ORDER_MAKE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

// used in getting order details in placeorder screen component
export const getOrderDetails = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST,
        })

        // pulling the current user logged in as
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        // making API call to get order details
        const { data } = await axios.get(`/api/orders/${id}`, config)

        // if get request is successful, its sends payload to the reducer
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

/** USED IN MAKING PAYMENT IN ORDERSCREEN */
export const payOrder = (id, paymentResult) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST,
        })

        /** PULLING OUT THE CURRENT USER */
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        /** API CALL TO SAVE THE PAYMENT DETAILS */
        const { data } = await axios.put(`api/orders/${id}/pay/`, paymentResult, config)

        /** IF SUCCESSFUL DISPATCH AND SEND THE PAYLOAD TO THE REDUCER */
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

/** USED FOR DELIVERY IN ORDERSCREEN */
export const deliverOrder = (order) => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST,
        })

        /** PULLING OUT THE CURRENT USER */
        const {
            userLogin: {userInfo},
        } = getState()

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        /** API CALL TO UPDATE ORDER DELIVERY STATUS */
        const { data } = await axios.put(`api/orders/${order._id}/deliver/`, {}, config)

        /** IF SUCCESSFUL DISPATCH AND SEND THE PAYLOAD TO THE REDUCER */
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELIVER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}

/** USED FOR FETCHING ORDER LIST IN PROFILESCREEN */
export const listMyOrders = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST,
        })

        /** PULLING OUT THE CURRENT USER */
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        /** API CALL TO FETCH ORDER LIST */
        const { data } = await axios.get(`/api/orders/myorders/`, config)

        /** IF SUCCESSFUL DISPATCH AND SEND THE PAYLOAD TO THE REDUCER */
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
} 

/** ALL LIST ORDERS IN ORDERLIST SCREEN COMPONENT */
export const listAllOrders = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_ALL_LIST_REQUEST,
        })

        // pulling out the current user, we needed to be logged in
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        // making API call to get order list
        const { data } = await axios.get(`/api/orders/`, config)

        // if get request is successful, its sends payload to the reducer
        dispatch({
            type: ORDER_ALL_LIST_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: ORDER_ALL_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message
        })
    }
}