import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import Button from '../components/ui/Button';
import { fadeInUp, textReveal, staggerContainer, staggerItem } from '../animations/variants';

const Hero = () => {
  const heroRef = useRef(null);
  const floatingElementsRef = useRef([]);

  useEffect(() => {
    // Floating background elements animation
    floatingElementsRef.current.forEach((el, index) => {
      if (el) {
        gsap.to(el, {
          y: "random(-30, 30)",
          x: "random(-20, 20)",
          rotation: "random(-15, 15)",
          duration: "random(4, 8)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      }
    });

    // Mouse follow glow effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      
      gsap.to('.mouse-glow', {
        x: clientX - 200,
        y: clientY - 200,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const addToRefs = (el) => {
    if (el && !floatingElementsRef.current.includes(el)) {
      floatingElementsRef.current.push(el);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100 scroll-mt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mouse follow glow */}
        <div className="mouse-glow absolute w-96 h-96 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl pointer-events-none" />
        
        {/* Floating gradient blobs */}
        <div
          ref={addToRefs}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-primary-300/30 to-secondary-300/30 rounded-full blur-3xl"
        />
        <div
          ref={addToRefs}
          className="absolute top-40 right-32 w-48 h-48 bg-gradient-to-r from-secondary-300/20 to-primary-300/20 rounded-full blur-2xl"
        />
        <div
          ref={addToRefs}
          className="absolute bottom-32 left-1/3 w-56 h-56 bg-gradient-to-r from-primary-200/25 to-secondary-200/25 rounded-full blur-3xl"
        />
        <div
          ref={addToRefs}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-secondary-200/30 to-primary-200/30 rounded-full blur-2xl"
        />

        {/* Floating icons */}
        <motion.div
          className="absolute top-32 right-1/4 text-primary-300/40"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <BookOpen size={32} />
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 left-1/4 text-secondary-300/40"
          animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkles size={28} />
        </motion.div>
        <motion.div
          className="absolute top-1/2 right-32 text-primary-300/40"
          animate={{ y: [0, -25, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <Zap size={24} />
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg">
              <Sparkles className="w-4 h-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                AI-Powered Book Creation Platform
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="block text-gray-900">Create Amazing</span>
              <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-primary-700 bg-clip-text text-transparent">
                Books with AI
              </span>
            </h1>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.p 
            variants={staggerItem}
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Transform your ideas into professional books with our AI-powered writing assistant. 
            Write, edit, and publish faster than ever before.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <Link to="/signup">
              <Button 
                variant="gradient" 
                size="xl"
                withGlow
                withShine
                className="group"
              >
                Start Writing Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <button 
              onClick={() => {
                const element = document.getElementById('features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="focus:outline-none"
            >
              <Button 
                variant="outline" 
                size="xl"
                className="group"
              >
                Learn More
                <motion.div
                  className="w-2 h-2 bg-primary-500 rounded-full ml-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={staggerItem}
            className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            {[
              { number: "10K+", label: "Books Created" },
              { number: "50K+", label: "Happy Authors" },
              { number: "99%", label: "Success Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 + index * 0.1, duration: 0.6 }}
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Dashboard Preview */}
      <motion.div
        className="absolute bottom-10 right-10 hidden lg:block"
        initial={{ opacity: 0, y: 100, rotate: -10 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 2, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
        whileHover={{ scale: 1.05, rotate: 2 }}
      >
        <div className="w-64 h-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-3 bg-gradient-to-r from-primary-200 to-secondary-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded-full w-1/2"></div>
            <div className="flex gap-2 mt-4">
              <div className="w-8 h-8 bg-primary-100 rounded-lg"></div>
              <div className="w-8 h-8 bg-secondary-100 rounded-lg"></div>
              <div className="w-8 h-8 bg-gray-100 rounded-lg"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 focus:outline-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        onClick={() => {
          const element = document.getElementById('features');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center hover:border-primary-400 transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-1 h-3 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.button>
    </section>
  );
};

export default Hero;