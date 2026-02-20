import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Shield,
  Zap,
  LineChart,
  Wallet,
  Activity,
  CheckCircle2,
  Lock,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import GlassCard from "../components/common/GlassCard";

const LandingPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      alt: "Financial Dashboard Analytics",
    },
    {
      url: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
      alt: "Market Statistics Tracking",
    },
    {
      url: "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D=crop",
      alt: "Investment Data Analytics",
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      alt: "Growth and Profits Visualization",
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const features = [
    {
      icon: <LineChart className="w-8 h-8 text-indigo-400" />,
      title: "Real-time Analytics",
      description:
        "Visualize your spending habits with interactive charts and real-time data processing.",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Bank-Grade Security",
      description:
        "Your financial data is encrypted and protected with industry-leading security protocols.",
    },
    {
      icon: <Zap className="w-8 h-8 text-amber-400" />,
      title: "Instant Insights",
      description:
        "Get smart suggestions on how to save more and optimize your monthly budget effortlessly.",
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-fuchsia-600/10 blur-[100px] rounded-full" />
        </div>

        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-sm font-medium text-slate-300">
              New Feature: AI Spending Analysis
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-clip-text text-transparent bg-linear-to-b from-white via-white to-slate-500 font-display leading-[1.1]"
          >
            Wealth tracking <br />
            <span className="text-indigo-400">made effortless.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Trackr provides a premium, secure, and beautiful way to manage your
            finances. Join thousands of users optimizing their wealth every day.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/signup"
              className="btn-primary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto justify-center"
            >
              Get Started for Free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-lg w-full sm:w-auto font-medium"
            >
              Log In
            </Link>
          </motion.div>

          {/* App Preview Carousel */}
          <motion.div
            variants={itemVariants}
            className="mt-24 relative max-w-5xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-linear-to-r from-indigo-500 to-fuchsia-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative glass-card overflow-hidden border-white/20 aspect-video md:aspect-21/9">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={currentImageIndex}
                  initial={{ x: "100%", opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: "-100%", opacity: 0 }}
                  transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={heroImages[currentImageIndex].url}
                    alt={heroImages[currentImageIndex].alt}
                    className="w-full h-full object-cover opacity-90"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Overlay for "Smart UI" feel */}
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Carousel Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      currentImageIndex === idx
                        ? "bg-indigo-400 w-8"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    (prev) =>
                      (prev - 1 + heroImages.length) % heroImages.length,
                  )
                }
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-slate-950/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-950/80 backdrop-blur-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
                }
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-slate-950/50 border border-white/10 opacity-0 group-hover:opacity-100 transition-all hover:bg-slate-950/80 backdrop-blur-md"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Visual Precision Section */}
      <section className="py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                Precision Tracking <br />
                <span className="text-indigo-400">Built for Quality.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our platform uses advanced data aggregation to provide you with
                a crystal-clear view of your financial health. Every transaction
                is categorized and analyzed in real-time.
              </p>
              <ul className="space-y-4">
                {[
                  "Automatic transaction categorization",
                  "Multi-currency support for global usage",
                  "Monthly financial health scorecards",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full" />
              <div className="relative glass-card overflow-hidden border-white/10 aspect-square md:aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=2070&auto=format&fit=crop"
                  alt="Financial Precision"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section with Integrated Image */}
      <section className="py-24 px-4 bg-slate-900/30 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-2 space-y-8"
            >
              <h2 className="text-4xl md:text-5xl font-bold font-display leading-tight">
                Uncompromising <br />
                <span className="text-emerald-400">Bank-Grade Security.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We believe your privacy is non-negotiable. Trackr utilizes
                end-to-end encryption and multi-factor authentication to ensure
                your data remains yours and yours alone.
              </p>
              <div className="flex gap-6 pt-4">
                <div className="p-4 glass-card border-white/5 flex flex-col items-center min-w-[100px]">
                  <Lock className="w-8 h-8 text-emerald-400 mb-2" />
                  <span className="text-sm font-medium">AES-256</span>
                </div>
                <div className="p-4 glass-card border-white/5 flex flex-col items-center min-w-[100px]">
                  <Shield className="w-8 h-8 text-indigo-400 mb-2" />
                  <span className="text-sm font-medium">2FA Ready</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-1 relative"
            >
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full" />
              <div className="relative glass-card overflow-hidden border-white/10 aspect-square md:aspect-4/3">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop"
                  alt="Security Infrastructure"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto glass-card border-indigo-500/20 py-16 px-8 text-center bg-indigo-600/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black text-indigo-400 mb-2 font-display">
                $10M+
              </span>
              <span className="text-slate-400 font-medium">
                Expenses Tracked
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black text-emerald-400 mb-2 font-display">
                50k+
              </span>
              <span className="text-slate-400 font-medium">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black text-amber-400 mb-2 font-display">
                99.9%
              </span>
              <span className="text-slate-400 font-medium">
                Uptime Guarantee
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-5xl font-black text-fuchsia-400 mb-2 font-display">
                4.9/5
              </span>
              <span className="text-slate-400 font-medium">User Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-slate-900/30 backdrop-blur-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Everything you need
            </h2>
            <p className="text-slate-400 text-lg">
              Powerful features to keep your finances in check.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <GlassCard className="p-8 h-full hover:border-indigo-500/50 transition-colors border-white/5">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] -z-10 rounded-full" />

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-5xl md:text-6xl font-black font-display tracking-tight">
              Ready to take control of <br />
              <span className="text-indigo-400">your financial future?</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Start your journey today and experience the most advanced personal
              finance tracker on the market.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                to="/signup"
                className="btn-primary text-xl px-12 py-5 shadow-[0_0_30px_rgba(79,70,229,0.4)]"
              >
                Join Trackr Now
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 pt-12 grayscale opacity-50">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5" /> Secure
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" /> Global
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5" /> Real-time
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Verified
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
