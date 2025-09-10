import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "../AnimatedSection";

export function Layout1() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const fullText = "José Andrés combines the precision of an engineer with the mindset of a market strategist. While studying civil engineering at Tecnológico de Monterrey, his curiosity for financial markets—particularly crypto—led him to design his first quantitative strategies. In 2020, he created the Orchid System, an algorithmic framework that became the backbone of digital asset funds by filtering volatility regimes and outperforming benchmarks. By his early twenties, he was the youngest Managing Partner in two of Mexico City's hedge funds, raising over $3M USD and executing $60M+ in trading volume. In 2024, he launched ARAD System, a next-generation strategy that segments drawdowns into states and projects expected returns, today offered to asset managers to navigate uncertainty and capture global opportunities.";
  
  const truncatedText = fullText.substring(0, 250) + "...";
  const shouldTruncate = fullText.length > 250;

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section
      id="about"
      className="px-[5%] py-16 md:py-24 lg:py-28 relative"
      style={{
        backgroundImage: 'url(/images/20MKit.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="container relative z-10">
        {/* Header */}
        <AnimatedSection
          className="mb-12 text-center md:mb-18 lg:mb-20"
          animation="fadeInUp"
        >
          <p className="mb-3 font-semibold md:mb-4">About the Founder</p>
          <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl max-w-6xl mx-auto">
            The Mind Behind ARAD
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Column 1 - Founder's Image */}
          <div>
            <AnimatedItem className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-xl h-full">
                <img
                  src="/images/José_Andrés_Ruiz_Elizondo.jpg"
                  alt="José Andrés Ruiz - Founder & Algorithmic Trader"
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={400}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-1">
                    José Andrés Ruiz
                  </h3>
                  <p className="text-geraldine font-medium">
                    Founder & Quantitative Strategist
                  </p>
                </div>
              </div>
            </AnimatedItem>
          </div>


          {/* Columns 2 & 3 - Bio */}
          <div className="lg:col-span-2">
            <AnimatedItem className="bg-gradient-to-br from-meteorite/90 to-medium-red-violet/90 text-white p-8 rounded-2xl shadow-lg h-full">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Redefining Algorithmic Trading
              </h2>
              <div className="prose prose-invert max-w-none text-white">
                <p className="mb-6 text-white">
                  {/* Show text based on screen size and expansion state */}
                  {isMobile ? (isExpanded ? fullText : truncatedText) : fullText}
                  
                  {/* Show More/Less button only on mobile */}
                  {isMobile && shouldTruncate && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="ml-2 text-geraldine hover:text-geraldine/80 underline font-medium transition-colors"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  )}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="px-6 py-3 bg-white text-meteorite rounded-lg font-medium hover:bg-opacity-90 transition-all"
                  >
                    Contact José
                  </button>
                  <button
                    onClick={() =>
                      window.open(
                        "https://www.linkedin.com/in/yourprofile",
                        "_blank"
                      )
                    }
                    className="px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-all"
                  >
                    View LinkedIn
                  </button>
                </div>
              </div>
            </AnimatedItem>
          </div>

          {/* Second Row - Metrics */}
          <div>
            <AnimatedItem className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm border-l-4 border-geraldine h-full">
              <h4 className="font-semibold text-lg mb-4 text-ink-1">
                Key Milestones
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Trading Volume Executed", value: "$60M+", highlight: true },
                  { label: "Capital Raised", value: "$3M+" },
                  { label: "Hedge Funds Founded", value: "2" },
                  { label: "Years in Quantitative Finance", value: "5+" },
                  { label: "Systems Developed", value: "Orchid & ARAD" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center pb-2 border-b border-geraldine/20"
                  >
                    <span className="text-sm md:text-base text-ink-2">{item.label}</span>
                    <span
                      className={`font-semibold ${
                        item.highlight ? "text-geraldine" : "text-ink-1"
                      }`}
                    >
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          </div>

          <div>
            <AnimatedItem className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm h-full">
              <h4 className="font-semibold text-lg mb-4 text-ink-1">
                Performance Metrics
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Avg Annual Return (3Y)", value: "+42.5%", highlight: true },
                  { label: "Max Drawdown", value: "-12.3%" },
                  { label: "Sharpe Ratio (3Y)", value: "2.8" },
                  { label: "Win Rate", value: "68.2%" },
                  { label: "Risk-Adjusted Return", value: "+35.1%" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center pb-2 border-b border-border/20"
                  >
                    <span className="text-sm md:text-base text-ink-2">{item.label}</span>
                    <span
                      className={`font-semibold ${
                        item.highlight ? "text-geraldine" : "text-ink-1"
                      }`}
                    >
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          </div>

          <div>
            <AnimatedItem className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-sm h-full">
              <h4 className="font-semibold text-lg mb-4 text-ink-1">
                Past Investment Returns
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "2024 YTD Return", value: "+28.4%", highlight: true },
                  { label: "2023 Annual Return", value: "+47.2%" },
                  { label: "2022 Annual Return", value: "+32.8%" },
                  { label: "Best Month", value: "+15.6%" },
                  { label: "Worst Month", value: "-8.3%" },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center pb-2 border-b border-border/20"
                  >
                    <span className="text-sm md:text-base text-ink-2">{item.label}</span>
                    <span
                      className={`font-semibold ${
                        item.highlight
                          ? "text-geraldine"
                          : item.value.startsWith("+")
                          ? "text-green-600"
                          : item.value.startsWith("-")
                          ? "text-red-600"
                          : "text-ink-1"
                      }`}
                    >
                      {item.value}
                    </span>
                  </li>
                ))}
              </ul>
            </AnimatedItem>
          </div>
        </div>
      </div>
    </section>
  );
}
