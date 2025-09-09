import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subtotal = getCartAmount();
  const shipping = subtotal > 0 ? delivery_fee : 0;
  const total = subtotal + shipping;

  return (
    <aside className="w-full p-4 sm:p-6 border rounded-md bg-white shadow-sm">
      <div className="text-2xl mb-4">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="flex flex-col gap-3 text-sm sm:text-base">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>
            {currency}
            {shipping.toFixed(2)}
          </span>
        </div>

        <div className="border-t border-gray-200"></div>

        {/* Total */}
        <div className="flex justify-between mt-2 text-base sm:text-lg font-semibold">
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </aside>
  );
};

export default CartTotal;
