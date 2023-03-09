import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Shopnowbtn(props) {
  return (
    <Button variant="outline-success" size={props.btnsize}>
      <Link className='links' to="/shop">Shop Now</Link>
    </Button>
  )
}
