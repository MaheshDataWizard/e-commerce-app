import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm text-gray-600">

        {/* Logo & About */}
        <div>
          <img src={assets.logo} className="mb-4 w-32" alt="Brand Logo" />
          <p className="text-gray-600">
            ForeverStyle is your go-to fashion destination for trending men’s, women’s, and kids’ apparel. Stylish, comfortable, and curated just for you.
          </p>
       
        </div>

        {/* Quick Links */}
        <div>
          <p className="font-medium mb-5 text-gray-800">QUICK LINKS</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">Shop</li>
            <li className="hover:text-black cursor-pointer">New Arrivals</li>
            <li className="hover:text-black cursor-pointer">Best Sellers</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <p className="font-medium mb-5 text-gray-800">CUSTOMER SUPPORT</p>
          <ul className="flex flex-col gap-2">
            <li>📞 +91-738-1715-700</li>
            <li>✉ support@foreverstyle.com</li>
            <li>🛒 Order Tracking</li>
            <li>🔄 Returns & Exchange</li>
            <li>❓ FAQ</li>
          </ul>
        </div>

      </div>

      <div className="border-t py-5 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} ForeverStyle. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
