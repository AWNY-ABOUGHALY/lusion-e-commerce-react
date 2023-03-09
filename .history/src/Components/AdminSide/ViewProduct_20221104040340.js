import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import '../../Styles/Admin.css'

function ViewProduct() {
  const {productId} = useParams();
  const [product, setProduct] = useState({});
  useEffect(()=>{
    axios({
      method: 'get',
      url: `http://localhost:9000/products/${productId}`
    }).then(data=>setProduct(data.data))
  })
  return (
    <Fragment>
      <AdminNavbar/>
      <Row className='gx-0 adminWorkSpace'>
        <Col sm={3} lg={2}><AdminSidebar/></Col>
        <Col sm={9} lg={10} className="py-3">
          <Container className='text-center'>
            <div className='fs-4 text-success'>Product Code #{product.id}</div>
            <div className="card p-2 rounded-2 my-1 mx-auto" style={{maxWidth:'15rem'}}>
              <img src={product.image} className="rounded-top mb-1" alt={product.name}/>
              <div className={product.items===0?"text-danger":"text-success"}>
                InStock: {product.items>0?product.items :'no more '}
                {product.items===1?' item':' items'}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-1">
                <div className="fs-5 fw-bold text-start">{product.name}</div>
                <div className="fs-5 fw-bold text-success">${product.price}</div>
              </div>
            </div>
            <Button as={Link} to='/admin/products'
              variant='outline-secondary' className='mt-2'>
              Back to Products
            </Button>
          </Container>
        </Col>
      </Row>
    </Fragment>
  )
}
export default ViewProduct;