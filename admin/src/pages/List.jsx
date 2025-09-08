import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id) => {
  
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <p className="mb-4 text-lg font-semibold text-gray-700">All Products</p>

      {loading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : list.length === 0 ? (
        <p className="text-gray-500">No products available.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 text-sm font-semibold bg-gray-100 rounded-lg">
            <span>Image</span>
            <span>Name</span>
            <span>Category</span>
            <span>Price</span>
            <span className="text-center">Action</span>
          </div>

          {/* Product rows */}
          {list.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 py-2 px-3 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
            >
              <img
                className="w-14 h-14 object-cover rounded-md"
                src={item.image[0]}
                alt={item.name}
              />
              <p className="font-medium text-gray-700">{item.name}</p>
              <p className="text-gray-600">{item.category}</p>
              <p className="font-semibold">
                {currency}
                {item.price}
              </p>
              <button
                onClick={() => removeProduct(item._id)}
                className="text-sm px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
