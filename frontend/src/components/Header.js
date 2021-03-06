import React from 'react'
import { useDispatch, useSelector } from 'react-redux' 
import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
import { logout } from '../action/userAction'
import SearchBox from './SearchBox'

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const logoutHandler = () =>{
        dispatch(logout())
    }
    return (
        <header>
            <Navbar bg="primary"  expand="lg" collapseOnSelect >
                <Container>
                    <LinkContainer to ="/">
                         <Navbar.Brand ><span className='header-text'>B-Shop </span></Navbar.Brand>
                    </LinkContainer>
                    
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style = {{background: '#fff'}} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* <Route render= {(naviagte)=> <SearchBox/>}/> */}
                        <SearchBox/>

                    <Nav className="ms-auto">
                    <LinkContainer to ="/cart">
                        <Nav.Link><i className='fas fa-shopping-cart header-text'></i><span className='header-text'>Cart</span></Nav.Link>
                    </LinkContainer>

                    { userInfo?(
                        <NavDropdown aria-controls="basic-navbar-nav" title={userInfo.name} id='username'>
                            <LinkContainer to ='/profile'>
                                <NavDropdown.Item>
                                    Profile
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Item onClick={()=>logoutHandler()}>
                                    Logout
                                </NavDropdown.Item>
                        </NavDropdown>
                    ):<LinkContainer to ="/login">
                            <Nav.Link><i className='fas fa-user header-text'></i><span className='header-text'>Sign In</span></Nav.Link>
                        </LinkContainer>
                    }
                    {
                        userInfo && userInfo.isAdmin && (
                            <NavDropdown aria-controls="basic-navbar-nav" title= "Admin" id='adminmenu'>
                            <LinkContainer to ='/admin/userlist'>
                                <NavDropdown.Item>
                                    Users
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to ='/admin/productlist'>
                                <NavDropdown.Item>
                                    Products
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to ='/admin/orderlist'>
                                <NavDropdown.Item>
                                   Orders
                                </NavDropdown.Item>
                            </LinkContainer>
                            </NavDropdown>
                        )
                    }
                    
                    {/* <LinkContainer to ="/About">
                        <Nav.Link><i className='fas fa-globe header-text'></i><span className='header-text'>About</span></Nav.Link>
                    </LinkContainer> */}
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header
