import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../animations/variants';

const AnimatedSection = ({ 
  children, 
  className = '', 
  variant = 'fadeInUp',
  stagger = false,
  delay = 0,
  ...props 
}) => {
  const ref = useScrollAnimation();

  const variants = {
    fadeInUp,
    staggerContainer,
  };

  const selectedVariant = stagger ? staggerContainer : variants[variant];

  return (
    <motion.section
      ref={ref}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={selectedVariant}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;