import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`glass-card transition-all duration-300 hover:shadow-indigo-500/10 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
