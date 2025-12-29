import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import VerticalNav from "../components/VerticalNav";
import { Menu } from "lucide-react";
import { link } from "motion/react-client";
import { useNavigate } from "react-router-dom";

const Cleanup = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
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
            Cleanup
          </h1>

          <p className="mt-6 text-white/70 max-w-xl leading-relaxed text-2xl">
            Cleanup is an AI-powered image editing tool designed to remove unwanted
            objects, people, text, or imperfections from images while preserving
            natural textures and visual consistency. It intelligently reconstructs
            the background to deliver clean, professional-quality results in seconds.
          </p>
        </div>

       
        <div className="w-full max-w-2xl aspect-video rounded-md overflow-hidden border border-white/10">
          <video
            src="cleanup-demo.mp4"
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
    How Cleanup works
  </h2>

  <div className="mt-10 grid gap-6">

    <div className="border border-white/15 rounded-lg p-6">
      <h3 className="font-semibold text-lg">1. Upload an image</h3>
      <p className="mt-2 text-white/70 leading-relaxed">
        Upload any image containing unwanted objects, text, or visual distractions.
        Cleanup supports high-resolution images while preserving original quality.
      </p>
    </div>

    <div className="border border-white/15 rounded-lg p-6">
      <h3 className="font-semibold text-lg">2. Select the area to remove</h3>
      <p className="mt-2 text-white/70 leading-relaxed">
        Mark the region you want to remove using a simple brush-based selection.
        The AI understands context beyond the selected pixels.
      </p>
    </div>

    <div className="border border-white/15 rounded-lg p-6">
      <h3 className="font-semibold text-lg">3. AI-powered reconstruction</h3>
      <p className="mt-2 text-white/70 leading-relaxed">
        Cleanup intelligently reconstructs the background by analyzing surrounding
        textures, lighting, and structure for natural-looking results.
      </p>
    </div>

    <div className="border border-white/15 rounded-lg p-6">
      <h3 className="font-semibold text-lg">4. Review and refine</h3>
      <p className="mt-2 text-white/70 leading-relaxed">
        Review the output instantly. Refine the selection if needed and reprocess
        for higher precision.
      </p>
    </div>

    <div className="border border-white/15 rounded-lg p-6">
      <h3 className="font-semibold text-lg">5. Export final image</h3>
      <p className="mt-2 text-white/70 leading-relaxed">
        Download the cleaned image in high quality, ready for professional use
        across marketing, design, or content workflows.
      </p>
    </div>

  </div>

  <h2 className="mt-20 text-2xl font-semibold">
    Example results
  </h2>

  <div className="mt-10 grid gap-10">
<p>Image file</p>
    <div className="w-full rounded-lg overflow-hidden border border-white/10">
      
      <img
        src="/examples/cleanup-example-1.jpg"
        alt="Cleanup example 1"
        className="w-full object-cover"
      />
    </div>
<p>Mask file</p>
    <div className="w-full rounded-lg overflow-hidden border border-white/10">
      <img
        src="/examples/cleanup-example-2.png"
        alt="Cleanup example 2"
        className="w-full object-cover"
      />
    </div>
<p>Result</p>
    <div className="w-full rounded-lg overflow-hidden border border-white/10">
      <img
        src="/examples/cleanup-example-3.jpg"
        alt="Cleanup example 3"
        className="w-full object-cover"
      />
    </div>

  </div>

  <h2 className="mt-20 text-xl font-semibold">
    Common use cases
  </h2>

  <ul className="mt-6 space-y-3 text-white/70">
    <li>• Removing unwanted objects or people from images</li>
    <li>• Cleaning text, logos, and watermarks</li>
    <li>• Enhancing product photography for e-commerce</li>
    <li>• Polishing marketing and advertising visuals</li>
    <li>• Improving image aesthetics for professional content</li>
  </ul>

  {user ? (
  
    <button onClick={()=>{navigate('/cleanup')}} className="mt-14 px-8 py-3 bg-white text-black rounded font-semibold hover:bg-white/90 transition">
      Use Cleanup
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

export default Cleanup;
