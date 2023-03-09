import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap';
import ClientNavbar from '../Components/ClientSide/ClientNavbar';
import '../Styles/Settings.css';
import SignIn from './SignIn';
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import { BsPencil } from 'react-icons/bs';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Store from '../Context/Store';

const Settings = () => {
  const {activeUser, cart, updateActiveUser} = useContext(Store)

  const [image, setImage] = useState(activeUser.image);
  const [name, setName] = useState(activeUser.name);
  const [age, setAge] = useState(activeUser.age);
  const [gender, setGender] = useState(activeUser.gender);
  const [genderstatus] = useState(activeUser.genderstatus);
  const [username] = useState(activeUser.username);
  const [password, setPassword] = useState(activeUser.password);
  const [fill, setFill] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();

  const [showImage, setShowImage] = useState(false);
  const [press, setPress] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const handelImage = (e)=>{
    let imgValue = e.target.value.trim();
    let defaultImg = 'https://i.ibb.co/G06DZfR/default-user-image.png';
    if(imgValue !== "") {
      if((imgValue.startsWith('http://') || imgValue.startsWith('https://')) && imgValue.includes('.')){
        let myRequest = new XMLHttpRequest();
        myRequest.open("get",imgValue)
        myRequest.send()
        myRequest.onreadystatechange = ()=>{
          if(myRequest.readyState === 4 && myRequest.status === 200) {
            setImage(imgValue)
          } else {
            setImage(defaultImg)
          }
        }
      }  
    }
  }

  let defaultImg = 'https://i.ibb.co/G06DZfR/default-user-image.png';
  let showimgfield = ()=>{
    showImage ? setShowImage(false) : setShowImage(true)
  }
  let hidefield = ()=>{
    setShowImage(false)
  }

  let clickpress = ()=>{
    setPress(true) 
  }

  let showPassword = ()=>{
    showPwd ? setShowPwd(false) : setShowPwd(true)
  }

  const updateProfile = (e)=>{
    e.preventDefault();
    if(name.length > 1 & age !== "" & password !== "" & gender !== ""){
      axios({
        method: 'put',
        url: `http://localhost:9000/users/${activeUser.id}`,
        data: {
          ...activeUser, image, name, age, gender, password, cart,
          genderstatus: activeUser.gender !== gender ? 'Changed' : genderstatus
        }
      })
      .then(()=>{updateActiveUser(activeUser.id)})
      .then(setFill(false),setConfirm(true))
      .then(setTimeout(()=>{
        navigate('/profile')
      },3000))
    } else {
    setConfirm(false)
    setFill(true)
  }
  }
  return (
  <>
  {!activeUser.name
  ? <SignIn/>
  :
  <>
  <ClientNavbar/>
  <Row className='settings g-0'>
    <Col md={4} lg={3} className="pt-3 pt-sm-5 pb-md-5 border-end">
      <Container>
        <div className='text-center position-relative'>
          <div className='setimgdivholder position-relative mx-auto'>
            <div className='setimagediv'><img src={image} className="setimage" alt={name}/></div>
            <div className='editbtn px-1' onClick={showimgfield}>
              <BsPencil className='editpin'/>
              <span className='editword px-1'>Edit</span>
            </div>
          </div>
          {showImage &&
            <input type="text" defaultValue={image !==""? image:defaultImg} className='setimageurl'
            onChange={handelImage} onBlur={hidefield}/>
          }
          <h4 className='mt-3 fw-bold text-success'>
            {activeUser.name && activeUser.name.toUpperCase()}
          </h4>
        </div>
      </Container>
    </Col>
    <Col md={8} lg={9} className="pb-3 pt-3 pt-sm-5">
      <div className='px-2 px-sm-3'>
        <h3 className='fw-bold text-center text-sm-start'>Account Settings</h3>
        <div className='settingscont px-3 px-sm-5'>
        <Form onSubmit={updateProfile}>
          <Form.Group className="mb-3">
            <Form.Label className='labels'>Full Name</Form.Label>
            <Form.Control type="text" value={name} className="inpts"
              onChange={(e)=>{setName(/^[a-zA-Z]+(\s[a-zA-Z]*){0,4}$/.test(e.target.value)?e.target.value: "")}}/>
            <Form.Text className="text-muted">
              Better to have real name to give a good impression to others
              that they are dealing with a real personality.
              <span className='d-block'>Note: Enough to just add your first name and last name.</span>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='labels'>Age</Form.Label>
            <Form.Control type="number" defaultValue={age} className="inpts"
              onChange={(e)=>{setAge(e.target.value>=14 & e.target.value<=100 ? e.target.value : age)}}/>
            <Form.Text className="text-muted">
              Use this field to correct the age. If you have added wrong age mistakenly.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='labels'>Gender</Form.Label>
            <Form.Select disabled={press? (genderstatus === "Changed"? 'disabled' : '') :'disabled'} value={gender} 
                onChange={(e)=>{setGender(e.target.value)}} className="inpts">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
            <Form.Text className="text-muted">
              <span>Naturally, the gender is not changed, but assuming that you made a mistake
                in choosing the gender when registering,</span>
              <span className='d-block'>
                <span>So you can press </span>
                <Button onClick={clickpress} className={press?'bg-secondary bg-opacity-25 confirm':'confirm'}>Confirm</Button> so that you can change the gender.</span>
              <span className='d-block'>
                <span className={press && genderstatus === "Changed"? "d-block text-danger fw-bold":"d-none"}>
                  Sorry, You have exhausted your attempt!
                </span>
                <span className={press && genderstatus === "Changed" ?'border border-danger px-1':''}>
                  <span className={press && genderstatus === "Changed"?'fw-bold':'text-danger fw-bold'}>Note: </span>
                  <span>The change will only take place once and </span>
                  <span className={press && genderstatus === "Changed"?'':'atention'}>you will not be able to change it again.</span>
                </span>
              </span>
              <span>Please note that we do not support homosexuality.</span>
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='labels'>Username</Form.Label>
            <Form.Control type="text" className='text-muted' defaultValue={username} disabled/>
            <Form.Text className="text-muted">
              It's not possible to change your username, however you can change your name instead.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className='labels'>Password</Form.Label>
            <Form.Control type={showPwd?"text":"password"} defaultValue={password}
              onChange={(e)=>{setPassword(e.target.value)}} className="inpts"/>
            <div className='position-relative'>
              {showPwd
              ? <BsEyeSlash className='showpassword text-muted fs-5' onClick={showPassword}/>
              : <BsEye className='showpassword text-muted fs-5' onClick={showPassword}/>
              }
            </div>
            <Form.Text className="text-muted">
              If you going to change your password, please remember it!
              You will need it when you try to sign in again.
              <span className='d-block'>Note: do not share your password with others.</span>
            </Form.Text>
          </Form.Group>
          <div className={confirm?'addconfirm':'removeconfirm'}>
            <span className='fs-5 text-success'><BsCheckLg/> </span>
            <span className='fw-bold text-success'>Profile Updated</span>
          </div>
          <div className={fill?'addfillfields':'removefillfields'}>
            <span className='fs-4 text-danger'><IoMdClose/> </span>
            <span className='fw-bold text-danger'>Please Fill All Fields Correctly</span>
          </div>
          <div className='flex-center justify-content-sm-start mt-2'>
            <Button variant="success" type={confirm?'button':'submit'} className='inptbtn flex-center'>
              <span className={confirm?'loading':null}></span>
              <span className='text-white fw-bold'>Update Profile</span>
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
export default Settings;