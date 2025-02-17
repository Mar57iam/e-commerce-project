import React, { useContext, useEffect, useState } from 'react';
import style from './WishList';
import { WishlistContext } from '../../Context/WishlistContext';
import { CartContext } from '../../Context/CartContext';
import useProducts from '../../Hooks/useProducts';
import toast from 'react-hot-toast';


export default function WishList() {
  const [Detalis, setDetalis] = useState(null);
  const [itemId, setitemId] = useState(0);
  let { getLoggedWishlist , DeletetWishlist } = useContext(WishlistContext);
   
     let {isError , isLoading , data , error} = useProducts()
      let {addProductToCart  , numberCart , setnumberCart} = useContext(CartContext)
      let {AddToWishlist} = useContext(WishlistContext)
   
      const [Loading, setLoading] = useState(false)
      const [currentId, setcurrentId] = useState(0)
      const [IsFavorite, setIsFavorite] = useState(false)
  

  async function getListItems() {
    let response = await getLoggedWishlist();
    console.log(response.data?.data);

    if (response.data.status === 'success') {
      setDetalis(response.data?.data);
    }
  }


  async function deleteListItems(id) {
    let response = await DeletetWishlist(id);
    console.log(response);

    if (response.data.status === 'success') {
      console.log(response.data?.data);
      setDetalis(response.data?.data);

    }
  }


  useEffect(() => {
    getListItems();
  }, []);


  async function addToCart(id){
    setcurrentId(id)
    setLoading(true)
 let response= await  
  addProductToCart(id)



  

if ( response.data.status   == 'success'){
  // console.log(response.data.message);
  setnumberCart(numberCart + 1)
  toast.success(response.data.message)
  setLoading(false)

  
}
else{
  setLoading(false)

  toast.error(response.data.message)

}
}





  if (isError){
    return <h3>{error}</h3>
    }
    if (isLoading) {
      return  <div className="spinner "></div>
    }

  return (
    <>
      <h1 className="text-3xl font-semibold text-emerald-700 text-center mb-4">My Wish List</h1>

     {Detalis?.map((item)=>{
      return(
        <div key={item._id} className="relative overflow-x-auto shadow-md sm:rounded-lg p-4 bg-gray-100 ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <tbody>
            <tr className="bg-white border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center justify-between">
              {/* Product Image */}
              <td className="p-4 w-1/4">
                <img
                  src={item.imageCover}
                  className="w-32 h-auto max-w-full rounded-md"
                  alt="Apple Watch"
                />
              </td>

              {/* Product Details */}
              <td className="px-6 py-4 w-1/2">
                <h2 className="font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                <p className="font-bold text-emerald-700">{item.price}</p>
                <span onClick={()=>{
                      deleteListItems(item.id)
                }} className=" cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline">
                  Remove
                </span>
              </td>

              {/* Add to Cart Button */}
              <td className="px-6 py-4 text-right ">
              <button onClick={ () =>{ addToCart(item.id)   }}  className='btn'>
              
              {Loading&&currentId==item.id ? <i className='fas fa-spinner fa-spin'></i> : 'Add To Cart'}
              </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      )
     }) }
    </>
  );
}
