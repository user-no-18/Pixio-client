import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Uncrop = () => {
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
              Uncrop
            </h1>

            <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-2xl">
              Uncrop is an AI-powered image expansion tool that intelligently extends
              the boundaries of an image beyond its original frame while preserving
              visual consistency, structure, and realism.
            </p>
          </div>

          <div className="w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10">
            <video
              src="videos/uncrop-demo.webm"
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
            How Uncrop works
          </h2>

          <div className="mt-10 grid gap-6">

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">1. Upload your image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Upload an image that you want to expand beyond its original
                boundaries without cropping important content.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">2. Choose expansion direction</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Select the sides or aspect ratio where you want the image
                to be extended.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">3. AI image extrapolation</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                The AI generates new content that seamlessly blends with the
                original image using contextual understanding.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">4. Review the expanded image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Instantly preview the uncropped result and regenerate if
                further refinement is needed.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">5. Export final image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Download the expanded image in high resolution, ready for
                creative or professional use.
              </p>
            </div>

          </div>

          <h2 className="mt-20 text-xl font-semibold">
            Common use cases
          </h2>

          <ul className="mt-6 space-y-3 text-white/70">
            <li>• Expanding images to fit new aspect ratios</li>
            <li>• Restoring cropped compositions</li>
            <li>• Preparing visuals for banners and ads</li>
            <li>• Extending backgrounds for design layouts</li>
            <li>• Creative image storytelling</li>
          </ul>

          {user ? (
            <button
              onClick={() => navigate("/uncrop")}
              className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition"
            >
              Use Uncrop
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

export default Uncrop
