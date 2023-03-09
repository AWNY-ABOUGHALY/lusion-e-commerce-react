import axios from 'axios';
import React, { Fragment, useEffect, useState, useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../../Styles/Admin.css'
import Store from '../../Context/Store';

function ViewUser() {
  const {userId} = useParams();
  const [user, setUser] = useState({});
  const {base_URL} = useContext(Store);

  useEffect(()=>{
    axios({
      method: 'get',
      url: `http://localhost:9000/users/${userId}`
    }).then(data=>setUser(data.data))
  })
  return (
    <Fragment>
      <AdminNavbar/>
      <Row className='gx-0 adminWorkSpace'>
        <Col sm={3} lg={2}><AdminSidebar/></Col>
        <Col sm={9} lg={10} className="py-3">
          <Container className='text-center'>
            <div className='fs-4 text-success'>Account Number #{user.id}</div>
            <div className="card p-2 rounded-2 my-1 mx-auto" style={{maxWidth:'15rem'}}>
              <img src={user.image} className="rounded-top mb-1" alt={user.name} style={{maxHeight:'14.5rem'}}/>
              <div className='userdetails mt-3 mb-1 pt-3 pb-2 text-center'>
                <div className="text-dark">Name: {user.name}</div>
                <div className="text-dark">Gender: {user.gender}</div>
                <div className="text-dark mb-2">Age: {user.age}</div>
                <div className="text-light bg-success border-bottom">UserName: {user.username}</div>
                <div className="text-light bg-danger p-1">User Role: <div className='userrole'>{user.role}</div></div>
              </div>
            </div>
            <Button as={Link} to='/admin/users'
              variant='outline-secondary' className='mt-2'>
              Back to Users List
            </Button>
          </Container>
        </Col>
      </Row>
    </Fragment>
  )
}
export default ViewUser;