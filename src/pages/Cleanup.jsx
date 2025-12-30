import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import MobileBackArrow from "../components/MobileArrow";

function Cleanup() {
  const [image, setImage] = useState(null);
  const [mask, setMask] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [maskPreview, setMaskPreview] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { cleanupImage } = useContext(AppContext);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const handleMaskUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMask(file);
      setMaskPreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!image || !mask) {
      return;
    }

    setLoading(true);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 2 : prev));
    }, 100);

    const result = await cleanupImage(image, mask);
    if (result) {
      setResultImage(result);
    }

    clearInterval(interval);
    setProgress(100);
    setTimeout(() => setLoading(false), 500);
  };

  const resetHandler = () => {
    setImage(null);
    setMask(null);
    setImagePreview(null);
    setMaskPreview(null);
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

      <div className="flex flex-col min-h-[90vh] items-center justify-center p-4 ">
        <h1 className="text-3xl font-bold mb-4 text-white mt-20">Cleanup Image</h1>
        <p className="text-gray-400 mb-8 text-center max-w-2xl">
          Remove unwanted objects from your images. Upload your image and a mask where white areas indicate what to remove.
        </p>

        {!resultImage && !loading && (
          <div className="w-full max-w-4xl">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Original Image Upload */}
              <div>
                <h3 className="text-white text-lg mb-2 font-medium">1. Upload Image</h3>
                <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-white/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Original"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-lg mb-2">Upload your image</p>
                      <p className="text-sm">PNG, JPG up to 30MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Mask Upload */}
              <div>
                <h3 className="text-white text-lg mb-2 font-medium">2. Upload Mask</h3>
                <div className="relative border-2 border-dashed border-gray-400 rounded-lg p-8 text-center bg-white/5">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleMaskUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {maskPreview ? (
                    <img
                      src={maskPreview}
                      alt="Mask"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                  ) : (
                    <div className="text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                      <p className="text-lg mb-2">Upload mask image</p>
                      <p className="text-sm">White = remove, Black = keep</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">💡 How to create a mask:</h4>
              <ul className="text-gray-300 text-sm space-y-1">
                <li>• Use any image editor (Photoshop, GIMP, Paint, etc.)</li>
                <li>• Paint WHITE over areas you want to remove</li>
                <li>• Keep BLACK for areas you want to preserve</li>
                <li>• Save as PNG or JPG with same dimensions as original</li>
              </ul>
            </div>

            {imagePreview && maskPreview && (
              <button
                onClick={onSubmitHandler}
                className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-medium hover:opacity-90 transition"
              >
                Clean Up Image
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="relative w-full max-w-2xl">
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
                  Cleaning up image... {progress}%
                </p>
              </div>
            </div>
          </div>
        )}

        {resultImage && !loading && (
          <div className="w-full max-w-2xl">
            <h3 className="text-white text-xl mb-4 font-medium text-center">Result</h3>
            <img
              src={resultImage}
              alt="Cleaned"
              className="w-full rounded-lg shadow-lg"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={resetHandler}
                className="flex-1 bg-transparent border-2 border-white text-white py-3 rounded-full hover:bg-white/10 transition"
              >
                Try Another
              </button>
              <a
                href={resultImage}
                download="cleaned-image.png"
                className="flex-1 bg-white text-black py-3 rounded-full text-center font-medium hover:bg-gray-100 transition"
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

export default Cleanup;