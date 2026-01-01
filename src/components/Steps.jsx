import React, { useState } from 'react';
import { 
  Sparkles, Eraser, Maximize2, Type, Crop, Layers, ImagePlus, ArrowRight
} from 'lucide-react';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

const ToolsSummary = () => {
const navigate = useNavigate()
  const {setStep} = useState(AppContext)
  const tools = [
    { icon: <Sparkles size={22} />, name: 'Image Cleanup', description: 'Remove unwanted objects with AI precision' },
    { icon: <Maximize2 size={22} />, name: 'Image Upscaling', description: 'Enhance resolution up to 4x without quality loss' },
    { icon: <Eraser size={22} />, name: 'Remove Background', description: 'Instant background removal with transparency' },
    { icon: <Type size={22} />, name: 'Remove Text', description: 'Erase text and watermarks intelligently' },
    { icon: <Layers size={22} />, name: 'Replace Background', description: 'Generate or upload custom backgrounds' },
    { icon: <ImagePlus size={22} />, name: 'Text to Image', description: 'Generate images from text descriptions' },
    { icon: <Crop size={22} />, name: 'Uncrop', description: 'Expand images beyond original borders' }
  ];

  return (
    
    <div className="min-h-screen bg-black text-white py-24 px-6 lg:ml-64 relative overflow-hidden">
      
      
      
      <div className="absolute top-[80px] left-[0px] w-[400px] h-[200px] bg-gradient-to-r from-blue-900 via-blue-500/15 to-transparent blur-[80px] rounded-full pointer-events-none" />

     
      <div className="max-w-7xl mx-auto relative z-10">
        
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-7xl mb-6">
              A Toolset Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-purple-400">Precision.</span>
            </h2>
            <p className="text-xl text-white/40 font-medium leading-relaxed max-w-2xl">
              Professional-grade image processing powered by cutting-edge neural networks. 
              Efficiency meets absolute precision.
            </p>
          </div>
          <button 
            onClick={() => navigate('/docs')}
            className="group hidden md:flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-white/70 hover:text-white transition-all bg-white/5 px-8 py-4 rounded-full border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10"
          >
            Explore Docs <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="group relative bg-[#080808] border border-white/[0.05] p-8 rounded-[2rem] hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative z-10">
              
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/90 group-hover:bg-purple-600 group-hover:text-white group-hover:shadow-[0_0_25px_rgba(147,51,234,0.3)] transition-all duration-500">
                  {React.cloneElement(tool.icon, { size: 28 })}
                </div>
                
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:text-purple-200 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-white/30 leading-relaxed font-medium text-base">
                    {tool.description}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-10 pt-6 border-t border-white/[0.05] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_#a855f7]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20">
                      1 credit
                    </span>
                  </div>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

       
        <div className="mt-16 flex justify-center py-8 border-t border-white/[0.05]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
            {[
              { label: "Tools Available", val: "7" },
              { label: "File Support", val: "30MB" },
              { label: "Response Time", val: "< 20s" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-3 text-center">
                <span className="text-5xl font-black text-white/90 tracking-tighter italic">{stat.val}</span>
                <span className="text-[11px] uppercase tracking-[0.35em] font-bold text-white/20">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsSummary;