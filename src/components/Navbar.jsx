import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const Navbar = () => {
  const { credit, setShowLogin, user, logout } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 px-4 bg-black border-b border-white/10">

      <Link to="/" className="flex items-center gap-2">
        <img src={assets.logo_icon} alt="" className="w-28 lg:w-10" />
        <p
          style={{ fontFamily: "Lobster, cursive" }}
          className="text-2xl font-extrabold text-white tracking-widest"
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

            {/* Credit Display */}
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-black text-white px-4 sm:px-6 py-1.5 sm:py-3 rounded hover:bg-white/10 transition-all duration-300 "
            >
              <img src={assets.credit_star} className="w-5" alt="credit" />
              <p className="text-xs sm:text-sm font-medium">
                Credits: {credit}
              </p>
            </button>

            {/* User Greeting */}
            <p className="text-xs sm:text-sm text-white hidden sm:block">
              Hi, {user.name}
            </p>

            {/* Profile Dropdown */}
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow cursor-pointer"
                alt="profile"
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul
                  onClick={logout}
                  className="list-none m-0 p-2 bg-white rounded-md border-none text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Logout
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5 text-white">
            {/* Docs Link for non-logged in users */}
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