import React, {Fragment, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Nav } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { BsCheckLg } from 'react-icons/bs';
import { BsXLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import '../../Styles/Admin.css'

function AddNewUser() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [fill, setFill] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e)=>{
    e.preventDefault();
    let defaultImg = 'https://i.ibb.co/G06DZfR/default-user-image.png';
    if(name !== "" & age !== "" & username !== "" & password !== "") {
      image !== "" && 
        axios({
          method: 'get', url: image,
        }).then(data=>{
          data.request.status !== 200 && setImage("");
        })
      axios({
        method: 'post',
        url: 'http://localhost:9000/users',
        data: {
          image: image===''? defaultImg : image,
          name: name.trim(),
          age, gender, username, password,
          token: 0,
          role: "Member",
          cart: []
        }
      }).then(setFill(false),setconfirm(true))
      .then(setTimeout(()=>{
        navigate('/admin/users')
      },3000))
    } else {
      setconfirm(false)
      setFill(true)
    }
  }
  const handelImage = (e)=>{
    let imgValue = e.target.value.trim();
    let defaultImg = 'https://i.ibb.co/G06DZfR/default-user-image.png';
    if(imgValue !== "") { 
      setImage(imgValue.startsWith('http')&&imgValue.includes('.')?imgValue:defaultImg)
    }
  }
  return (
    <Fragment>
      <AdminNavbar/>
      <Row className='gx-0 adminWorkSpace'>
        <Col sm={3} lg={2}><AdminSidebar/></Col>
        <Col sm={9} md={{span:7,offset:1}} lg={{span:6,offset:2}} className="py-1">
          <Container>
            <Form className='border rounded bg-white shadow mt-sm-3' onSubmit={formSubmit}>
              <Nav.Link as={Link} to={'/admin/users'} className='text-end'>
                <BsXLg className='closeicon'/>
              </Nav.Link>
              <div className='fs-4 fw-bold text-success mb-sm-2 mb-md-0 text-center'>New User</div>
              <div className='px-4 pb-2'>
                <Form.Group>
                  <Form.Label className='mb-0'>User Image</Form.Label>
                  <Form.Control type="text"
                    onChange={handelImage}
                    className='addinputs addinptspecial' placeholder="Enter Image Url"
                  />
                  <span className='imgexample'>Ex: https://i.ibb.co/G06DZfR/default-user-image.png</span>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Username</Form.Label>
                  <Form.Control type="text" value={username}
                    onChange={(e)=>{setUserName(e.target.value)}}
                    className='addinputs addinptspecial' placeholder="Enter Username"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Password</Form.Label>
                  <Form.Control type="password" value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    className='addinputs addinptspecial' placeholder="Enter Password"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Name</Form.Label>
                  <Form.Control type="text" value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    className='addinputs addinptspecial' placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Gender</Form.Label>
                  <Form.Select className='addinputs addinptspecial'
                    defaultValue={'Male'} aria-label="Default select example"
                    onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className='mb-0'>Age</Form.Label>
                  <Form.Control type="number" value={age}
                    onChange={(e)=>{setAge(e.target.value)}}
                    className='addinputs addinptspecial' placeholder="Enter User Age"
                  />
                </Form.Group>
                <div className={confirm?'addconfirm':'removeconfirm'}>
                  <span className='fs-5 text-success'><BsCheckLg/> </span>
                  <span className='fw-bold text-success'>New User Added</span>
                </div>
                <div className={fill?'addfillfields':'removefillfields'}>
                  <span className='fs-4 text-danger'><IoMdClose/> </span>
                  <span className='fw-bold text-danger'>Please Fill All Fields Correctly</span>
                </div>
                <Button variant="success" type={confirm?'button':'submit'} className='w-100 mt-1 flex-center'>
                  <span className={confirm?'loading':null}></span>
                  <span>Add User</span>
                </Button>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </Fragment>
  )
}
export default AddNewUser;