import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between py-2 px-[4%] shadow-md bg-white">
      {/* Logo */}
      <img 
        className="w-[80px] sm:w-[100px]" 
        src={assets.logo} 
        alt="App Logo" 
      />

      {/* Logout button */}
      <button
        onClick={logout}
        className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
