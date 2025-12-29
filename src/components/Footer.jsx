import React from "react";
import { assets } from "../assets/assets";

// icons taken from internet

const LinkedInIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z"/>
  </svg>
);

const GitHubIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const MailIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-black  mt-5 ml-10">
      <div className="max-w-6xl mx-auto px-6 py-12 lg:ml-64">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
          {/* Brand Section */}
          <div className="flex items-center gap-3">
            <img src={assets.logo_icon} alt="Pixio Logo" width={36} />
            <div>
              <p className="font-bold text-white text-lg">Pixio</p>
              <p className="text-xs text-white/50 mt-1">Made for Practice purpose only</p>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <p className="font-semibold text-white mb-4">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.linkedin.com/in/debjyotiroy018/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition"
                >
                  <LinkedInIcon className="w-4 h-4" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:debjyoti2409@gmail.com"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition"
                >
                  <MailIcon className="w-4 h-4" />
                  Email
                </a>
              </li>
            </ul>
          </div>

          {/* Documentation Section */}
          <div>
            <p className="font-semibold text-white mb-4">Documentation</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/user-no-18/Pixio-server#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition"
                >
                  Docs
                </a>
              </li>
              <li>
                <a
                  href="https://clipdrop.co/apis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition"
                >
                  API Docs
                </a>
              </li>
            </ul>
          </div>

          {/* Community Section */}
          <div>
            <p className="font-semibold text-white mb-4">Community</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/user-no-18/Pixio-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/60 hover:text-white transition"
                >
                  <GitHubIcon className="w-4 h-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/user-no-18/Pixio-server/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition"
                >
                  Report an issue
                </a>
              </li>
              <li className="text-xs text-white/50">
                Open to open-source pull requests
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;