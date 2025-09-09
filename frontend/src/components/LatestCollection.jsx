import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    // Sort by newest first (assuming products have createdAt field)
    const sortedProducts = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setLatestProducts(sortedProducts.slice(0, 10));
  }, [products]);

  return (
    <div className="my-16">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="mx-auto max-w-xl text-xs sm:text-sm md:text-base text-gray-600">
          Explore our newest arrivals – fresh styles and latest trends in fashion.
        </p>
      </div>

      {/* Rendering Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {latestProducts.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
