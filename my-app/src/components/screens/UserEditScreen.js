import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Loader from '../Message'
import FormContainer from '../FormContainer'
import Message from '../Message'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { getProfile, updateUser } from '../../actions/userActions'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

function UserEditScreen() {

    const { id } = useParams()
    const history = useNavigate()
    const dispatch = useDispatch()

    // States
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    /** Getting the states from the redux store */
    const userProfile = useSelector((state) => state.userProfile)
    const { user, loading, error } = userProfile

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate
    } = userUpdate

    useEffect(() => {
        /** If user successfully updated, reset user details & redirect 
         * user to admin page 
        */
       if (successUpdate) {
            dispatch({ 
                type: USER_UPDATE_RESET
            })
            history('/userlist')
       } else {
        /** If we have data loaded in or if we don't have a user,
         * but we are editing another user then we dispatch to
         * get the data of the user
         */
        if (!user.name || user._id !== Number(id)) {
            dispatch(getProfile(id))
        } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
        }
       }
    },[dispatch, user, id, history, successUpdate])

    /** Handler */
    const submitHandler = (event) => {
        event.preventDefault()

        dispatch(updateUser({ _id: user._id, name, email, isAdmin }))
    }

  return (
    <div>
        <Link to='/userlist'>Go Back</Link>

        <FormContainer>
            <h1>Edit User</h1>

            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='email'
                            placeholder='Enter Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='isAdmin'>
                        <Form.Check
                            type='checkbox'
                            label='Is Admin'
                            checked={isAdmin}
                            onChange={(e) => setIsAdmin(e.target.checked)}
                        />
                    </Form.Group>

                    <Button type='submit' variant='primary' className='mt-3'>
                        Update
                    </Button>
                </Form>
            )}

        </FormContainer>
    </div>
  )
}

export default UserEditScreen