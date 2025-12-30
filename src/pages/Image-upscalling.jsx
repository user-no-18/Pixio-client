import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import MobileBackArrow from "../components/MobileArrow";

function EnhanceImage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { enhanceImage } = useContext(AppContext);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 2 : prev));
    }, 100);

    const result = await enhanceImage(image);
    if (result) {
      setResultImage(result);
    }

    clearInterval(interval);
    setProgress(100);
    setTimeout(() => setLoading(false), 500);
  };

  const resetHandler = () => {
    setImage(null);
    setPreviewUrl(null);
    setResultImage(null);
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

      `}</style>

      <MobileBackArrow />

      <div className="flex flex-col min-h-[90vh] items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-white">Enhance Image</h1>

        {!resultImage && !loading && (
          <div className="w-full max-w-xl">
            <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg"
                />
              ) : (
                <div className="text-gray-400">
                  <p className="text-lg mb-2">Click or drag to upload image</p>
                  <p className="text-sm">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>

            {previewUrl && (
              <button
                onClick={onSubmitHandler}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-medium hover:opacity-90 transition"
              >
                Enhance Image
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="relative w-full max-w-xl">
            <div className="bg-gray-900/95 rounded-lg p-8">
              <div className="w-full h-64 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 animate-pulse rounded-lg relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent"
                  style={{ animation: "shimmer 2s infinite" }}
                ></div>
              </div>

              <div className="mt-6 flex flex-col items-center space-y-2">
                <div className="w-3/4 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-gray-300 text-sm font-medium">
                  Enhancing... {progress}%
                </p>
              </div>
            </div>
          </div>
        )}

        {resultImage && !loading && (
          <div className="w-full max-w-xl">
            <img
              src={resultImage}
              alt="Enhanced"
              className="w-full rounded-lg shadow-lg"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={resetHandler}
                className="flex-1 bg-transparent border-2 border-white text-white py-3 rounded-full"
              >
                Try Another
              </button>
              <a
                href={resultImage}
                download="enhanced-image.png"
                className="flex-1 bg-white text-black py-3 rounded-full text-center font-medium"
              >
                Download
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EnhanceImage;