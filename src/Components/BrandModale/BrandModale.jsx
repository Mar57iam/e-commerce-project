import React, { useEffect } from 'react'
import style from './BrandModale'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

export default function BrandModale() {

  const [brand, setbrand] = useState(null)


  let  {id} = useParams()
  console.log(id);
  function getBrand(id){

    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{console.log(res.data.data);
      setbrand(res.data.data)
    })
    .catch((res)=>{
      console.log(res);
      
    })
  }

  useEffect(()=>{
    getBrand(id)
    
  },[])
  
  return (
    <>
    <div className="row">

      
       <div>
        
         <div id="default-modal" tabIndex={-1} aria-hidden="false" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
           <div className="relative p-4 w-full max-w-2xl max-h-full ">

             <div className="relative bg-white flex  justify-between items-center rounded-lg shadow-sm dark:bg-gray-700">
             
              <div className='w-1/5  p-10' >
             <h2 className='text-emerald-700 text-2xl pb-4 font-bold '>{brand?.name}</h2>
             <h2 className='font-semibold'>{brand?.slug}</h2>
              </div>
              <div className='w-1/5 me-24 ' >
              <img src={brand?.image} alt="" />
              </div>
             </div>
           </div>
         </div>
       </div>
     </div>
    </>
  )
}
