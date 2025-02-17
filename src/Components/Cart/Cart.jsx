import React, { useContext, useEffect, useState } from 'react'
import style from './Cart'
import { CartContext } from '../../Context/CartContext'
import { UserContext } from '../../Context/userContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'




export default function Cart() {

  const [CartDetalis, setCartDetalis] = useState(null)

  let {getLoggedUserCart , updateCartProductQuantity , deletedCartItem , numberCart , setnumberCart} = useContext(CartContext)

 async function getCartItems(){

let response=   await getLoggedUserCart()
    console.log(response.data.data);
    if ( response.data.status == 'success'){
      setCartDetalis(response.data.data)
    }
  }


  async function updateProduct(id , count){

    let response=   await updateCartProductQuantity(id , count)
    console.log(response.data);
    if(response.data.status == 'success'){
      setCartDetalis(response.data.data);
      toast.success('product updated successfully')
          
    }else{
      toast.error('error')
    }
      }

      async function deleteItem(productId){

        let response=   await deletedCartItem(productId)
        console.log(response);
        if(response.data.status == 'success' ){
      // console.log(response.data.data);
      setnumberCart(numberCart -1)

      setCartDetalis(response.data.data);

      

        }
        
          }

  useEffect(()=>{
    getCartItems()

  },[])
  return (
    <>
      
{CartDetalis?.products.length > 0 ?
<>
<h2 className='text-center text-2xl capitalize font-bold text-emerald-700 pb-8'> total price: {CartDetalis?.totalCartPrice  }</h2>

<div className="relative  overflow-x-auto shadow-md sm:rounded-lg ">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {CartDetalis?.products
      .map((product) => <tr  key={product._id}  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
<td className="p-4">
  <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
  {product.product.title}
</td>
<td className="px-6 py-4">
  <div className="flex items-center">
    <button onClick={function(){
      updateProduct( product.product.id , product.count - 1  )

    }} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
      <span className="sr-only">Quantity button</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
      </svg>
    </button>
    <div>
     <span>{product.count}</span>
    </div>
      <button onClick={() => {
      updateProduct( product.product.id , product.count + 1  )

      }} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
      <span className="sr-only">Quantity button</span>
      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
      </svg>
    </button>
  </div>
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
{product.price}
</td>
<td className="px-6 py-4">
  <span onClick={ ()=> {deleteItem(product.product.id )} } className=' cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline'>Remove</span>
</td>
</tr>
      )}
      
     
    </tbody>
      </table>
<Link to='/checkout'>


<button className='btn  my-4'>Checkout</button>
</Link>
</div> 

</>  : <h2 className='text-center fa-2xl text-red-700 font-bold my-10   '>No Products Added</h2>


}
  


    </>
  )
}
