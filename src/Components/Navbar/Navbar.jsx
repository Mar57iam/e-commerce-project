import React, { useContext, useState } from "react";
import logo from "../../assets/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  const { UserLogin, setUserLogin } = useContext(UserContext);
  const { numberCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
    setIsMenuOpen(false); 
  }

  return (
    <nav className="bg-slate-50 text-slate-700 border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        
        {/* 🔹 القسم الأول: اللوجو واللينكات */}
        <div className="flex items-center">
          <Link to="">
            <img src={logo} width="150px" className="h-8" alt="Logo" />
          </Link>

          {/* 🔹 قائمة الروابط */}
          <ul className="hidden md:flex gap-4 text-lg ml-8">
            {UserLogin && (
              <>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link className="relative" to="cart">
                    Cart
                    <div className="absolute top-[-12px] right-[-12px] flex justify-center items-center size-5 rounded-full text-white bg-emerald-700">
                      {numberCart}
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="categories">Categories</Link>
                </li>
                <li>
                  <Link to="brand">Brands</Link>
                </li>
                <li>
                  <Link to="wishlist">WishList</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* 🔹 القسم الثاني: الأيقونات الاجتماعية + تسجيل الدخول/الخروج */}
        <div className="hidden md:flex items-center space-x-6">
          {/* 🔹 أيقونات السوشيال ميديا */}
          <ul className="flex gap-4 text-lg">
            <li>
              <i className="fa-brands fa-facebook-f text-black"></i>
            </li>
            <li>
              <i className="fa-brands fa-tiktok text-black"></i>
            </li>
            <li>
              <i className="fa-brands fa-twitter text-black"></i>
            </li>
            <li>
              <i className="fa-brands fa-linkedin text-black"></i>
            </li>
            <li>
              <i className="fa-brands fa-youtube text-black"></i>
            </li>
          </ul>

          {/* 🔹 تسجيل الدخول/الخروج */}
          {UserLogin ? (
            <span onClick={signout} className="cursor-pointer font-bold text-red-600">
              Sign Out
            </span>
          ) : (
            <>
              <Link to="login">Login</Link>
              <Link to="register">Register</Link>
            </>
          )}
        </div>

       
        <div className="flex md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

      
        <div
          className={`absolute top-16 right-4 bg-white shadow-lg rounded-lg w-48 transition-transform duration-300 ${
            isMenuOpen ? "block" : "hidden"
          } md:hidden`}
        >
          <ul className="flex flex-col gap-4 text-lg p-4">
            {UserLogin && (
              <>
                <li>
                  <Link to="">Home</Link>
                </li>
                <li>
                  <Link to="cart">Cart</Link>
                </li>
                <li>
                  <Link to="products">Products</Link>
                </li>
                <li>
                  <Link to="categories">Categories</Link>
                </li>
                <li>
                  <Link to="brand">Brands</Link>
                </li>
                <li>
                  <Link to="wishlist">WishList</Link>
                </li>
              </>
            )}

          
            <li className="flex gap-3 justify-center pt-2">
              <i className="fa-brands fa-facebook-f text-blue-600"></i>
              <i className="fa-brands fa-tiktok text-black"></i>
              <i className="fa-brands fa-twitter text-blue-400"></i>
              <i className="fa-brands fa-linkedin text-blue-700"></i>
              <i className="fa-brands fa-youtube text-red-600"></i>
            </li>

            {UserLogin ? (
              <li>
                <span onClick={signout} className="cursor-pointer font-bold text-red-600">
                  Sign Out
                </span>
              </li>
            ) : (
              <>
                <li>
                  <Link to="login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
