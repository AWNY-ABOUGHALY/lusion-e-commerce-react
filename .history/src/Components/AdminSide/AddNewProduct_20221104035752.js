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

function AddNewProduct() {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState("");
  const [fill, setFill] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const navigate = useNavigate();

  const formSubmit = (e)=>{
    e.preventDefault();
    let defaultImg = 'https://i.ibb.co/wyVpQym/default-image.png';
    if(name !== "" & price !== "" & items !== "") {
      image !== "" && 
        axios({
          method: 'get', url: image,
        }).then(data=>{
          data.request.status !== 200 && setImage("");
        })
      axios({
        method: 'post',
        url: 'http://localhost:9000/products',
        data: {
          image: image===''? defaultImg : image,
          name: name.trim(),
          price,
          items: parseInt(items)
        }
      }).then(setFill(false),setconfirm(true))
      .then(setTimeout(()=>{
        navigate('/admin/products')
      },3000))
    } else {
      setconfirm(false)
      setFill(true)
    }
  }
  const handelImage = (e)=>{
    let imgValue = e.target.value.trim();
    let defaultImg = 'https://i.ibb.co/wyVpQym/default-image.png';
    if(imgValue !== "") { 
      setImage(imgValue.startsWith('http')&&imgValue.includes('.')?imgValue:defaultImg)
    }
  }
  return (
    <Fragment>
      <AdminNavbar/>
      <Row className='gx-0 adminWorkSpace'>
        <Col sm={3} lg={2}><AdminSidebar/></Col>
        <Col sm={9} md={{span:7,offset:1}} lg={{span:6,offset:2}} className="py-3">
          <Container>
            <Form className='border rounded bg-white shadow mt-sm-3' onSubmit={formSubmit}>
              <Nav.Link as={Link} to={'/admin/products'} className='text-end'>
                <BsXLg className='closeicon'/>
              </Nav.Link>
              <div className='px-4 pb-3'>
              <div className='fs-4 fw-bold text-success mb-2 mb-sm-2 text-center flex-grow-1'>New Product</div>
                <Form.Group className="mb-3">
                  <Form.Label className='mb-0'>Product Image</Form.Label>
                  <Form.Control type="text"
                    onChange={handelImage}
                    className='addinputs' placeholder="Enter Image Url"
                  />
                  <span className='imgexample'>Ex: https://i.ibb.co/MRs7CxD/shopC2.jpg</span>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className='mb-0'>Product Name</Form.Label>
                  <Form.Control type="search" value={name}
                    onChange={(e)=>{setName(/^[a-zA-Z]+$/.test(e.target.value)?e.target.value:"")}}
                    className='addinputs' placeholder="Enter Product Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className='mb-0'>Product Price</Form.Label>
                  <Form.Control type="number" value={price}
                    onChange={(e)=>{setPrice(e.target.value >= 0? e.target.value:"")}}
                    className='addinputs' placeholder="Enter Product Price"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label className='mb-0'>Product Items</Form.Label>
                  <Form.Control type="number" value={items}
                    onChange={(e)=>{setItems(e.target.value >= 0? e.target.value:"")}}
                    className='addinputs' placeholder="Enter Product Items"
                  />
                </Form.Group>
                <div className={confirm?'addconfirm':'removeconfirm'}>
                  <span className='fs-5 text-success'><BsCheckLg/> </span>
                  <span className='fw-bold text-success'>New Product Added</span>
                </div>
                <div className={fill?'addfillfields':'removefillfields'}>
                  <span className='fs-4 text-danger'><IoMdClose/> </span>
                  <span className='fw-bold text-danger'>Please Fill All Fields Correctly</span>
                </div>
                <Button variant="success" type={confirm?'button':'submit'} className='w-100 mt-2 flex-center'>
                  <span className={confirm?'loading':null}></span>
                  <span>Add Product</span>
                </Button>
              </div>
            </Form>
          </Container>
        </Col>
      </Row>
    </Fragment>
  )
}
export default AddNewProduct;