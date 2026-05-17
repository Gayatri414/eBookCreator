import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  BookOpen, 
  Sparkles, 
  Brain, 
  FileText, 
  Share2,
  Palette,
  Shield,
  Globe
} from 'lucide-react';
import Card from '../components/ui/Card';
import { useStaggerAnimation } from '../hooks/useScrollAnimation';
import { staggerContainer, staggerItem, fadeInUp } from '../animations/variants';

const Features = () => {
  const featuresRef = useStaggerAnimation('.feature-card');

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Writing",
      description: "Advanced AI helps you write, edit, and improve your content with intelligent suggestions and real-time feedback.",
      gradient: "from-purple-500 to-pink-500",
      delay: 0.1
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Create and publish books 10x faster with our streamlined workflow and automated formatting tools.",
      gradient: "from-yellow-500 to-orange-500",
      delay: 0.2
    },
    {
      icon: Palette,
      title: "Beautiful Templates",
      description: "Choose from dozens of professionally designed templates that make your book look stunning.",
      gradient: "from-green-500 to-teal-500",
      delay: 0.3
    },
    {
      icon: FileText,
      title: "Smart Editor",
      description: "Rich text editor with markdown support, real-time collaboration, and version control.",
      gradient: "from-blue-500 to-indigo-500",
      delay: 0.4
    },
    {
      icon: Share2,
      title: "Easy Publishing",
      description: "Publish to multiple platforms with one click. Export to PDF, EPUB, or share online instantly.",
      gradient: "from-red-500 to-pink-500",
      delay: 0.5
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your work is protected with enterprise-grade security and privacy controls.",
      gradient: "from-gray-600 to-gray-800",
      delay: 0.6
    }
  ];

  return (
    <section id="features" className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary-200/20 to-secondary-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-secondary-200/15 to-primary-200/15 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem}>
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg mb-6">
              <Sparkles className="w-4 h-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Powerful Features
              </span>
            </div>
          </motion.div>

          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Everything you need to
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              create amazing books
            </span>
          </motion.h2>

          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our platform combines the power of AI with intuitive design to help you 
            write, edit, and publish professional books faster than ever before.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: feature.delay }}
            >
              <Card 
                variant="glass" 
                className="p-8 h-full group hover:border-white/40 transition-all duration-300"
                glow
              >
                {/* Icon */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl group-hover:opacity-40 transition-all duration-300`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary-500/5 to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                    i === 1 ? 'from-purple-400 to-pink-400' :
                    i === 2 ? 'from-blue-400 to-indigo-400' :
                    i === 3 ? 'from-green-400 to-teal-400' :
                    'from-yellow-400 to-orange-400'
                  } border-2 border-white shadow-sm`}
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900">Join 50,000+ authors</p>
              <p className="text-xs text-gray-600">Already creating amazing books</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;