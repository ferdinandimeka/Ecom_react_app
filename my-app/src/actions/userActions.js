import { 
USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT,
USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST,
USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_SUCCESS, 
USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_LIST_REQUEST,
USER_LIST_FAIL, USER_LIST_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST,
USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_DETAILS_RESET,
USER_LIST_RESET, USER_DELETE_SUCCESS 
} from '../constants/userConstants'
import { ORDER_LIST_RESET } from '../constants/orderConstant'
import axios from 'axios'

export const login = (email, password) => async(dispatch) => {
    
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/login/',
        {'username': email, 'password': password}, config 
        )
    
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    
        localStorage.setItem('userInfo', JSON.stringify(data))
    }

    catch(error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }

}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({
        type: USER_LOGOUT
    })
    /** Reset the orders and details made by the user */
    dispatch({
        type: USER_DETAILS_RESET,
    })
    /** Reset the details of orders made by users */
    dispatch({
        type: ORDER_LIST_RESET,
    })
    /** Reset the details of the users list */
    dispatch({
        type: USER_LIST_RESET,
    })
}

export const register = (name, email, password) => async(dispatch) => {
    
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/users/register/',
        {'name': name, 'password': password, 'email': email}, config 
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    }

    catch(error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getProfile = (id) => async(dispatch, getState) => {
    
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        // gets the current user
        const { userLogin: { userInfo }, } = getState()


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // requests the user data
        const { data } = await axios.get(`/api/users/${id}/`,config )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
       })
    }   
}

// update the user in the profileSreen component
export const updateProfile = (user) => async(dispatch, getState) => {
    
    try{
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        // gets the current user
        const { userLogin: { userInfo }, } = getState()

        // requests the user data
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.put('/api/users/profile/update', user, config )

        // if successful dispatch the data
        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data,
        })

        // after updating the profile info log the user with the updated info
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        }) 

        // set the upated info in the local storage
        localStorage.setItem('userInfo', JSON.stringify(data))

    }
    catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

/** Used to get the list of users in UserList Screen */
export const listUsers = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        // Gettting the current user
        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        /** Api call to get the users list */
        const { data } = await axios.get(`api/users/`, config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

/** Used to delete user in the UserList Screen */
export const deleteUser = (id) => async(dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
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

        /** Api call to delete user */
        const { data } = await axios.delete(`/api/users/delete/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}

/** Use to edit user in userEditScreen Component */
export const updateUser = (user) => async(dispatch, getState) => {

    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        // GETTING THE CURRENT USER
        const {
            userLogin: { userInfo }
        } = getState()

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        // API REQUEST TO EDIT USER
        const { data } = await axios.put(`/api/users/update/${user._id}/`, user, config)

        // DISPATCH USER UPDATE SUCCESS
        dispatch({
            type: USER_UPDATE_SUCCESS
        })

        // AFTER UPDATING WE WANT TO RELOAD THE USER
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
              error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
          }); 
    }
}