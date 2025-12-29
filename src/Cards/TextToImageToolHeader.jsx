import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PromptToImage = () => {
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
              Prompt to Image
            </h1>

            <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-2xl">
              Prompt to Image is an AI-powered creative tool that transforms written
              descriptions into high-quality images. Simply describe what you want
              to see, and the AI generates visually rich and detailed imagery
              within seconds.
            </p>
          </div>

          <div className="w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10">
            <video
              src="videos/prompt-to-image-demo.mp4"
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
            How Prompt to Image works
          </h2>

          <div className="mt-10 grid gap-6">

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">1. Write a prompt</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Describe the image you want to generate using clear and detailed
                natural language.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">2. Define visual intent</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Specify style, mood, lighting, composition, or artistic direction
                to guide the AI toward your desired output.
              </p>
            </div>

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">3. Generate image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                The AI interprets your prompt and produces a unique image based on
                semantic understanding and visual synthesis.
              </p>
            </div>

           

            <div className="border border-white/15 rounded-lg p-6">
              <h3 className="font-semibold text-lg">5. Download final image</h3>
              <p className="mt-2 text-white/70 leading-relaxed">
                Export the generated image in high resolution for creative,
                marketing, or professional use.
              </p>
            </div>

          </div>

          <h2 className="mt-20 text-xl font-semibold">
            Common use cases
          </h2>

          <ul className="mt-6 space-y-3 text-white/70">
            <li>• Concept art and visual ideation</li>
            <li>• Marketing and advertising creatives</li>
            <li>• Social media and content illustrations</li>
            <li>• Product mockups and design exploration</li>
            <li>• Creative experimentation and storytelling</li>
          </ul>

          {user ? (
            <button
              onClick={() => navigate("/result")}
              className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition"
            >
              Use Prompt to Image
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

export default PromptToImage;
