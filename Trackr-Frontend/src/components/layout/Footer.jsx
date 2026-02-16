import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-4 border-t border-white/5 bg-slate-950/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 shadow-lg">
            <img
              src="/app-logo.png"
              alt="Trackr Mini Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-xl text-white">
            Trackr
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <p className="text-slate-400 text-sm flex items-center justify-center gap-1.5">
            Created by <span className="text-white font-medium">Wisdom</span>
            with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            and{" "}
            <span className="italic font-display text-indigo-400">
              elegance
            </span>
          </p>
          <p className="text-slate-600 text-xs tracking-widest uppercase">
            &copy; {currentYear} Trackr. All rights reserved.
          </p>
        </motion.div>

        {/* Decorative Gradient Line */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent mt-8"></div>
      </div>
    </footer>
  );
};

export default Footer;
