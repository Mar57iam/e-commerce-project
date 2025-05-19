import React, { useState } from 'react'
import style from './Register.module.css'
import * as yup from 'yup' 
import axios from 'axios'
import {useFormik} from 'formik'
import { useNavigate } from 'react-router-dom'




export default function Register() {

let navigate  = useNavigate()

const [ApiError, setApiError] = useState('')
 async function handelRegister(obj){
  console.log(obj);

   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup ` , obj )
  .then((res)=>{console.log(res)})
  .catch((res)=>{
    
    setApiError(res.response.data.message)
    })
   

  
  
}











let validationSchema = yup.object().shape({
  name: yup
   .string() .min(3 , 'min length is 3')
  .max(10, 'max length is 10')
  .required( 'name is requierd'),
  email: yup 
  .string()
  .email("not vaild email")
  .required('email is required'),

password: yup 
.string()
.min(6,'min length is 6')
.required('password is requierd'),
rePassword: yup
.string()
.oneOf([yup.ref('password')] , 'password is not match'),
phone: yup
  .string()
  .matches(/^01[0125][0-9]{8}$/, 'phone not valid')
  .required('phone is required'),


})

let formik = useFormik({
  initialValues: {
    name:'',
    email: '',
    password:'',
    rePassword:'',
    phone:''
  },

  validationSchema,
  onSubmit:handelRegister
})

  
  return (
    <>






     <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input
       type="text"
        name="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         id="name" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="name" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
 
        {formik.errors.name && formik.touched.name ?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50   " role="alert">
  <span className="font-medium"> {formik.errors.name}!</span> 
         </div> : null}
 
  </div>

  <div className="relative z-0 w-full mb-5 group">
      <input
       type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         id="email" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email ?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50   " role="alert">
  <span className="font-medium"> {formik.errors.email}</span> 
         </div> : null}
 
  </div>


  <div className="relative z-0 w-full mb-5 group">
      <input
       type="password"
        name="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         id="password" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
 
      {formik.errors.password && formik.touched.password ?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50   " role="alert">
  <span className="font-medium"> {formik.errors.password}</span> 
         </div> : null}
 
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input
       type="password"
        name="rePassword"
        value={formik.values.rePassword}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         id="rePassword" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="rePassword" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
      Enter Your rePassword</label>

      {formik.errors.rePassword && formik.touched.rePassword ?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50   " role="alert">
  <span className="font-medium"> {formik.errors.rePassword}</span> 
         </div> : null}
  </div>



  <div className="relative z-0 w-full mb-5 group">
      <input
       type="tel"
        name="phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
         id="phone" 
         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none    focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="phone" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
      Enter Your phone</label>

      {formik.errors.phone && formik.touched.phone ?      <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50   " role="alert">
  <span className="font-medium"> {formik.errors.phone} </span> 
         </div> : null}
  </div>
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600">Submit</button>
 </form>

 <div className=' w-1/2 mx-auto bg-red-600 text-white font-bold rounded-lg p-3'>


</div>
    </>
  )
}
