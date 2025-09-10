import React from "react";
import { Banner7 } from "./components/sections/announcement-banner";
import { Blog36 } from "./components/sections/documentation-section";
import { Faq11 } from "./components/sections/faq-section";
import { Footer3 } from "./components/layout/footer-03";
import { Header2 } from "./components/sections/hero-section";
import { Layout1 } from "./components/sections/about-founder";
import { Layout239 } from "./components/sections/features-overview";
import { Layout328 } from "./components/sections/how-it-works";
import { Logo6 } from "./components/sections/asset-coverage";
import { Navbar1 } from "./components/navbar-01";
import { Pricing18 } from "./components/sections/pricing-section";
import { Stats13 } from "./components/sections/results-section";
import { ContactForm } from "./components/sections/contact-section";

export default function App() {
  return (
    <div id="top" className="font-sans antialiased">
      <header className="navbar">
        <Navbar1 />
      </header>
      
      <main>
        <section className="banner">
          <Banner7 />
        </section>
        
        <div className="shared-background-container">
          <section className="hero" id="hero">
            <Header2 />
          </section>
          
          <section className="features-1" id="how-it-works">
            <Layout239 />
          </section>
        </div>
        
        <section className="stats">
          <Stats13 />
        </section>
        
        <section className="features-2" id="asset-coverage">
          <Layout328 />
        </section>
        
        <section className="logos">
          <Logo6 />
        </section>
        
        <section className="pricing" id="pricing">
          <Pricing18 />
        </section>
        
        <section className="blog" id="documentation">
          <Blog36 />
        </section>
        
        <section className="about" id="about">
          <Layout1 />
        </section>
        
        <section className="faq" id="faq">
          <Faq11 />
        </section>
        
        <section className="contact" id="contact">
          <ContactForm />
        </section>
      </main>
      
      <footer className="footer">
        <Footer3 />
      </footer>
    </div>
  );
}
