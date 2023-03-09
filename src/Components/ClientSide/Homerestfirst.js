import React from 'react'
import { Container } from 'react-bootstrap'
import Shopnowbtn from './Shopnowbtn';

function Homerestfirst() {
  return (
    <div className='homerestfirst min-vh-100 text-center py-5'>
      <Container>
        <div className='d-flex justify-content-between flex-column flex-sm-row'>
          <div className='flex-sm-grow-1 me-sm-3 mb-4 mb-sm-0 leftside flex-center align-items-end pb-3 px-2'>
            <div className='text flex-col-center'>
              <span>MERRY</span>
              <div className='d-flex flex-column flex-lg-row'>
                <span className='fw-bold text-light me-lg-3'>CHRISTMAS</span>
                <span className='fw-bold text-light'><span className='text-success'>40%</span> OFF</span>
              </div>
              <span><Shopnowbtn btnsize={'md'}/></span>
            </div>
          </div>
          <div className='flex-sm-shrink-1 ms-sm-3 rightside flex-col-center justify-content-between px-2 py-4'>
            <div className='cont1 flex-col-center text-success'>
              <span>Your</span><span>Next</span>
            </div>
            <div className='cont2 flex-col-center fw-bold'>
              <span>Purchase</span><span><span className='text-success'>10% </span>OFF</span>
            </div>
            <div className='smbtn flex-col-center'>
              <Shopnowbtn btnsize={'md'}/>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
export default Homerestfirst;