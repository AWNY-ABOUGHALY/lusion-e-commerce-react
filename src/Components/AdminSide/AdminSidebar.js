import React from 'react'
import '../../Styles/Admin.css'
import { FaHome, FaUser } from "react-icons/fa";
import { BsBasket2Fill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function AdminSidebar() {
  return (
    <div className='adminSidebar py-4'>
      <Link to="/admin"><div className='options'>
        <span className='me-2 me-sm-3 flex-center'><FaHome/></span>
        <span>Dashboard</span>
      </div></Link>
      <Link to="/admin/products"><div className='options option2'>
        <span className='me-2 me-sm-3 flex-center'><BsBasket2Fill/></span>
        <span>Products</span>
      </div></Link>
      <Link to="/admin/users"><div className='options'>
        <span className='me-2 me-sm-3 flex-center'><FaUser/></span>
        <span className='flex-center'>Users</span>
      </div></Link>
    </div>
  )
}
export default AdminSidebar;