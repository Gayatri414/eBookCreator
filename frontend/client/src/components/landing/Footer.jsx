import React from "react";
import { BookOpen, Twitter, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
   <footer className="bg-violet-100 border-t">


      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* ===== Brand ===== */}
          <div>
            <div className="flex items-center gap-2 text-violet-600 font-bold text-xl mb-4">
              <BookOpen className="w-6 h-6" />
              AI eBook Creator
            </div>
            <p className="text-gray-600 text-sm">
              Create, edit, and publish professional-quality eBooks using
              AI-powered tools.
            </p>
          </div>

          {/* ===== Product ===== */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#features" className="hover:text-violet-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-violet-600">
                  Testimonials
                </a>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-violet-600">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Company ===== */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li>
                <a href="#" className="hover:text-violet-600">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-violet-600">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* ===== Social ===== */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-violet-600"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-violet-600"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-violet-600"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* ===== Bottom ===== */}
        <div className="mt-10 pt-6 border-t text-center text-sm text-gray-500">
          © {new Date().getFullYear()} AI eBook Creator. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
