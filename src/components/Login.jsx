import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Login = () => {
  
   const navigate = useNavigate()
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
         email,password
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
           navigate("/")
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
           navigate("/")
        } else {
         
          toast.error(data.message);
        }
      }
    } catch (error) {
  console.log("AXIOS ERROR:", error); // 
        toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
  <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <form
      onSubmit={onsubmitHandler}
      className="relative w-[90%] max-w-sm bg-gray-900 border border-gray-700 rounded-xl p-8 shadow-2xl text-gray-300"
    >
      {/* Title */}
      <h1 className="text-xl font-semibold text-center text-white mb-1">
        {state}
      </h1>
      <p className="text-sm text-center text-gray-400 mb-6">
        {state === "Login"
          ? "Sign in to continue to Pixio"
          : "Create an account to get started"}
      </p>

      {/* Full Name */}
      {state !== "Login" && (
        <div className="flex items-center gap-3 border border-gray-700 px-4 py-2.5 rounded-lg mb-4 bg-gray-800/50">
          <img src={assets.profile_icon} alt="Full Name" className="w-4 h-4 opacity-80" />
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full name"
            required
            className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
          />
        </div>
      )}

      {/* Email */}
      <div className="flex items-center gap-3 border border-gray-700 px-4 py-2.5 rounded-lg mb-4 bg-gray-800/50">
        <img src={assets.email_icon} alt="Email" className="w-4 h-4 opacity-80" />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email address"
          required
          className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
        />
      </div>

      {/* Password */}
      <div className="flex items-center gap-3 border border-gray-700 px-4 py-2.5 rounded-lg mb-3 bg-gray-800/50">
        <img src={assets.lock_icon} alt="Password" className="w-4 h-4 opacity-80" />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
          className="flex-1 bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
        />
      </div>

      {/* Forgot password */}
      {state === "Login" && (
        <p className="text-xs text-gray-400 mb-5 cursor-pointer hover:text-pink-400 transition">
          Forgot password?
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-lg transition"
      >
        {state === "Login" ? "Sign In" : "Create Account"}
      </button>

      {/* Switch auth */}
      <p className="mt-5 text-center text-sm text-gray-400">
        {state === "Login" ? "New to Pixio?" : "Already have an account?"}{" "}
        <span
          className="text-pink-400 cursor-pointer hover:underline"
          onClick={() => setState(state === "Login" ? "Sign Up" : "Login")}
        >
          {state === "Login" ? "Create account" : "Sign in"}
        </span>
      </p>

      {/* Close */}
      <img
        src={assets.cross_icon}
        alt="Close"
        className="absolute top-4 right-4 w-4 h-4 cursor-pointer opacity-70 hover:opacity-100"
        onClick={() => setShowLogin(false)}
      />
    </form>
  </div>
);

};

export default Login;
