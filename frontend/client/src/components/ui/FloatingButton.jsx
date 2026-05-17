import React from 'react';
import { motion } from 'framer-motion';
import { floatingAnimation } from '../../animations/variants';

const FloatingButton = ({ 
  children, 
  onClick, 
  className = '', 
  position = 'bottom-right',
  variant = 'primary',
  size = 'md',
  ...props 
}) => {
  const positions = {
    'bottom-right': 'fixed bottom-8 right-8',
    'bottom-left': 'fixed bottom-8 left-8',
    'top-right': 'fixed top-8 right-8',
    'top-left': 'fixed top-8 left-8',
  };

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white text-gray-700 hover:text-primary-600 shadow-lg hover:shadow-xl border border-gray-200',
    dark: 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg hover:shadow-xl',
  };

  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16',
  };

  return (
    <motion.button
      className={`
        ${positions[position]} 
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-full flex items-center justify-center 
        transition-all duration-300 z-50 backdrop-blur-sm
        ${className}
      `}
      onClick={onClick}
      animate={floatingAnimation}
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default FloatingButton;