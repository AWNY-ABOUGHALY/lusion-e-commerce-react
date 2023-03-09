import React, {Fragment, useEffect, useState, useContext} from 'react'
import { Container, Table, Row, Col } from 'react-bootstrap';
import '../../Styles/Admin.css'
import { Button } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Store from '../../Context/Store';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const {base_URL} = useContext(Store)

  const getUsers = ()=>{
    axios({
      method: 'get',
      url: 'http://localhost:9000/users'
    }).then(data=>
      setUsers(data.data))
  }
  useEffect(()=>{
    getUsers();
  },[])

  const userRole = (user)=>{
    axios({
      method:'put',
      url:`http://localhost:9000/users/${user.id}`,
      data: {...user, role: user.role==="Admin"? "Member" : "Admin"},
    }).then(getUsers())
    getUsers();
  }
  const deletebtn = (user)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Yes, delete User!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: 'delete',
          url: `http://localhost:9000/users/${user.id}`
        }).then(getUsers())
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        getUsers();
      }
    })
  }
  return (
    <Fragment>
    <AdminNavbar/>
    <Row className='gx-0 adminWorkSpace text-center text-sm-start'>
      <Col sm={3} lg={2}><AdminSidebar/></Col>
      <Col sm={9} lg={10} className="py-4">
      <Container>
        <Button as={Link} to='/admin/users/add' variant='success' className='my-2'>Add New User</Button>
        <Table striped hover responsive>
          <thead variant="dark" className='table-dark border border-dark border-opacity-50'>
            <tr>
              <th>ID</th>
              <th className='thwidth'>User Image</th>
              <th className='thwidth'>User Name</th>
              <th>Age</th>
              <th>Role</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody className='border'>
            {users.map((user)=>(
              <tr className='producttr' key={user.id}>
                <td>{user.id}</td>
                <td className='productimage'><img src={user.image} alt={user.name}/></td>
                <td>{user.username}</td>
                <td>{user.age}</td>
                <td className={user.role === 'Admin'?'text-success fw-bold':''}>{user.role}</td>
                <td>
                  <div className='flex-center'>
                    <Button variant='danger' size={'sm'} className='text-nowrap'
                      onClick={()=>{deletebtn(user)}}>Delete User
                    </Button>
                    <Button as={Link} to={`/admin/users/view/${user.id}`} 
                      variant='primary' size={'sm'} className='mx-1 mx-lg-3 mx-xl-4'>View
                    </Button>
                    <Button onClick={()=>{userRole(user)}}
                      className='text-nowrap makeAdmin' size={'sm'}
                      variant={user.role==='Admin'?'secondary':'success'}>
                       {user.role==='Admin'?'Remove Admin':'Make Admin'}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      </Col>
    </Row>
    </Fragment>
  )
}
export default AdminUsers;