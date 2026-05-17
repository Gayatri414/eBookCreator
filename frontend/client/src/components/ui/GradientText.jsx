import React from 'react';
import { motion } from 'framer-motion';

const GradientText = ({ 
  children, 
  className = '', 
  gradient = 'primary',
  animate = false,
  ...props 
}) => {
  const gradients = {
    primary: 'from-primary-600 to-secondary-600',
    secondary: 'from-secondary-600 to-primary-600',
    purple: 'from-purple-600 to-pink-600',
    blue: 'from-blue-600 to-indigo-600',
    green: 'from-green-600 to-teal-600',
    orange: 'from-orange-600 to-red-600',
    rainbow: 'from-purple-600 via-pink-600 via-red-600 via-orange-600 via-yellow-600 via-green-600 via-blue-600 to-indigo-600',
  };

  const Component = animate ? motion.span : 'span';
  const animationProps = animate ? {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  } : {};

  return (
    <Component
      className={`bg-gradient-to-r ${gradients[gradient]} bg-clip-text text-transparent ${
        animate ? 'bg-size-200' : ''
      } ${className}`}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default GradientText;