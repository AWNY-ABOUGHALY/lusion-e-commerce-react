import { createContext } from "react";

const Store = createContext({
    cart: [],
    addtocart: ()=>{},
    plusbtn: ()=>{},
    minusbtn: ()=>{},
    trashbtn: ()=>{},
    totalamount: 0,
    activeUser: {},
    userOnline: ()=>{},
    logOutUser: ()=>{},
    updateActiveUser: ()=>{},
    base_URL: 'https://my-json-server.typicode.com/AWNY-ABOUGHALY/json',
})

export default Store;