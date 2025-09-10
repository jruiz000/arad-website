import React from "react";
import { motion } from "framer-motion";
import { BiCheck } from "react-icons/bi";
import { AnimatedSection, AnimatedContainer, AnimatedItem, HoverButton, HoverCard } from "../AnimatedSection";

export function Pricing18() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section id="pricing" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <AnimatedSection className="mb-12 text-center md:mb-18 lg:mb-20" animation="fadeInUp">
          <p className="mb-3 font-semibold md:mb-4">Pricing</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl max-w-6xl mx-auto">
            Three Access Modes. One Strategy.
          </h2>
          <p className="md:text-md max-w-4xl mx-auto">
            Institutions can engage with ARAD at different levels — from a trial
            designed to validate the methodology, to annual licensing for full
            signal access, or full ownership for permanent exclusivity.
          </p>
        </AnimatedSection>
        <AnimatedContainer className="grid grid-cols-1 gap-8 lg:grid-cols-3" role="list" stagger={true}>
          <AnimatedItem>
            <HoverCard className="card-pricing flex h-full flex-col justify-between px-6 py-8 md:p-8" role="listitem">
            <div>
              <header className="rb-6 mb-6 text-center md:mb-8">
                <h3 className="text-md font-bold md:text-xl">
                  Pilot Access Proof of Concept
                </h3>
                <p className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                  Free
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Limited-time trial
                </p>
              </header>
                <ul className="mb-8 grid grid-cols-1 gap-4 py-2" role="list">
                <li className="flex self-start">
                  <div className="mr-4 flex-none self-start" aria-hidden="true">
                    <BiCheck className="size-6" />
                  </div>
                  <span>Selected assets only</span>
                </li>
                <li className="flex self-start">
                  <div className="mr-4 flex-none self-start" aria-hidden="true">
                    <BiCheck className="size-6" />
                  </div>
                  <span>Test methodology & reliability</span>
                </li>
                <li className="flex self-start">
                  <div className="mr-4 flex-none self-start" aria-hidden="true">
                    <BiCheck className="size-6" />
                  </div>
                  <span>No upfront cost</span>
                </li>
              </ul>
            </div>
              <div>
                <HoverButton 
                  className="btn-gradient w-full" 
                  title="Request Pilot Access"
                  aria-label="Request free pilot access to ARAD System"
                  onClick={() => scrollToSection('contact')}
                >
                  Request Pilot Access
                </HoverButton>
              </div>
            </HoverCard>
          </AnimatedItem>
          
          <AnimatedItem>
            <HoverCard className="card-pricing flex h-full flex-col justify-between px-6 py-8 md:p-8" role="listitem">
              <div>
                <header className="rb-6 mb-6 text-center md:mb-8">
                <h3 className="text-md font-bold md:text-xl">
                  Annual License API & Dashboard
                </h3>
                <p className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                  1.0% AUM / yr
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Paid monthly, annual commitment
                </p>
                </header>
                <ul className="mb-8 grid grid-cols-1 gap-4 py-2" role="list">
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>Full API access</span>
                  </li>
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>Dashboard with rankings & equity curves</span>
                  </li>
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>
                      All asset classes (equities, indexes, FX, commodities,
                      crypto, ETFs)
                    </span>
                  </li>
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>Ongoing technical assistance</span>
                  </li>
                </ul>
              </div>
              <div>
                <HoverButton 
                  className="btn-gradient w-full" 
                  title="Request API & Dashboard Access"
                  aria-label="Request annual license for API and dashboard access at $450k per year"
                  onClick={() => scrollToSection('contact')}
                >
                  Request API & Dashboard Access
                </HoverButton>
              </div>
            </HoverCard>
          </AnimatedItem>
          
          <AnimatedItem>
            <HoverCard className="card-pricing flex h-full flex-col justify-between px-6 py-8 md:p-8" role="listitem">
              <div>
                <header className="rb-6 mb-6 text-center md:mb-8">
                <h3 className="text-md font-bold md:text-xl">
                  One-Time Sale Full Ownership
                </h3>
                <p className="my-2 text-6xl font-bold md:text-9xl lg:text-10xl">
                  Upon Request
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Permanent exclusivity
                </p>
                </header>
                <ul className="mb-8 grid grid-cols-1 gap-4 py-2" role="list">
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>Complete ARAD backtester</span>
                  </li>
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>Source code ownership</span>
                  </li>
                  <li className="flex self-start">
                    <div className="mr-4 flex-none self-start" aria-hidden="true">
                      <BiCheck className="size-6" />
                    </div>
                    <span>Custom development support</span>
                  </li>
                </ul>
              </div>
              <div>
                <HoverButton 
                  className="btn-gradient w-full" 
                  title="Request Full Ownership"
                  aria-label="Request full ownership of ARAD System"
                  onClick={() => scrollToSection('contact')}
                >
                  Request Full Ownership
                </HoverButton>
              </div>
            </HoverCard>
          </AnimatedItem>
        </AnimatedContainer>
      </div>
    </section>
  );
}
