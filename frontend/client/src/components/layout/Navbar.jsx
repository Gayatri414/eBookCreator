import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import ProfileDropdown from "./ProfileDropdown";
import { Menu, X, BookOpen, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="flex items-center gap-2 text-indigo-600 font-bold text-xl"
        >
          <BookOpen className="w-6 h-6" />
          eBookCreator
        </Link>

        {/* ================= DESKTOP LINKS ================= */}
        <div className="hidden md:flex items-center gap-6">
          {!isAuthenticated &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-indigo-600"
              >
                {link.name}
              </a>
            ))}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() =>
                  setProfileDropdownOpen(!isProfileDropdownOpen)
                }
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=User"
                  }
                  alt="Profile"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </button>

              {isProfileDropdownOpen && (
                <ProfileDropdown
                  onClose={() => setProfileDropdownOpen(false)}
                />
              )}
            </div>
          )}
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {!isAuthenticated &&
            navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-600 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="block text-gray-600 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="block text-gray-600 hover:text-indigo-600"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
