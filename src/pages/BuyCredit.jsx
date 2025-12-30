// src/pages/BuyCredit.jsx
import React, { useContext, useEffect, useState } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TestModePopup from "../components/TestModePopup";
import { motion } from "framer-motion";
import Aurora from "../components/Aurora";


function BuyCredit() {
  const { user, backendUrl, loadcreditData, token, setShowLogin } =
    useContext(AppContext);
  const navigate = useNavigate();

  const [loadingPlan, setLoadingPlan] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(!!window.Razorpay);
  const [showPopup, setShowPopup] = useState(true);

  // Load Razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve, reject) => {
      if (window.Razorpay) {
        setScriptLoaded(true);
        return resolve(true);
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
        resolve(true);
      };
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });

  useEffect(() => {
    if (!window.Razorpay) {
      loadRazorpayScript().catch((err) => {
        console.warn("Razorpay script load failed:", err);
      });
    }
  }, []);

  const getAuthHeaders = () => {
    const savedToken = token || localStorage.getItem("token");
    console.log('Getting auth headers, token:', savedToken ? 'exists' : 'missing');
    
    if (!savedToken) return null;
    
    return {
      'Authorization': `Bearer ${savedToken}`,
      'token': savedToken,
      'Content-Type': 'application/json'
    };
  };

  const paymentRazorpay = async (planId) => {
    // Ensuring that user logged in
    if (!user) {
      toast.error("Please login first!");
      setShowLogin(true);
      return;
    }

    const authHeaders = getAuthHeaders();
    if (!authHeaders) {
      toast.error("Please login again!");
      setShowLogin(true);
      return;
    }

    //load razorpay SDK
    try {
      if (!window.Razorpay) {
        await loadRazorpayScript();
      }
    } catch (err) {
      console.error("Razorpay SDK error:", err);
      toast.error("Payment SDK failed to load. Refresh and try again.");
      return;
    }

    setLoadingPlan(planId);
    try {
      const url = `${backendUrl}/api/user/pay-razor`;
      
      const { data } = await axios.post(
        url,
        { planId },
        { headers: authHeaders }
      );

      console.log("Response from backend:", data);

      if (data && data.success) {
        initPay(data.order, data.key, authHeaders);
      } else {
        toast.error(data?.message || "Failed to initialize payment");
      }
    } catch (error) {
      console.error("Full Axios Error:", error);
      console.error("Error response:", error.response?.data);
      const message =
        error?.response?.data?.message || error?.message || "Unknown error";
      toast.error(message);
    } finally {
      setLoadingPlan(null);
    }
  };

  const initPay = (order, key, authHeaders) => {
    if (!order || !key) {
      toast.error("Invalid order/key from server");
      return;
    }

    const options = {
      key: key,
      amount: order.amount,
      currency: order.currency || "INR",
      name: "AI Text to Image",
      description: "Credits Purchase",
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyUrl = `${backendUrl}/api/user/verify-razor`;
          console.log("Verifying payment:", verifyUrl, response);
          
          const verifyData = await axios.post(
            verifyUrl,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            },
            { headers: authHeaders }
          );

          console.log("Verify response:", verifyData?.data);

          if (verifyData?.data?.success) {
            toast.success("Payment successful! Credits added to your account.");
            if (typeof loadcreditData === "function") {
              loadcreditData();
            }
          } else {
            toast.error(verifyData?.data?.message || "Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          const msg = error?.response?.data?.message || error?.message || "Verification failed";
          toast.error(msg);
        }
      },
      prefill: {
        name: user?.name || "User",
        email: user?.email || "user@example.com",
        contact: user?.phone || "9999999999",
      },
      theme: {
        color: "#1f2937",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Razorpay payment.failed:", response);
      toast.error("Payment failed: " + (response?.error?.description || "Unknown error"));
    });

    rzp.open();
  };

  return (
    <div className="relative min-h-screen pt-20 pb-24 text-center overflow-hidden">
      {/* BACKGROUND EFFECTS - Fixed positioning to cover entire viewport */}
      <div className="fixed inset-0 pointer-events-none z-0">
        
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {showPopup && <TestModePopup onClose={() => setShowPopup(false)} />}

      {/* FOREGROUND CONTENT */}
      <div className="relative z-10 px-4">
        <motion.button
          className="border border-white/40 px-10 py-2 rounded-full mb-6 text-white hover:bg-white/10 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Our Plans
        </motion.button>

        <motion.h1
          className="text-3xl font-medium mb-10 sm:mb-12 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Choose the plan
        </motion.h1>

        <div className="flex flex-wrap gap-6 justify-center text-left max-w-4xl mx-auto mb-16">
          {plans.map((item, index) => (
            <motion.div
              key={index}
              className="bg-black/90 border border-white/20 rounded-xl py-12 px-8 text-white shadow-md backdrop-blur-sm w-[300px] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(255,255,255,0.2)",
              }}
            >
              <img width={40} src={assets.logo_icon} alt="logo" className="mb-4" />

              <p className="mt-3 mb-3 font-semibold">{item.id}</p>
              <p className="text-sm text-white/70">{item.desc}</p>

              <p className="mt-6 flex-grow">
                <span className="text-3xl font-medium">${item.price}</span> /{" "}
                {item.credits} credits
              </p>

              <motion.button
                onClick={() => paymentRazorpay(item.id)}
                className="w-full mt-8 bg-white text-black text-sm rounded-md py-2.5 disabled:bg-white/40 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={loadingPlan === item.id}
              >
                {loadingPlan === item.id
                  ? "Processing..."
                  : user
                  ? "Purchase"
                  : "Get Started"}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BuyCredit;