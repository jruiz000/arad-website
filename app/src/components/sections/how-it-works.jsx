import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedContainer, AnimatedItem, HoverButton } from "../AnimatedSection";

export function Layout328() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      id="how-it-works" 
      className="relative px-[5%] py-16 md:py-24 lg:py-28"
      style={{
        backgroundImage: 'url(/images/25MKit.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative z-10 container">
        <div className="mx-auto mb-12 max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl md:mb-18 lg:mb-20">
            <p className="mb-3 text-center font-semibold text-text-alternative md:mb-4">
              How it Works
            </p>
            <h2 className="mb-5 text-center text-5xl font-bold text-text-alternative md:mb-6 md:text-7xl lg:text-8xl leading-tight md:leading-tight lg:leading-tight">
              Four Steps. Zero Look-Ahead.
            </h2>
            <p className="text-center text-text-alternative md:text-md max-w-2xl mx-auto leading-relaxed">
              Every ARAD signal is built on a foundation of strict causality. Only
              revealed history counts; never future information. The process is
              simple but powerful.
            </p>
        </div>
        
        <AnimatedContainer className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4" stagger={true}>
          <AnimatedItem>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div 
                className="mb-5 flex justify-center md:mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src="/images/image30.png"
                  className="size-12 img-rounded"
                  alt="Step 1: State"
                />
              </motion.div>
              <h3 className="mb-3 text-center text-xl font-bold text-text-alternative md:mb-4 md:text-2xl">
                Step 1: State
              </h3>
              <p className="text-center text-text-alternative">
                Locate the asset's current state. Every bucket encodes a different
                market behavior.
              </p>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div 
                className="mb-5 flex justify-center md:mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src="/images/image28.png"
                  className="size-12 img-rounded"
                  alt="Step 2: Learn"
                />
              </motion.div>
              <h3 className="mb-3 text-center text-xl font-bold text-text-alternative md:mb-4 md:text-2xl">
                Step 2: Learn
              </h3>
              <p className="text-center text-text-alternative">
                Reveal historical periods where the asset lived that same state.
                Discover what happened in those cases.
              </p>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div 
                className="mb-5 flex justify-center md:mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src="/images/image398.png"
                  className="size-12 img-rounded"
                  alt="Step 3: Score - Fixed JSX"
                />
              </motion.div>
              <h3 className="mb-3 text-center text-xl font-bold text-text-alternative md:mb-4 md:text-2xl">
                Step 3: Score
              </h3>
              <p className="text-center text-text-alternative">
                Generate an Expected Return adjusted by Prediction Error. No vague
                confidence intervals.
              </p>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <motion.div 
                className="mb-5 flex justify-center md:mb-6"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              >
                <img
                  src="/images/image31.png"
                  className="size-12 img-rounded"
                  alt="Step 4: Allocate"
                />
              </motion.div>
              <h3 className="mb-3 text-center text-xl font-bold text-text-alternative md:mb-4 md:text-2xl">
                Step 4: Allocate
              </h3>
              <p className="text-center text-text-alternative">
                Rank, select, and rebalance. ARAD allows you to turn historic data
                into action.
              </p>
            </motion.div>
          </AnimatedItem>
        </AnimatedContainer>
        
        <AnimatedSection className="mt-12 flex w-full flex-wrap items-center justify-center gap-4 md:mt-18 lg:mt-20" animation="fadeInUp">
          <HoverButton 
            className="btn-secondary-custom" 
            title="See the Process in Action"
            onClick={() => scrollToSection('contact')}
          >
            See the Process in Action
          </HoverButton>
        </AnimatedSection>
      </div>
      
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/35"></div>
      </div>
    </section>
  );
}
