import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold, 
    once: true,
    margin: "-100px 0px -100px 0px"
  });

  return { ref, isInView };
};

// Animation variants for different entrance effects
export const animationVariants = {
  fadeInUp: {
    initial: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  fadeInLeft: {
    initial: { 
      opacity: 0, 
      x: -60,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  fadeInRight: {
    initial: { 
      opacity: 0, 
      x: 60,
      scale: 0.95
    },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  scaleIn: {
    initial: { 
      opacity: 0, 
      scale: 0.8
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  },
  staggerItem: {
    initial: { 
      opacity: 0, 
      y: 40
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }
};

// Hover animation variants
export const hoverVariants = {
  card: {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.03, 
      y: -8,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  },
  button: {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    tap: { 
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  },
  image: {
    initial: { scale: 1 },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  }
};
