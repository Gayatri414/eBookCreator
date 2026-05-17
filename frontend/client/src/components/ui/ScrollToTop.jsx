import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import FloatingButton from './FloatingButton';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
        >
          <FloatingButton
            onClick={scrollToTop}
            variant="primary"
            size="md"
            position="bottom-right"
            className="group"
          >
            <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-200" />
          </FloatingButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;