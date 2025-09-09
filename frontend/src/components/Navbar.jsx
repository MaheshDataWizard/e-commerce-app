import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [mobileVisible, setMobileVisible] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
    toast.success('Logged out successfully');
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium relative">
      {/* Logo */}
      <Link to="/"><img src={assets.logo} className="w-36" alt="logo" /></Link>

      {/* Desktop Links */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {['/', '/collection', '/about', '/contact'].map((path, index) => {
          const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
          return (
            <NavLink
              key={index}
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${isActive ? 'text-black font-semibold' : ''}`
              }
            >
              <p>{labels[index]}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          );
        })}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6 max-sm:gap-3">
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className="w-5 cursor-pointer" alt="search" />

        {/* Profile */}
        <div className="relative">
          <img
            onClick={() => token ? setProfileOpen(prev => !prev) : navigate('/login')}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt="profile"
          />

          {token && profileOpen && (
            <div className="absolute right-0 mt-2 w-36 py-3 px-5 bg-white border rounded shadow flex flex-col gap-2 text-gray-600">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p onClick={() => navigate('/orders')} className="cursor-pointer hover:text-black">Orders</p>
              <p onClick={logout} className="cursor-pointer hover:text-black">Logout</p>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="cart" />
          {getCartCount() > 0 && (
            <p className="absolute -right-1 -bottom-1 w-4 h-4 text-[8px] flex items-center justify-center bg-black text-white rounded-full">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Mobile Menu Toggle */}
        <img onClick={() => setMobileVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden" alt="menu" />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          mobileVisible ? 'translate-x-0' : 'translate-x-full'
        } w-3/4 max-w-xs z-50`}
      >
        <div className="flex flex-col text-gray-600 h-full">
          <div onClick={() => setMobileVisible(false)} className="flex items-center gap-4 p-3 cursor-pointer">
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="back" />
            <p>Back</p>
          </div>

          {['/', '/collection', '/about', '/contact'].map((path, index) => {
            const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
            return (
              <NavLink
                key={index}
                to={path}
                onClick={() => setMobileVisible(false)}
                className="py-3 pl-6 border-b hover:bg-gray-100"
              >
                {labels[index]}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
