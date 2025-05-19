import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Checkout from './Components/Checkout/Checkout'
import Brands from './Components/Brands/Brands'
import BrandModale from './Components/BrandModale/BrandModale'
import Categories from './Components/Categories/Categories'
import Register from './Components/Register/Register'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Login from './Components/Login/Login'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import Notfound from './Components/Notfound/Notfound'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/userContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import  { Toaster } from 'react-hot-toast';
import Allorders from './Components/Allorders/Allorders'
import SpecificCategory from './Components/SpecificCategory/SpecificCategory'
import WishList from './Components/WishList/WishList'
import WishlistContextProvider from './Context/WishlistContext'
let query = new QueryClient()

let x = createHashRouter([
  { path: '', element: <Layout />, children: [ 
    { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
    { path: 'brand', element: <ProtectedRoute><Brands /></ProtectedRoute> },
    { path: 'brandmodale/:id', element: <ProtectedRoute><BrandModale /></ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><Allorders /></ProtectedRoute> },
    { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
    { path: 'specificcategory/:id', element: <ProtectedRoute><SpecificCategory /></ProtectedRoute> },
    { path: 'checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
    { path: 'productdetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { path: '*', element: <Notfound /> },
  ]}
]);
function App() {
  const [count, setCount] = useState(0)


  return (
    <UserContextProvider>
    <CounterContextProvider>
      <QueryClientProvider client={query}>
        <CartContextProvider>
          <WishlistContextProvider>
          
<RouterProvider router={x}></RouterProvider>
<Toaster/>
</WishlistContextProvider>
</CartContextProvider>
<ReactQueryDevtools/>

</QueryClientProvider>
    </CounterContextProvider>
    </UserContextProvider>
   
  )
}

export default App
