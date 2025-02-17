import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider'
import axios from 'axios'
import Slider from "react-slick";



export default function CategoriesSlider() {

  const [Categories, setCategories] = useState([])


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true, 
    autoplaySpeed:1000

  };


function getCategories(){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  .then(  (res)=>{
    console.log(res.data.data);
    setCategories(res.data.data)
  })
  .catch((res) => {
    console.log(res);
    
  })
}

useEffect( () =>{

  getCategories()
} , []  )


  return (
    <>
<h2 className=' my-5 capitalize font-semibold text-slate-700'>shop popular categories</h2>
<Slider {...settings}  className='-z-30'>

{Categories.map((category)=>{

return(

  <div key={category._id}>
    <img src={category.image} className='w-full h-[200px] object-cover ' alt="" />
    <h4>{category.name}</h4>
  </div> )
})}
</Slider>
    
    </>
  )
}
