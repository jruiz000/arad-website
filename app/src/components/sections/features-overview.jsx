import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedContainer, AnimatedItem, HoverButton, HoverCard } from "../AnimatedSection";

export function Layout239() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="container">
            <div className="w-full max-w-4xl md:max-w-5xl text-center">
              <p className="mb-3 font-semibold md:mb-4">Modes</p>
              <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
                Unlock your Investment Potential with ARAD
              </h2>
              <p className="md:text-md max-w-3xl mx-auto mb-12 md:mb-16 lg:mb-20">
                The ARAD System isn't a prediction engine — it's a causal lens.
                It learns from revealed history to identify when assets are
                likely to rebound, where portfolios are most vulnerable, and how
                to allocate with confidence.
              </p>
            </div>
          </div>
          <AnimatedContainer className="grid grid-cols-1 items-start justify-center gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12" stagger={true}>
            <AnimatedItem>
              <HoverCard className="flex w-full flex-col items-center text-center">
                <motion.div 
                  className="rb-6 mb-6 md:mb-8 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.img
                    src="/images/2MKit.png"
                    alt="Individual Asset Analytics"
                    className="img-rounded"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Individual Asset Analytics
                </h3>
                <p>
                  Track the state of any asset, estimate its expected return, and
                  measure reliability with prediction error.
                </p>
              </HoverCard>
            </AnimatedItem>
            
            <AnimatedItem>
              <HoverCard className="flex w-full flex-col items-center text-center">
                <motion.div 
                  className="rb-6 mb-6 md:mb-8 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.img
                    src="/images/3MKit.png"
                    alt="Multi-Asset Ranking"
                    className="img-rounded"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Multi-Asset Ranking
                </h3>
                <p>
                  Rank hundreds of assets daily. Pinpoint the strongest candidates
                  for longs or shorts across universes.
                </p>
              </HoverCard>
            </AnimatedItem>
            
            <AnimatedItem>
              <HoverCard className="flex w-full flex-col items-center text-center">
                <motion.div 
                  className="rb-6 mb-6 md:mb-8 overflow-hidden rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.img
                    src="/images/4MKit.png"
                    alt="Cross-Universe Backtests"
                    className="img-rounded"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                  />
                </motion.div>
                <h3 className="mb-5 text-2xl font-bold md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  Cross-Universe Backtests
                </h3>
                <p>
                  Simulate strategies across decades, rebalance through crises,
                  account for slippage, and test results across every asset class.
                </p>
              </HoverCard>
            </AnimatedItem>
          </AnimatedContainer>
          
          <AnimatedSection className="mt-6 flex flex-wrap items-center gap-4 md:mt-8" animation="fadeInUp">
            <HoverButton 
              className="btn-secondary-custom"
              onClick={() => scrollToSection('contact')}
            >
              Explore ARAD Modes
            </HoverButton>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
