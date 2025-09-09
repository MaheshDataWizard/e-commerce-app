import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "./CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    Object.entries(cartItems).forEach(([productId, sizes]) => {
      Object.entries(sizes).forEach(([size, qty]) => {
        if (qty > 0) {
          tempData.push({ _id: productId, size, quantity: qty });
        }
      });
    });

    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-6 text-center">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <p className="mb-4">Your cart is empty 🛒</p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="divide-y">
          {cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;

            const itemTotal = productData.price * item.quantity;

            return (
              <div
                key={`${item._id}-${item.size}`}
                className="py-6 grid grid-cols-[4fr_1fr_1fr] sm:grid-cols-[4fr_1.5fr_0.5fr] items-center gap-4 text-gray-700"
              >
                {/* Product Info */}
                <div className="flex items-start gap-4 sm:gap-6">
                  <img
                    src={productData.image[0]}
                    className="w-16 sm:w-20 rounded-md shadow-sm"
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-sm sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-sm">
                      <p className="font-semibold">
                        {currency}{productData.price}
                      </p>
                      <p className="px-2 py-0.5 border bg-slate-50 rounded-md text-xs sm:text-sm">
                        {item.size}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity */}
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const value = Number(e.target.value);
                    if (value >= 1) updateQuantity(item._id, item.size, value);
                  }}
                  className="border w-16 sm:w-20 px-2 py-1 rounded text-center"
                />

                {/* Delete */}
                <div className="flex items-center justify-end">
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    className="w-5 sm:w-6 cursor-pointer hover:opacity-70"
                    alt="Remove"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {cartData.length > 0 && (
        <div className="flex justify-end my-16">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black text-white text-sm px-8 py-3 mt-4 rounded-md font-semibold hover:bg-gray-800 transition"
              >
                Proceed to Checkout →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
