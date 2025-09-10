import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from "@relume_io/relume-ui";
import React from "react";
import { AnimatedSection } from "../AnimatedSection";
import { RxPlus } from "react-icons/rx";

export function Faq11() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <section id="faq" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <AnimatedSection className="mb-12 text-center md:mb-18 lg:mb-20" animation="fadeInUp">
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl max-w-6xl mx-auto">
            Frequently Asked by Institutions
          </h2>
          <p className="md:text-md max-w-4xl mx-auto">
            Your questions answered about ARAD's methodology, data sources,
            and operational transparency.
          </p>
        </AnimatedSection>
        <AnimatedSection animation="fadeInUp">
        <Accordion
          type="multiple"
          className="grid w-full grid-cols-1 items-start gap-x-8 gap-y-4 md:grid-cols-2"
        >
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                How does ARAD ensure no look-ahead bias?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                ARAD is built around strict causality. Signals are generated
                only with revealed data — events whose outcome is already known
                at that time. Future information is never used, making ARAD
                resistant to the most common pitfall in quant research:
                hindsight leakage.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-2"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                Which asset classes can ARAD analyze?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                ARAD works with any asset that has historical OHLCV data.
                Equities, indexes, ETFs, forex pairs, commodities, and
                cryptocurrencies are all supported. The system is asset-agnostic
                — its methodology adapts regardless of market type.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-3"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                How are trading costs modeled?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Backtests integrate realistic assumptions: commission in bps,
                slippage, and fixed fees. Each asset class has its own
                calibrated profile, ensuring simulations reflect real-world
                execution rather than theoretical returns.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-4"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                What risk controls are embedded?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                ARAD includes constraints like no negative cash, forced
                liquidation at horizon, and trade sizing penalties based on
                prediction error. This enforces discipline and avoids
                unrealistic leverage.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-5"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                How customizable is the system?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Users can adjust parameters like return horizons, exponential
                decay factors, number of buckets, and rebalance cadence. This
                flexibility allows for stress-testing and adapting to different
                risk profiles.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-6"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                How is auditability ensured?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Every backtest produces logs, trade records, and CSV exports.
                Institutions can independently validate ARAD's signals and
                equity curves. Transparency is a design principle, not an
                afterthought.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-7"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                What benchmarks are used for comparison?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                By default, ARAD benchmarks against S&P 500, Nasdaq 100,
                Bitcoin, and Gold. Institutions can add their own reference
                series for tailored comparisons.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-8"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                How often are signals updated?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Daily. ARAD refreshes its calculations continuously and outputs
                current expected return and prediction error metrics. API
                license holders receive updated rankings every market day.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-9"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                Who is ARAD intended for?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                Quantitative hedge funds, institutional trading desks, and
                family offices. Its design addresses institutional requirements:
                scalability, auditability, and strict compliance with
                no-look-ahead principles.
              </AccordionContent>
            </AccordionItem>
          </div>
          <div className="card-faq">
            <AccordionItem
              value="item-faq11_accordion-10"
              className="border-none px-5 md:px-6"
            >
              <AccordionTrigger
                className="md:py-5 md:text-md [&[data-state=open]>svg]:rotate-45"
                icon={
                  <RxPlus className="size-7 shrink-0 text-text-primary transition-transform duration-300 md:size-8" />
                }
              >
                Is ARAD a fund or a service?
              </AccordionTrigger>
              <AccordionContent className="md:pb-6">
                ARAD is not a fund. It does not pool or manage capital. It is a
                strategy and software framework offered as licensed access or
                full ownership — leaving execution and capital deployment to the
                client.
              </AccordionContent>
            </AccordionItem>
          </div>
        </Accordion>
        </AnimatedSection>
        <div className="mx-auto mt-12 max-w-md text-center md:mt-18 lg:mt-20">
          <h4 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            Still have questions?
          </h4>
          <p className="md:text-md">We're here to help you.</p>
          <div className="mt-6 md:mt-8">
                         <button 
               className="btn-secondary-custom" 
               title="Request Access to the Documentation"
               onClick={() => scrollToSection('contact')}
             >
               Request Access to the Documentation
             </button>
          </div>
        </div>
      </div>
    </section>
  );
}
