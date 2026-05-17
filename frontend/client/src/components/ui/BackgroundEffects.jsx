import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const BackgroundEffects = ({ variant = 'default', children }) => {
  const containerRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Animate floating particles
    particlesRef.current.forEach((particle, index) => {
      if (particle) {
        gsap.to(particle, {
          y: "random(-50, 50)",
          x: "random(-30, 30)",
          rotation: "random(-180, 180)",
          duration: "random(8, 15)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      }
    });
  }, []);

  const addToParticleRefs = (el) => {
    if (el && !particlesRef.current.includes(el)) {
      particlesRef.current.push(el);
    }
  };

  const variants = {
    default: (
      <>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-secondary-200/15 to-primary-200/15 rounded-full blur-3xl" />
      </>
    ),
    hero: (
      <>
        <div
          ref={addToParticleRefs}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-300/30 to-secondary-300/30 rounded-full blur-3xl"
        />
        <div
          ref={addToParticleRefs}
          className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-r from-secondary-300/20 to-primary-300/20 rounded-full blur-2xl"
        />
        <div
          ref={addToParticleRefs}
          className="absolute bottom-32 left-1/3 w-56 h-56 bg-gradient-to-r from-primary-200/25 to-secondary-200/25 rounded-full blur-3xl"
        />
        <div
          ref={addToParticleRefs}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-secondary-200/30 to-primary-200/30 rounded-full blur-2xl"
        />
      </>
    ),
    features: (
      <>
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary-200/15 to-primary-200/15 rounded-full blur-3xl" />
      </>
    ),
    dark: (
      <>
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-secondary-500/5 to-primary-500/5 rounded-full blur-3xl" />
      </>
    ),
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {variants[variant]}
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-secondary-50" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-50 to-transparent"
            animate={{
              background: [
                "linear-gradient(45deg, transparent, rgba(249, 115, 22, 0.05), transparent)",
                "linear-gradient(225deg, transparent, rgba(59, 130, 246, 0.05), transparent)",
                "linear-gradient(45deg, transparent, rgba(249, 115, 22, 0.05), transparent)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BackgroundEffects;