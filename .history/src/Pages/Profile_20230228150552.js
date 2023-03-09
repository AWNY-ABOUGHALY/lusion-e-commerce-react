import React, { useContext } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap';
import ClientNavbar from '../Components/ClientSide/ClientNavbar';
import '../Styles/Profile.css';
import SignIn from './SignIn';
import { Link } from 'react-router-dom';
import Store from '../Context/Store';

const Profile = () => {
  const {activeUser, base_URL} = useContext(Store)
  return (
    <>
    {!activeUser.name
    ? <SignIn/>
    :
    <>
    <ClientNavbar/>
    <Row className='profile g-0'>
      <Col xs={12} className="pt-5 border-end">
        <div className='px-2 px-sm-3 px-md-5 mx-lg-5'>
          <h3 className='fw-bold text-center text-md-start'>My Profile</h3>
          <hr/>
          <div className='text-center flex-col-center flex-md-row justify-content-md-start align-items-md-start'>
            <div className='me-md-5'>
              <img src={activeUser.image} className="setimage" alt={activeUser.name}/>
            </div>
            <div className='headcontent text-center text-md-start'>
              <h2 className='mt-3 fw-bold text-success'>
                {activeUser.name && activeUser.name.toUpperCase()}
              </h2>
              <span className='text-muted d-block'>Username: {activeUser.username}</span>
              <div>
                <span>My First Name is </span>
                <span className='g-dash'>{activeUser.name && activeUser.name.split(" ")[0]}</span>
                <span> and My Last Name is </span>
                <span className='g-dash'>
                  {activeUser.name && activeUser.name.split(" ")[activeUser.name.split(" ").length - 1]}
                </span>
              </div>
              <div>
                <span>I'm </span>
                <span className='g-dash'>{activeUser.gender}</span>
                <span> and </span>
                <span> I'm </span>
                <span className='g-dash'>{activeUser.age}</span>
                <span> years old.</span>
              </div>
            </div>
          </div>
          <hr/>
        </div>
      </Col>
      <Col xs={12} className="pb-3">
        <div className='px-2 px-sm-3 px-md-5 mx-lg-5'>
          <div className='profilecont px-3 px-sm-5'>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label className='labels'>Full Name</Form.Label>
              <Form.Control type="text" defaultValue={activeUser.name} className="fields" readOnly/>
              <Form.Text className="text-muted">
                <span>Better to have real name to give a good impression to others that
                  they are dealing with a real personality.</span>
                <span className='d-block'>Note: Enough to just have your first name and last name.</span>
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='labels'>Age</Form.Label>
              <Form.Control type="number" defaultValue={activeUser.age} className="fields" readOnly/>
              <Form.Text className="text-muted">
                Knowing users your real age makes communication more effective.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='labels'>Gender</Form.Label>
              <Form.Select value={activeUser.gender} className="fields" readOnly>
                <option value={activeUser.gender}>{activeUser.gender}</option>
              </Form.Select>
              <Form.Text className="text-muted">
                <span>Please note that we do not support homosexuality.</span>
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className='labels'>Username</Form.Label>
              <Form.Control type="text" className='text-muted' defaultValue={activeUser.username} disabled/>
              <Form.Text className="text-muted">
                The username is used for the login process and you can never change it.
              </Form.Text>
            </Form.Group>
            <div className='text-center text-md-start'>
              <Button as={Link} to={'/settings'} variant="outline-success" type="submit" className='fieldedit'>
                Edit Profile
              </Button>
            </div>
          </Form>
          </div>
        </div>
      </Col>
    </Row>
    </>
    }
    </>
  )
}

export default Profile;