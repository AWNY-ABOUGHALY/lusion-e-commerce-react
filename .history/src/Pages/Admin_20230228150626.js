import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Components/AdminSide/AdminNavbar';
import AdminSidebar from '../Components/AdminSide/AdminSidebar';
import Store from '../Context/Store';
import '../Styles/Admin.css';
import Page404 from './Page404';

function Admin() {
  const {activeUser, base_URL} = useContext(Store)
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [lessItems, setLessItems] = useState({});
  const [noImage, setNoImage] = useState([]);
  const [maleUser, setMaleUser] = useState(0);
  const [adminUser, setAdminUser] = useState(0);
  const [newestUser, setNewestUser] = useState({});
  useEffect(()=>{
    axios.get('http://localhost:9000/products')
    .then(data=>{
      setProducts(data.data);
    })
    axios.get('http://localhost:9000/users')
    .then(data=>{
      setUsers(data.data);
    })
  },[])

  const handelProducts = ()=>{
    let Looping = products.map(product=>product.price)
    let maxCheck = Looping.reduce((cur,nex)=>+cur > +nex? +cur : +nex)
    setMaxValue(maxCheck)
    let minCheck = Looping.reduce((cur,nex)=>+cur < +nex? +cur : +nex)
    setMinValue(minCheck)
    let lessItems = products.map(product=>product.items)
    .reduce((cur,nex)=>cur < nex? cur : nex)
    let lessProductItems = products.filter(product=>{
      return product.items === lessItems
    })
    setLessItems(...lessProductItems)
    let defaultImg = 'https://i.ibb.co/wyVpQym/default-image.png'
    let noImages = products.filter((product)=>{
      return product.image === defaultImg;
    }).length
    setNoImage(noImages)
  }

  const handelUsers = ()=>{
    let maleUsers = users.filter(user=>{
      return user.gender === 'Male'
    }).length
    setMaleUser(maleUsers)
    let adminUsers = users.filter(user=>{
      return user.role === 'Admin'
    }).length
    setAdminUser(adminUsers)
    let newestUser = users[users.length - 1]
    setNewestUser(newestUser)
  }
  useEffect(()=>{
    products.length > 0 && handelProducts();
    users.length > 0 && handelUsers();
  },[products, users])

  return (
  <>
  {activeUser.role === 'Admin'
  ?
  <Fragment>
  <AdminNavbar/>
  <Row className='gx-0'>
    <Col sm={3} lg={2}><AdminSidebar/></Col>
    <Col sm={9} lg={10} className="py-4 flex-center">
      <Container>
      <Row>
        <Col sm={12} md={6}>
          <Card className="text-center my-2">
            <Card.Header className='fw-bold fs-4 text-white bg-success'>Products</Card.Header>
            <Card.Body className='px-md-2 px-lg-5'>
              <Card.Title className='text-warning fw-bold'>
                <span>You Have </span>
                <span className='g-dash fs-3'>
                  {products.length}
                </span>
                <span> Products Available</span>
              </Card.Title>
              <Card.Text>
                <span>
                  <span>With Prices between </span>
                  <span className='g-dash'>${minValue} : ${maxValue}.</span>
                </span>
                <span className='d-block'>
                  <span>With </span> 
                  <span className='g-dash'>{noImage} </span>
                  <span>{noImage ===1?'Product has':'Products have'} No Image.</span>
                </span>
              </Card.Text>
              <Card.Text>
                <span className='mb-2 d-block'>
                  <span>The product with the fewest number of items is Product No.</span>
                  <span className='g-dash'>{lessItems.id} </span>
                  <span>with </span>
                  <span className='g-dash'>{lessItems.items} </span>
                  <span>{lessItems.items===1?'item':'items'} only.</span>
                </span>
                <span>To preview that product click </span> 
                <Button as={Link} to={`/admin/products/view/${lessItems.id}`} 
                  variant='primary' size={'sm'}>View
                </Button>
              </Card.Text>
              <Button variant="success" as={Link} to={'/admin/products'}>
                Manage Products
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6}>
          <Card className="text-center my-2">
            <Card.Header className='fw-bold fs-4 text-white bg-success'>Users</Card.Header>
            <Card.Body className='px-md-2 px-lg-5'>
              <Card.Title className='text-warning fw-bold'>
                <span>You Have </span>
                <span className='g-dash fs-3'>{users.length}</span>
                <span> Users Registered</span>
              </Card.Title>
              <Card.Text>
                <span>
                  <span>With </span>
                  <span className='g-dash'>{maleUser}</span>
                  <span> Male & </span>
                  <span className='g-dash'>{users.length - maleUser}</span>
                  <span> Female.</span>
                </span>
                <span className='d-block'>
                  <span>With </span>
                  <span className='g-dash'>{adminUser}</span>
                  <span> Admin & </span>
                  <span className='g-dash'>{users.length - adminUser}</span>
                  <span> {(users.length - adminUser)===1?'Member':'Members'}.</span>
                </span>
              </Card.Text>
              <Card.Text>
                <span className='mb-2 d-block'>
                  <span>The newest registered user is the owner of the account No.</span>
                  <span className='g-dash'>{newestUser.id}</span>
                  <span> Named </span>
                  <span className='g-dash'>{newestUser.name}</span>
                </span>
                <span>To preview that User click </span> 
                <Button as={Link} to={`/admin/users/view/${newestUser.id}`} 
                  variant='primary' size={'sm'}>View
                </Button>
              </Card.Text>
              <Button variant="success" as={Link} to={'/admin/users'}>Manage Users</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </Col>
  </Row>
  </Fragment>
  :
  <Page404/>
  }
  </>
  )
}
export default Admin;
