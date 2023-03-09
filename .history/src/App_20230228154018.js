import React, { Fragment, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import './Styles/App.css';
import Home from './Pages/Home';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Admin from './Pages/Admin';
import Page404 from './Pages/Page404';
import AdminProducts from './Components/AdminSide/AdminProducts'
import AddNewProduct from './Components/AdminSide/AddNewProduct';
import ViewProduct from './Components/AdminSide/ViewProduct';
import EditProduct from './Components/AdminSide/EditProduct';
import AdminUsers from './Components/AdminSide/AdminUsers';
import AddNewUser from './Components/AdminSide/AddNewUser';
import ViewUser from './Components/AdminSide/ViewUser';
import Settings from './Pages/Settings';
import Profile from './Pages/Profile';
import Store from './Context/Store';
import axios from 'axios';

function App() {
  const [cart, setCart] = useState([]);
  const [activeUser, setActiveUser] =  useState({});
  const [base_URL] = useState("https://my-json-server.typicode.com/AWNY-ABOUGHALY/json")
  // https://my-json-server.typicode.com/AWNY-ABOUGHALY/json
  // http://localhost:9000
  
  useEffect(()=>{
    // For Refresh Status
    if(!activeUser.token && localStorage.token) {
      axios.get(`${base_URL}/users/`)
      .then(data=>{setActiveUser(...data.data.filter((userA)=>{
        return userA.username === localStorage.username
     }))})
    }
  },[])

  useEffect(()=>{
    activeUser.token &&
    axios({
      method: 'put',
      url: `${base_URL}/users/${activeUser.id}`,
      data: {...activeUser, cart}
    })
  },[cart])

  useEffect(()=>{
    activeUser.cart && setCart(activeUser.cart)
  },[activeUser])

  const userOnline = ({username, id}, token)=>{
    if(id){
      axios.get(`${base_URL}/users/${id}`)
      .then(data=>setActiveUser(data.data))
    } else {
      axios.get(`${base_URL}/users`)
      .then(data=>setActiveUser(
        ...data.data.filter((userA)=>{
          return userA.username === username
        })
      ))
    }
    localStorage.username = username
    localStorage.token = token
  }

  const logOutUser = ()=>{
    setActiveUser({})
    setCart([])
    localStorage.clear()
  }

  const updateActiveUser = (id)=>{
    axios.get(`${base_URL}/users/${id}`)
    .then(data=>setActiveUser(data.data))
  }

  let addtocart = (product)=>{
    let checker = cart.some(e=>{
      return e.id === product.id
    })
    if(checker){
      let [cartProduct] = cart.filter((e)=>{
        return e.id === product.id
      })
      if(cartProduct.items > 0) {
        cartProduct.count++;
        cartProduct.items--;
        setCart([...cart]);
      }
    } else {
      product.count = +1;
      product.items--;
      setCart([...cart, product])
    }
  }
  let plusbtn = (product)=>{
    product.items>0&&(<>{product.items--}{product.count++}</>)
    setCart([...cart])
  }
  let minusbtn = (product)=>{
    product.count > 1 &&(<>{product.items++}{product.count--}</>)
    setCart([...cart])
  }
  let trashbtn = (product)=>{
    let restcart = cart.filter(e=>{
      return e.id !== product.id
    })
    setCart(restcart)
  }
  let totalamount = cart.length > 0 ? cart.map(e=>e.price * e.count).reduce((i,c)=>i + c) : 0;
  return (
    <Fragment>
      <Store.Provider
        value={{cart, addtocart, plusbtn, minusbtn, trashbtn, totalamount, activeUser, userOnline, logOutUser, updateActiveUser, base_URL}}>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/shop' element={<Shop/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/settings' element={<Settings/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/admin/products' element={<AdminProducts/>}/>
          <Route path='/admin/products/add' element={<AddNewProduct/>}/>
          <Route path='/admin/products/view/:productId' element={<ViewProduct/>}/>
          <Route path='/admin/products/edit/:productId' element={<EditProduct/>}/>
          <Route path='/admin/users' element={<AdminUsers/>}/>
          <Route path='/admin/users/add' element={<AddNewUser/>}/>
          <Route path='/admin/users/view/:userId' element={<ViewUser/>}/>
          <Route path='*' element={<Page404/>}/>
        </Routes>
      </Store.Provider>
    </Fragment>
  );
}
export default App;