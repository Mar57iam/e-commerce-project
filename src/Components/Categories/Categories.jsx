import React, { useEffect, useState } from 'react'
import style from './Categories'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';



export default function Categories() {


    function geCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
       }
     
       let { data , isError , error , isLoading} =  useQuery ({
       queryKey:['allCategories'],
       queryFn: geCategories,
       staleTime: 2000 ,
       gcTime: 2000,
     select: (data) => data?.data?.data
     })
// console.log(data);

   if(isError){
     return <h3>{error}</h3>
   }
  if(isLoading){
    return <div className="spinner "></div>
  }

  function getAllCategories(){
  console.log(data);
  
  
}
  
  
  return (
    <>
         <div className=" row gap-8 p-4 justify-center">
      {data.map((category) => (
        <Link to={`/specificcategory/${category._id}`} key={category._id}>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:shadow-emerald-200 transition-shadow w-80 ">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-center text-green-700 font-bold text-lg p-4"> {category.name}    </h2>
          </div>
        </Link>
      ))}
    </div>
 

    </>
  )
}
