import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ImageEnhancement = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 rounded"
      >
        <Menu size={20} />
      </button>

      <VerticalNav sidebarOpen={sidebarOpen} />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}

      <main className="pt-16 lg:ml-64 min-h-screen">

        <section className="px-6 py-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          <div>
            <h1 className="mt-2 text-4xl lg:text-5xl font-black">
              Image Enhancement
            </h1>

            <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-2xl">
              Image Enhancement is an AI-powered tool that improves image quality
              by enhancing clarity, sharpness, lighting, and visual details.
              It intelligently restores low-quality images while preserving
              natural textures and realism.
            </p>
          </div>

          <div className="w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10">
            <video
              src="videos/image-enhancement-demo.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>

        </section>

        <section className="px-6 pb-32 max-w-6xl mx-auto">

          <h2 className="mt-12 font-semibold text-3xl">
            How Image Enhancement works
          </h2>

          <div className="mt-10 grid gap-6">

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">1. Upload an image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Upload any low-resolution, blurry, or poorly lit image that
                requires visual improvement.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">2. Automatic quality analysis</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                The AI analyzes sharpness, noise, contrast, and color balance
                to determine optimal enhancement parameters.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">3. AI-driven enhancement</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Advanced models enhance details, reduce noise, improve lighting,
                and restore clarity without overprocessing.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">4. Review and refine</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Instantly preview the enhanced image and reprocess if adjustments
                are needed.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">5. Download enhanced image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Export the enhanced image in high quality, ready for professional
                and commercial use.
              </p>
            </div>

          </div>

          <h2 className="mt-20 text-xl font-semibold">
            Common use cases
          </h2>

          <ul className="mt-6 space-y-3 text-white/70">
            <li>• Enhancing low-quality or blurry photos</li>
            <li>• Improving product images for e-commerce</li>
            <li>• Restoring old or compressed images</li>
            <li>• Optimizing visuals for marketing and ads</li>
            <li>• Improving clarity for professional content</li>
          </ul>

          {user ? (
            <button
              onClick={() => navigate("/enhance-image")}
              className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition"
            >
              Use Image Enhancement
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition"
            >
              Sign in to start
            </button>
          )}

          <button
            onClick={() => navigate("/docs")}
            className="mt-6 ml-1 px-6 py-3 border border-white/30 text-white rounded font-medium hover:bg-white/5 transition"
          >
            Read Documentation
          </button>

        </section>
      </main>
    </div>
  );
};

export default ImageEnhancement;
