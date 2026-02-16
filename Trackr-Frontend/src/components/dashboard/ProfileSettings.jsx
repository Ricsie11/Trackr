import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Save,
  ArrowLeft,
  Loader2,
  User as UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "../common/GlassCard";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const ProfileSettings = () => {
  const { user, token, API_URL, setUser } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(user?.profile_pic || null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: "error", text: "File is too large. Max 2MB." });
        return;
      }
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setMessage({ type: "", text: "" });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("profile_pic", selectedFile);

    try {
      const res = await axios.post(`${API_URL}/profile/update/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Update user state with new profile pic URL
      const newPicUrl = res.data.profile_pic;
      setUser((prev) => ({ ...prev, profile_pic: newPicUrl }));

      setMessage({
        type: "success",
        text: "Profile picture updated successfully!",
      });
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg =
        error.response?.data?.error ||
        error.response?.data?.details ||
        "Failed to update profile picture.";
      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group w-fit"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-display font-bold mb-8">
          Account Settings
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GlassCard className="p-8 md:col-span-1 flex flex-col items-center">
            <div className="relative group mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 bg-slate-800 flex items-center justify-center">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon className="w-12 h-12 text-slate-500" />
                )}
              </div>
              <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <Camera className="w-8 h-8 text-white" />
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <h3 className="text-xl font-medium text-white mb-1">
              {user?.username}
            </h3>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </GlassCard>

          <GlassCard className="p-8 md:col-span-2">
            <h3 className="text-xl font-medium mb-6">Profile Picture</h3>

            <form onSubmit={handleUpload} className="space-y-6">
              <div>
                <p className="text-sm text-slate-400 mb-4">
                  Upload a new profile picture. Recommended size: 400x400px. Max
                  weight: 2MB.
                </p>

                {message.text && (
                  <div
                    className={`p-4 rounded-xl mb-4 text-sm ${
                      message.type === "success"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <div className="flex items-center gap-4">
                  <label className="btn-primary cursor-pointer py-2 px-4 text-sm">
                    {selectedFile ? "Change Selection" : "Select Image"}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </label>
                  {selectedFile && (
                    <span className="text-xs text-slate-400 italic truncate max-w-[200px]">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!selectedFile || isUploading}
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 disabled:opacity-50 shadow-indigo-500/20"
              >
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                Save Changes
              </button>
            </form>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;
