import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../../Hooks/useProducts';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishlistContext } from '../../Context/WishlistContext';

export default function Products() {
  let { isError, isLoading, data, error } = useProducts();
  let { addProductToCart, numberCart, setnumberCart } = useContext(CartContext);
  let { AddToWishlist } = useContext(WishlistContext);

  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [wishlistItems, setWishlistItems] = useState([]);

  async function wishList(id) {
    const isInWishlist = wishlistItems.includes(id);

    if (isInWishlist) {
      let response = await AddToWishlist(id);
      if (response.data.status == 'success') {
        setWishlistItems(wishlistItems.filter((item) => item !== id));
        toast.success('Removed from Wishlist');
      } else {
        toast.error(response.data.message);
      }
    } else {
      let response = await AddToWishlist(id);
      if (response.data.status == 'success') {
        setWishlistItems([...wishlistItems, id]);
        toast.success('Added to Wishlist');
      } else {
        toast.error(response.data.message);
      }
    }
  }

  async function addToCart(id) {
    setcurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);

    if (response?.data?.status == 'success') {
      setnumberCart(numberCart + 1);
      toast.success(response.data.message);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error(response?.data?.message);
    }
  }

  if (isError) {
    return <h3>{error}</h3>;
  }
  if (isLoading) {
    return <div className="spinner "></div>;
  }

  return (
    <div className="row">
      {data?.map((product) => {
        return (
          <div key={product.id} className="w-full md:w-1/3 lg:w-1/6 ">
            <div className="product my-2 p-1">
              <Link to={`productdetails/${product.id}/${product.category.name}`}>
                <img src={product.imageCover} className="w-full" alt={product.name} />
                <h3 className="text-emerald-500">{product.category.name}</h3>
                <h3 className="font-semibold mb-1">
                  {product.title.split(' ').slice(0, 2).join(' ')}
                </h3>

                <div className="flex justify-between p-3 ">
                  <span>{product.price} EGP</span>
                  <span>
                    <i className="fas fa-star text-yellow-300"></i> {product.ratingsAverage}
                  </span>
                </div>
              </Link>

              <div className="flex justify-end p-3">
                <button onClick={() => wishList(product.id)}>
                  {wishlistItems.includes(product.id) ? (
                    <i className="fa-solid fa-heart text-red-600 fa-xl"></i>
                  ) : (
                    <i className="fa-regular fa-heart fa-xl"></i>
                  )}
                </button>
              </div>

              <button
                onClick={() => {
                  addToCart(product.id);
                }}
                className="btn"
              >
                {Loading && currentId == product.id ? (
                  <i className="fas fa-spinner fa-spin"></i>
                ) : (
                  'Add To Cart'
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

