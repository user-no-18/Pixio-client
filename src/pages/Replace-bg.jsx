import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

function ReplaceBG() {
  const [image, setImage] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { replaceBackground } = useContext(AppContext);

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
    if (!image || !prompt.trim()) return;

    setLoading(true);
    setProgress(0);

    let interval = setInterval(() => {
      setProgress((prev) => (prev < 90 ? prev + 2 : prev));
    }, 100);

    const result = await replaceBackground(image, prompt);
    if (result) {
      setResultImage(result);
    }

    clearInterval(interval);
    setProgress(100);
    setTimeout(() => setLoading(false), 500);
  };

  const resetHandler = () => {
    setImage(null);
    setPrompt("");
    setPreviewUrl(null);
    setResultImage(null);
  };

  return (
    <>
      <div className="flex flex-col min-h-[90vh] items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Replace Background
        </h1>

        {!resultImage && !loading && (
          <div className="w-full max-w-xl space-y-5">
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
                  <p className="text-lg mb-2">
                    Click or drag to upload image
                  </p>
                  <p className="text-sm">PNG, JPG up to 10MB</p>
                </div>
              )}
            </div>

            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the background you want (e.g. studio, beach, plain white)"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-600 text-white outline-none focus:border-purple-500"
            />

            {previewUrl && (
              <button
                onClick={onSubmitHandler}
                disabled={!prompt.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-full font-medium hover:opacity-90 transition disabled:opacity-50"
              >
                Replace Background
              </button>
            )}
          </div>
        )}

        {resultImage && !loading && (
          <div className="w-full max-w-xl">
            <img
              src={resultImage}
              alt="Result"
              className="w-full rounded-lg shadow-lg"
            />

            <div className="flex gap-4 mt-6">
              <button
                onClick={resetHandler}
                className="flex-1 border-2 border-white text-white py-3 rounded-full"
              >
                Try Another
              </button>
              <a
                href={resultImage}
                download="replaced-background.png"
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

export default ReplaceBG;
