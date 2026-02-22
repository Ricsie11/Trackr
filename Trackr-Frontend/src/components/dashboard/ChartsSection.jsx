import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import GlassCard from "../common/GlassCard";
import { motion } from "framer-motion";

const ChartsSection = ({ transactions = [] }) => {
  // Process category breakdown
  const categoryData = transactions.reduce((acc, curr) => {
    if (curr.type === "expense") {
      const existing = acc.find((item) => item.name === curr.category);
      if (existing) {
        existing.value += curr.amount;
      } else {
        acc.push({ name: curr.category, value: curr.amount });
      }
    }
    return acc;
  }, []);

  const COLORS = [
    "#6366f1",
    "#fb7185",
    "#fbbf24",
    "#34d399",
    "#a78bfa",
    "#f472b6",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <GlassCard className="p-6 h-[400px] flex flex-col">
          <h3 className="text-xl font-display mb-6">Spending by Category</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%" minHeight={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      // Find most recent transaction in this category
                      const categoryTransactions = transactions.filter(
                        (t) =>
                          t.category_name === data.name ||
                          t.category === data.name,
                      );
                      const lastDate =
                        categoryTransactions.length > 0
                          ? new Date(
                              Math.max(
                                ...categoryTransactions.map(
                                  (t) => new Date(t.date),
                                ),
                              ),
                            )
                          : null;

                      return (
                        <div className="bg-slate-900 border border-white/10 p-3 rounded-lg shadow-xl backdrop-blur-md">
                          <p className="text-xs text-slate-400 mb-1 uppercase tracking-wider font-medium">
                            Category
                          </p>
                          <p className="text-sm font-bold text-white mb-1">
                            {data.name}
                          </p>
                          <p className="text-sm text-white">
                            ${data.value.toLocaleString()}
                          </p>
                          {lastDate && (
                            <div className="mt-2 pt-2 border-t border-white/5">
                              <p className="text-[10px] text-slate-500 italic">
                                Last Transaction:
                              </p>
                              <p className="text-[10px] text-indigo-400">
                                {lastDate.toLocaleDateString()}{" "}
                                {lastDate.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <GlassCard className="p-6 h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-display">Recent Activity</h3>
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Real-time Logs
            </span>
          </div>
          <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
            {transactions.slice(0, 7).length > 0 ? (
              transactions.slice(0, 7).map((t, i) => {
                const isIncome = t.type === "income";
                const d = new Date(t.date);
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={`activity-${t.id}-${t.type}`}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full animate-pulse ${isIncome ? "bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "bg-rose-500 shadow-[0_0_8px_rgba(251,113,133,0.5)]"}`}
                      />
                      <div>
                        <p className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                          {isIncome ? "Received" : "Spent"}{" "}
                          <span className="text-slate-400 font-normal">on</span>{" "}
                          {t.category_name || t.category}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {d.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          •{" "}
                          {d.toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${isIncome ? "text-emerald-400" : "text-rose-400"}`}
                      >
                        {isIncome ? "+" : "-"}${t.amount.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <p className="text-sm">No recent activity</p>
              </div>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default ChartsSection;
