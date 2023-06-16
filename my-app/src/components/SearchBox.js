import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SearchBox() {

    const [keyword, setKeyword] = useState('')

    let history = useNavigate()

    const submitHandler = (event) => {
        event.preventDefault()

        // WHEN USER HITS SUBMIT, REDIRECT TO HOME PAGE TO SEE PRODUCTS
        // AND APPEND ?keyword=...IN URL
        if (keyword) {
            history(`/?keyword=${keyword}&page=1`)
        } else {
        // IF WE HIT SUBMIT WITHOUT KEYWORD, WE DON'T WANT THE USER TO GET
        // REDIRECTED IN THAT CASE RATHER STAY ON WHATEVER PAGE HE WAS  
            history(history(history.location.pathname))
        }
    }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <Form.Control
            type='text'
            name='q'
            onChange={(event) => setKeyword(event.target.value)}
            className='mr-sm-2 ml-sm-5'
        >
        </Form.Control>

        <Button type='submit' variant='outline-success' className='p-2 mx-sm-2'>
            Search
        </Button>
    </Form>
  )
}
