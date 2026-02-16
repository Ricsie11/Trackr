import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import GlassCard from "../common/GlassCard";

const SummaryCard = ({ title, amount, icon: Icon, type }) => {
  const getColors = () => {
    switch (type) {
      case "income":
        return "text-income bg-income/10 border-income/20";
      case "expense":
        return "text-expense bg-expense/10 border-expense/20";
      default:
        return "text-balance bg-balance/10 border-balance/20";
    }
  };

  return (
    <GlassCard className={`p-6 border ${getColors()}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-3xl font-bold font-display text-white">
            ${amount.toLocaleString()}
          </h3>
        </div>
        <div className={`p-3 rounded-xl ${getColors().split(" ")[1]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs">
        <span className="text-slate-500">Updated just now</span>
      </div>
    </GlassCard>
  );
};

const SummarySection = ({
  summary = { income: 0, expense: 0, balance: 0 },
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
    >
      <motion.div variants={item}>
        <SummaryCard
          title="Total Income"
          amount={summary.income}
          icon={ArrowUpRight}
          type="income"
        />
      </motion.div>
      <motion.div variants={item}>
        <SummaryCard
          title="Total Expenses"
          amount={summary.expense}
          icon={ArrowDownRight}
          type="expense"
        />
      </motion.div>
      <motion.div variants={item}>
        <SummaryCard
          title="Current Balance"
          amount={summary.balance}
          icon={Activity}
          type="balance"
        />
      </motion.div>
    </motion.div>
  );
};

export default SummarySection;
