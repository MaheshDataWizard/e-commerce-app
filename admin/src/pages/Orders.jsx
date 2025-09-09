import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        {
          orderId,
          status: event.target.value,
        },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-4 sm:p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Orders</h3>

      <div className="space-y-5">
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 items-start border rounded-xl shadow-sm bg-white p-4 sm:p-6"
          >
            {/* Icon */}
            <img className="w-12 h-12 object-contain" src={assets.parcel_icon} alt="Parcel" />

            {/* Items & Address */}
            <div className="space-y-2">
              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-gray-700">
                    {item.name} × {item.quantity} <span className="text-gray-500">({item.size})</span>
                  </p>
                ))}
              </div>
              <p className="font-medium text-gray-800">
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className="text-gray-600 text-sm space-y-0.5">
                <p>{order.address.street}</p>
                <p>{order.address.city}, {order.address.state}</p>
                <p>{order.address.country} - {order.address.zipcode}</p>
                <p>📞 {order.address.phone}</p>
              </div>
            </div>

            {/* Payment & Date */}
            <div className="text-sm text-gray-700 space-y-1">
              <p>Items: <span className="font-medium">{order.items.length}</span></p>
              <p>Method: {order.paymentMethod}</p>
              <p>Payment: <span className={order.payment ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>{order.payment ? "Done" : "Pending"}</span></p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Amount */}
            <p className="text-base font-semibold text-gray-800">
              {currency}{order.amount}
            </p>

            {/* Status Dropdown */}
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="p-2 border rounded-lg text-sm font-medium bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
