import axios from "axios";
import { createContext } from "react";



export let WishlistContext  = createContext();

export default function WishlistContextProvider (props){
    let headers = {     token: localStorage.getItem(`userToken`)
    }

function AddToWishlist(productId) {
 return  axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist` , {productId:productId},{headers})
   .then((res)=>res) 
   .catch((err)=>err) 
}

function getLoggedWishlist() {
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist` ,{headers})
      .then((res)=>res) 
      .catch((err)=>err) 
   }

   function DeletetWishlist(id) {
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}` ,{headers})
      .then((res)=>res) 
      .catch((err)=>err) 
   }




    return <WishlistContext.Provider value={{AddToWishlist ,getLoggedWishlist , DeletetWishlist}}>
        {props.children}
    </WishlistContext.Provider>
}