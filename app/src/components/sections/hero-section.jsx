import React from "react";
import { motion } from "framer-motion";
import { navigateToSection } from "../../utils/navigation";
import { AnimatedSection, AnimatedContainer, AnimatedItem, HoverButton } from "../AnimatedSection";
import CsvComparisonChart from "../charts/CsvComparisonChart";

export function Header2() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-x-20 gap-y-12 md:gap-y-16 lg:grid-cols-2 lg:items-center">
          <AnimatedSection animation="fadeInLeft">
            <h1 className="mb-5 text-6xl font-bold md:mb-6 md:text-9xl lg:text-10xl">
              Transform Historical Data into Forward-Looking Insights.
            </h1>
            <p className="md:text-md">
              Markets crash. Narratives collapse. Noise overwhelms. Yet every
              decline leaves patterns — hidden evidence of how assets recover.
              The ARAD System transforms those fingerprints into actionable,
              insights, causal and auditable, without look-ahead bias.
            </p>
            <AnimatedContainer className="mt-6 md:mt-8 flex gap-4" stagger={true}>
              <AnimatedItem>
                <motion.a
                  href="https://aradsystems.com/dashboard"
                  className="btn-gradient"
                  title="ARAD Dashboard"
                  aria-label="Open ARAD Dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                >
                  ARAD Dashboard
                </motion.a>
              </AnimatedItem>
              <AnimatedItem>
                <HoverButton
                  type="button"
                  className="btn-secondary-custom"
                  title="Request Access"
                  aria-label="Request access to ARAD System"
                  onClick={() => navigateToSection('contact')}
                >
                  Request Access
                </HoverButton>
              </AnimatedItem>
            </AnimatedContainer>
          </AnimatedSection>
          
          <AnimatedSection animation="fadeInRight">
            <motion.div
              className="overflow-hidden rounded-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="w-full aspect-square bg-black/10">
                {/* Auto-detect all series and headers from the CSV */}
                <CsvComparisonChart
                  sources={[{ url: "/charts/DemoEquityChart.csv", autoDetect: true, hasHeader: true }]}
                />
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
