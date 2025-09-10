import React from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "../AnimatedSection";

export function Logo6() {
  return (
    <section id="asset-coverage" className="px-[5%] py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="mx-auto mb-8 w-full max-w-lg text-center md:mb-10 lg:mb-12">
            <p className="mb-3 font-semibold md:mb-4">Asset Coverage</p>
            <h2 className="mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
              From Wall Street to Crypto — One Framework.
            </h2>
            <p className="md:text-md">
              ARAD is asset-class agnostic. As long as historical data exists, it can analyze, rank, and backtest. From global equities to commodities and digital assets, the framework adapts seamlessly.
            </p>
        </div>
        
        <AnimatedContainer className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6" stagger={true}>
          <AnimatedItem>
            <motion.div 
              className="asset-coverage-item"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="asset-coverage-title">Equities</div>
              <motion.div 
                className="asset-coverage-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                3,000+
              </motion.div>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div 
              className="asset-coverage-item"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="asset-coverage-title">Indexes</div>
              <motion.div 
                className="asset-coverage-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                10+
              </motion.div>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div 
              className="asset-coverage-item"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="asset-coverage-title">FX Pairs</div>
              <motion.div 
                className="asset-coverage-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                50+
              </motion.div>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div 
              className="asset-coverage-item"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="asset-coverage-title">Crypto</div>
              <motion.div 
                className="asset-coverage-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                50+
              </motion.div>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div 
              className="asset-coverage-item"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="asset-coverage-title">Commodities</div>
              <motion.div 
                className="asset-coverage-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                30+
              </motion.div>
            </motion.div>
          </AnimatedItem>
          
          <AnimatedItem>
            <motion.div 
              className="asset-coverage-item"
              whileHover={{ scale: 1.05, y: -8 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="asset-coverage-title">ETFs</div>
              <motion.div 
                className="asset-coverage-number"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                25+
              </motion.div>
            </motion.div>
          </AnimatedItem>
        </AnimatedContainer>
      </div>
    </section>
  );
}
