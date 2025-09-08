import React, { useContext, useEffect } from "react";
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

  const verifyPayment = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        {
          headers: {
            // Check backend expectation: "token" vs "Authorization"
            token: token,
            // OR: Authorization: `Bearer ${token}`
          },
        }
      );

      if (response.data.success) {
        setCartItems({});
        navigate("/orders");
      } else {
        navigate("/cart");
      }
    } catch (error) {
      console.error("Verify error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Payment verification failed");
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token, success, orderId]);

  return <div>Verifying your payment...</div>;
};

export default Verify;
