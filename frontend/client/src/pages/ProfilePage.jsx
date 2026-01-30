import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User, Mail } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import InputField from "../components/ui/InputField";
import Button from "../components/ui/Button";

import { useAuth } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();

  //  IMPORTANT GUARD
  if (!user) {
    return (
      <DashboardLayout>
        <div className="text-center py-10 text-gray-500">
          Loading profile...
        </div>
      </DashboardLayout>
    );
  }

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  /* ================= LOAD USER ================= */
  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
    });
  }, [user]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= UPDATE PROFILE ================= */
  const handleUpdateProfile = async () => {
    if (!formData.name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);

      const res = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      updateUser(res.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update profile"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto bg-white rounded-lg border p-6">
        <h1 className="text-xl font-semibold mb-6">Profile Settings</h1>

        <div className="space-y-4">
          <InputField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            disabled
            icon={Mail}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={handleUpdateProfile} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
