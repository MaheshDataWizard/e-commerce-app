import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 10)); // show up to 10 bestsellers
  }, [products]);

  return (
    <div className='my-10'>
      {/* Section Title */}
      <div className="text-center text-3xl py-8">
        <Title text1={"BEST"} text2={'SELLERS'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 mt-2">
          Our top-selling products picked by our customers!
        </p>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {bestSeller.length === 0 ? (
            <p className="text-gray-500">No best sellers available</p>
          ) : (
            bestSeller.map((item) => (
              <div key={item._id} className="flex-shrink-0 w-48 sm:w-56 md:w-60 lg:w-64">
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BestSeller;
    