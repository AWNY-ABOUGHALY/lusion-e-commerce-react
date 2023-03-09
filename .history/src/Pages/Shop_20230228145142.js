import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import '../Styles/Shop.css';
import Shop1 from '../Images/Shop1.jpg';
import { BsBasket2Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import ClientNavbar from '../Components/ClientSide/ClientNavbar';
import axios from 'axios';
import Store from '../Context/Store';

function Shop() {
  const {addtocart} = useContext(Store);
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    axios({
      method: 'get',
      url: 'https://my-json-server.typicode.com/AWNY-ABOUGHALY/json/products/'
    }).then(data=>
      setProducts(data.data))
  },[])  
  return (
    <>
    <ClientNavbar/>
    <div className='shoppage text-center pb-5'>
      <div className='slider flex-center align-items-end pb-5' style={{backgroundImage:`url(${Shop1})`}}>Shop Now</div>
      <Container>
        <Row className='pt-3'>
          <Link to='..'><Button variant='outline-success'>Back Home</Button></Link>
          {products.map((product)=>(
            <Col sm={6} md={4} key={product.id}>
              <div className="card p-2 rounded-2 my-3 mx-auto" style={{maxWidth:'16rem'}}>
                <img src={product.image} className="rounded-top mb-1" alt={product.name}/>
                <h5 className="mt-2 fw-bold text-start">{product.name}</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fs-5 fw-bold text-success">${product.price}</div>
                  <Button onClick={product.items>0?()=>addtocart(product):null} className="bg-cart border rounded-circle p-2">
                    <div className='carts flex-center'><BsBasket2Fill/></div>
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
    </>
  )
}
export default Shop;