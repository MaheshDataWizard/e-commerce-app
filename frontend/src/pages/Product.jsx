import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelativeProducts from '../components/RelativeProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  // Fetch product data
  useEffect(() => {
    const item = products.find(p => p._id === productId);
    if (item) {
      setProductData(item);
      setImage(item.image[0]);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0">Loading...</div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500">
      {/* Product Main Section */}
      <div className="flex flex-col sm:flex-row gap-6">
        {/* Thumbnails & Main Image */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex sm:flex-col gap-2 overflow-auto sm:w-1/5">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                onClick={() => setImage(img)}
                src={img}
                alt={`${productData.name} ${idx + 1}`}
                className="w-1/4 sm:w-full cursor-pointer rounded border hover:border-orange-500 transition"
                loading="lazy"
              />
            ))}
          </div>
          <div className="flex-1">
            <img src={image} alt={productData.name} className="w-full h-auto rounded" />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>

          {/* Ratings */}
          <div className="flex items-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star, i) => (
              <img
                key={i}
                src={i < 3 ? assets.star_icon : assets.star_dull_icon}
                alt=""
                className="w-3.5"
              />
            ))}
            <p className="pl-2 text-gray-500">(122)</p>
          </div>

          {/* Price & Description */}
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-600 max-w-2xl">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-6">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setSize(s)}
                  className={`px-5 py-2 border rounded-md transition-colors ${
                    s === size ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            disabled={!size}
            className={`mt-4 w-full sm:w-auto bg-black text-white px-8 py-3 text-sm rounded-md transition ${
              !size ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            ADD TO CART
          </button>

          {/* Extra Info */}
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on delivery available</p>
            <p>Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs: Description / Reviews */}
      <div className="mt-12">
        <div className="flex border-b gap-2">
          {['Description', `Reviews (122)`].map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === tab.toLowerCase() ? 'border-orange-500' : 'border-transparent hover:border-orange-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          {activeTab === 'description' && (
            <>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sapiente laudantium, dignissimos
                doloremque exercitationem dolores facilis reprehenderit corporis?
              </p>
              <p>
                Obcaecati quo aspernatur quia, facilis sed natus dignissimos quos deserunt incidunt dolorem ratione
                omnis deleniti hic quasi.
              </p>
            </>
          )}
          {activeTab === 'reviews (122)' && (
            <p>No reviews yet. Be the first to review this product!</p>
          )}
        </div>
      </div>

      {/* Related Products */}
      <RelativeProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
