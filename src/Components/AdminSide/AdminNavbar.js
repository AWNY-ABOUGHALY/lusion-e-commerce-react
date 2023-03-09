import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../../Styles/Navbar.css'

function AdminNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" className='adminNavbar' variant="dark">
      <Nav className="me-auto ps-2 ps-sm-4">
        <Navbar.Brand as={Link} to='/admin' className='fw-bold'>Control Panel</Navbar.Brand>
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className='shadow-none me-2 me-sm-4'/>
      <Navbar.Collapse id="responsive-navbar-nav" className='me-4'>
        <Nav>
          <Link className='links' to="/">Lusion</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
export default AdminNavbar;