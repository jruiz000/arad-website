import React, { useState } from "react";
import { motion } from "framer-motion";
import { RxCross2 } from "react-icons/rx";

const ConditionalRender = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

const useVisible = () => {
  const [isVisible, setIsVisible] = useState(true);
  const hide = () => {
    setIsVisible(false);
  };
  return {
    isVisible,
    hide,
  };
};

export function Banner7() {
  const visibleState = useVisible();
  
  return (
    <ConditionalRender condition={visibleState.isVisible}>
      <motion.section
        id="relume"
        className="relative border-b border-border-primary bg-announcement px-[5%]"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col justify-center py-4 md:flex-row md:items-center md:justify-center md:py-3 relative">
            <div className="flex w-full items-center justify-center text-center">
              <div className="flex-1 px-2">
                <h2 className="font-semibold text-white text-xs sm:text-sm md:text-base lg:text-xl whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontFamily: 'Inconsolata, monospace' }}>
                  Unlock Exclusive Insights with ARAD System
                </h2>
              </div>
            </div>
            
            <motion.button 
              className="absolute top-2 right-2 md:top-1/2 md:-translate-y-1/2 md:right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={visibleState.hide}
              aria-label="Close announcement banner"
            >
              <RxCross2 className="size-5 md:size-6 text-white" />
            </motion.button>
          </div>
        </div>
      </motion.section>
    </ConditionalRender>
  );
}
