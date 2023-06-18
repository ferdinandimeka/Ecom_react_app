import { ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS,
    ORDER_MAKE_FAIL, ORDER_MAKE_REQUEST, ORDER_MAKE_SUCCESS, ORDER_MAKE_RESET,
    ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL, ORDER_DELIVER_RESET, ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_RESET, ORDER_ALL_LIST_REQUEST,
    ORDER_ALL_LIST_SUCCESS, ORDER_ALL_LIST_FAIL, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS }    
    from '../constants/orderConstant'

/********************** REDUCERS ********************/

// place order component reducer
export const orderMakeReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_MAKE_REQUEST:
            return {
                loading: true
            }

        case ORDER_MAKE_SUCCESS:
            return {
                loading: false,
                success: true,
                order: action.payload,
            }

        case ORDER_MAKE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        case ORDER_MAKE_RESET:
            return {}

        default:
            return state
    }
}

// used in placeorder component to store order details
export const orderDetailsReducer = (state = {
    loading: true,
    orderItems: [],
    shippingAddress: {},
}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload,
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

/** orderPayReducer used in OrderScreen component for payment */
export const orderPayReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }

        
        case ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        
            case ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.payload
            }

            default:
            return state
    }
}

/** orderDeliverReducer used in OrderScreen component for delivery */
export const orderDeliverReducer = (state={}, action) => {
    switch (action.type) {
        case ORDER_DELIVER_REQUEST:
            return {
                loading: true
            }

        case ORDER_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            }

        case ORDER_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_DELIVER_RESET:
            return {}

        default:
            return state
    }
}

/** orderListReducer used in profileScreen */
export const orderListReducer = (state={ orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }

        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }

        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
            /** When user is not logged in orders will be reset */
        case ORDER_LIST_RESET:
            return {
                orders: []
            }

        default:
            return state
    }
}

/** LIST ALL ORDERS IN THE ORDERLIST SREEN */
export const orderAllListReducer = (state={ orders: [] }, action) => {
    switch (action.type) {
        case ORDER_ALL_LIST_REQUEST:
            return {
                loading: true
            }

        case ORDER_ALL_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            }

        case ORDER_ALL_LIST_FAIL:
            return  {
                loading: false,
                error: action.payload,
            }

        default:
            return state
    }
}

/** Used in OrderListScreen components */
export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return {
                loading: true
            }

        case ORDER_DELETE_SUCCESS:
            return {
                loading: false,
                success: true
            }

        case ORDER_DELETE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}