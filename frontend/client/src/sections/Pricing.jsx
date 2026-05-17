import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { fadeInUp, staggerContainer, staggerItem } from '../animations/variants';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "forever",
      description: "Perfect for trying out BookCraft",
      icon: Zap,
      gradient: "from-gray-400 to-gray-600",
      popular: false,
      features: [
        "1 book project",
        "Basic AI writing assistance",
        "5 template designs",
        "PDF export",
        "Community support",
        "Basic analytics"
      ]
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious authors and content creators",
      icon: Crown,
      gradient: "from-primary-500 to-secondary-500",
      popular: true,
      features: [
        "Unlimited book projects",
        "Advanced AI writing & editing",
        "50+ premium templates",
        "All export formats (PDF, EPUB, MOBI)",
        "Priority support",
        "Advanced analytics & insights",
        "Collaboration tools",
        "Custom branding",
        "Version control"
      ]
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and publishing houses",
      icon: Rocket,
      gradient: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        "Everything in Pro",
        "Team collaboration (up to 50 users)",
        "White-label solution",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security & compliance",
        "Custom templates & workflows",
        "Priority feature requests"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-primary-200/15 to-secondary-200/15 rounded-full blur-3xl" />
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
              <Crown className="w-4 h-4 text-primary-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Simple, Transparent Pricing
              </span>
            </div>
          </motion.div>

          <motion.h2 
            variants={staggerItem}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
          >
            Choose Your
            <span className="block bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </motion.h2>

          <motion.p 
            variants={staggerItem}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Start free and upgrade as you grow. All plans include our core features 
            with no hidden fees or surprise charges.
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <Card 
                variant="glass" 
                className={`p-8 h-full relative ${
                  plan.popular 
                    ? 'border-primary-200 shadow-xl scale-105' 
                    : 'hover:border-white/40'
                } group transition-all duration-300`}
                glow={plan.popular}
              >
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${plan.gradient} p-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                    <plan.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-600 ml-2">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: (index * 0.1) + (featureIndex * 0.05) }}
                    >
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-gray-700 text-sm">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <Link to="/signup" className="block">
                    <Button
                      variant={plan.popular ? "gradient" : "outline"}
                      size="lg"
                      className="w-full"
                      withGlow={plan.popular}
                      withShine={plan.popular}
                    >
                      {plan.name === "Starter" ? "Get Started Free" : 
                       plan.name === "Pro" ? "Start Pro Trial" : 
                       "Contact Sales"}
                    </Button>
                  </Link>
                </div>

                {/* Background Glow Effect */}
                {plan.popular && (
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.gradient} opacity-5 group-hover:opacity-10 transition-all duration-300`} />
                )}
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
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 px-8 py-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 shadow-lg">
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Need a custom solution?
              </h3>
              <p className="text-gray-600 text-sm">
                Contact our sales team for enterprise pricing and custom features.
              </p>
            </div>
            <Button variant="outline" size="md">
              Contact Sales
            </Button>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          className="text-center mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="inline-flex items-center gap-2 text-gray-600">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm">
              30-day money-back guarantee • Cancel anytime • No setup fees
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;