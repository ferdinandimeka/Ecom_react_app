import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers, productDetailsReducers, productCreateReducer,
        productDeleteReducer, 
        productTopReducer,
        productReviewCreateReducer,
        productUpdateReducer} from './reducers/productReducers'
import { userDeleteUser, userLoginReducers, userUpdateReducer } from './reducers/userReducers'
import { legacy_createStore as createStore} from 'redux'
import { cartReducers } from './reducers/cartReducers'
import { logger } from 'redux-logger'
import { checkStateMiddleware } from './checkState'
import { userRegisterReducers } from './reducers/userReducers'
import { userProfileReducers, userListReducer } from './reducers/userReducers'
import { userUpdateProfileReducers } from './reducers/userReducers'
import { orderMakeReducer, orderDetailsReducer, orderPayReducer, 
        orderDeliverReducer, orderListReducer, 
        orderAllListReducer } from './reducers/orderReducers'
//const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    productCreate: productCreateReducer,
    productDelete: productDeleteReducer,
    productTopRated: productTopReducer,
    productCreateReview: productReviewCreateReducer,
    productUpdate: productUpdateReducer,
    cart: cartReducers,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userProfile: userProfileReducers,
    userUpdateProfile: userUpdateProfileReducers,
    userList: userListReducer,
    userDelete: userDeleteUser,
    userUpdate: userUpdateReducer,
    orderMake: orderMakeReducer,
    orderDetails: orderDetailsReducer,
    orderPayments: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderList: orderListReducer,
    orderListAll: orderAllListReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
    },

    userLogin: {
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]
const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware, logger, checkStateMiddleware)))

export default store