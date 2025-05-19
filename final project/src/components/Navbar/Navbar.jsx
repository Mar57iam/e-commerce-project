import React from 'react'
import style from './Navbar.module.css'
import logo from   '../../assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <>
      

<nav className="bg-slate-300  fixed top-0 right-0 left-0 border-gray-200 ">
    <div className="flex flex-wrap justify-center lg:justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className='flex  gap-3  items-center '>
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} width={'140px'}   className="h-8" alt="" />
        </Link>
        <ul className='flex gap-3 '>
          <li> <Link className='text-slate-600' to=""> Home</Link></li>
          <li> <Link className='text-slate-600' to="cart"> Cart</Link></li>
          <li> <Link className='text-slate-600' to="products"> Products</Link></li>
          <li> <Link className='text-slate-600' to="categories"> Categories</Link></li>
          <li> <Link className='text-slate-600' to="brands"> Brands</Link></li>
        </ul>
        </div>




        <div className="flex items-center space-x-6 rtl:space-x-reverse">
        <ul className='flex gap-4'>
          <li><i className="fa-brands fa-facebook"></i></li>
          <li><i className="fa-brands fa-linkedin"></i></li>
          <li><i className="fa-brands fa-instagram"></i></li>
          <li><i className="fa-brands fa-youtube"></i></li>
          <li><i className="fa-brands fa-twitter"></i></li>
        </ul>
        <div>
          <ul className='flex gap-3'>
            <li><Link to="register"> Register</Link></li>
            <li><Link to="login"> Login</Link></li>
            <li><Link to=""> SignOUt</Link></li>
          </ul>
        </div>
        </div>
    </div>
</nav>


    </>
  )
}
