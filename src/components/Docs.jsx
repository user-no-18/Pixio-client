import React, { useState } from 'react';
import { 
  Sparkles, Eraser, Maximize2, Type, Crop, Layers, ImagePlus, 
  ChevronRight, Book, Rocket, CreditCard, HelpCircle, Shield,
  Code, Users, Zap, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';

const DocumentationSection = () => {
  const [activeSection, setActiveSection] = useState('intro');

  const navigation = [
    { id: 'intro', label: 'Introduction', icon: <Book size={18} /> },
    { id: 'getting-started', label: 'Getting Started', icon: <Rocket size={18} /> },
    { id: 'tools', label: 'AI Tools', icon: <Sparkles size={18} /> },
    { id: 'api', label: 'API Documentation', icon: <Code size={18} /> },
    { id: 'pricing', label: 'Pricing & Credits', icon: <CreditCard size={18} /> },
    { id: 'faq', label: 'FAQ & Troubleshooting', icon: <HelpCircle size={18} /> },
    { id: 'legal', label: 'Legal & Policies', icon: <Shield size={18} /> }
  ];

  const tools = [
    {
      id: 'cleanup',
      icon: <Sparkles size={24} />,
      name: 'Image Cleanup',
      description: 'Remove unwanted objects from images with AI precision',
      input: 'JPG, PNG, WebP (max 10MB)',
      output: 'PNG with transparent removed areas',
      credits: '1 credit per image',
      errors: ['File too large', 'Unsupported format', 'Processing timeout']
    },
    {
      id: 'upscale',
      icon: <Maximize2 size={24} />,
      name: 'Image Upscaling',
      description: 'Enhance resolution up to 4x without quality loss',
      input: 'JPG, PNG (max 5MB, min 256px)',
      output: 'High-res PNG/JPG',
      credits: '2 credits (2x), 4 credits (4x)',
      errors: ['Image too small', 'Memory limit exceeded', 'Invalid scale factor']
    },
    {
      id: 'remove-bg',
      icon: <Eraser size={24} />,
      name: 'Remove Background',
      description: 'Instant background removal with alpha transparency',
      input: 'JPG, PNG, WebP (max 10MB)',
      output: 'PNG with transparent background',
      credits: '1 credit per image',
      errors: ['No subject detected', 'Complex background', 'Low contrast']
    },
    {
      id: 'remove-text',
      icon: <Type size={24} />,
      name: 'Remove Text',
      description: 'Erase text and watermarks intelligently',
      input: 'JPG, PNG (max 10MB)',
      output: 'Clean image without text',
      credits: '1 credit per image',
      errors: ['No text detected', 'Text too small', 'Processing failed']
    },
    {
      id: 'replace-bg',
      icon: <Layers size={24} />,
      name: 'Replace Background',
      description: 'Generate or upload custom backgrounds',
      input: 'JPG, PNG + text prompt or bg image',
      output: 'Composite image with new background',
      credits: '2 credits per generation',
      errors: ['Invalid prompt', 'Background mismatch', 'Blending failed']
    },
    {
      id: 'text-to-image',
      icon: <ImagePlus size={24} />,
      name: 'Text to Image',
      description: 'Generate images from text descriptions',
      input: 'Text prompt (min 10 chars)',
      output: 'AI-generated PNG (512x512 or 1024x1024)',
      credits: '3 credits (512px), 5 credits (1024px)',
      errors: ['Prompt too short', 'Unsafe content', 'Generation failed']
    },
    {
      id: 'uncrop',
      icon: <Crop size={24} />,
      name: 'Uncrop',
      description: 'Expand images beyond original borders',
      input: 'JPG, PNG (max 5MB)',
      output: 'Extended image with AI-generated areas',
      credits: '2 credits per expansion',
      errors: ['Invalid dimensions', 'Expansion too large', 'Style mismatch']
    }
  ];

  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/cleanup',
      description: 'Remove objects from image',
      params: ['image (file)', 'mask (optional)']
    },
    {
      method: 'POST',
      endpoint: '/api/upscale',
      description: 'Upscale image resolution',
      params: ['image (file)', 'scale (2 or 4)']
    },
    {
      method: 'POST',
      endpoint: '/api/remove-background',
      description: 'Remove image background',
      params: ['image (file)']
    },
    {
      method: 'POST',
      endpoint: '/api/text-to-image',
      description: 'Generate image from text',
      params: ['prompt (string)', 'size (512 or 1024)']
    }
  ];

  const faqs = [
    {
      q: 'Why did my upload fail?',
      a: 'Common causes: file size exceeds 10MB, unsupported format, or poor internet connection. Try compressing your image or converting to JPG/PNG.'
    },
    {
      q: 'Credits deducted but no result?',
      a: 'If processing fails after credit deduction, contact support with your transaction ID. We typically refund failed operations within 24 hours.'
    },
    {
      q: 'Why did generation fail?',
      a: 'Failed generations can occur due to: unsafe content detection, server overload, or corrupted input files. Credits are only deducted for successful operations.'
    },
    {
      q: 'How long does processing take?',
      a: 'Most operations complete in 5-15 seconds. Large upscaling (4x) or complex background replacements may take up to 30 seconds.'
    },
    {
      q: 'Can I batch process images?',
      a: 'Batch processing is available for Remove Background and Cleanup tools. Upload multiple files and process them sequentially.'
    }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'intro':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">Welcome to Pixio</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Pixio is an AI-powered image processing marketplace that brings professional-grade tools to creators, designers, and developers. Transform your workflow with cutting-edge AI technology.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Who It's For</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Content creators, e-commerce businesses, designers, developers, and anyone who needs fast, professional image processing.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">What It Does</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Provides 7 AI-powered tools for image cleanup, enhancement, background manipulation, text generation, and more—all in one platform.
                </p>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-6">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Problems Solved</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Eliminates tedious manual editing, expensive software subscriptions, and slow processing times with instant AI automation.
                </p>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Key Benefits</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'No software installation required',
                  'Process images in seconds',
                  'Pay only for what you use',
                  'Professional-quality results',
                  'API access for automation',
                  'Secure and private processing'
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-white/40" />
                    <span className="text-white/70">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'getting-started':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">Getting Started</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Start using Pixio in minutes. Follow these simple steps to begin transforming your images with AI.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Create Your Account</h3>
                    <p className="text-white/70 mb-4">
                      Click "Login" in the top navbar and sign up with your email. New users receive 5 free credits to explore our tools.
                    </p>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                      <p className="text-sm text-white/60">
                        <strong className="text-white">Pro Tip:</strong> Use a Google or GitHub account for instant sign-up without email verification.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold">2</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Understanding Credits</h3>
                    <p className="text-white/70 mb-4">
                      Credits are consumed when you process images. Different tools use different amounts based on computational complexity.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                        <h4 className="font-bold mb-2 text-sm">Free Tier</h4>
                        <ul className="space-y-1 text-sm text-white/60">
                          <li>• 5 credits on signup</li>
                          <li>• Limited to 5 images/day</li>
                          <li>• Standard processing speed</li>
                        </ul>
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                        <h4 className="font-bold mb-2 text-sm">Paid Plans</h4>
                        <ul className="space-y-1 text-sm text-white/60">
                          <li>• 50-500+ credits/month</li>
                          <li>• Unlimited daily usage</li>
                          <li>• Priority processing queue</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center font-bold">3</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">Basic Workflow</h3>
                    <p className="text-white/70 mb-6">Every tool follows the same simple three-step process:</p>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                        <p className="font-bold mb-1">Upload</p>
                        <p className="text-sm text-white/60">Select your image file</p>
                      </div>
                      <ChevronRight size={20} className="text-white/40" />
                      <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                        <p className="font-bold mb-1">Process</p>
                        <p className="text-sm text-white/60">AI analyzes & transforms</p>
                      </div>
                      <ChevronRight size={20} className="text-white/40" />
                      <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-4 text-center">
                        <p className="font-bold mb-1">Download</p>
                        <p className="text-sm text-white/60">Get your result instantly</p>
                      </div>
                    </div>
                    <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                      <p className="text-sm text-white/60">
                        <strong className="text-white">Note:</strong> Credits are only deducted after successful processing. Failed operations don't consume credits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'tools':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">AI Tools Documentation</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Detailed documentation for each AI tool, including requirements, outputs, and credit costs.
              </p>
            </div>

            <div className="space-y-6">
              {tools.map((tool) => (
                <div key={tool.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-8 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1">{tool.name}</h3>
                      <p className="text-white/60">{tool.description}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Input Format</p>
                        <p className="text-sm text-white/80">{tool.input}</p>
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Output Format</p>
                        <p className="text-sm text-white/80">{tool.output}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Credit Cost</p>
                        <p className="text-sm text-white/80 font-bold">{tool.credits}</p>
                      </div>
                      <div className="bg-black/40 border border-white/10 rounded-lg p-4">
                        <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">Common Errors</p>
                        <div className="space-y-1">
                          {tool.errors.map((error, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <XCircle size={14} className="text-white/40" />
                              <p className="text-sm text-white/60">{error}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">API Documentation</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Integrate Pixio's AI tools into your applications with our REST API. Automate image processing at scale.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">Authentication</h3>
              <p className="text-white/70 mb-6">
                All API requests require an API key. Generate yours from your account dashboard.
              </p>
              <div className="bg-black/60 border border-white/10 rounded-lg p-6 font-mono text-sm">
                <div className="text-white/60 mb-2">// Add to request headers</div>
                <div className="text-white">Authorization: Bearer YOUR_API_KEY</div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Endpoints</h3>
              {apiEndpoints.map((endpoint, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-sm font-bold">
                      {endpoint.method}
                    </span>
                    <code className="text-white/80 font-mono">{endpoint.endpoint}</code>
                  </div>
                  <p className="text-white/70 mb-6">{endpoint.description}</p>
                  
                  <div className="bg-black/60 border border-white/10 rounded-lg p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Parameters</p>
                    <div className="space-y-2 font-mono text-sm">
                      {endpoint.params.map((param, i) => (
                        <div key={i} className="text-white/80">• {param}</div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 bg-black/60 border border-white/10 rounded-lg p-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-3">Example Request</p>
                    <pre className="text-sm text-white/80 font-mono overflow-x-auto">
{`curl -X POST https://api.pixio.ai${endpoint.endpoint} \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@photo.jpg"`}
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">Pricing & Credits</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Transparent, pay-as-you-go pricing. Only pay for what you use with our credit system.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-4xl font-black mb-6">$0</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    5 credits on signup
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    5 images per day
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Standard processing
                  </li>
                </ul>
                <button className="w-full py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors font-semibold">
                  Current Plan
                </button>
              </div>

              <div className="bg-white/[0.02] border-2 border-white/20 rounded-xl p-8 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black rounded-full text-xs font-bold">
                  POPULAR
                </div>
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-4xl font-black mb-6">$19<span className="text-lg font-normal text-white/60">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    100 credits/month
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Unlimited daily usage
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    API access
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-black rounded-lg hover:bg-white/90 transition-colors font-bold">
                  Upgrade Now
                </button>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-2">Business</h3>
                <p className="text-4xl font-black mb-6">$49<span className="text-lg font-normal text-white/60">/mo</span></p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    500 credits/month
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Unlimited daily usage
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Priority processing
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Full API access
                  </li>
                  <li className="flex items-center gap-2 text-white/70">
                    <CheckCircle size={18} className="text-white/40" />
                    Dedicated support
                  </li>
                </ul>
                <button className="w-full py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-colors font-semibold">
                  Contact Sales
                </button>
              </div>
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">How Credits Work</h3>
              <p className="text-white/70 mb-6">
                Each tool consumes a specific number of credits based on computational requirements. Credits never expire.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { tool: 'Cleanup, Remove BG, Remove Text', cost: '1 credit' },
                  { tool: 'Upscaling (2x)', cost: '2 credits' },
                  { tool: 'Replace Background, Uncrop', cost: '2 credits' },
                  { tool: 'Text to Image (512px)', cost: '3 credits' },
                  { tool: 'Upscaling (4x)', cost: '4 credits' },
                  { tool: 'Text to Image (1024px)', cost: '5 credits' }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-black/40 border border-white/10 rounded-lg p-4">
                    <span className="text-white/70">{item.tool}</span>
                    <span className="font-bold">{item.cost}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">FAQ & Troubleshooting</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Common questions and solutions to help you get the most out of Pixio.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/[0.02] border border-white/10 rounded-xl p-8 hover:bg-white/[0.04] transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                      <HelpCircle size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                      <p className="text-white/70 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
              <div className="flex items-start gap-4">
                <AlertCircle size={24} className="text-white/60 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-3">Still Need Help?</h3>
                  <p className="text-white/70 mb-6">
                    If you're experiencing issues not covered here, our support team is ready to assist you.
                  </p>
                  <button className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-white/90 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-12">
            <div>
              <h1 className="text-5xl font-black mb-6">Legal & Policies</h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-3xl">
                Important legal information about using Pixio's services.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Terms of Service</h3>
                <div className="space-y-4 text-white/70">
                  <p>
                    By using Pixio, you agree to our terms of service. You must be at least 18 years old to use our services.
                  </p>
                  <p>
                    You retain all rights to images you upload. Pixio processes images solely to provide the requested service and does not claim ownership of your content.
                  </p>
                  <p>
                    We reserve the right to refuse service for content that violates our usage policy, including but not limited to illegal content, hate speech, or content that infringes on others' rights.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Privacy Policy</h3>
                <div className="space-y-4 text-white/70">
                  <p>
                    Your privacy is important to us. We collect only essential information needed to provide our services: email, payment info, and usage data.
                  </p>
                  <p>
                    Uploaded images are automatically deleted from our servers after 24 hours. We do not use your images to train AI models or share them with third parties.
                  </p>
                  <p>
                    We use industry-standard encryption to protect your data in transit and at rest. Payment processing is handled by secure third-party providers.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Usage Policy</h3>
                <div className="space-y-4 text-white/70">
                  <p>
                    Pixio may be used for any legal purpose. Prohibited uses include: creating deepfakes without consent, generating illegal content, processing copyrighted material without authorization, or any activity that violates laws or regulations.
                  </p>
                  <p>
                    You are responsible for ensuring you have the right to process any images you upload and that your use of generated content complies with applicable laws.
                  </p>
                  <p>
                    We reserve the right to terminate accounts that violate our usage policy without refund.
                  </p>
                </div>
              </div>

              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-8">
                <h3 className="text-2xl font-bold mb-4">Refund Policy</h3>
                <div className="space-y-4 text-white/70">
                  <p>
                    Credits are non-refundable once purchased. However, if a processing error occurs and credits are deducted without delivering results, we will refund those credits within 24 hours.
                  </p>
                  <p>
                    Subscription cancellations take effect at the end of the current billing period. Unused credits do not expire and remain available after cancellation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex">
        {/* Documentation Sidebar */}
        <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/10 overflow-y-auto">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">Documentation</h2>
          </div>
          <nav className="p-4">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-all ${
                  activeSection === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="ml-64 flex-1 p-12">
          <div className="max-w-5xl">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocumentationSection;