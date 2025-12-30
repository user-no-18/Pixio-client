import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const MobileBackArrow = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      aria-label="Go back"
      className="
        sm:hidden
        fixed
        top-[calc(env(safe-area-inset-top)+12px)]
        left-3
        z-[100]
        p-2.5
        rounded-full
        bg-black/70
        backdrop-blur-md
        text-white
        shadow-lg
        active:scale-95
        transition
      "
    >
      <ArrowLeft size={22} strokeWidth={2.2} />
    </button>
  );
};

export default MobileBackArrow;
