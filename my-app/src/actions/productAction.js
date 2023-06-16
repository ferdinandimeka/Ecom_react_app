import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST, PRODUCT_TOP_FAIL, PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_FAIL, 
    PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS } from '../constants/productConstants'

import axios from 'axios'

                             /** ACTION CREATORS */

export const listProducts = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`/api/products${keyword}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/** USED IN CREATING PRODUCTS IN ProductListScreen COMPONENT */
export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST,
        })

        // PULLING OUT CURRENT USER
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        // Api call to create product
        const { data } = await axios.post(`/api/products/create/`, {}, config)

        // if successful dispatch to the reducer
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            data: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}

/** USED IN DELETING PRODUCTS IN ProductListScreen  COMPONENT */
export const deleteProduct= (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST,
        })

        // PULLING OUT THE CURRENT USER
        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Api call to delete product
        const { data } = await axios.delete(`api/products/delete/${id}/`, config)

        // if successful dispatch and payload to the reducer
        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        })
    }
} 

/** USED IN ProductCarousel COMPONENT */
export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_TOP_REQUEST,
        })

        const { data } = await axios.get(`/api/products/top/`)

        dispatch({
            type: PRODUCT_TOP_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_FAIL,
            payload: error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message
        })
    }
}

/** Used in creating product reviews in the ProductScreen component */
export const createProductReview = (productId, review) => async (dispatch, getState) => {
    
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST,
        })

        // getting the current user
        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // Api call to create product review
        const { data } = await axios.post(`/api/products/${productId}/reviews/`,
        review, config)

        // If successful dispatch ro the reducer
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

/** ACTION USED IN UPDATING PRODUCTS IN ProductEditScreen COMPONENT */
export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST,
        })

        // Getting current user
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        /** Making Api call to update product */
        const { data } = await axios.put(
            `/api/products/update/${product._id}/`, product, config
        )

        /** If put request is successfull, dispatch & send the payload to the reducer */
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })

        /** Loads the updated products */
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ?  error.response.data.detail
            :  error.message
        })
    }
}