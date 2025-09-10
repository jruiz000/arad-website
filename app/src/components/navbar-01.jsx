import { Button, useMediaQuery } from "@relume_io/relume-ui";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxChevronDown } from "react-icons/rx";
import { navigateToSection, navigateToHome } from "../utils/navigation";

const useRelume = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 991px)");
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const openOnMobileDropdownMenu = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const openOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(true);
  };
  const closeOnDesktopDropdownMenu = () => {
    !isMobile && setIsDropdownOpen(false);
  };
  const animateMobileMenu = isMobileMenuOpen ? "open" : "close";
  const animateMobileMenuButtonSpan = isMobileMenuOpen
    ? ["open", "rotatePhase"]
    : "closed";
  const animateDropdownMenu = isDropdownOpen ? "open" : "close";
  const animateDropdownMenuIcon = isDropdownOpen ? "rotated" : "initial";
  return {
    toggleMobileMenu,
    openOnDesktopDropdownMenu,
    closeOnDesktopDropdownMenu,
    openOnMobileDropdownMenu,
    animateMobileMenu,
    animateMobileMenuButtonSpan,
    animateDropdownMenu,
    animateDropdownMenuIcon,
  };
};

const scrollToSection = (sectionId) => navigateToSection(sectionId);

export function Navbar1() {
  const useActive = useRelume();
  
  return (
    <nav
      className="z-[999] flex w-full items-center border-b border-border-primary bg-navbar lg:min-h-18 lg:px-[5%]"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        {/* Logo - Left */}
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <Link to="/" className="flex items-center" aria-label="ARAD System Home">
            <img
              src="https://muralia.mx/wp-content/uploads/2025/08/ARAD-SYSTEM-LOGO-WHITE.png"
              alt="ARAD System Logo"
              className="h-8 w-auto"
            />
          </Link>
          <button
            className="-mr-2 flex size-12 flex-col items-center justify-center lg:hidden"
            onClick={useActive.toggleMobileMenu}
            aria-label={useActive.animateMobileMenu === "open" ? "Close menu" : "Open menu"}
            aria-expanded={useActive.animateMobileMenu === "open"}
            aria-controls="mobile-menu"
          >
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-white"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: 8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: -45, transition: { delay: 0.2 } },
                closed: {
                  translateY: 0,
                  rotate: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-white"
              animate={useActive.animateMobileMenu}
              variants={{
                open: { width: 0, transition: { duration: 0.1 } },
                closed: {
                  width: "1.5rem",
                  transition: { delay: 0.3, duration: 0.2 },
                },
              }}
            />
            <motion.span
              className="my-[3px] h-0.5 w-6 bg-white"
              animate={useActive.animateMobileMenuButtonSpan}
              variants={{
                open: { translateY: -8, transition: { delay: 0.1 } },
                rotatePhase: { rotate: 45, transition: { delay: 0.2 } },
                closed: {
                  translateY: 0,
                  rotate: 0,
                  transition: { duration: 0.2 },
                },
              }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          id="mobile-menu"
          variants={{
            open: { height: "var(--height-open, 100dvh)" },
            close: { height: "var(--height-closed, 0)" },
          }}
          initial="close"
          exit="close"
          animate={useActive.animateMobileMenu}
          transition={{ duration: 0.4 }}
          className="overflow-hidden px-[5%] lg:hidden lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
          role="menu"
        >
          <Link
            to="/how-it-works"
            className="block py-4 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
            role="menuitem"
          >
            How It Works
          </Link>
          <Link
            to="/asset-coverage"
            className="block py-4 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
            role="menuitem"
          >
            Asset Coverage
          </Link>
          <Link
            to="/pricing"
            className="block py-4 text-md first:pt-7 lg:px-4 lg:py-2 lg:text-base first:lg:pt-2"
            role="menuitem"
          >
            Pricing
          </Link>
          <div
            onMouseEnter={useActive.openOnDesktopDropdownMenu}
            onMouseLeave={useActive.closeOnDesktopDropdownMenu}
          >
            <button
              className="flex w-full items-center justify-between gap-2 py-4 text-left text-md lg:flex-none lg:justify-start lg:px-4 lg:py-2 lg:text-base"
              onClick={useActive.openOnMobileDropdownMenu}
              aria-expanded={useActive.animateDropdownMenu === "open"}
              aria-haspopup="true"
              role="menuitem"
            >
              <span>Resources</span>
              <motion.span
                variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
                animate={useActive.animateDropdownMenuIcon}
                transition={{ duration: 0.3 }}
                aria-hidden="true"
              >
                <RxChevronDown />
              </motion.span>
            </button>
            <AnimatePresence>
              <motion.nav
                variants={{
                  open: {
                    visibility: "visible",
                    opacity: "var(--opacity-open, 100%)",
                    display: "block",
                    y: 0,
                  },
                  close: {
                    visibility: "hidden",
                    opacity: "var(--opacity-close, 0)",
                    display: "none",
                    y: "var(--y-close, 0%)",
                  },
                }}
                animate={useActive.animateDropdownMenu}
                initial="close"
                exit="close"
                transition={{ duration: 0.2 }}
                className="bg-[#120922] lg:absolute lg:z-50 lg:border lg:border-[#2A1B4A] lg:p-2 lg:[--y-close:25%]"
                role="menu"
              >
                <Link
                  to="/documentation"
                  className="block py-4 pl-[5%] text-md lg:px-4 lg:py-3 lg:text-base"
                  role="menuitem"
                >
                  Documentation
                </Link>
                <Link
                  to="/about"
                  className="block py-4 pl-[5%] text-md lg:px-4 lg:py-3 lg:text-base"
                  role="menuitem"
                >
                  About us
                </Link>
                <Link
                  to="/faq"
                  className="block py-4 pl-[5%] text-md lg:px-4 lg:py-3 lg:text-base"
                  role="menuitem"
                >
                  FAQ
                </Link>
              </motion.nav>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-col items-center gap-4 lg:mt-0 lg:ml-4 lg:flex-row">
            <button
              className="btn-secondary-custom w-full lg:w-auto"
              title="Request Access"
              aria-label="Request access to ARAD System"
              onClick={() => scrollToSection('contact')}
            >
              Request Access
            </button>
            <a
              className="btn-gradient w-full lg:w-auto"
              title="ARAD Dashboard"
              aria-label="Open ARAD Dashboard"
              href="https://aradsystems.com/dashboard"
              target="_blank"
              rel="noopener noreferrer"
            >
              ARAD Dashboard
            </a>
          </div>
        </motion.div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center">
          <div className="flex items-center space-x-8">
            <Link
              to="/how-it-works"
              className="navbar-item px-4 py-3 text-base hover:text-white transition-all duration-300"
              role="menuitem"
            >
              How It Works
            </Link>
            <Link
              to="/asset-coverage"
              className="navbar-item px-4 py-3 text-base hover:text-white transition-all duration-300"
              role="menuitem"
            >
              Asset Coverage
            </Link>
            <Link
              to="/pricing"
              className="navbar-item px-4 py-3 text-base hover:text-white transition-all duration-300"
              role="menuitem"
            >
              Pricing
            </Link>
            <div
              onMouseEnter={useActive.openOnDesktopDropdownMenu}
              onMouseLeave={useActive.closeOnDesktopDropdownMenu}
              className="relative"
            >
              <button
                className="flex items-center gap-2 px-4 py-3 text-base hover:text-gray-300 transition-colors"
                aria-expanded={useActive.animateDropdownMenu === "open"}
                aria-haspopup="true"
                role="menuitem"
              >
                <span>Resources</span>
                <motion.span
                  variants={{ rotated: { rotate: 180 }, initial: { rotate: 0 } }}
                  animate={useActive.animateDropdownMenuIcon}
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                >
                  <RxChevronDown />
                </motion.span>
              </button>
              <AnimatePresence>
                <motion.nav
                  variants={{
                    open: {
                      visibility: "visible",
                      opacity: "var(--opacity-open, 100%)",
                      display: "block",
                      y: 0,
                    },
                    close: {
                      visibility: "hidden",
                      opacity: "var(--opacity-close, 0)",
                      display: "none",
                      y: "var(--y-close, 0%)",
                    },
                  }}
                  animate={useActive.animateDropdownMenu}
                  initial="close"
                  exit="close"
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 bg-[#120922] border border-[#2A1B4A] p-2 min-w-[200px] z-50"
                  role="menu"
                >
                  <Link
                    to="/documentation"
                    className="block px-4 py-3 text-base hover:bg-white/10 transition-colors"
                    role="menuitem"
                  >
                    Documentation
                  </Link>
                  <Link
                    to="/about"
                    className="block px-4 py-3 text-base hover:bg-white/10 transition-colors"
                    role="menuitem"
                  >
                    About us
                  </Link>
                  <Link
                    to="/faq"
                    className="block px-4 py-3 text-base hover:bg-white/10 transition-colors"
                    role="menuitem"
                  >
                    FAQ
                  </Link>
                </motion.nav>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Desktop Buttons - Right */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <button
            className="btn-secondary-custom"
            title="Request Access"
            aria-label="Request access to ARAD System"
            onClick={() => scrollToSection('contact')}
          >
            Request Access
          </button>
          <a
            className="btn-gradient"
            title="ARAD Dashboard"
            aria-label="Open ARAD Dashboard"
            href="https://aradsystems.com/dashboard"
            target="_blank"
            rel="noopener noreferrer"
          >
            ARAD Dashboard
          </a>
        </div>
      </div>
    </nav>
  );
}
