import React, { useEffect, useState } from "react";

const TestModePopup = ({ onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
  <div className="bg-black border border-white/20 rounded-xl w-[90%] max-w-sm p-6 shadow-xl text-center">

    {/* Bouncing Emoji */}
    <div className="text-3xl mb-3 animate-bounce">😔</div>

    <h2 className="text-lg font-semibold text-white mb-2">
      Oops!
    </h2>

    <p className="text-sm text-white/70 leading-relaxed">
      This feature is running in <span className="font-medium">test mode</span>.<br />
      You may purchase only one token per day.
    </p>

    <button
      onClick={handleClose}
      className="mt-5 w-full bg-white text-black text-sm font-medium py-2.5 rounded-lg hover:bg-white/80 transition"
    >
      Got it
    </button>
  </div>
</div>

  );
};

export default TestModePopup;
