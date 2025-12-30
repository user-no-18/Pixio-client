import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu, Zap, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RemoveBackground = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">

      {/* subtle aurora like Cleanup */}
      <div className="absolute top-0 left-0 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white/10 rounded-full border border-white/20"
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

        {/* HERO */}
        <section className="px-6 py-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <h1 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
                Remove <span className="text-blue-500">Background.</span>
              </h1>

              <p className="mt-8 text-white/50 max-w-xl leading-relaxed text-xl lg:text-2xl">
                Automatically separate subjects from backgrounds using
                high-precision AI. Get clean, transparent images without
                manual editing.
              </p>

              <div className="mt-12 relative group inline-block">
                <div className="absolute -inset-4 bg-blue-600/20 blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative p-[1.5px] overflow-hidden rounded-full bg-white/10 group-hover:bg-transparent transition-colors duration-500">
                  <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000000_0%,#000000_40%,#3b82f6_50%,#000000_60%,#000000_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <button
                    onClick={() =>
                      user ? navigate("/remove-bg") : setShowLogin(true)
                    }
                    className="relative z-10 px-10 py-4 bg-[#080808] hover:bg-black text-white rounded-full flex items-center gap-3 text-sm font-black uppercase tracking-[0.25em] transition-all duration-300 group-hover:text-blue-400"
                  >
                    <Zap
                      size={18}
                      className="text-blue-500 group-hover:animate-bounce"
                    />
                    <span>Start Removing</span>
                    <ArrowRight
                      size={18}
                      className="text-white/30 group-hover:text-blue-400 group-hover:translate-x-2 transition-all duration-300"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-transparent blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <video
                  src="videos/remove-background-demo.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="px-6 pb-32 max-w-7xl mx-auto border-t border-white/5 pt-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight text-white/90 mb-4">
              How It Works
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Professional-grade background removal in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: "01",
                title: "Upload",
                desc: "Drop your subject image.",
                gradient: "from-blue-600/5 to-transparent"
              },
              {
                step: "02",
                title: "AI Processing",
                desc: "AI identifies main subject and removes background pixels.",
                gradient: "from-purple-600/5 to-transparent"
              },
              {
                step: "03",
                title: "Download",
                desc: "High-quality PNG export with transparent background.",
                gradient: "from-cyan-600/5 to-transparent"
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative bg-gradient-to-br ${item.gradient} backdrop-blur-sm border border-white/10 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-500 group overflow-hidden`}
              >
                {/* Subtle corner glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 font-black text-xs tracking-widest mb-4">
                    {item.step}
                  </span>
                  <h3 className="font-bold text-xl mt-3 mb-3 group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* EXAMPLES */}
          <h2 className="mt-32 text-3xl font-black tracking-wide text-white/90 mb-16 text-center">
            Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 group">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest text-center">
                Original Image
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="examples/remove-bg-input.png"
                  alt="Input"
                  className="w-full grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>
            <div className="space-y-3 group">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest text-center">
                AI Detection
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <img
                  src="examples/remove-bg-output.jpg"
                  className="w-full transition-all duration-500 group-hover:scale-105"
                  alt="Processing"
                />
              </div>
            </div>
            <div className="space-y-3 group">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest text-center">
                Final Output
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-500/10">
                <img
                  src="examples/remove-bg-output.jpg"
                  alt="Output"
                  className="w-full transition-all duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

          {/* USE CASES */}
          <h2 className="mt-32 text-3xl font-black tracking-wide text-white/90 mb-16 text-center">
            Common use cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3 group">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest text-center">
                E-Commerce
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6">
                <p className="text-white/70 leading-relaxed">
                  • Product photography & e-commerce
                </p>
              </div>
            </div>
            <div className="space-y-3 group">
              <p className="text-xs font-bold text-white/40 uppercase tracking-widest text-center">
                Creative Projects
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 p-6">
                <p className="text-white/70 leading-relaxed">
                  • Marketing creatives<br/>
                  • Profile & portfolio images<br/>
                  • Design and compositing
                </p>
              </div>
            </div>
            <div className="space-y-3 group">
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest text-center">
                Professional Use
              </p>
              <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 shadow-xl shadow-blue-500/10 p-6">
                <p className="text-white/70 leading-relaxed">
                  • Visual consistency across assets
                </p>
              </div>
            </div>
          </div>

          {/* FOOTER CTA */}
          <div className="mt-28 flex flex-col md:flex-row items-center justify-center gap-6">
            <button
              onClick={() => (user ? navigate("/remove-bg") : setShowLogin(true))}
              className="px-12 py-5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-full font-black text-sm uppercase tracking-widest hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105"
            >
              Start Creating Now
            </button>
            <button
              onClick={() => navigate("/docs")}
              className="px-10 py-5 border border-white/20 text-white/60 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/5 hover:text-white hover:border-white/40 transition-all duration-300"
            >
              View Documentation
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RemoveBackground;