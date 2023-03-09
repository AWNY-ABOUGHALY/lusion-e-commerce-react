import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import fifth1 from '../../Images/fifth1.jpg'
import fifth2 from '../../Images/fifth2.jpg'
import fifth3 from '../../Images/fifth3.jpg'
import fifth4 from '../../Images/fifth4.jpg'
import fifth5 from '../../Images/fifth5.jpg'
import fifth6 from '../../Images/fifth6.jpg'

function Homerestlast() {
  return (
    <div className='homerestlast min-vh-100 text-center pt-5 pb-3'>
      <Container>
          <Row className='mb-3'>
            <Col sm={12} md={7} lg={6} className='twoimgs'>
              <img src={fifth1} alt="fifth1"/>
              <img src={fifth2} alt="fifth2"/>
            </Col>
            <Col sm={12} md={5} lg={6} className='text-md-start imgscont flex-center'>
              <p className='ps-sm-4 p-2'>Fashion is not only a kind of appearance, popular may not be suitable for you, but according to their own to dress up yourself, that can all be fashionable.</p>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={12} md={7} lg={6} className='twoimgs'>
              <img src={fifth3} alt="fifth3"/>
              <img src={fifth4} alt="fifth4"/>
            </Col>
            <Col sm={12} md={5} lg={6} className='text-md-start imgscont flex-center'>
              <p className='ps-sm-4 p-2'>Some people say that loneliness is shameful, but fashion is a means of resistance alone, this is fashion realm.</p>
            </Col>
          </Row>
          <Row className='mb-3'>
            <Col sm={12} md={7} lg={6} className='twoimgs'>
              <img src={fifth5} alt="fifth5"/>
              <img src={fifth6} alt="fifth6"/>
            </Col>
            <Col sm={12} md={5} lg={6} className='text-md-start imgscont flex-center'>
              <p className='ps-sm-4 p-2'>The fashion industry is always desperate to innovate, this kind of dress is now in fashion, the organizers guided them in orderly, Fashion, is a kind of aesthetic view.</p>
            </Col>
          </Row>
      </Container>      
    </div>
  )
}
export default Homerestlast;