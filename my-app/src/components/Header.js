import React from 'react'
import {Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from "./SearchBox";

function Header() {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
  }
  
  return (
    <header>
      <Navbar bg="light" variant="light" expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Ferdy Shop</Navbar.Brand>
          </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">

              <SearchBox />

              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <LinkContainer to="/">
                <Nav.Link><i className="fas fa-home"></i>{' '}Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i>{' '}Cart</Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id='username'>
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                  </NavDropdown>

                ) : (

                  <LinkContainer to="/login">
                  <Nav.Link><i className="fas fa-user"></i>{' '}Login</Nav.Link>
                  </LinkContainer>

                )}


                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title="Admin" id="adminmenu">
                    <LinkContainer to='/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>

                    <LinkContainer to='/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}

              </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar> 
    </header>
  )
}

export default Header