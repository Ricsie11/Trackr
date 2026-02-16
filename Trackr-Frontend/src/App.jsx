import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/layout/Header";
import LoginForm from "./components/auth/LoginForm";
import SignupForm from "./components/auth/SignupForm";
import SummarySection from "./components/dashboard/SummarySection";
import ChartsSection from "./components/dashboard/ChartsSection";
import TransactionList from "./components/dashboard/TransactionList";
import TransactionModal from "./components/dashboard/TransactionModal";
import ProfileSettings from "./components/dashboard/ProfileSettings";
import Footer from "./components/layout/Footer";

import GlassCard from "./components/common/GlassCard";
import { motion } from "framer-motion";
import { LayoutDashboard, Wallet, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return children;
};

const Dashboard = () => {
  const { token, user, API_URL } = useAuth();
  const [timeframe, setTimeframe] = useState("total"); // today, week, month, year, total
  const [data, setData] = useState({
    today: { income: 0, expense: 0, balance: 0 },
    week: { income: 0, expense: 0, balance: 0 },
    month: { income: 0, expense: 0, balance: 0 },
    year: { income: 0, expense: 0, balance: 0 },
    total: { income: 0, expense: 0, balance: 0 },
  });
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const fetchData = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const [summaryRes, expensesRes, incomesRes] = await Promise.all([
        axios.get(`${API_URL}/summary/`, config),
        axios.get(`${API_URL}/expenses/`, config),
        axios.get(`${API_URL}/incomes/`, config),
      ]);

      const allTransactions = [
        ...(expensesRes.data.results || expensesRes.data).map((t) => ({
          ...t,
          type: "expense",
        })),
        ...(incomesRes.data.results || incomesRes.data).map((t) => ({
          ...t,
          type: "income",
        })),
      ].sort((a, b) => new Date(b.date) - new Date(a.date));

      setData(summaryRes.data);
      setTransactions(allTransactions);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const handleSaveTransaction = async (formData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint = formData.type === "expense" ? "expenses" : "incomes";

      if (formData.id) {
        await axios.patch(
          `${API_URL}/${endpoint}/${formData.id}/`,
          formData,
          config,
        );
      } else {
        await axios.post(`${API_URL}/${endpoint}/`, formData, config);
      }

      setIsModalOpen(false);
      fetchData(); // Refresh all data
    } catch (error) {
      console.error("Error saving transaction:", error);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    const transaction = transactions.find((t) => t.id === id);
    if (!transaction) return;

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const endpoint = transaction.type === "expense" ? "expenses" : "incomes";

      await axios.delete(`${API_URL}/${endpoint}/${id}/`, config);
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const currentSummary = data[timeframe] || data.total;

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <LayoutDashboard className="text-indigo-400 w-8 h-8" />
          <h1 className="text-4xl">
            {user?.nickname || user?.first_name
              ? `Welcome back, ${user.nickname || user.first_name}`
              : "Your Dashboard"}
          </h1>
        </motion.div>

        <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5 self-start">
          {["today", "week", "month", "year", "total"].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                timeframe === t
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <SummarySection summary={currentSummary} />

      <ChartsSection transactions={transactions} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TransactionList
            transactions={transactions}
            onEdit={(t) => {
              setEditingTransaction(t);
              setIsModalOpen(true);
            }}
            onAdd={() => {
              setEditingTransaction(null);
              setIsModalOpen(true);
            }}
          />
        </div>
        <div>
          <GlassCard className="p-6">
            <h3 className="text-xl mb-4 font-display">Fast Logging</h3>
            <p className="text-sm text-slate-400 mb-6 font-sans">
              Quickly add a new record to your {timeframe} overview.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => {
                  setEditingTransaction({ type: "expense" });
                  setIsModalOpen(true);
                }}
                className="w-full btn-primary flex items-center justify-between"
              >
                <span>Add Expense</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setEditingTransaction({ type: "income" });
                  setIsModalOpen(true);
                }}
                className="w-full px-6 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-600/30 transition-all flex items-center justify-between"
              >
                <span>Add Income</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </GlassCard>
        </div>
      </div>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingTransaction}
        onSave={handleSaveTransaction}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
};

const Landing = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative group mb-10"
    >
      {/* Massive Hyper-Chromatic Pulsing Glow (8+ Colors) */}
      <div className="absolute -inset-16 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-500 rounded-full blur-[80px] opacity-50 animate-pulse"></div>
      <div className="absolute -inset-12 bg-gradient-to-bl from-indigo-500 via-emerald-500 to-rose-500 rounded-full blur-[60px] opacity-40 animate-pulse delay-700"></div>
      <div className="absolute -inset-8 bg-gradient-to-tr from-orange-500 via-violet-500 to-lime-500 rounded-full blur-[40px] opacity-30 animate-pulse delay-1000"></div>

      <div className="relative w-40 h-40 rounded-[2.5rem] overflow-hidden border border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.2)] transition-transform duration-500 hover:scale-110">
        <img
          src="/app-logo.png"
          alt="Trackr App Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
    <motion.h1
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="text-7xl md:text-9xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 font-display font-black tracking-tighter"
    >
      Master Your Money
    </motion.h1>
    <motion.p
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1 }}
      className="text-xl text-slate-400 max-w-2xl mb-12"
    >
      The premium, secure way to track expenses and grow your wealth.
      Beautifully designed for the modern individual.
    </motion.p>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Navigate to="/dashboard" />
    </motion.div>
  </div>
);

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/login"
            element={
              <div className="flex justify-center items-center px-4 py-20 min-h-[80vh]">
                <LoginForm />
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div className="flex justify-center items-center px-4 py-20 min-h-[80vh]">
                <SignupForm />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <ProfileSettings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
