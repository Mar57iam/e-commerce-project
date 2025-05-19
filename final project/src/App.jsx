import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Categories from './components/Categories/Categories'
import Brands from './components/Brands/Brands'
import NotFound from './components/NotFound/NotFound'


let x = createBrowserRouter([
  {path:'' , element: <Layout/>,children:[
    {path:'' ,element:< Home/>},
    {path:'products' ,element:<Products/>},
    {path:'cart' ,element:<Cart/>},
    {path:'login' ,element:<Login/>},
    {path:'register' ,element:<Register/>},
    {path:'categories' ,element:<Categories/>},
    {path:'brands' ,element:<Brands/>},
    {path:'*' ,element:<NotFound/>},


  ]}
])
function App() {
  

  return <RouterProvider router={x} /> 

}

export default App
