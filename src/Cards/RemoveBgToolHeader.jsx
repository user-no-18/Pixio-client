import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RemoveBackground = () => {
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
              Remove Background
            </h1>

            <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-2xl">
              Remove Background is an AI-powered tool that automatically separates
              subjects from their backgrounds with high precision. It enables
              clean, transparent, or custom-background images without manual
              editing or complex workflows.
            </p>
          </div>

          <div className="w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10">
            <video
              src="videos/remove-background-demo.mp4"
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
            How Remove Background works
          </h2>

          <div className="mt-10 grid gap-6">

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">1. Upload your image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Upload any image containing a subject such as a person, product,
                or object. The tool supports high-resolution images.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">2. Automatic subject detection</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                The AI automatically detects the primary subject and separates it
                from the background with pixel-level accuracy.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">3. Background removal</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Background pixels are removed cleanly while preserving fine edges
                such as hair, shadows, and object contours.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">4. Preview result</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Instantly preview the output image with a transparent or clean
                background.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">5. Download final image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Download the processed image in high quality, ready for design,
                e-commerce, or marketing use.
              </p>
            </div>

          </div>

          <h2 className="mt-20 text-2xl font-semibold">
            Example results
          </h2>

          <div className="mt-10 grid gap-10">

            <div className="w-full rounded-lg overflow-hidden border border-white/10">
              <img
                src="examples/remove-bg-output.jpg"
                alt="Remove background input"
                className="w-full object-cover"
              />
            </div>

            <div className="w-full rounded-lg overflow-hidden border border-white/10">
              <img
                src="examples/remove-bg-input.png"
                alt="Remove background output"
                className="w-full object-cover"
              />
            </div>

          </div>

          <h2 className="mt-20 text-xl font-semibold">
            Common use cases
          </h2>

          <ul className="mt-6 space-y-3 text-white/70">
            <li>• Creating transparent product images</li>
            <li>• Preparing assets for e-commerce platforms</li>
            <li>• Designing marketing and promotional materials</li>
            <li>• Isolating subjects for graphic design</li>
            <li>• Improving visual consistency across content</li>
          </ul>

          {user ? (
            <button
              onClick={() => navigate("/remove-bg")}
              className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition"
            >
              Use Remove Background
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

export default RemoveBackground;
