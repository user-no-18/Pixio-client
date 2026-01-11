import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Navbar = () => {
  const { credit, setShowLogin, user, logout } = useContext(AppContext);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-black border-b border-white/10">
      <Link to="/" className="flex items-center gap-2 pl-11 lg:pl-0">
        <img src={assets.logo_icon} alt="" className="w-7 sm:w-8 lg:w-10" />
        <p
          style={{ fontFamily: "Lobster, cursive" }}
          className="text-xl sm:text-2xl font-extrabold text-white tracking-widest"
        >
          PIXIO
        </p>
      </Link>

      <div className="flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Docs Link */}
            <button
              onClick={() => navigate("/docs")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 rounded transition-colors text-sm font-medium"
            >
              Docs
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden sm:flex items-center gap-2 px-4 py-2 text-white hover:bg-white/5 rounded transition-colors text-sm font-medium"
            >
              Dashboard
            </button>

            {/* Credit Display */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-black text-white px-4 sm:px-6 py-1.5 sm:py-3 rounded hover:bg-white/10 transition-all duration-300"
            >
              <img
                src={assets.credit_star}
                className="w-4 sm:w-5"
                alt="credit"
              />
              <p className="text-xs sm:text-sm font-medium">
                Credits: {credit}
              </p>
            </button>

            {/* User Greeting (First Name Only) */}
            <p className="hidden sm:block text-sm font-medium tracking-wide">
              <span
                className="bg-gradient-to-r from-[#FFD700] via-[#FFB800] to-[#FFF2A8]
                bg-clip-text text-transparent
                drop-shadow-[0_0_6px_rgba(255,215,0,0.45)]"
              >
                Hi
              </span>
              <span className="text-white/90"> , </span>
              <span
                className="bg-gradient-to-r from-[#FFECB3] via-[#FFD700] to-[#FFB800]
                bg-clip-text text-transparent
                drop-shadow-[0_0_8px_rgba(255,215,0,0.35)]"
              >
                {user.name.split(" ")[0]}
              </span>
            </p>

            {/* Profile Dropdown */}
            <div className="relative group" ref={dropdownRef}>
              <div 
                onClick={() => setShowDropdown(!showDropdown)}
                className="cursor-pointer"
              >
                {user?.name ? (
                  <div className="relative inline-flex items-center justify-center">
                    <span
                      className="absolute inset-0 rounded-full 
                      ring-2 ring-yellow-400/80
                      shadow-[0_0_10px_rgba(234,179,8,0.6)]
                      animate-pulse"
                    />

                    <div
                      className="relative w-9 h-9 rounded-full flex items-center justify-center 
                      bg-gradient-to-br from-indigo-600 to-purple-600 
                      text-white font-semibold text-sm
                      ring-2 ring-white/30 shadow-md select-none"
                    >
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <img src={assets.user_icon} className="w-9 h-9" />
                )}

                
                
              </div>

            <div
  className={`absolute ${
    showDropdown ? "block" : "hidden"
  } top-0 right-0 z-10 text-black rounded pt-12`}
>
  <ul
    onClick={logout}
    className="list-none m-0 p-2 bg-white rounded-md text-sm cursor-pointer hover:bg-gray-100 transition-colors"
  >
    Logout
  </ul>
</div>

            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5 text-white">
            {/* Docs Link */}
            <button
              onClick={() => navigate("/docs")}
              className="hidden sm:block cursor-pointer text-white hover:text-white/80 transition-colors text-sm font-medium"
            >
              Docs
            </button>

            {/* Pricing Link */}
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer text-white hover:text-white/80 transition-colors text-sm font-medium"
            >
              Pricing
            </p>

            {/* Login Button */}
            <button
              onClick={() => setShowLogin(true)}
              className="bg-white text-black px-7 py-2 sm:px-10 text-sm rounded hover:bg-white/90 transition-colors font-medium"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;