import React, { useRef, useEffect } from "react";
import { motion } from 'framer-motion';
import gsap from "gsap";
import { hoverScale, tapScale } from '../../animations/variants';

const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  children,
  icon: Icon,
  className = "",
  withShine = false,
  withGlow = false,
  ...props
}) => {
  const btnRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current) return;
    const el = btnRef.current;
    const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.2, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.2, ease: "power2.out" });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const variants = {
    primary: `
      bg-gradient-to-r from-primary-500 to-primary-600 
      hover:from-primary-600 hover:to-primary-700 
      text-white shadow-lg hover:shadow-xl
      ${withGlow ? 'hover:shadow-primary-500/25' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-secondary-500 to-secondary-600 
      hover:from-secondary-600 hover:to-secondary-700 
      text-white shadow-lg hover:shadow-xl
      ${withGlow ? 'hover:shadow-secondary-500/25' : ''}
    `,
    outline: `
      border-2 border-gray-200 hover:border-primary-300 
      bg-white/80 backdrop-blur-sm hover:bg-white/90
      text-gray-700 hover:text-primary-600
      shadow-sm hover:shadow-md
    `,
    ghost: `
      bg-white/10 backdrop-blur-sm border border-white/20
      hover:bg-white/20 hover:border-white/30
      text-gray-700 hover:text-gray-900
      shadow-sm hover:shadow-md
    `,
    gradient: `
      bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600
      hover:from-primary-600 hover:via-secondary-600 hover:to-primary-700
      text-white shadow-lg hover:shadow-xl
      bg-size-200 hover:bg-pos-100
      ${withGlow ? 'hover:shadow-primary-500/30' : ''}
    `,
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
    xl: "px-10 py-5 text-lg",
  };

  return (
    <motion.button
      ref={btnRef}
      disabled={isLoading}
      className={`
        relative inline-flex items-center justify-center gap-2
        rounded-2xl font-medium transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        overflow-hidden group
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      whileHover={!isLoading ? hoverScale : {}}
      whileTap={!isLoading ? tapScale : {}}
      {...props}
    >
      {/* Shine effect overlay */}
      {withShine && (
        <div className="absolute inset-0 -top-px overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:animate-shine" />
        </div>
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {isLoading ? (
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        ) : (
          <>
            {Icon && <Icon className="w-4 h-4" />}
            {children}
          </>
        )}
      </span>
      
      {/* Ripple effect container */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-white/10 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
      </div>
    </motion.button>
  );
};

export default Button;
