import React from 'react';
import Navbar from "../components/layout/Navbar";
import Hero from "../sections/Hero";
import Features from "../sections/Features";
import DashboardPreview from "../sections/DashboardPreview";
import Testimonials from "../sections/Testimonials";
import Pricing from "../sections/Pricing";
import Footer from "../sections/Footer";
import ScrollToTop from "../components/ui/ScrollToTop";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <DashboardPreview />
      <Testimonials />
      <Pricing />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default LandingPage;
