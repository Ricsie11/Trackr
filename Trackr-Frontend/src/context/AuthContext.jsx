import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Use environment variable for API URL
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1.0";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token && !user?.username) {
        try {
          const res = await axios.get(`${API_URL}/users/me/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          // Fallback if /users/me/ doesn't exist
          setUser({ isLoggedIn: true, username: "User" });
        }
      }
    };

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, {
        username,
        password,
      });
      const { access, user: loginUser } = response.data;
      localStorage.setItem("token", access);
      setToken(access);
      setUser(loginUser || { isLoggedIn: true });
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Login failed",
      };
    }
  };

  const signup = async (userData) => {
    try {
      await axios.post(`${API_URL}/signup/`, userData);
      return { success: true };
    } catch (error) {
      console.error("Signup failed:", error);
      return { success: false, error: error.response?.data || "Signup failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  const updateProfilePic = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profile_pic", file);
      const res = await axios.post(`${API_URL}/profile/update/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      // Fetch user profile again to get updated pic URL
      const profileRes = await axios.get(`${API_URL}/users/me/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(profileRes.data);
      return { success: true, profile_pic: res.data.profile_pic };
    } catch (error) {
      console.error("Profile pic update failed:", error);
      return { success: false, error: "Failed to update profile picture" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        updateProfilePic,
        setUser,
        loading,
        API_URL,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
