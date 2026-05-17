import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, hoverScale } from '../../animations/variants';

const Card = ({ 
  children, 
  className = '', 
  variant = 'default',
  hover = true,
  glow = false,
  ...props 
}) => {
  const variants = {
    default: `
      bg-white/80 backdrop-blur-sm border border-white/20
      shadow-lg hover:shadow-xl
    `,
    glass: `
      bg-white/10 backdrop-blur-md border border-white/20
      shadow-lg hover:shadow-xl
    `,
    solid: `
      bg-white border border-gray-200
      shadow-sm hover:shadow-md
    `,
    gradient: `
      bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm
      border border-white/30 shadow-lg hover:shadow-xl
    `,
  };

  const glowEffect = glow ? 'hover:shadow-primary-500/20' : '';
  
  return (
    <motion.div
      className={`
        rounded-2xl transition-all duration-300
        ${variants[variant]}
        ${glowEffect}
        ${className}
      `}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      whileHover={hover ? hoverScale : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;