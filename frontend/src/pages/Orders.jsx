import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const { backendUrl, token, currency } = useContext(ShopContext);

  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const allOrdersItem = response.data.orders.flatMap((order) =>
          order.items.map((item) => ({
            ...item,
            status: order.status,
            payment: order.payment,
            paymentMethod: order.paymentMethod,
            date: order.date,
            orderId: order._id,
          }))
        );

        setOrderData(allOrdersItem.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load orders. Please try again.");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-500";
      case "Out for delivery":
      case "Shipped":
        return "bg-yellow-500";
      case "Packing":
        return "bg-blue-500";
      case "Order Placed":
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="border-t pt-8 sm:pt-16 px-4 sm:px-8">
      {/* Title */}
      <div className="text-2xl mb-6 text-center">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {orderData.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          You have no orders yet 📦
        </p>
      ) : (
        <div className="space-y-6">
          {orderData.map((item) => (
            <div
              key={`${item.orderId}-${item._id}-${item.size}`}
              className="p-4 md:p-6 border rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition"
            >
              {/* Product Details */}
              <div className="flex items-start gap-4 text-sm sm:text-base w-full md:w-2/3">
                <img
                  src={item.image[0]}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md border"
                  alt={item.name}
                />
                <div>
                  <p className="text-sm sm:text-base font-semibold">{item.name}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2 text-sm sm:text-base text-gray-700">
                    <p>
                      {currency}
                      {item.price}
                    </p>
                    <p>Qty: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Date:{" "}
                    <span className="text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Payment:{" "}
                    <span className="text-gray-500">{item.paymentMethod}</span>{" "}
                    {item.payment ? (
                      <span className="ml-2 text-green-600 font-medium">
                        ✓ Paid
                      </span>
                    ) : (
                      <span className="ml-2 text-red-500 font-medium">
                        ✕ Pending
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}
                  ></span>
                  <p className="text-sm sm:text-base font-medium">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="border border-gray-300 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100 transition"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
