import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, TrendingUp, Briefcase, Plus, Search } from "lucide-react";
import GlassCard from "../common/GlassCard";
import { useState } from "react";

const TransactionItem = ({ transaction, onEdit }) => {
  const isExpense = transaction.type === "expense";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      onClick={() => onEdit(transaction)}
      className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors mb-2 cursor-pointer group border border-transparent hover:border-indigo-500/30"
    >
      <div className="flex items-center gap-4">
        <div
          className={`p-3 rounded-xl ${isExpense ? "bg-rose-500/10 text-rose-400" : "bg-emerald-500/10 text-emerald-400"}`}
        >
          {isExpense ? (
            <ShoppingBag className="w-5 h-5" />
          ) : (
            <TrendingUp className="w-5 h-5" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-white group-hover:text-indigo-300 transition-colors">
            {transaction.category_name || "Uncategorized"}
          </h4>
          <p
            className="text-xs text-slate-500"
            title={
              transaction.date
                ? new Date(transaction.date).toLocaleString([], {
                    dateStyle: "long",
                    timeStyle: "short",
                  })
                : ""
            }
          >
            {transaction.date && transaction.date.split("T")[0]}
            <span className="opacity-40 group-hover:opacity-100 transition-opacity ml-2 text-[10px] text-indigo-400">
              {transaction.date &&
                new Date(transaction.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </span>
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className={`font-bold ${isExpense ? "text-rose-400" : "text-emerald-400"}`}
        >
          {isExpense ? "-" : "+"}$
          {parseFloat(transaction.amount).toLocaleString()}
        </p>
        <p className="text-[10px] text-slate-600 uppercase tracking-wider">
          {transaction.description}
        </p>
      </div>
    </motion.div>
  );
};

const TransactionList = ({ transactions = [], onEdit, onAdd }) => {
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions.filter(
    (t) =>
      t.description?.toLowerCase().includes(search.toLowerCase()) ||
      t.category_name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold">
            Recent Transactions
          </h2>
          <p className="text-sm text-slate-400">Manage your daily expenses</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAdd}
          className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
        <input
          type="text"
          className="w-full bg-slate-900/50 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((t) => (
              <TransactionItem
                key={`${t.type}-${t.id}`}
                transaction={t}
                onEdit={onEdit}
              />
            ))
          ) : (
            <div className="text-center py-10 opacity-50">
              <Briefcase className="w-12 h-12 mx-auto mb-4 text-slate-600" />
              <p>No transactions found</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
};

export default TransactionList;
