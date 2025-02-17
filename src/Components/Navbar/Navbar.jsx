import React, { useContext } from 'react'
import style from './Navbar'
import logo from '../../assets/freshcart-logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/userContext'
import { CartContext } from '../../Context/CartContext'


export default function Navbar() {

  let {UserLogin , setUserLogin} = useContext(UserContext)
  let {numberCart} = useContext(CartContext)
  let Navigate = useNavigate()
function signout(){
  localStorage.removeItem('userToken')
  setUserLogin(null)
  Navigate('/login')
}

  return (
    <>


<nav className="bg-slate-50 text-slate-700 border-gray-200 fixed top-0 left-0 right-0" >
    <div className="flex flex-wrap justify-center lg:justify-between  items-center mx-auto max-w-screen-xl p-4">

      <div className='flex gap-3 items-center'>

 


      <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">

      <img src={logo} width={'150px'} className="h-8" alt="Logo" />
      </Link> 
      {UserLogin !== null ? <>
      <ul className=' flex gap-4 '>
          <li><Link   to="">Home</Link></li>
          <li><Link  className='relative' to="cart">Cart
          <div className='absolute top-[-12px] right-[-12px] flex justify-center items-center  size-5 rounded-full text-white bg-emerald-700'>
          {numberCart}
          </div>
          
          </Link></li>
          <li><Link to="products">Products</Link></li>
          <li><Link to="categories">Categories</Link></li>
          <li><Link to="brand">Brands</Link></li>
          <li><Link to="wishlist">WishList</Link></li>
        </ul> 
     </> : null}
      </div>
       
        
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
            
<ul className='flex gap-4'>
  <li>  <i className="fa-brands fa-facebook-f"></i> </li>
  <li>  <i className="fa-brands fa-tiktok"></i> </li>
  <li>  <i className="fa-brands fa-twitter"></i> </li>
  <li>  <i className="fa-brands fa-linkedin"></i> </li>
  <li>  <i className="fa-brands fa-youtube"></i> </li>
</ul>

{UserLogin !==null ? <span onClick={()=>{
  signout()
}} className='cursor-pointer' > SingOut </span>  : 

<>
<Link to="login"> Login</Link>  
  <Link to="register"> Register</Link> 

</>

}

        </div>
    </div>
</nav>


    </>
  )
}
