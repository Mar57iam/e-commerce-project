import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {
  const [CartDetails, setCartDetails] = useState(null);
  let { getLoggedUserCart, updateCartProductQuantity, deletedCartItem, numberCart, setnumberCart } = useContext(CartContext);

  async function getCartItems() {
    let response = await getLoggedUserCart();
    console.log(response.data.data);
    if (response.data.status === 'success') {
      setCartDetails(response.data.data);
    }
  }

  async function updateProduct(id, count) {
    let response = await updateCartProductQuantity(id, count);
    console.log(response.data);
    if (response.data.status === 'success') {
      setCartDetails(response.data.data);
      toast.success('Product updated successfully');
    } else {
      toast.error('Error updating product');
    }
  }

  async function deleteItem(productId) {
    let response = await deletedCartItem(productId);
    console.log(response);
    if (response.data.status === 'success') {
      setnumberCart(numberCart - 1);
      setCartDetails(response.data.data);
      toast.success('Product removed successfully');
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {!CartDetails ? (
        <div className="spinner"></div>
      ) : CartDetails?.products.length > 0 ? (
        <>
          <h2 className="text-center text-2xl capitalize font-bold text-emerald-700 pb-8">
            Total Price: {CartDetails?.totalCartPrice}
          </h2>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">Product</th>
                  <th scope="col" className="px-6 py-3">Qty</th>
                  <th scope="col" className="px-6 py-3">Price</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {CartDetails?.products.map((product) => (
                  <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                    <td className="p-4">
                      <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.product.title}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateProduct(product.product.id, product.count - 1)}
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                          type="button"
                        >
                          <span className="sr-only">Decrease quantity</span>
                          <svg className="w-3 h-3" viewBox="0 0 18 2" fill="none">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <span>{product.count}</span>
                        <button
                          onClick={() => updateProduct(product.product.id, product.count + 1)}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                          type="button"
                        >
                          <span className="sr-only">Increase quantity</span>
                          <svg className="w-3 h-3" viewBox="0 0 18 18" fill="none">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        onClick={() => deleteItem(product.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link to="/checkout">
              <button className="btn my-4">Checkout</button>
            </Link>
          </div>
        </>
      ) : (
        <h2 className="text-center text-2xl text-red-700 font-bold my-10">No Products Added</h2>
      )}
    </>
  );
}
