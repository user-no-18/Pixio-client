import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Eraser,
  Maximize2,
  Type,
  Crop,
  Layers,
  ImagePlus,
  Book,
  Rocket,
  Wrench,
  CreditCard,
  HelpCircle,
  Shield,
  FileText,
  CheckCircle,
  XCircle,
  Camera,
  Menu,
  X,
} from "lucide-react";

const PixioDocumentation = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sectionRefs = {
    overview: useRef(null),
    getting_started: useRef(null),
    tools: useRef(null),
    examples: useRef(null),
    pricing: useRef(null),
    faq: useRef(null),
    limitations: useRef(null),
    legal: useRef(null),
  };

  const navigation = [
    { id: "overview", label: "Overview", icon: <Book size={18} /> },
    {
      id: "getting_started",
      label: "Getting Started",
      icon: <Rocket size={18} />,
    },
    { id: "tools", label: "Tools Guide", icon: <Wrench size={18} /> },
    { id: "examples", label: "Examples", icon: <Camera size={18} /> },
    {
      id: "pricing",
      label: "Credits & Pricing",
      icon: <CreditCard size={18} />,
    },
    {
      id: "faq",
      label: "FAQ & Troubleshooting",
      icon: <HelpCircle size={18} />,
    },
    {
      id: "limitations",
      label: "Limitations & Notes",
      icon: <FileText size={18} />,
    },
    { id: "legal", label: "Legal", icon: <Shield size={18} /> },
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setIsSidebarOpen(false);
    sectionRefs[sectionId]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: "-100px 0px -50% 0px" }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const tools = [
    {
      id: "cleanup",
      icon: <Sparkles size={28} />,
      name: "Image Cleanup",
      purpose:
        "Remove unwanted objects, blemishes, or distractions from images using AI-powered content-aware fill.",
      inputs: "JPG, PNG, WebP (max 10MB)",
      steps: [
        "Upload your image",
        "Use brush tool to mark objects to remove",
        'Click "Process" to remove marked areas',
        "Download cleaned image",
      ],
      output: "PNG with transparent or filled removed areas",
      credits: "1 credit per image",
    },
    {
      id: "upscale",
      icon: <Maximize2 size={28} />,
      name: "Image Upscaling",
      purpose:
        "Enhance image resolution up to 4x using AI super-resolution without quality loss.",
      inputs: "JPG, PNG (max 5MB, minimum 256x256px)",
      steps: [
        "Upload your image",
        "Select scale factor (2x or 4x)",
        'Click "Upscale"',
        "Download high-resolution result",
      ],
      output: "High-resolution PNG or JPG",
      credits: "2 credits (2x), 4 credits (4x)",
    },
    {
      id: "remove-bg",
      icon: <Eraser size={28} />,
      name: "Remove Background",
      purpose:
        "Automatically detect and remove image backgrounds with alpha transparency.",
      inputs: "JPG, PNG, WebP (max 10MB)",
      steps: [
        "Upload your image",
        "AI automatically detects subject",
        "Background removed instantly",
        "Download PNG with transparency",
      ],
      output: "PNG with transparent background",
      credits: "1 credit per image",
    },
    {
      id: "remove-text",
      icon: <Type size={28} />,
      name: "Remove Text",
      purpose:
        "Intelligently erase text, watermarks, or typography from images.",
      inputs: "JPG, PNG (max 10MB)",
      steps: [
        "Upload image with text",
        "AI detects text automatically",
        "Text removed and filled intelligently",
        "Download clean result",
      ],
      output: "Clean image without text",
      credits: "1 credit per image",
    },
    {
      id: "replace-bg",
      icon: <Layers size={28} />,
      name: "Replace Background",
      purpose:
        "Generate AI backgrounds from text descriptions or upload custom backgrounds.",
      inputs: "JPG, PNG + text prompt or background image",
      steps: [
        "Upload subject image",
        "Enter background description or upload background",
        "AI generates or composites background",
        "Download composite image",
      ],
      output: "Composite image with new background",
      credits: "2 credits per generation",
    },
    {
      id: "text-to-image",
      icon: <ImagePlus size={28} />,
      name: "Text to Image",
      purpose: "Generate original images from text descriptions using AI.",
      inputs: "Text prompt (minimum 10 characters)",
      steps: [
        "Enter detailed text description",
        "Select resolution (512x512 or 1024x1024)",
        'Click "Generate"',
        "Download AI-generated image",
      ],
      output: "AI-generated PNG (512x512 or 1024x1024)",
      credits: "3 credits (512px), 5 credits (1024px)",
    },
    {
      id: "uncrop",
      icon: <Crop size={28} />,
      name: "Uncrop / Expand",
      purpose:
        "Extend images beyond original borders using AI to generate new areas.",
      inputs: "JPG, PNG (max 5MB)",
      steps: [
        "Upload your image",
        "Specify expansion direction and amount",
        "AI generates extended areas",
        "Download expanded image",
      ],
      output: "Extended image with AI-generated areas",
      credits: "2 credits per expansion",
    },
  ];

  const examples = [
    {
      useCase: "E-commerce Product Photos",
      description:
        "Remove backgrounds from product images for clean, professional listings",
      tool: "Remove Background",
      before: "Product photo with cluttered background",
      after: "Clean product on transparent background",
    },
    {
      useCase: "Social Media Content",
      description: "Upscale low-res images for high-quality posts",
      tool: "Image Upscaling",
      before: "Blurry 500x500px image",
      after: "Sharp 2000x2000px image",
    },
    {
      useCase: "Photo Restoration",
      description: "Remove unwanted objects or people from photos",
      tool: "Image Cleanup",
      before: "Photo with photobombers",
      after: "Clean scene without distractions",
    },
    {
      useCase: "Marketing Materials",
      description: "Generate custom backgrounds for product shots",
      tool: "Replace Background",
      before: "Studio product photo",
      after: "Product in lifestyle setting",
    },
  ];

  const faqs = [
    {
      q: "Why did my upload fail?",
      a: "Common causes include: file size exceeds limit (10MB for most tools, 5MB for upscaling), unsupported format, or poor internet connection. Try compressing your image or converting to JPG/PNG.",
    },
    {
      q: "My credits were deducted but I got no result. What now?",
      a: "If processing fails after credit deduction, contact support with your transaction ID. We refund failed operations within 24 hours. Credits are only consumed when processing completes successfully.",
    },
    {
      q: "Why did image generation fail?",
      a: "Generation can fail due to: unsafe content detection in your prompt, server overload during peak hours, or technical issues. Credits are never charged for failed generations.",
    },
    {
      q: "How long does processing take?",
      a: "Most operations complete in 5-15 seconds. Large upscaling (4x) or complex background replacements may take up to 30 seconds. Processing times vary based on image size and server load.",
    },
    {
      q: "Can I process multiple images at once?",
      a: "Batch processing is available for Remove Background and Image Cleanup tools. Upload multiple files and they will be processed sequentially. Other tools process one image at a time.",
    },
    {
      q: "What happens to my uploaded images?",
      a: "All uploaded images are automatically deleted from our servers after 24 hours. We do not store, analyze, or use your images for any purpose beyond providing the requested service.",
    },
  ];

  return (
   <div className="min-h-screen bg-black text-white">
  {/* Mobile Header with Hamburger 
    Modified: top-16 ensures it stays below the global Navbar 
  */}
  <div className="lg:hidden fixed top-16 left-0 right-0 z-50 bg-black border-b border-white/10 px-4 py-4 flex items-center justify-between">
    <h2 className="text-lg font-bold">Documentation</h2>
    <button
      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
    >
      {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>

  {/* Main Layout Wrapper 
    Modified: Removed lg:pt-0 to keep the 64px offset on large screens 
  */}
  <div className="flex pt-32 lg:pt-16">
    {/* Sidebar 
      Modified: top-16 and h-[calc(100vh-4rem)] kept for ALL screens to prevent global Navbar overlap 
    */}
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-black border-r border-white/10 overflow-y-auto z-40 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="p-6 border-b border-white/10 hidden lg:block">
        <h2 className="text-lg font-bold">Documentation</h2>
      </div>
      <nav className="p-4">
        {navigation.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all text-left ${
              activeSection === item.id
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>

    {/* Overlay for mobile */}
    {isSidebarOpen && (
      <div
        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        onClick={() => setIsSidebarOpen(false)}
      />
    )}

    {/* Main Content 
      Modified: lg:ml-64 provides space for the fixed sidebar on desktop
    */}
    <main className="w-full lg:ml-64 px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-12">
      <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16 md:space-y-24">
        {/* Overview Section 
            Note: scroll-mt-24 ensures anchor links stop below the fixed Navbar
        */}
        <section
          id="overview"
          ref={sectionRefs.overview}
          className="scroll-mt-24"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
            Pixio Documentation
          </h1>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 sm:mb-12">
            Pixio is an AI-powered image processing marketplace that brings
            professional-grade tools to creators, designers, and developers.
            Transform your workflow with cutting-edge AI technology.
          </p>

          <div className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                What Pixio Does
              </h2>
              <p className="text-white/70 leading-relaxed">
                Pixio provides seven specialized AI tools for advanced image
                workflows, including Cleanup for object removal, Image
                Upscaling for quality enhancement, Background Removal, Text
                Removal, Background Replacement, Text-to-Image generation,
                and Uncrop for intelligent image expansion. These tools
                allow complex image editing and generation tasks to be
                completed in seconds with consistent, professional results.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Who It's For
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Content creators, e-commerce businesses, graphic designers,
                social media managers, developers, and anyone who needs
                fast, professional image processing without expensive
                software or technical expertise.
              </p>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                Key Features
              </h2>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[
                  "Process images in 5-15 seconds",
                  "No software installation required",
                  "Pay-per-use credit system",
                  "Professional AI-powered results",
                  "REST API for automation",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 bg-white/[0.02] border border-white/10 rounded-lg p-3 sm:p-4"
                  >
                    <CheckCircle
                      size={18}
                      className="text-white/40 flex-shrink-0"
                    />
                    <span className="text-sm sm:text-base text-white/80">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started Section */}
        <section
          id="getting_started"
          ref={sectionRefs.getting_started}
          className="scroll-mt-24"
        >
          <h1 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
            Getting Started
          </h1>

          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                    Create Your Account
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 mb-4">
                    Click "Login" in the top navbar and sign up with your
                    email or Google account. Email verification is
                    required for email signups. New users receive 5 free
                    credits to explore the platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3">
                    Understanding Credits
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 mb-4">
                    Credits are consumed when you successfully process
                    images. Different tools require different credit amounts
                    based on computational requirements. Credits never
                    expire and failed operations don't consume credits.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                      <h4 className="font-bold mb-2 text-sm sm:text-base">
                        Free Tier
                      </h4>
                      <ul className="space-y-1 text-xs sm:text-sm text-white/60">
                        <li>• 5 credits on signup</li>
                        <li>• 1 images per day limit (for testing mode)</li>
                        <li>• Standard processing speed</li>
                      </ul>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                      <h4 className="font-bold mb-2 text-sm sm:text-base">
                        Paid Plans
                      </h4>
                      <ul className="space-y-1 text-xs sm:text-sm text-white/60">
                        <li>• 100-5000 credits availabe by plans</li>
                        <li>• Unlimited daily usage</li>
                        <li>• Priority processing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Guide Section */}
        <section
          id="tools"
          ref={sectionRefs.tools}
          className="scroll-mt-24"
        >
          <h1 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
            Tools Guide
          </h1>
          <p className="text-lg sm:text-xl text-white/70 mb-6 sm:mb-8">
            Comprehensive guide to each AI tool with usage instructions and
            specifications.
          </p>

          <div className="space-y-4 sm:space-y-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8"
              >
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 flex-shrink-0">
                    {tool.icon}
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">
                      {tool.name}
                    </h3>
                    <p className="text-sm sm:text-base text-white/60">
                      {tool.purpose}
                    </p>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                        Inputs Required
                      </p>
                      <p className="text-xs sm:text-sm text-white/80">
                        {tool.inputs}
                      </p>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                        Output Format
                      </p>
                      <p className="text-xs sm:text-sm text-white/80">
                        {tool.output}
                      </p>
                    </div>

                    <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
                        Credit Cost
                      </p>
                      <p className="text-xs sm:text-sm text-white/80 font-bold">
                        {tool.credits}
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/10 rounded-lg p-3 sm:p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">
                      Step-by-Step Usage
                    </p>
                    <ol className="space-y-2">
                      {tool.steps.map((step, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm text-white/70"
                        >
                          <span className="font-bold text-white/40">
                            {idx + 1}.
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section
          id="faq"
          ref={sectionRefs.faq}
          className="scroll-mt-24"
        >
          <h1 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
            FAQ & Troubleshooting
          </h1>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <HelpCircle
                    size={20}
                    className="text-white/40 flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Legal Section */}
        <section
          id="legal"
          ref={sectionRefs.legal}
          className="scroll-mt-24 pb-12 sm:pb-24"
        >
          <h1 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
            Legal & Policies
          </h1>
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Privacy Policy
              </h3>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                Uploaded images are automatically deleted from our servers
                after 24 hours. We do not use your images to train AI
                models or share them with third parties.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</div>
  );
};

export default PixioDocumentation;