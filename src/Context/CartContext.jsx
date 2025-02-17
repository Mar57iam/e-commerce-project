import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";



export let CartContext = createContext();

export default function CartContextProvider (props){
      const[CartId , setCartId] = useState(0);
      const[numberCart , setnumberCart] = useState(0);

    let headers = {     token: localStorage.getItem(`userToken`)
    }

    function addProductToCart(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {productId:productId}
        , {headers 
        }
    )
    .then((res) => res)
    .catch((error) => error)
    }


    function getLoggedUserCart(){
       return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers})
        .then(  (res) => {
            // console.log(res.data.numOfCartItems);
            setnumberCart(res.data.numOfCartItems)
            setCartId(res.data.data._id)
            
            return res
        } )
        .catch( (err)  => err)
    }


    function updateCartProductQuantity ( productId , newCount ){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {count:newCount},{headers})
         .then(  (res) => res )
         .catch( (err)  => err)
     }

     function deletedCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` , {headers})
         .then(  (res) => res )
         .catch( (err)  => err)
     }


     function checkout(cardId , url  , formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardId}?url=${url}` , {shippingAddress:formData} , {headers} )
         .then(  (res) => res )
         .catch( (err)  => err)
     }
 



useEffect (()=>{
    getLoggedUserCart()
} , [])
    return <CartContext.Provider value={ {addProductToCart , getLoggedUserCart , 
    updateCartProductQuantity , deletedCartItem 
    , checkout , CartId , numberCart , setnumberCart }  }>


        {props.children}

    </CartContext.Provider>

}