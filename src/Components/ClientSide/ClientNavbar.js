import React, { useContext, useEffect } from 'react'
import { Navbar , Container , Nav, Badge, Button, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import '../../Styles/Navbar.css'
import { BsBasket2Fill } from 'react-icons/bs';
import Store from '../../Context/Store';

function ClientNavbar() {
  const {cart, activeUser, logOutUser} = useContext(Store);
  const navigate = useNavigate();

  useEffect(()=>{
    // To Prevent LocalStorage Hacking
    if(activeUser.token) {
      if(+activeUser.token !== +localStorage.token) {
        logOutUser();
      } 
    }
  },[])

  const logOut = ()=>{
      logOutUser()
      navigate('/signin')
  }
    
  const controlPanel = ()=>{
    navigate('/admin')
  }
  return (
    <Navbar collapseOnSelect sticky='top' expand="lg" bg="dark" variant="dark">
    <Container>
      <Nav className="me-auto">
        <Navbar.Brand as={Link} to='/' className='fw-bold me-2'>Lusion</Navbar.Brand>
      </Nav>
      <Nav className='cartnav me-2'>
        <Button as={Link} to='/cart' className='cartbtn rounded-circle flex-center'>
          <BsBasket2Fill/>
        </Button>
        <Badge as={Link} to='/cart' className={cart.length > 0?'shopcart bg-success':'shopcart bg-danger'}>
          {cart.length}
        </Badge>
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className='shadow-none px-2'/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav>
          <Nav.Link as={Link} className='links' to="/">Home</Nav.Link>
          <Nav.Link as={Link} className='links' to="/shop">Shop</Nav.Link>
          {+activeUser.token !== +localStorage.token
          ? <>
              <Nav.Link as={Link} className='links' to={"/signin"}>Sign In</Nav.Link>
              <Nav.Link as={Link} className='links' to={"/signup"}>Sign Up</Nav.Link>
            </>
          : <NavDropdown className='links' id="basic-nav-dropdown"
                title={activeUser.name && activeUser.name.split(" ")[0]}>
              <NavDropdown.Item className='dropname fw-bold text-success'>
                {activeUser.name}
              </NavDropdown.Item>
              <NavDropdown.Item className='dropusername text-muted'>
                username: {activeUser.username}
              </NavDropdown.Item>
              <NavDropdown.Item className='dropitems' as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item className='dropitems' as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={controlPanel}
                className={activeUser.role !== 'Admin'?'d-none':'dropitems'}>
                Control Panal
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item className='dropitems' onClick={logOut}>
                Sign Out
              </NavDropdown.Item>
            </NavDropdown>
          }
        </Nav>
      </Navbar.Collapse>
    </Container>
    </Navbar>
  )
}
export default ClientNavbar;