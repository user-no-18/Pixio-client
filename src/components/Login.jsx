import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();

  /* ===================== NEW STATE (SAFE TO REMOVE) ===================== */
  const [cardStep, setCardStep] = useState(1); // 1 = form, 2 = otp
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  /* ===================================================================== */

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  /* ===================== OTP HANDLERS (SAFE BLOCK) ===================== */
  const sendOtp = async () => {
    if (!validateEmail(email)) {
      toast.error("Enter a valid email");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(backendUrl + "/api/otp/send", { email });
      toast.success("OTP sent to your email");
      setCardStep(2);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP");
      return;
    }

    try {
      setIsLoading(true);
      await axios.post(backendUrl + "/api/otp/verify", { email, otp });
      toast.success("Email verified successfully!");
      setOtpVerified(true);
      setCardStep(1);
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp("");
    await sendOtp();
  };
  /* ==================================================================== */

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    /* ===================== NEW VALIDATION (SAFE TO REMOVE) ===================== */
    if (state === "Sign Up" && !otpVerified) {
      toast.error("Please verify your email first");
      return;
    }
    /* ========================================================================== */

    setIsLoading(true);

    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
          navigate("/");
        } else toast.error(data.message);
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success("Account created successfully");
          setState("Login");
          /* ===================== RESET OTP STATE (SAFE TO REMOVE) ===================== */
          setOtpVerified(false);
          setOtp("");
          /* =========================================================================== */
        } else toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  /* ===================== NEW STATE TOGGLE HANDLER (SAFE TO REMOVE) ===================== */
  const handleStateToggle = () => {
    setState(state === "Login" ? "Sign Up" : "Login");
    setOtpVerified(false);
    setOtp("");
    setCardStep(1);
  };
  /* ==================================================================================== */

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <form
        onSubmit={onsubmitHandler}
        className="relative w-[90%] max-w-sm bg-black border border-white/15 rounded-2xl p-8 text-white"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>

        {/* ===================== STEP 1 : FORM CARD ===================== */}
        {cardStep === 1 && (
          <>
            <h1 className="text-2xl font-semibold text-center mb-6">{state}</h1>

            {state === "Sign Up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                required
                className="w-full p-3 bg-black border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition"
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
              className="w-full mt-4 p-3 bg-black border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition"
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
              className="w-full mt-4 p-3 bg-black border border-white/20 rounded-lg focus:border-white/40 focus:outline-none transition"
            />

            {/* ===================== NEW OTP BUTTON FOR SIGN UP (SAFE TO REMOVE) ===================== */}
            {state === "Sign Up" && !otpVerified && (
              <button
                type="button"
                onClick={sendOtp}
                disabled={isLoading}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Verify Email"}
              </button>
            )}

            {state === "Sign Up" && otpVerified && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center gap-2">
                <span className="text-green-400 text-xl">✓</span>
                <span className="text-green-400 text-sm">Email Verified</span>
              </div>
            )}
            {/* ======================================================================================== */}

            <button
              type="submit"
              disabled={isLoading || (state === "Sign Up" && !otpVerified)}
              className="w-full mt-4 py-3 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : state === "Login" ? "Sign In" : "Create Account"}
            </button>

            {/* Toggle State */}
            <p className="mt-6 text-center text-sm text-white/60">
              {state === "Login" ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={handleStateToggle}
                className="text-white hover:underline font-medium"
              >
                {state === "Login" ? "Sign Up" : "Login"}
              </button>
            </p>
          </>
        )}

        {/* ===================== STEP 2 : OTP VERIFICATION CARD (NEW - SAFE TO REMOVE) ===================== */}
        {cardStep === 2 && (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📧</span>
              </div>
              <h2 className="text-2xl font-semibold mb-2">Verify Your Email</h2>
              <p className="text-sm text-white/60">
                We've sent a 6-digit code to
                <br />
                <span className="text-white font-medium">{email}</span>
              </p>
            </div>

            <input
              value={otp}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                setOtp(value);
              }}
              placeholder="000000"
              maxLength={6}
              className="w-full p-4 bg-black border border-white/20 rounded-lg text-center text-2xl tracking-[0.5em] font-mono focus:border-white/40 focus:outline-none transition"
            />

            <button
              type="button"
              onClick={verifyOtp}
              disabled={isLoading || otp.length !== 6}
              className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-500 hover:to-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/60 mb-3">Didn't receive the code?</p>
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-sm text-white hover:underline font-medium disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setCardStep(1);
                setOtp("");
              }}
              className="w-full mt-4 py-2 text-sm text-white/60 hover:text-white transition"
            >
              ← Back to Sign Up
            </button>
          </>
        )}
       
      </form>
    </div>
  );
};

export default Login;