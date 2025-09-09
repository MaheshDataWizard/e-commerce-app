import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row items-center bg-gray-50">
      
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start px-6 sm:px-12 py-10 sm:py-20 text-[#414141]">
        
        <div className="flex items-center gap-2 mb-2">
          <span className="w-10 h-[2px] bg-[#414141]"></span>
          <p className="font-medium text-sm md:text-base uppercase tracking-wide">Our Bestsellers</p>
        </div>

        <h1 className="prata-regular text-3xl sm:text-4xl lg:text-5xl leading-snug mb-6">
          Latest Arrivals
        </h1>

        <button className="bg-black text-white px-6 py-3 text-sm md:text-base font-medium hover:bg-gray-800 transition rounded">
          Shop Now
        </button>
      </div>

      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2">
        <img
          src={assets.hero_img}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      </div>

    </div>
  );
};

export default Hero;
        