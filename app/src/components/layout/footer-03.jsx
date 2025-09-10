import React from "react";
import { navigateToSection } from "../../utils/navigation";

const scrollToSection = (sectionId) => navigateToSection(sectionId);

export function Footer3() {
  return (
    <section id="footer" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-x-8 lg:grid-cols-4 lg:gap-x-12">
          <div className="flex flex-col">
            <div className="mb-6">
                             <img
                 src="https://muralia.mx/wp-content/uploads/2025/08/ARAD-SYSTEM-LOGO-WHITE.png"
                 alt="ARAD System Logo"
                 className="h-8 w-auto"
               />
            </div>
            <p className="mb-6 max-w-sm">
              Transform historical data into forward-looking insights with ARAD System.
            </p>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold">Product</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="#how-it-works"
                onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}
                className="hover:text-gray-300 transition-colors"
              >
                How it Works
              </a>
              <a
                href="#asset-coverage"
                onClick={(e) => { e.preventDefault(); scrollToSection('asset-coverage'); }}
                className="hover:text-gray-300 transition-colors"
              >
                Asset Coverage
              </a>
              <a
                href="#pricing"
                onClick={(e) => { e.preventDefault(); scrollToSection('pricing'); }}
                className="hover:text-gray-300 transition-colors"
              >
                Pricing
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold">Resources</h3>
            <div className="flex flex-col space-y-4">
              <a
                href="#documentation"
                onClick={(e) => { e.preventDefault(); scrollToSection('documentation'); }}
                className="hover:text-gray-300 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
                className="hover:text-gray-300 transition-colors"
              >
                About us
              </a>
              <a
                href="#faq"
                onClick={(e) => { e.preventDefault(); scrollToSection('faq'); }}
                className="hover:text-gray-300 transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="mb-6 text-lg font-bold">Contact</h3>
            <div className="flex flex-col space-y-4">
              <p>Get in touch with our team</p>
                             <button 
                 className="btn-gradient w-fit"
                 onClick={() => scrollToSection('contact')}
               >
                 Request Access
               </button>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <p className="text-sm text-gray-400">
              © 2024 ARAD System. All rights reserved.
            </p>
            <div className="mt-4 flex space-x-6 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
