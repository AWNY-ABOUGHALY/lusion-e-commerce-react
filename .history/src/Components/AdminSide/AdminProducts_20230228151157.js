import React, {Fragment, useEffect, useState, useContext} from 'react'
import { Container, Table, Row, Col } from 'react-bootstrap';
import '../../Styles/Admin.css'
import { Button } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Store from '../../Context/Store';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const {base_URL} = useContext(Store);

  const getProducts = ()=>{
    axios({
      method: 'get',
      url: `${base_URL}/products`
    }).then(data=>
      setProducts(data.data))
  }
  useEffect(()=>{
    getProducts();
  },[])

  const deletebtn = (product)=>{
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#198754',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios({
          method: 'delete',
          url: `${base_URL}/products/${product.id}`
        }).then(getProducts())
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        getProducts();
      }
    })
  }
  return (
    <Fragment>
    <AdminNavbar/>
    <Row className='gx-0 adminWorkSpace text-center text-sm-start'>
      <Col sm={3} lg={2}><AdminSidebar/></Col>
      <Col sm={9} lg={10} className="py-4">
      <Container>
        <Button as={Link} to='/admin/products/add' variant='success' className='my-2'>Add New Product</Button>
        <Table striped hover responsive>
          <thead variant="dark" className='table-dark border border-dark border-opacity-50'>
            <tr>
              <th>ID</th>
              <th className='thwidth'>Product Image</th>
              <th className='thwidth'>Product Name</th>
              <th>Price</th>
              <th>Items</th>
              <th>Controls</th>
            </tr>
          </thead>
          <tbody className='border'>
            {products.map((product)=>(
              <tr className='producttr' key={product.id}>
                <td>{product.id}</td>
                <td className='productimage'><img src={product.image} alt={product.name}/></td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.items}</td>
                <td>
                  <div className='flex-center justify-content-evenly'>
                    <Button variant='danger' size={'sm'} className='me-1'
                      onClick={()=>{deletebtn(product)}}>Delete
                    </Button>
                    <Button as={Link} to={`/admin/products/view/${product.id}`} 
                      variant='primary' size={'sm'} className='me-1'>View
                    </Button>
                    <Button as={Link} to={`/admin/products/edit/${product.id}`}
                      variant='warning' size={'sm'}>Edit</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
      </Col>
    </Row>
    </Fragment>
  )
}
export default AdminProducts;