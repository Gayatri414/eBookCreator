import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";

const LogoutPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    toast.success("Logged out successfully");
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <LogOut size={32} />
        <p>Logging you out...</p>
      </div>
    </div>
  );
};

export default LogoutPage;
