import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedContainer, AnimatedItem, HoverButton } from "../AnimatedSection";
import { useCounter } from "../../hooks/useCounter";

const StatCard = ({ target, suffix, title, decimals = 0 }) => {
  const { ref, count } = useCounter(target, 2000, suffix, '', decimals);
  
  return (
    <motion.div 
      ref={ref}
      className="w-full border-l-2 border-border-primary pl-8"
      whileHover={{ scale: 1.02, x: 8 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.p 
        className="mb-2 text-10xl leading-[1.3] font-bold md:text-[4rem] lg:text-[5rem]"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        viewport={{ once: true }}
      >
        {count}
      </motion.p>
      <h3 className="text-md leading-[1.4] font-bold md:text-xl">
        {title}
      </h3>
    </motion.div>
  );
};

export function Stats13() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="results" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:items-center md:gap-x-12 lg:grid-cols-2 lg:gap-x-20">
          <AnimatedSection animation="fadeInLeft">
            <p className="mb-3 font-semibold md:mb-4">Results</p>
            <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              When Tested Against History, ARAD Holds Its Ground.
            </h2>
            <p className="md:text-md">
              ARAD has been tested against every major storm — the Dot-Com bust,
              the Global Financial Crisis, the Covid collapse, and the inflation
              spike. In every regime, ARAD produced disciplined, repeatable
              edges over traditional benchmarks.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              <HoverButton 
                className="btn-stats-dark"
                onClick={() => scrollToSection('contact')}
              >
                Schedule a Call to Review Results
              </HoverButton>
            </div>
          </AnimatedSection>
          
          <AnimatedContainer className="grid w-full grid-cols-1 items-start justify-start gap-y-8 py-2 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:gap-x-8 lg:gap-y-12" stagger={true}>
            <AnimatedItem>
              <StatCard 
                target={54} 
                suffix="%" 
                title="Annual outperformance vs. S&P 500 and Nasdaq"
              />
            </AnimatedItem>
            
            <AnimatedItem>
              <StatCard 
                target={40} 
                suffix="%" 
                title="Drawdown reduction in volatile markets"
              />
            </AnimatedItem>
            
            <AnimatedItem>
              <StatCard 
                target={0.87} 
                suffix="" 
                title="Sharpe Ratio increase range across universes"
                decimals={2}
              />
            </AnimatedItem>
            
            <AnimatedItem>
              <StatCard 
                target={24} 
                suffix="%" 
                title="Less volatility when used with equities"
              />
            </AnimatedItem>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
