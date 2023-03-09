import React, { Fragment, useContext } from 'react'
import '../Styles/Cart.css'
import { Container , Row , Col } from 'react-bootstrap';
import { BsPlusLg , BsTrash } from 'react-icons/bs';
import { FaMinus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ClientNavbar from '../Components/ClientSide/ClientNavbar';
import Store from '../Context/Store';

function Cart() {
  const {cart, plusbtn, minusbtn, trashbtn, totalamount} = useContext(Store);
  return (
    <>
    <ClientNavbar/>
    <div className='cartitem pb-4'>
    <Container>
      <Row className='pt-2'>
        {cart.length === 0 
        ? <div className='emptypage flex-col-center fw-bold text-center'>
            <span className='fs-2 text-danger'>Your shopping cart is Empty</span>
            <span className='fs-4'>
              <span>Please go to Products Section to </span>
              <Link to='/shop' className='startsh'>Start Shopping</Link>
            </span>
          </div>
        : <Fragment>
          <div className='totalprice text-center fs-5 fw-bold text-white rounded-1'>
            <span>Total Price is</span><span className='text-warning amount'>${totalamount}</span>
            <Link to='/shop'>
              <button className='btn btn-sm mx-2 my-1 Continuebtn'>Continue Shopping</button>
            </Link>
          </div>
          {cart.map((product)=>(
          <Col sm={6} md={4} lg={3} key={product.id} className='flex-center mx-auto my-3'>
            <div className="card p-2 rounded-2" style={{maxWidth:'16rem'}}>
              <img src={product.image} className="rounded-top" alt={product.alt}/>
              <div className='proddetails mt-3 mb-1 pt-3 pb-2 text-center'>
                <h6 className="fw-bold text-start ps-3">Code: #{product.id}</h6>
                <h6 className="fw-bold text-start ps-3">Name: {product.name}</h6>
                <div className="fw-bold text-start ps-3">Price: ${product.price}</div>
              </div>
              <div className={product.items===0?"text-danger":"text-success"}>
                <div className='instock'>
                  InStock: {product.items>0?product.items :'no '}
                  {product.items===1?' item more':' items more'}
                </div>
              </div>
              <div className='prodcontrol flex-center justify-content-between mt-2'>
                <div className='fw-bold flex-center text-success'>
                  <span className='text-center fs-5'>{product.count}</span>
                  {product.count > 1?'Items':'Item'}</div>
                <div className='controlbtns'>
                  <button onClick={()=>minusbtn(product)} className='btn btn-sm btn-warning me-1'><FaMinus/></button>
                  <button onClick={()=>plusbtn(product)} className='btn btn-sm btn-success me-1'><BsPlusLg/></button>
                  <button onClick={()=>trashbtn(product)} className='btn btn-sm btn-danger'><BsTrash/></button>
                </div>
              </div>
            </div>
          </Col>
          ))}
          </Fragment>
        }
      </Row>
    </Container>
    </div>
    </>
  )
}
export default Cart;