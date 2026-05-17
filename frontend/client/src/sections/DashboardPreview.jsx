import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Star,
  Calendar,
  Clock,
  Target
} from 'lucide-react';
import Card from '../components/ui/Card';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

const DashboardPreview = () => {
  const chartRef = useRef(null);
  const statsRef = useRef([]);

  useEffect(() => {
    // Animate chart bars
    if (chartRef.current) {
      const bars = chartRef.current.querySelectorAll('.chart-bar');
      gsap.fromTo(bars, 
        { height: 0 },
        { 
          height: (i) => `${[60, 80, 45, 90, 70, 85, 95][i]}%`,
          duration: 1.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: chartRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Animate counter numbers
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        const finalValue = [1247, 89, 156, 94][index];
        const obj = { value: 0 };
        
        gsap.to(obj, {
          value: finalValue,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            stat.textContent = Math.round(obj.value);
          },
          scrollTrigger: {
            trigger: stat,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      }
    });
  }, []);

  const addToStatsRefs = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  const stats = [
    { icon: BookOpen, label: "Books Published", value: 1247, color: "text-blue-600" },
    { icon: TrendingUp, label: "Growth Rate", value: 89, suffix: "%", color: "text-green-600" },
    { icon: Users, label: "Active Authors", value: 156, suffix: "K", color: "text-purple-600" },
    { icon: Star, label: "Satisfaction", value: 94, suffix: "%", color: "text-yellow-600" },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-to-r from-primary-100/30 to-secondary-100/30 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-to-r from-secondary-100/20 to-primary-100/20 rounded-full blur-3xl translate-x-1/2" />
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
          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Powerful Analytics
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              & Insights Dashboard
            </span>
          </motion.h2>

          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Track your progress, analyze performance, and make data-driven decisions 
            with our comprehensive analytics dashboard.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Card */}
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Card variant="glass" className="p-8 h-full">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Publishing Analytics
                  </h3>
                  <p className="text-gray-600">
                    Track your book performance over time
                  </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  +23.5%
                </div>
              </div>

              {/* Chart */}
              <div className="relative h-64 mb-6">
                <div ref={chartRef} className="flex items-end justify-between h-full gap-3">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="flex-1 flex flex-col items-center">
                      <div className="w-full bg-gray-100 rounded-t-lg relative overflow-hidden">
                        <div 
                          className={`chart-bar w-full bg-gradient-to-t ${
                            index % 2 === 0 
                              ? 'from-primary-400 to-primary-600' 
                              : 'from-secondary-400 to-secondary-600'
                          } rounded-t-lg transition-all duration-300 hover:opacity-80`}
                          style={{ height: '0%' }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 mt-2">{day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chart Legend */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" />
                  <span className="text-gray-600">Books Published</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gradient-to-r from-secondary-400 to-secondary-600 rounded-full" />
                  <span className="text-gray-600">Drafts Created</span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Stats Cards */}
          <div className="space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="p-6 group hover:border-white/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                      <div className="flex items-baseline gap-1">
                        <span 
                          ref={addToStatsRefs}
                          className="text-2xl font-bold text-gray-900"
                        >
                          0
                        </span>
                        {stat.suffix && (
                          <span className="text-lg font-medium text-gray-600">
                            {stat.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${
                      stat.color === 'text-blue-600' ? 'from-blue-100 to-blue-200' :
                      stat.color === 'text-green-600' ? 'from-green-100 to-green-200' :
                      stat.color === 'text-purple-600' ? 'from-purple-100 to-purple-200' :
                      'from-yellow-100 to-yellow-200'
                    } group-hover:shadow-lg transition-all duration-300`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {[
            {
              icon: Calendar,
              title: "Smart Scheduling",
              description: "AI-powered writing schedule optimization"
            },
            {
              icon: Clock,
              title: "Time Tracking",
              description: "Monitor your writing productivity"
            },
            {
              icon: Target,
              title: "Goal Setting",
              description: "Set and achieve your writing milestones"
            }
          ].map((feature, index) => (
            <motion.div key={feature.title} variants={staggerItem}>
              <Card variant="glass" className="p-6 text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreview;