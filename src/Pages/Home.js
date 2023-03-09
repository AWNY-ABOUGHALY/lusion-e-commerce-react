import React, { Fragment } from 'react'
import Homeslider from '../Components/ClientSide/Homeslider';
import Homecategory from '../Components/ClientSide/Homecategory'
import Homeshop from '../Components/ClientSide/Homeshop'
import Homerestfirst from '../Components/ClientSide/Homerestfirst'
import Homerestlast from '../Components/ClientSide/Homerestlast'
import '../Styles/Home.css'
import ClientNavbar from '../Components/ClientSide/ClientNavbar';

function Home() {
  return (
    <Fragment>
        <ClientNavbar/>
        <Homeslider />
        <Homecategory />
        <Homeshop />
        <Homerestfirst />
        <Homerestlast />
    </Fragment>
  )
}
export default Home;