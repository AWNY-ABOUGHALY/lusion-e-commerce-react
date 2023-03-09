import React from 'react'
import '../Styles/Page404.css'
import { Link } from 'react-router-dom'
import { ImSad } from 'react-icons/im';
import ClientNavbar from '../Components/ClientSide/ClientNavbar';

function Page404() {
  return (
    <>
      <ClientNavbar/>
      <div className='emptypage flex-col-center fw-bold text-center text-secondary'>
        <span className='page404icon'><ImSad/></span>
        <span className='fs-1'>404</span>
        <span className='fs-1 text-secondary text-opacity-25'>Page Not Found</span>
        <span className='fs-5 mt-2 text-secondary text-opacity-50'>Please go back to HomePage <Link to='/' className='goback'>Lusion</Link></span>
      </div>
    </>
  )
}
export default Page404;