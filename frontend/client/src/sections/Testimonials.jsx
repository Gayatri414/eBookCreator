import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { gsap } from 'gsap';
import Card from '../components/ui/Card';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

const Testimonials = () => {
  const testimonialRefs = useRef([]);

  useEffect(() => {
    // Floating animation for testimonial cards
    testimonialRefs.current.forEach((card, index) => {
      if (card) {
        gsap.to(card, {
          y: "random(-10, 10)",
          rotation: "random(-2, 2)",
          duration: "random(4, 6)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      }
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !testimonialRefs.current.includes(el)) {
      testimonialRefs.current.push(el);
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Bestselling Author",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "BookCraft transformed my writing process completely. I published 3 books in 6 months with their AI assistance. The quality and speed are unmatched!",
      rating: 5,
      gradient: "from-purple-400 to-pink-400"
    },
    {
      name: "Michael Chen",
      role: "Technical Writer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The AI writing assistant is incredibly smart. It understands context and helps me maintain consistency across chapters. Game-changer for technical documentation.",
      rating: 5,
      gradient: "from-blue-400 to-indigo-400"
    },
    {
      name: "Emily Rodriguez",
      role: "Fiction Author",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "I was skeptical about AI helping with creative writing, but BookCraft proved me wrong. It enhanced my creativity rather than replacing it. Absolutely love it!",
      rating: 5,
      gradient: "from-green-400 to-teal-400"
    },
    {
      name: "David Park",
      role: "Business Coach",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Published my business guide in record time. The templates and formatting tools saved me weeks of work. My clients are impressed with the professional quality.",
      rating: 5,
      gradient: "from-yellow-400 to-orange-400"
    },
    {
      name: "Lisa Thompson",
      role: "Academic Writer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "The research integration and citation management features are phenomenal. BookCraft made my academic publishing process so much more efficient.",
      rating: 5,
      gradient: "from-red-400 to-pink-400"
    },
    {
      name: "James Wilson",
      role: "Memoir Writer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "Writing my memoir was emotional and challenging. BookCraft's AI helped me organize my thoughts and maintain narrative flow. Couldn't have done it without this tool.",
      rating: 5,
      gradient: "from-indigo-400 to-purple-400"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/15 to-indigo-200/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary-100/10 to-secondary-100/10 rounded-full blur-3xl" />
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
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Loved by 50,000+ Authors
              </span>
            </div>
          </motion.div>

          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            What Authors Say
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              About BookCraft
            </span>
          </motion.h2>

          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Join thousands of successful authors who have transformed their writing 
            process and published amazing books with BookCraft.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              ref={addToRefs}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                variant="glass" 
                className="p-8 h-full group hover:border-white/40 relative"
                glow
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Quote className="w-8 h-8 text-gray-400" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className={`absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-20 blur-sm group-hover:opacity-40 transition-all duration-300`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${testimonial.gradient} opacity-0 group-hover:opacity-5 transition-all duration-300`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-8 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                4.9/5
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                50K+
              </div>
              <div className="text-sm text-gray-600">Happy Authors</div>
            </div>
            <div className="w-px h-12 bg-gray-200" />
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                100K+
              </div>
              <div className="text-sm text-gray-600">Books Published</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;