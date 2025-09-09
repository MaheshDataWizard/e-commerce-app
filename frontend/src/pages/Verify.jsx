import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const Verify = () => {
  const { token, setCartItems, backendUrl } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const [status, setStatus] = useState("loading"); // 'loading', 'success', 'error'

  useEffect(() => {
    if (!token) return;

    const verifyPayment = async () => {
      try {
        const response = await axios.post(
          `${backendUrl}/api/order/verifyStripe`,
          { success, orderId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.success) {
          setCartItems({});
          setStatus("success");
          toast.success("Payment verified successfully!");
          setTimeout(() => navigate("/orders"), 2000); // Redirect after 2s
        } else {
          setStatus("error");
          toast.error("Payment verification failed!");
          setTimeout(() => navigate("/cart"), 2000);
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        toast.error(error.response?.data?.message || "Payment verification failed");
        setTimeout(() => navigate("/cart"), 2000);
      }
    };

    verifyPayment();
  }, [token, success, orderId, backendUrl, navigate, setCartItems]);

  // UI
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {status === "loading" && (
        <>
          <p className="text-lg">Verifying your payment...</p>
          <div className="w-10 h-10 border-4 border-t-black border-gray-200 rounded-full animate-spin"></div>
        </>
      )}

      {status === "success" && (
        <p className="text-green-600 text-lg font-semibold">
          Payment verified! Redirecting to your orders...
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600 text-lg font-semibold">
          Payment verification failed. Redirecting to cart...
        </p>
      )}
    </div>
  );
};

export default Verify;
