import React from "react";
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Optional hero image (if you have it)
// import HERO_IMG from "../../assets/hero-img.png";

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative bg-gradient-to-br from-violet-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* ================= LEFT CONTENT ================= */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-1 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              AI-Powered Publishing
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Create Stunning <br />
            <span className="text-violet-600">
              eBooks in Minutes
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-8 max-w-xl">
            From idea to published ebook, our AI-powered platform
            helps you write, design, and export professional-quality
            books effortlessly.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              to={isAuthenticated ? "/dashboard" : "/signup"}
              className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-violet-700 transition"
            >
              Start Creating for Free
              <ArrowRight className="w-5 h-5" />
            </Link>

            {/* <button className="text-gray-700 font-medium hover:text-violet-600">
              Watch Demo →
            </button> */}
          </div>

          {/* Stats */}
          <div className="flex gap-10">
            <div>
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-gray-500 text-sm">
                Books Created
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p className="text-gray-500 text-sm">
                User Rating
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">10min</h3>
              <p className="text-gray-500 text-sm">
                Avg. Creation
              </p>
            </div>
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="relative">
          {/* Feature cards */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <BookOpen className="w-8 h-8 text-violet-600 mb-3" />
              <h4 className="font-semibold mb-1">
                Structured Writing
              </h4>
              <p className="text-sm text-gray-600">
                Organize chapters and content easily.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <Zap className="w-8 h-8 text-violet-600 mb-3" />
              <h4 className="font-semibold mb-1">
                AI Assistance
              </h4>
              <p className="text-sm text-gray-600">
                Generate outlines & chapters instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm col-span-2">
              <Sparkles className="w-8 h-8 text-violet-600 mb-3" />
              <h4 className="font-semibold mb-1">
                One-Click Export
              </h4>
              <p className="text-sm text-gray-600">
                Download your ebook as PDF or DOCX.
              </p>
            </div>
          </div>

          {/* Optional hero image */}
          {/* 
          <img
            src={HERO_IMG}
            alt="Hero Preview"
            className="mt-8 rounded-xl shadow-lg"
          /> 
          */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
