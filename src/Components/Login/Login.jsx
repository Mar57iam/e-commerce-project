import React, { useContext, useState } from 'react'
import style from './Login'
import * as yup from 'yup'
import {useFormik} from 'formik'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'  
import { UserContext } from '../../Context/userContext'

export default function Login() {

  let {UserLogin, setUserLogin} =useContext(UserContext)
let navigate = useNavigate()

const [ApiError, setApiError] = useState('') 
const [isLoading, setisLoading] = useState(false) 
 async function handleLogin(obj){
  setisLoading(true)
    

  let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , obj)

.then((res)=>{console.log(res)

  setisLoading(false)
if (res.data.message == 'success'){
localStorage.setItem('userToken' , res.data.token)

setUserLogin( res.data.token)
navigate('/')

}

})
.catch((res)=> {console.log(res.response.data.message)

  setApiError(res.response.data.message)
  setisLoading(false)

}) 
  }


  let validationSchema = yup.object().shape({

  email:yup
  .string()
  .email('not valid email')
  .required('email is requierd'),

  password: yup
  .string()
  .min(6, 'min length is 6')
  .required('password is requierd'), 

  })

  let formik = useFormik({
    initialValues : {
     
      email:"",
      password:"",
    },

    validationSchema,
    onSubmit : handleLogin 
  })


  return (
    <>
    

 
    <h2 className='text-emerald-600 text-center text-2xl my-8 font-bold'> Login Now</h2>
     <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  

  <div className="relative z-0 w-full mb-5 group">
      <input type="email" 
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="email"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
         placeholder=" " required />
      <label htmlFor="email"
       className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Enter Your Email</label>

        {formik.errors.email && formik.touched.email ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{ formik.errors.email}</span> 
</div> : null}
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input type="password" 
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
       id="password"
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
         placeholder=" " required />
      <label htmlFor="password"
       className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
        Enter Your Password</label>

        {formik.errors.password && formik.touched.password ?  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">{ formik.errors.password}</span> 
</div> : null}
  </div>

  

  

  {ApiError ?  <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-700  w-1/2 mx-auto " role="alert">
    <span className="font-medium">{ ApiError}</span> </div>
: null}

  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
    {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Login'}</button>
    <Link to="/register"><span className='text-gray-500   font-semibold aria-hidden:  ms-4'>Don't Have an Account ? </span> <span className=' text-gray-500   hover:underline font-semibold'>Register Now</span> </Link>
  </form>
    </>
  )
}
