import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Button, Col, Container, Nav, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ClientNavbar from '../Components/ClientSide/ClientNavbar';
import '../Styles/signup.css'
import { BsCheckLg } from 'react-icons/bs';
import { BsXLg } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import Store from '../Context/Store';

const SignUp = () => {
  const {userOnline} = useContext(Store);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hint, setHint] = useState("");
  const [fill, setFill] = useState(false);
  const [confirm, setconfirm] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:9000/users')
    .then(data=>setUsers(data.data))
  },[])
    /********** Valid State **********/
    const [valid, setValid] = useState({
      nameValid: false,
      ageValid: false,
      genderValid: false,
      emailValid: false,
      userNValid: false,
      pwdValid: false 
    })
    const [borderAlert, setBorderAlert] = useState(false);
  /********* Handel Fields State **********/
  // Email
  const [emailtestRes, setEmailTestRes] = useState(false);
  const [hideEmailLoading, setHideEmailLoading] = useState(true);
  const [emailInuse, setEmailInUse] = useState(false);
  // UserName
  const [untestRes, setUnTestRes] = useState(false);
  const [hideUnLoading, setHideUnLoading] = useState(true);
  const [unInuse, setUnInUse] = useState(false);
  // Password
  const [pwdtestRes, setPwdTestRes] = useState(false);
  const [pwdStatus, setPwdStatus] = useState('');

  ////////////// Name Field Functionality //////////////
  const nameChange = (e,field)=>{
    setName(/^[a-zA-Z\s-]+$/.test(e) 
    ? (/^(?!.*(\s|-)(\s|-)).+$/.test(e) ? e : name)
    : e.slice(0,-1))
    e.length === 0 ? setHint(field) : setHint('')
  }
  ///////////// Email Field Functionality //////////////
  const emailRegEX = /^(\w-?\.?)+@(\w-?)+\.([a-z]){2,}$/;
  const emailBlur = () =>{
    setHint('')
    if(email.length !== 0) {
      if(emailRegEX.test(email)) {
        !emailtestRes && setHideEmailLoading(false);
        setTimeout(() => {
          let tester = users.some((user)=>{
            return user.email === email
          })
          tester? setEmailInUse(true) : setEmailInUse(false)
          setHideEmailLoading(true)
          setEmailTestRes(true)
        }, 1500)
      } else {
        setEmailInUse(true)
        setEmailTestRes(true)
      }
    } else {
      setEmailTestRes(false)
    }
  }
  const emailChange = (e,field)=>{
    setEmail(e)
    setEmailTestRes(false)
    setEmailInUse(false)
    e.length === 0 ? setHint(field) : setHint('')
  }
  //////////// UserName Field Functionality /////////////
  const userNRegEX = /^([a-zA-Z\d])+((-?|_?)([a-zA-Z\d])+){0,3}$/;
  const userNBlur = ()=>{
    setHint('')
    if(username.length >= 2 & username.length <= 22) {
      if(userNRegEX.test(username)) {
        !untestRes && setHideUnLoading(false)
        setTimeout(() => {
          let tester = users.some((user)=>{
            return user.username === username.trim()
          })
          tester? setUnInUse(true) : setUnInUse(false)
          setHideUnLoading(true)
          setUnTestRes(true)
        }, 1500)
      } else {
        setUnInUse(true)
        setUnTestRes(true)
      }
    } else if (username.length === 0) {
      setUnTestRes(false)
    } else {
      setUnInUse(true)
      setUnTestRes(true)
    }
  }
  const userNChange = (e,field)=>{
    setUserName(e)
    setUnTestRes(false)
    setUnInUse(false)
    e.length >= 2 && e.length <= 22 ? setHint('') : setHint(field)
  }
  ////////////// Password Field Functionality ///////////////
  const pwdRegEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,22}$/;
  const pwdChange = (e)=>{
    setPassword(e);
    if(e.length >= 6) {
      if(pwdRegEX.test(e)) {
        setHint('')
        setPwdTestRes(true)
        e.length < 8 && setPwdStatus('Week')
        e.length >= 8 && e.length < 12 && setPwdStatus('Medium')
        e.length >= 12 && e.length < 18 && setPwdStatus('Strong')
        e.length >= 18 && setPwdStatus('Very Strong')
      } else {
        setHint('PWD')
        setPwdTestRes(true)
        setPwdStatus('Unfulfilled')
      }
    } else {
      setHint('PWD')
      setPwdTestRes(false)
    }
  }
  /////////// Valid State Functionality //////////
  useEffect(()=>{
    let unTester = users.some((user)=>{
      return user.username === username.trim()
    })
    unTester? setUnInUse(true) : setUnInUse(false)
    let emailTester = users.some((user)=>{
      return user.email === email
    })
    emailTester? setEmailInUse(true) : setEmailInUse(false)
    setValid({
      nameValid: /^[a-zA-Z\s-]+$/.test(name),
      ageValid: +age >= 10,
      genderValid: gender !== "",
      emailValid: emailRegEX.test(email) && !emailTester,
      userNValid: username.length >= 2 && username.length <= 22 && userNRegEX.test(username) && !unTester,
      pwdValid: password.length >= 6 && pwdStatus !== 'Unfulfilled'
    })
  },[name,age,gender,email,username,password])
  ///////////// Form Validation //////////////
  const formSubmit = (e)=>{
    e.preventDefault();
    let defaultImg = 'https://i.ibb.co/G06DZfR/default-user-image.png';
    if(valid.nameValid && valid.ageValid && valid.genderValid
      && valid.emailValid && valid.userNValid && valid.pwdValid) {
      let token = Math.floor(Math.random() * 1e15)
      axios({
        method: 'post',
        url: 'http://localhost:9000/users',
        data: {
          image: defaultImg,
          name: name.trim(), age, gender, email, username, password, token,
          role: "Member",
          cart: []
        }
      }).then(setFill(false),setconfirm(true))
      .then(()=>{userOnline({username, },token)})
      .then(setTimeout(()=>{
        navigate('/')
      },3000))
    } else {
      setconfirm(false)
      setFill(true)
      setBorderAlert(true)
    }
  }
  return (
    <>
    <ClientNavbar/>
    <Row className='gx-0 signup flex-center fw-bold'>
      <Container>
        <Col sm={8} md={7} lg={6} xl={5} className='mx-auto'>
          <Form className='border rounded bg-white shadow mt-sm-2' onSubmit={formSubmit}>
            <Nav.Link as={Link} to={'/'} className='text-end'>
              <BsXLg className='closeicon'/>
            </Nav.Link>
            <div className='fs-4 fw-bold text-success mb-sm-2 mb-md-0 text-center'>Sign Up</div>
            <div className='px-4 pb-2'>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Name</Form.Label>
                <div className='position-relative flex-center'>
                  <Form.Control type="text" value={name} placeholder="Enter Your Name"
                    onChange={(e)=>{nameChange(e.target.value,"name")}}
                    onFocus={()=>{!/^[a-zA-Z\s-]+$/.test(name) && setHint('name')}}
                    onBlur={()=>{setHint('')}}
                    className={`inpts ${borderAlert && (!valid.nameValid?'border-danger':'')}`}/>
                  <span className={hint === 'name'?'activeHintarrow':'d-none'}></span>
                  <div className={hint === 'name'?'activeHint':'d-none'}>
                    <span>Just add First name and Last name</span>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Age</Form.Label>
                <div className='position-relative flex-center'>
                  <Form.Control type="text" value={age} placeholder="Enter Your Age"
                    onChange={(e)=>{/^[0-9]{0,2}$/.test(e.target.value)&& setAge(e.target.value)}}
                    onFocus={()=>{+age < 10&&setHint('age')}}
                    onBlur={()=>{setHint('')}}
                    className={`inpts ${borderAlert && (!valid.ageValid?'border-danger':'')}`}/>
                  <span className={hint === 'age'?'activeHintarrow':'d-none'}></span>
                  <div className={hint === 'age'?'activeHint':'d-none'}>
                    <span>Numbers Only, 10 to 99 years old</span>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Gender</Form.Label>
                <Form.Select className={`inpts ${borderAlert && (!valid.genderValid?'border-danger':'')}`}
                  onChange={(e)=>{setGender(e.target.value)}}>
                    <option value="">Choose Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Email</Form.Label>
                <div className='position-relative flex-center'>
                  <Form.Control type="text" value={email} placeholder="Enter Your Email"
                    onChange={(e)=>{emailChange(e.target.value,'email')}}
                    onFocus={()=>{!emailRegEX.test(email) && setHint('email')}}
                    onBlur={emailBlur}
                    className={`inpts ${borderAlert && (!valid.emailValid?'border-danger':'')}`}/>
                  <span className={hideEmailLoading?'d-none':'testicon checking'}></span>
                  {emailtestRes && <>
                    <span className={emailInuse?'testword text-danger':'testword text-success'}>
                      {emailRegEX.test(email)
                      ? (emailInuse?'Existing':'Not Existing')
                      : (email.includes(" ")?'No Spaces':'invalid')}
                    </span>
                    <span className={emailInuse?'testicon text-danger':'testicon text-success'}>
                      {emailInuse?<IoMdClose/>:<BsCheckLg/>}
                    </span>
                  </>}
                  <span className={hint === 'email'?'activeHintarrow':'d-none'}></span>
                  <div className={hint === 'email'?'activeHint':'d-none'}>
                    <span>Ex: XXXXXX@XXX.XXX</span>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Username</Form.Label>
                <div className='position-relative flex-center'>
                  <Form.Control type="text" value={username} placeholder="Enter Username"
                    onChange={(e)=>{userNChange(e.target.value,'userN')}}
                    onFocus={()=>{
                      !(username.length >= 2 && username.length <= 22)
                      ? setHint('userN')
                      : !userNRegEX.test(username) && setHint('userN')}}
                    onBlur={userNBlur}
                    className={`inpts ${borderAlert && (!valid.userNValid?'border-danger':'')}`}/>
                  <span className={hideUnLoading?'d-none':'testicon checking'}></span>
                  {untestRes && <>
                    <span className={unInuse?'testword text-danger':'testword text-success'}>
                      {username.length >= 2 & username.length <= 22 && 
                        userNRegEX.test(username) 
                        ? (unInuse? 'In use':'Available')
                        : (username.includes(" ")? 'No Spaces':'')}
                    </span>
                    <span className={unInuse?'testicon text-danger':'testicon text-success'}>
                      {unInuse?<IoMdClose/>:<BsCheckLg/>}
                    </span>
                  </>}
                  <span className={hint === 'userN'?'activeHintarrow':'d-none'}></span>
                  <div className={hint === 'userN'?'activeHint':'d-none'}>
                    <span>2 to 22 Characters | Numbers | _ | -</span>
                  </div>
                </div>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label className='mb-0'>Password</Form.Label>
                <div className='position-relative flex-center'>
                  <Form.Control type="password" value={password} placeholder="Enter Password"
                  onChange={(e)=>{pwdChange(e.target.value)}}
                  onFocus={()=>{(password.length<6 || pwdStatus === 'Unfulfilled') && setHint('PWD')}}
                  onBlur={()=>{setHint('')}} 
                  className={`inpts ${borderAlert && (!valid.pwdValid?'border-danger':'')}`}/>
                  {pwdtestRes && <>
                    <span className={`${pwdStatus} testword`}>
                      {password.length>= 6 && password.includes(' ')? 'No Spaces' : pwdStatus}
                    </span>
                    <span className={`${pwdStatus} testicon`}>
                      {pwdStatus === 'Unfulfilled'?<IoMdClose/>:<BsCheckLg/>}
                    </span>
                  </>}
                  <span className={hint === 'PWD'?'activeHintarrow':'d-none'}></span>
                  <div className={hint === 'PWD'?'activeHint':'d-none'}>
                    <span>6 to 22 Characters U & L Cases, Numbers</span>
                  </div>
                </div>
              </Form.Group>
              <div className={confirm?'addconfirm':'removeconfirm'}>
                <span className='fs-5 text-success'><BsCheckLg/> </span>
                <span className='fw-bold text-success'>Creating An Account</span>
              </div>
              <div className={fill?'addfillfields':'removefillfields'}>
                <span className='fs-4 text-danger'><IoMdClose/> </span>
                <span className='fw-bold text-danger'>Please Fill All Fields Correctly</span>
              </div>
              <Button variant="success" type={confirm?'button':'submit'}
                className='inptbtn w-100 my-2 flex-center'>
                <span className={confirm?'loading':null}></span>
                <span>Sign up</span>
              </Button>
            </div>
          </Form>
        </Col>
      </Container>
    </Row>
    </>
  )
}
export default SignUp