import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, User, PieChart, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-slate-950/50 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              {/* Intense Multi-Colored Illuminating Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-400 via-fuchsia-500 to-amber-400 rounded-2xl blur-lg opacity-60 animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-bl from-indigo-500 via-emerald-400 to-rose-500 rounded-2xl blur-md opacity-40 animate-pulse delay-500"></div>

              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-2xl border border-white/30 group-hover:scale-110 transition-transform duration-500">
                <img
                  src="/app-logo.png"
                  alt="Trackr Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-slate-400">
              Trackr
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-slate-300 hover:text-white transition-colors flex items-center gap-2"
            >
              <PieChart className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-medium text-white">
                    Hello,{" "}
                    {user?.nickname ||
                      user?.first_name ||
                      user?.username ||
                      "User"}
                  </span>
                  <button
                    onClick={logout}
                    className="text-xs text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1"
                  >
                    Logout
                    <LogOut className="w-3 h-3" />
                  </button>
                </div>
                <Link
                  to="/settings"
                  className="w-10 h-10 bg-slate-800 border border-white/10 rounded-full flex items-center justify-center overflow-hidden hover:border-indigo-500/50 transition-colors"
                >
                  {user?.profile_pic ? (
                    <img
                      src={user.profile_pic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="text-slate-300 w-5 h-5" />
                  )}
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-slate-300 hover:text-white font-medium"
                >
                  Login
                </Link>
                <Link to="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
