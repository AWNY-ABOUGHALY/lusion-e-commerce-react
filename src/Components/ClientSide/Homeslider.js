import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import img1 from '../../Images/logoOne.png'
import img2 from '../../Images/logoTwo.png'

function Homeslider() {
  return (
    <Carousel className='slidersec'>
      <Carousel.Item><img className="d-block w-100" src={img1} alt="First slide"/></Carousel.Item>
      <Carousel.Item><img className="d-block w-100" src={img2} alt="Second slide"/></Carousel.Item>
    </Carousel>
  )
}
export default Homeslider;