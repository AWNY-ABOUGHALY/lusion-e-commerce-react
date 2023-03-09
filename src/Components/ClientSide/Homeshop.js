import React, { useState } from  'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import t1 from '../../Images/t1.jpg';
import t2 from '../../Images/t2.jpg';
import t3 from '../../Images/t3.jpg';
import t4 from '../../Images/t4.jpg';
import Shopnowbtn from './Shopnowbtn';

function Homeshop() {
  const [cardsinfo] = useState([
    {id:0, url:t1, text:'Variety of women clothes', price:'150$'},
    {id:1, url:t2, text:'Variety of women cardigans', price:'110$'},
    {id:2, url:t3, text:'Complete your look', price:'200$'},
    {id:3, url:t4, text:'All that makes your wardrobe', price:'250$'}] 
  )
  let cards = cardsinfo.map(e=>(
    <Col sm={6} lg={3} key={e.id}>
      <Card className='card mx-auto mb-4' style={{maxWidth:'23rem'}}>
      <Card.Img variant="top" src={e.url} className='imgs'/>
      <Card.Body>
        <Card.Text className='desc mb-0'>{e.text}</Card.Text>
        <Card.Title className='text-success'>{e.price}</Card.Title>
        <Shopnowbtn btnsize={'sm'}/>
      </Card.Body>
      </Card>
    </Col>
  ))
  return (
    <div className='min-vh-100 text-center homeshop pt-4 pb-1'>
      <Container>
        <h1 className='pb-3 fw-bold'>Featured Products</h1>
          <Row>{cards}</Row>
      </Container>
    </div>
  )
}
export default Homeshop;