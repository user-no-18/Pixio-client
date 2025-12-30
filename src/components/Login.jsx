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
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Regular email/password authentication
  const onsubmitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

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
          toast.success("Logged in successfully!");
          navigate("/");
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
          toast.success("Registration successful! Please verify your email.");
          setState("Login");
          setName("");
          setEmail("");
          setPassword("");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Google Authentication - Single function for both Login and Sign Up
  const handleGoogleAuth = async () => {
    setIsLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      console.log("Google User:", result.user);

      
      const idToken = await result.user.getIdToken();

  
    const { data } = await axios.post(
  backendUrl + "/api/user/google-auth",
  { idToken }
);


      console.log("Backend Response:", data);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success("Logged in with Google successfully!");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Google Auth Error:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Login cancelled");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Popup blocked. Please allow popups for this site.");
      } else {
        toast.error("Failed to login with Google");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="absolute w-[420px] h-[420px] rounded-full bg-white/5 blur-3xl" />

      <form
        onSubmit={onsubmitHandler}
        className="relative w-[90%] max-w-sm bg-black border border-white/15 rounded-2xl p-8 shadow-2xl text-white"
      >
        <h1 className="text-2xl font-semibold text-center">{state}</h1>

        <p className="text-sm text-center text-white/60 mt-1 mb-6">
          {state === "Login"
            ? "Sign in to continue"
            : "Create an account to get started"}
        </p>

        {state !== "Login" && (
          <div className="flex items-center gap-3 border border-white/20 px-4 py-2.5 rounded-lg mb-4">
            <img
              src={assets.profile_icon}
              className="w-4 opacity-70"
              alt="Profile"
            />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full name"
              required
              disabled={isLoading}
              className="flex-1 bg-transparent outline-none text-sm placeholder-white/40 disabled:opacity-50"
            />
          </div>
        )}

        <div className="flex items-center gap-3 border border-white/20 px-4 py-2.5 rounded-lg mb-4">
          <img src={assets.email_icon} className="w-4 opacity-70" alt="Email" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email address"
            required
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-sm placeholder-white/40 disabled:opacity-50"
          />
        </div>

        <div className="flex items-center gap-3 border border-white/20 px-4 py-2.5 rounded-lg mb-6">
          <img src={assets.lock_icon} className="w-4 opacity-70" alt="Lock" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
            minLength="6"
            disabled={isLoading}
            className="flex-1 bg-transparent outline-none text-sm placeholder-white/40 disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 bg-white text-black rounded-lg font-semibold hover:bg-white/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading
            ? "Loading..."
            : state === "Login"
            ? "Sign In"
            : "Create Account"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-xs text-white/40 uppercase">Or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className="w-full py-2.5 border border-white/20 rounded-lg font-semibold hover:bg-white/5 transition flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {state === "Login" ? "Sign in with Google" : "Sign up with Google"}
        </button>

        <p className="mt-5 text-center text-sm text-white/60">
          {state === "Login" ? "New here?" : "Already have an account?"}{" "}
          <span
            className="text-white cursor-pointer underline underline-offset-4 hover:text-white/80"
            onClick={() => {
              if (!isLoading) {
                setState(state === "Login" ? "Sign Up" : "Login");
                setName("");
                setEmail("");
                setPassword("");
              }
            }}
          >
            {state === "Login" ? "Create account" : "Sign in"}
          </span>
        </p>

        {state === "Sign Up" && (
          <p className="mt-3 text-center text-xs text-white/40">
            By signing up, you'll receive a verification email
          </p>
        )}

        <img
          src={assets.cross_icon}
          alt="Close"
          className="absolute top-4 right-4 w-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          onClick={() => !isLoading && setShowLogin(false)}
        />
      </form>
    </div>
  );
};

export default Login;
