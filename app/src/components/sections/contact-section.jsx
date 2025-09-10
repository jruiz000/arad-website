import React, { useEffect } from "react";
import { AnimatedSection } from "../AnimatedSection";

export function ContactForm() {
  useEffect(() => {
    // Load Typeform script
    const script = document.createElement('script');
    script.src = '//embed.typeform.com/next/embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="contact" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <AnimatedSection className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20" animation="fadeInUp">
          <p className="mb-3 font-semibold md:mb-4">Contact</p>
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl">
            Institutional Inquiry Form
          </h2>
          <p className="md:text-md">
            Every request is reviewed directly by the ARAD team. Fill out the form to initiate the conversation. Expect professional discretion and a tailored response.
          </p>
        </AnimatedSection>
        <AnimatedSection className="mx-auto max-w-4xl" animation="fadeInUp">
          <div data-tf-live="01K3MP91S6T4FZ2225GW8M3YH6"></div>
        </AnimatedSection>
      </div>
    </section>
  );
}
