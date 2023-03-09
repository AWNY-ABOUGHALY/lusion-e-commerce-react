import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import s1 from '../../Images/s1.jpg';
import s2 from '../../Images/s2.jpg';
import s3 from '../../Images/s3.jpg';
import s4 from '../../Images/s4.jpg';

class Homecategory extends Component {
  state = { divs: [
    {id: 0, url: s1, name: 'Clothes', count: 'Items 5'},
    {id: 1, url: s2, name: 'Bag Brand', count: 'Items 20'},
    {id: 2, url: s3, name: 'Accessories', count: 'Items 6'},
    {id: 3, url: s4, name: 'Shoes', count: 'Items 8'}] 
  }
  render() {
    return (
      <div className="min-vh-100 flex-center py-5 categorysec">
        <Container>
          <Row>
            {this.state.divs.map(e=>(
              <Col sm={6} lg={3} key={e.id}>
                  <div className='categimgs text-center'><img src={e.url} alt={e.url.slice(14,16)}/></div>
                  <div className='captions text-center py-3'>
                    <h5 className='fw-bold text-success'>{e.name}</h5>
                    <div>{e.count}</div>
                  </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    )
  }
}
export default Homecategory;