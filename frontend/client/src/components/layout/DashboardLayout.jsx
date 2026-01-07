import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut } from "lucide-react";

import Button from "../ui/Button";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-violet-600 font-bold text-lg"
          >
            <BookOpen className="w-5 h-5" />
            AI eBook Creator
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.name}
            </span>
            <Button
              variant="outline"
              size="sm"
              icon={LogOut}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
