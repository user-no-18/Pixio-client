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
import MobileBackArrow from "./MobileArrow";

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
        "Upload your original image",
        "Upload a black and white mask image that defines the areas to be removed",
        "White areas in the mask will be cleaned, black areas will be preserved",
        "Click Process to apply the cleanup",
        "Download the cleaned image",
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
      credits: "1 credits per image",
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
      credits: "1 credits per generation",
    },
    {
      id: "text-to-image",
      icon: <ImagePlus size={28} />,
      name: "Text to Image",
      purpose: "Generate original images from text descriptions using AI.",
      inputs: "Text prompt ",
      steps: [
        "Enter detailed text description",
        "AI will generate image",
        'Click "Generate"',
        "Download AI-generated image",
      ],
      output: "AI-generated PNG (512x512 or 1024x1024)",
      credits: "1 credits per image",
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

        "AI generates extended areas",
        "Download expanded image",
      ],
      output: "Extended image with AI-generated areas",
      credits: "1 credits per expansion",
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
      a: "Uploads can fail due to large file size, unsupported image format, or unstable internet connection. Try using JPG or PNG format and reduce the image size before uploading.",
    },
    {
      q: "My credits were deducted but I did not get a result. What should I do?",
      a: "In rare cases, processing may fail due to server or API issues. If credits are deducted without a result, you can contact support with details of the issue. We will review it manually.",
    },
    {
      q: "Why did image generation fail?",
      a: "Image generation can fail due to unsafe or restricted prompt content, temporary server load, or internal errors. Credits are only deducted when the operation is successfully completed.",
    },
    {
      q: "How long does processing take?",
      a: "Most image processing tasks complete within a few seconds. Processing time depends on image size, tool type, and current server load. There is no fixed processing time guarantee.",
    },
    {
      q: "Do you support 4x or custom resolution upscaling?",
      a: "Pixio currently does not provide options to manually select 2x or 4x resolution. The upscaling output is automatically handled by the underlying AI model.",
    },
    {
      q: "Can I process multiple images at once?",
      a: "Currently, Pixio supports processing one image at a time per tool. Batch processing is not available in this version.",
    },
    {
      q: "What happens to my uploaded images?",
      a: "Uploaded images are temporarily stored only for processing and are automatically deleted after a short period. Pixio does not use uploaded images for training or any other purpose.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <MobileBackArrow />
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

      <div className="flex pt-32 lg:pt-16">
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
                What is Pixio ?
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 sm:mb-12">
                Pixio is a unified AI-powered image editing platform that brings
                clipdrops professional image APIs into a clean, credit-based
                SaaS experience — designed for creators who care about speed,
                design, and simplicity.
              </p>

              <div className="space-y-6 sm:space-y-8">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                    What Pixio Does
                  </h2>
                  <p className="text-white/70 leading-relaxed">
                    Professional AI image tools are powerful but fragmented,
                    forcing users to jump between multiple tools, interfaces,
                    and workflows. Pixio solves this by bringing seven advanced
                    AI image processing tools into a single, seamless platform
                    with a consistent UI and predictable credit-based usage,
                    including Cleanup for object removal, Image Upscaling for
                    quality enhancement, Background Removal, Text Removal,
                    Background Replacement, Text-to-Image generation, and Uncrop
                    for intelligent image expansion. This allows complex image
                    editing and generation tasks to be completed in seconds with
                    consistent, professional results.
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
                        email or Google account. Email verification is required
                        for email signups. New users receive 5 free credits to
                        explore the platform.
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
            {/* Credis and pricing*/}
            <section
              id="credits_pricing"
              ref={sectionRefs.credits_pricing}
              className="scroll-mt-24"
            >
              <h1 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
                Credits & Pricing
              </h1>

              <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-3xl">
                Credits are used to process images across all AI tools. Choose a
                plan that fits your usage needs. All credits are one-time
                purchases and never expire.
              </p>

              <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                {/* Basic Plan */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                      <span className="font-bold">B</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">Basic</h3>
                  </div>

                  <p className="text-sm sm:text-base text-white/60 mb-4">
                    Best for personal use.
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-black">$10</span>
                    <span className="text-white/60 text-sm ml-2">
                      / 100 credits
                    </span>
                  </div>
                </div>

                {/* Advanced Plan */}
                <div className="bg-white/[0.03] border border-white/20 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                      <span className="font-bold">A</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">Advanced</h3>
                  </div>

                  <p className="text-sm sm:text-base text-white/60 mb-4">
                    Best for business use.
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-black">$50</span>
                    <span className="text-white/60 text-sm ml-2">
                      / 500 credits
                    </span>
                  </div>
                </div>

                {/* Business Plan */}
                <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                      <span className="font-bold">E</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">Business</h3>
                  </div>

                  <p className="text-sm sm:text-base text-white/60 mb-4">
                    Best for enterprise use.
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-black">$250</span>
                    <span className="text-white/60 text-sm ml-2">
                      / 5000 credits
                    </span>
                  </div>
                </div>
              </div>
            </section>
            {/* Limitation & Notes */}
            <section
              id="limitations_notes"
              ref={sectionRefs.limitations_notes}
              className="scroll-mt-24"
            >
              <h1 className="text-3xl sm:text-4xl font-black mb-4 sm:mb-6">
                Limitations & Notes
              </h1>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 sm:p-6 md:p-8">
                <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                  <strong>Limitations & Notes:</strong>
                  <br />
                  1. Pixio is a student-built, non-commercial platform and is
                  intended only as a portfolio demonstration.
                  <br />
                  2. Images are processed through Clipdrop APIs; Pixio does not
                  modify AI results or guarantee perfect outputs.
                  <br />
                  3. Currently, batch processing (multiple images at once) is
                  not supported.
                  <br />
                  4. Users cannot manually select output resolution (e.g., 2x,
                  4x) for upscaling; the system automatically chooses output
                  quality.
                  <br />
                  5. Cleanup requires a mask image; there is no automatic “magic
                  brush” functionality.
                  <br />
                  6. Uploaded images are sent to the Clipdrop API for processing
                  and are not permanently stored on Pixio servers.
                  <br />
                  7. Pixio does not store, analyze, or use images for training
                  AI models or any other purpose.
                  <br />
                  8. The platform is in active student development, so UI/UX
                  improvements and additional features may be added over time.
                  <br />
                  9. Users must have rights or permission for the images they
                  upload; Pixio is not responsible for copyright violations.
                </p>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq" ref={sectionRefs.faq} className="scroll-mt-24">
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
                    Uploaded images are sent to Pixio only for processing
                    through the Clipdrop API. Pixio does not store or retain
                    images on its servers permanently. Images are used solely
                    for processing and returned to the user. We do not use your
                    images to train AI models or share them with third parties.
                    <br />
                    By using Pixio, you confirm that you own the rights to the
                    uploaded images or have permission to use them. Pixio is not
                    responsible for content uploaded by users.
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
