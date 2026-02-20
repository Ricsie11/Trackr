import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-4 border-t border-white/5 bg-slate-950/30 backdrop-blur-sm mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 items-center gap-8">
        {/* Left: Brand */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 justify-center md:justify-start"
        >
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl relative group">
            <div className="absolute inset-0 bg-indigo-500/20 group-hover:bg-indigo-500/40 transition-colors"></div>
            <img
              src="/app-logo.png"
              alt="Trackr Mini Logo"
              className="w-full h-full object-cover relative z-10"
            />
          </div>
          <span className="font-display font-bold text-2xl text-white tracking-tight">
            Trackr
          </span>
        </motion.div>

        {/* Center: Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center space-y-2 text-center"
        >
          <p className="text-slate-400 text-sm flex items-center gap-1.5">
            Created by <span className="text-white font-medium">Wisdom</span>
            with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
          <p className="text-slate-600 text-xs tracking-widest uppercase">
            &copy; {currentYear} Trackr. All rights reserved.
          </p>
        </motion.div>

        {/* Right: Socials */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center md:justify-end gap-5"
        >
          <a
            href="#"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Ricsie11/"
            target="_blank"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </motion.div>
      </div>

      {/* Decorative Gradient Line */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="w-full h-px bg-linear-to-r from-transparent via-indigo-400/60 to-transparent shadow-[0_0_15px_rgba(129,140,248,0.2)]"></div>
      </div>
    </footer>
  );
};

export default Footer;
