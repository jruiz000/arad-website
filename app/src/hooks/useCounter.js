import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

export const useCounter = (target, duration = 2000, suffix = '', prefix = '', decimals = 0) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.5 });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (isInView && !hasStarted.current) {
      hasStarted.current = true;
      
      const startTime = Date.now();
      const startValue = 0;
      const endValue = parseFloat(target);
      
      const updateCount = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = startValue + (endValue - startValue) * easeOutQuart;
        
        setCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          setCount(endValue);
        }
      };
      
      requestAnimationFrame(updateCount);
    }
  }, [isInView, target, duration]);

  const formatValue = (value) => {
    const formattedValue = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
    return `${prefix}${formattedValue}${suffix}`;
  };

  return { ref, count: formatValue(count) };
};
