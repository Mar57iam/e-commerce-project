import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  const [Product, setProduct] = useState(null);
  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [currentId, setcurrentId] = useState(null);

  let { addProductToCart, numberCart, setnumberCart } = useContext(CartContext);
  let { id, category } = useParams();

  function getProduct(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        let related = res.data.data.filter((p) => p.category.name === category);
        setRelatedProducts(related);
      })
      .catch((err) => console.log(err));
  }

  async function addToCart(id) {
    setcurrentId(id);
    setLoading(true);
    let response = await addProductToCart(id);

    if (response?.data?.status === 'success') {
      setnumberCart((prev) => prev + 1);
      toast.success(response.data.message);
    } else {
      toast.error(response?.data?.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getProduct(id);
    getAllProducts();
  }, [id, category]);

  return (
    <>
      <div className="row items-center justify-center">
        <div className=" w-1/2  md:w-1/4 p-4 -z-40">
          <Slider dots={false} infinite speed={500} slidesToShow={1} slidesToScroll={1} autoplay autoplaySpeed={2000}>
            {Product?.images.map((src, index) => (
              <img key={index} src={src} className="w-full" alt="product" />
            ))}
          </Slider>
        </div>
        <div className="  w-1/2  md:w-3/4">
          <h3>{Product?.title}</h3>
          <h4 className="text-slate-600">{Product?.description}</h4>
          <h4>{Product?.category.name}</h4>
          <div className="flex justify-between p-3">
            <span>{Product?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-300"></i> {Product?.ratingsAverage}
            </span>
          </div>
          <button className="btn" onClick={() => addToCart(Product?.id)}>
            {Loading && currentId === Product?.id ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'}
          </button>
        </div>
      </div>

      <div className="row  ">
        {RelatedProducts.length > 0 ? (
          RelatedProducts.map((product) => (
            <div key={product.id} className=" w-1/2 md:w-1/4 lg:w-1/6    ">
              <div className="product my-2 p-1 ">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
                  <img src={product.imageCover} className="w-full" alt={product.name} />
                  <h3 className="text-emerald-500">{product.category.name}</h3>
                  <h3 className="font-semibold mb-1">{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                  <div className="flex justify-between p-3">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-300"></i> {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button onClick={() => addToCart(product.id)} className="btn">
                  {Loading && currentId === product.id ? <i className="fas fa-spinner fa-spin"></i> : 'Add To Cart'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner"></div>
        )}
      </div>
    </>
  );
}
