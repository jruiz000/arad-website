import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, animationVariants } from '../hooks/useScrollAnimation';

export function AnimatedSection({ 
  children, 
  animation = 'fadeInUp', 
  className = '',
  threshold = 0.1,
  ...props 
}) {
  const { ref, isInView } = useScrollAnimation(threshold);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={animationVariants[animation]}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedContainer({ 
  children, 
  className = '',
  threshold = 0.1,
  stagger = true,
  ...props 
}) {
  const { ref, isInView } = useScrollAnimation(threshold);

  return (
    <motion.div
      ref={ref}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={stagger ? animationVariants.staggerContainer : animationVariants.fadeInUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({ 
  children, 
  className = '',
  ...props 
}) {
  return (
    <motion.div
      variants={animationVariants.staggerItem}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ 
  children, 
  className = '',
  ...props 
}) {
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      variants={{
        initial: { scale: 1, y: 0 },
        hover: { 
          scale: 1.02, 
          y: -8,
          transition: {
            duration: 0.3,
            ease: [0.4, 0, 0.2, 1]
          }
        }
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HoverButton({ 
  children, 
  className = '',
  onClick,
  ...props 
}) {
  return (
    <motion.button
      whileHover="hover"
      whileTap="tap"
      initial="initial"
      variants={{
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
      }}
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
}
