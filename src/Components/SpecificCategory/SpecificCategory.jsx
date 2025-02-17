import React, { useState } from 'react'
import style from './SpecificCategory'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect } from 'react'



export default function SpecificCategory() {
    const [Category, setCategory] = useState(null)
  
  let {id} = useParams()
    console.log(id);

  function geCategory(id){
     axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)

     .then((res)=>{
      console.log(res.data.data);
      setCategory(res.data.data)
      
     })
     .catch((res)=>{
      console.log(res);
      
     })
   }
  
function getAllCategories() {
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
.then((res)=>{console.log(res.data.data)
})
.catch((res)=>{console.log(res)
})
}


useEffect(()=>{
  geCategory(id)
  getAllCategories()
},[]) 



return (
  <>

<div href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
<h3 className='my-5 text-center capitalize font-bold text-emerald-700 text-2xl'>{Category?.name} subcategories </h3>

</div>




  </>
);

}







