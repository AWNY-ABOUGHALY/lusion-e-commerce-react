import React, { useContext, useEffect, useState } from 'react'
import '../Styles/SignIn.css'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import ClientNavbar from '../Components/ClientSide/ClientNavbar';
import '../Styles/Admin.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdClose } from 'react-icons/io';
import Store from '../Context/Store';

function SignIn() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fill, setFill] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const navigate = useNavigate();
  const {userOnline, base_URL} = useContext(Store)

  useEffect(()=>{
    axios({
      method: 'get',
      url: `${base_URL}/users`
    }).then(data=>{
      setUsers(data.data)
    })
  },[])
  const formSubmit = (e)=>{
    e.preventDefault()
    if(username !== '' && password !== '') {
      let [checker] = users.filter((user)=>{
        return user.username === username & user.password === password
      })
      if(checker !== undefined) {
        let token = Math.floor(Math.random() * 1e15)
        axios({
          method: 'put',
          url: `${base_URL}/users/${checker.id}`,
          data: {...checker, token}
        })
        .then(
          setFill(false),
          setconfirm(true),
          setTimeout(()=>{
            userOnline(checker, token)
            navigate('/')
          },1000)
        )
      } else {
        setconfirm(false)
        setFill(true)
      }
    } else {
      setconfirm(false)
      setFill(true)
    }
  }
  return (
    <>
    <ClientNavbar/>
    <Row className='gx-0 signin flex-center fw-bold'>
      <Container>
        <Col sm={9} md={7} lg={5} xl={4} className='mx-auto'>
          <Form className='border px-3 px-sm-4 pt-3 pb-1 rounded bg-white shadow' onSubmit={formSubmit}>
            <div className='fs-2 text-success text-center mb-3'>Sign In</div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="mb-0">User Name</Form.Label>
              <Form.Control className='signininput' type="text" 
              placeholder="Enter Your UserName"
              onChange={(e)=>{setUsername(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-4" controlId="formBasicPassword">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control className='signininput' type="password"
              placeholder="Enter Your Password"
              onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            <div className={fill?'addfillfields':'removefillfields'}>
              <span className='fs-4 text-danger'><IoMdClose/> </span>
              <span className='fw-bold text-danger'>Wrong Username Or Password</span>
            </div>
            <Button variant="success" type={confirm?'button':'submit'} className='w-100 mt-1 flex-center mb-3'>
              <span className={confirm?'loading':null}></span>
              <span>Log In</span>
            </Button>
            <div className='fw-bold text-center ifunew'>
              <span>If you are new </span>
              <Link to="/signup">Sign Up</Link>
            </div>
          </Form>
        </Col>
      </Container>
    </Row>
    </>
  )
}
export default SignIn;