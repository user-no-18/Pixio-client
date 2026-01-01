import React, { useContext, useState } from "react";
import { Menu } from "lucide-react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { useNavigate } from "react-router-dom";
import Aurora from "./Aurora";
import DarkVeil from "./Darkveil";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const AIMarketplaceHome = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white relative">

      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white/10 hover:bg-white/20"
      >
        <Menu size={20} />
      </button>

      <VerticalNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        />
      )}

      <main className="pt-16 lg:ml-64 min-h-screen">
        <section className="min-h-[calc(100vh-4rem)] flex items-center px-6 relative">

          <div className="absolute inset-0 z-0 pointer-events-none">
            <div style={{ width: "100%", height: "600px", position: "relative" }}>
              <DarkVeil />
            </div>
          </div>

          <div className="absolute inset-0 bg-black/10 z-[1]" />

          <motion.div
            className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 items-center"
            variants={container}
            initial="hidden"
            animate="visible"
          >

            <motion.div className="z-10" variants={container}>

              <motion.h1
                variants={fadeUp}
                className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
              >
                AI-Powered <br /> Image Platform
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-white/60 max-w-md"
              >
                Professional AI tools for creators, designers, and developers.
                Build faster with intelligent image workflows.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-8 flex gap-4">
                {user ? (
                  <>
                    <button
                      onClick={() => navigate("/docs")}
                      className="px-6 py-3 bg-white text-black rounded font-semibold"
                    >
                      Read Docs
                    </button>
                    <button
                      onClick={() => navigate("/buy")}
                      className="px-6 py-3 border border-white/20 rounded"
                    >
                      Credits
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setShowLogin(true)}
                      className="px-6 py-3 bg-white text-black rounded font-semibold"
                    >
                      Get Started
                    </button>
                    <button
                      onClick={() => navigate("/buy")}
                      className="px-6 py-3 border border-white/20 rounded"
                    >
                      Pricing
                    </button>
                  </>
                )}
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10"
            >
           <iframe
  className="w-full h-full pointer-events-none"
  src="https://www.youtube.com/embed/6ktXlBDf4hQ?autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1&fs=0&playlist=6ktXlBDf4hQ&t=9s"
  title="Cleanup Demo"
  allow="autoplay; encrypted-media"
/>


            </motion.div>

          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default AIMarketplaceHome;
