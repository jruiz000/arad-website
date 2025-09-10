import { Badge, Button } from "@relume_io/relume-ui";
import React from "react";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "../AnimatedSection";
import { RxChevronRight } from "react-icons/rx";

export function Blog36() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="documentation" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <AnimatedSection className="mb-12 text-center md:mb-18 lg:mb-20" animation="fadeInUp">
          <p className="mb-3 font-semibold md:mb-4">Documentation</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl max-w-6xl mx-auto">
            Documentation at Every Level.
          </h2>
          <p className="md:text-md max-w-4xl mx-auto">
            ARAD offers transparency through three layers of documentation.
            From high-level insights to full system ownership, institutions
            can explore the strategy at the depth required for evaluation,
            integration, or acquisition.
          </p>
        </AnimatedSection>
        <AnimatedContainer className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3" stagger={true}>
          <AnimatedItem>
          <div className="card-documentation flex size-full flex-col items-center justify-start">
            <a href="#" className="w-full">
              <img
                src="/images/22MKit.png"
                alt="The White Paper"
                className="aspect-[3/2] size-full object-cover img-rounded"
              />
            </a>
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <div className="badge-documentation mr-4">Institutional Brief</div>
                <p className="inline text-sm font-semibold text-white">20 pages</p>
              </div>
              <a className="mb-2 block max-w-full" href="#">
                <h2 className="text-xl font-bold md:text-2xl text-white">
                  The White Paper
                </h2>
              </a>
              <p className="text-white">
                A 20-page institutional document outlining ARAD's conceptual
                framework, methodology, results, applications, and limitations.
                Written for portfolio managers and CIOs to understand the
                system's theoretical foundation and empirical edge.
              </p>
                             <button
                 onClick={() => scrollToSection('contact')}
                 className="mt-6 flex items-center justify-center gap-x-2 text-white hover:text-gray-300 transition-colors"
               >
                 Download White Paper
                 <RxChevronRight />
               </button>
            </div>
          </div>
          </AnimatedItem>
          <AnimatedItem>
          <div className="card-documentation flex size-full flex-col items-center justify-start">
            <a href="#" className="w-full">
              <img
                src="/images/24MKit.png"
                alt="Dashboard Access"
                className="aspect-[3/2] size-full object-cover img-rounded"
              />
            </a>
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <div className="badge-documentation mr-4">Live Demo</div>
                <p className="inline text-sm font-semibold text-white">Interactive</p>
              </div>
              <a className="mb-2 block max-w-full" href="#">
                <h2 className="text-xl font-bold md:text-2xl text-white">
                  Dashboard Access
                </h2>
              </a>
              <p className="text-white">
                The dashboard delivers a live view of ARAD's asset rankings,
                expected returns, prediction errors, and equity curves
                benchmarked against global markets. It gives asset managers full
                access to the system's capabilities without granting
                exclusivity.
              </p>
                             <button
                 onClick={() => scrollToSection('contact')}
                 className="mt-6 flex items-center justify-center gap-x-2 text-white hover:text-gray-300 transition-colors"
               >
                 Request Dashboard Access
                 <RxChevronRight />
               </button>
            </div>
          </div>
          </AnimatedItem>
          <AnimatedItem>
          <div className="card-documentation flex size-full flex-col items-center justify-start">
            <a href="#" className="w-full">
              <img
                src="/images/21MKit.png"
                alt="GitHub Repository"
                className="aspect-[3/2] size-full object-cover img-rounded"
              />
            </a>
            <div className="px-5 py-6 md:p-6">
              <div className="rb-4 mb-4 flex w-full items-center justify-start">
                <div className="badge-documentation mr-4">Technical Archive</div>
                <p className="inline text-sm font-semibold text-white">Reference</p>
              </div>
              <a className="mb-2 block max-w-full" href="#">
                <h2 className="text-xl font-bold md:text-2xl text-white">
                  GitHub Repository
                </h2>
              </a>
              <p className="text-white">
                The full technical archive of ARAD. Includes code architecture,
                libraries, pipeline details, and technical appendices. Reserved
                exclusively for one-time ownership buyers, granting permanent
                access to the strategy's underlying infrastructure.
              </p>
                             <button
                 onClick={() => scrollToSection('contact')}
                 className="mt-6 flex items-center justify-center gap-x-2 text-white hover:text-gray-300 transition-colors"
               >
                 Discuss Full Ownership
                 <RxChevronRight />
               </button>
            </div>
          </div>
          </AnimatedItem>
        </AnimatedContainer>
        <div className="flex items-center justify-center" />
      </div>
    </section>
  );
}
