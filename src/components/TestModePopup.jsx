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
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-[90%] max-w-sm p-6 shadow-xl text-center">

        
        <div className="text-3xl mb-3">😔</div>

        
        <h2 className="text-lg font-semibold text-white mb-2">
          Oops!
        </h2>

       
        <p className="text-sm text-gray-400 leading-relaxed">
          This feature is running in <span className="text-pink-400 font-medium">test mode</span>.
          <br />
     You may purchase only one token per day.
        </p>

        
        <button
          onClick={handleClose}
          className="mt-5 w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2.5 rounded-lg transition"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default TestModePopup;
