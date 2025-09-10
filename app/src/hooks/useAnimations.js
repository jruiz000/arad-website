import { useInView } from 'framer-motion';
import { useRef } from 'react';

// Standard animation variants
export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -60,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 60,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

export const slideInFromBottom = {
  hidden: { 
    opacity: 0, 
    y: 100,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: [0.4, 0, 0.2, 1] }
  }
};

// Card hover animations
export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  hover: { 
    scale: 1.03, 
    y: -8,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  }
};

// Button hover animations
export const buttonHover = {
  rest: { 
    scale: 1, 
    y: 0,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  hover: { 
    scale: 1.05, 
    y: -2,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1, ease: [0.4, 0, 0.2, 1] }
  }
};

// Image hover animations
export const imageHover = {
  rest: { 
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Custom hook for scroll-triggered animations
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    threshold,
    margin: "-100px 0px -100px 0px" 
  });

  return { ref, isInView };
};

// Custom hook for repeating scroll animations (for elements that should animate every time they come into view)
export const useRepeatingScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    threshold,
    margin: "-50px 0px -50px 0px" 
  });

  return { ref, isInView };
};

// Counter animation hook
export const useCountAnimation = (target, duration = 2000) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  
  return { ref, isInView };
};

// Parallax scroll hook
export const useParallax = (speed = 0.5) => {
  const ref = useRef(null);
  
  return { ref };
};
