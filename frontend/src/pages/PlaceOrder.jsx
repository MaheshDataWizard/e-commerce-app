import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "./CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (responseStripe.data.success) {
            window.location.replace(responseStripe.data.session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;
        case "razorpay":
          toast.info("Razorpay payment integration not yet implemented.");
          break;
        default:
          break;
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-between gap-10 pt-8 sm:pt-14 px-4 sm:px-8 min-h-[80vh] border-t"
    >
      {/* Left Side: Delivery Info */}
      <div className="flex-1 flex flex-col gap-6">
        <Title text1="DELIVERY" text2="INFORMATION" className="mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            name="firstName"
            value={formData.firstName}
            onChange={onChangeHandler}
            type="text"
            placeholder="First Name*"
            className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            required
            name="lastName"
            value={formData.lastName}
            onChange={onChangeHandler}
            type="text"
            placeholder="Last Name*"
            className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>
        <input
          required
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
          type="email"
          placeholder="Email Address*"
          className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <input
          required
          name="street"
          value={formData.street}
          onChange={onChangeHandler}
          type="text"
          placeholder="Street Address*"
          className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            type="text"
            placeholder="City*"
            className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            required
            name="state"
            value={formData.state}
            onChange={onChangeHandler}
            type="text"
            placeholder="State*"
            className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            required
            name="zipcode"
            value={formData.zipcode}
            onChange={onChangeHandler}
            type="text"
            placeholder="Zip Code*"
            className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
          <input
            required
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
            type="text"
            placeholder="Country*"
            className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
          type="tel"
          placeholder="Phone*"
          className="border border-gray-300 rounded-md px-3 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        />
      </div>

      {/* Right Side: Cart Total + Payment */}
      <div className="flex-1 flex flex-col gap-8 sm:max-w-[480px]">
        <CartTotal />

        <div className="flex flex-col gap-4">
          <Title text1="PAYMENT" text2="METHOD" className="mb-2" />

          <div className="flex flex-col lg:flex-row gap-3">
            {[
              { id: "stripe", label: "Stripe", logo: assets.stripe_logo },
              { id: "razorpay", label: "Razorpay", logo: assets.razorpay_logo },
              { id: "cod", label: "Cash on Delivery", logo: null },
            ].map((methodItem) => (
              <div
                key={methodItem.id}
                onClick={() => setMethod(methodItem.id)}
                className={`flex items-center gap-3 border p-3 cursor-pointer rounded-md transition ${
                  method === methodItem.id
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300"
                }`}
              >
                <p
                  className={`w-4 h-4 border rounded-full ${
                    method === methodItem.id ? "bg-green-500" : ""
                  }`}
                ></p>
                {methodItem.logo && (
                  <img
                    src={methodItem.logo}
                    alt={methodItem.label}
                    className="h-6"
                  />
                )}
                <span className="text-gray-700 font-medium">
                  {methodItem.label}
                </span>
              </div>
            ))}
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              className="bg-black text-white px-16 py-3 text-sm rounded-md hover:bg-gray-800 transition"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
