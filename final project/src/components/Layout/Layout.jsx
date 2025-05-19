import React from 'react'
import style from './Layout.module.css'
import { Outlet } from 'react-router-dom'

import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
  return (
    <>
    <Navbar/>
   

   <div className="container py-20 lg:p-15 ">
   <Outlet/>
   </div>

   <Footer/>

    </>
  )
}
