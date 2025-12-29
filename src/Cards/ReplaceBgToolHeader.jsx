import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReplaceBackground = () => {
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
              Replace Background
            </h1>

            <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-2xl">
              Replace Background is an AI-powered tool that removes the existing
              background from an image and generates a new, realistic background
              based on a text prompt while preserving the subject with precision.
            </p>
          </div>

          <div className="w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10">
            <video
              src="videos/replace-background.mp4"
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
            How Replace Background works
          </h2>

          <div className="mt-10 grid gap-6">

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">1. Upload an image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Upload an image containing a clear subject. The AI automatically
                separates the foreground from the background.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">2. Describe the new background</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Enter a text prompt describing the desired background scene,
                environment, or style.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">3. AI background generation</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                The AI generates a new background that matches lighting,
                perspective, and composition of the original image.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">4. Review and refine</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Review the generated result and adjust the prompt if needed
                to achieve the desired visual outcome.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">5. Download final image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Export the final image in high resolution, ready for marketing,
                design, or creative workflows.
              </p>
            </div>

          </div>

          <h2 className="mt-20 text-xl font-semibold">
            Common use cases
          </h2>

          <ul className="mt-6 space-y-3 text-white/70">
            <li>• Creating studio-quality backgrounds for portraits</li>
            <li>• Product photography background replacement</li>
            <li>• Generating creative scenes for marketing visuals</li>
            <li>• Social media and advertising content creation</li>
            <li>• Visual storytelling and concept design</li>
          </ul>

          {user ? (
            <button
              onClick={() => navigate("/replace-bg")}
              className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition"
            >
              Use Replace Background
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

export default ReplaceBackground;
