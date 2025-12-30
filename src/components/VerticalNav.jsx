import React, { useContext } from "react";
import { ChevronRight } from "lucide-react";
import { AppContext } from "../contexts/AppContext";

const VerticalNav = ({ sidebarOpen, setSidebarOpen }) => {
  const { step, setStep } = useContext(AppContext);

  const tools = [
     { name: "Home", step: 0},
     { name: "Generate image ✨", step: 6 },
    { name: "Cleanup", step: 1 },
    { name: "Image Upscaling", step: 2 },
    { name: "Remove Background", step: 3 },
    { name: "Remove Text", step: 4 },
    { name: "Replace Background", step: 5 },
    
    { name: "Uncrop", step: 7 },
  ];

  return (
    <aside
  className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 max-w-[85vw]
  bg-black border-r border-white/10 z-40
  transform transition-transform duration-300
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  lg:translate-x-0`}
>
      <div className="p-5 border-b border-white/10 font-semibold">
        AI Tools
      </div>

      <nav className="h-full overflow-y-auto">
        {tools.map((tool) => {
          const active = step === tool.step;

          return (
            <button
  key={tool.step}
  onClick={() => {
    setStep(tool.step);
    if (window.innerWidth < 1024) setSidebarOpen(false);
  }}
  className={`w-full px-5 py-3 text-left text-sm flex justify-between items-center
  hover:bg-white/5 transition-colors
  ${active ? "bg-white/10 font-semibold" : ""}`}
>
  <span
    className={
      tool.step === 6
        ? "text-base font-semibold bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_6px_rgba(168,85,247,0.8)] animate-pulse"
        : ""
    }
  >
    {tool.name}
  </span>

  <ChevronRight size={14} className="opacity-40" />
</button>

          );
        })}
      </nav>
    </aside>
  );
};

export default VerticalNav;
