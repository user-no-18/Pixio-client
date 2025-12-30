import React, { useContext, useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../contexts/AppContext";
import MobileBackArrow from "../components/MobileArrow";
function Result() {
  const [image, setImage] = useState("sampleimg.png");
  const [isImageLoad, setImageLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [input, setInput] = useState("");
  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 2 : prev)); 
    }, 100);

    if (input) {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setImage(generatedImage);
        setImageLoad(true);
      }
    }

    clearInterval(interval);
    setProgress(100);
    setInput("");
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
      <MobileBackArrow/>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col min-h-[90vh] items-center justify-center"
      >
        <div className="relative">
          <img
            src={image}
            alt="Generated"
            className="max-w-sm w-full h-auto object-cover rounded-lg shadow-lg"
          />

          {loading && (
            <div className="absolute inset-0 bg-gray-900/95 rounded-lg flex items-center justify-center">
              <div className="w-full h-full p-4 space-y-3">
               
                <div className="w-full h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 
                              bg-[length:200%_100%] animate-pulse rounded-lg relative overflow-hidden">
                  
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r 
                                from-transparent via-gray-600/30 to-transparent"
                       style={{
                         animation: 'shimmer 2s infinite'
                       }}></div>
                </div>
                
                {/* Progress text */}
                <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center space-y-2">
                  <div className="w-3/4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                               transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-300 text-sm font-medium">
                    Generating... {progress}%
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {!isImageLoad && !loading && (
          <div className="flex w-full max-w-xl bg-black/20 text-white text-sm p-0.5 mt-10 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20"
              type="text"
              placeholder="Describe your thought..."
            />
            <button
              type="submit"
              className="bg-black/20 px-10 sm:px-16 py-3 rounded-full"
            >
              Generate
            </button>
          </div>
        )}

        {isImageLoad && !loading && (
          <div className="flex flex-wrap gap-2 justify-center text-white text-sm p-0.5 mt-10 rounded-full">
            <p
              onClick={() => setImageLoad(false)}
              className="bg-transparent border-2 border-white/70 text-white/70 px-8 py-3 rounded-full cursor-pointer"
            >
              Generate Another
            </p>
            <a
              href={image}
              download
              className="bg-white/70 px-10 sm:px-16 py-3 rounded-full text-black border-white"
            >
              Download
            </a>
          </div>
        )}
      </form>
    </>
  );
}

export default Result;