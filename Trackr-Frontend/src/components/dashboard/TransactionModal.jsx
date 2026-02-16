import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Trash2 } from "lucide-react";
import GlassCard from "../common/GlassCard";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const DEFAULT_CATEGORIES = {
  expense: [
    "Food & Drink",
    "Shopping",
    "Housing",
    "Travel",
    "Entertainment",
    "Health",
    "Others",
  ],
  income: ["Salary", "Freelance", "Gift", "Investment", "Others"],
};

const TransactionModal = ({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialData = null,
}) => {
  const { token, API_URL } = useAuth();
  const [categories, setCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  useEffect(() => {
    if (isOpen && token) {
      const fetchCategories = async () => {
        try {
          const res = await axios.get(`${API_URL}/categories/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const rawCategories = res.data.results || res.data || [];
          setCategories(Array.isArray(rawCategories) ? rawCategories : []);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchCategories();
    }
  }, [isOpen, token, API_URL]);

  useEffect(() => {
    if (initialData) {
      const data = {
        ...initialData,
        amount: initialData.amount || "",
        category: initialData.category || "",
        type: initialData.type || "expense",
        date: initialData.date
          ? initialData.date.split("T")[0]
          : new Date().toISOString().split("T")[0],
        description: initialData.description || "",
      };
      setFormData(data);
      // Set name for input if we have the category object
      const cat = categories.find((c) => c.id === data.category);
      setCategoryInput(cat ? cat.name : initialData.category_name || "");
    } else {
      setFormData({
        amount: "",
        category: "",
        type: "expense",
        date: new Date().toISOString().split("T")[0],
        description: "",
      });
      setCategoryInput("");
    }
  }, [initialData, isOpen, categories]);

  useEffect(() => {
    setError("");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    let categoryId = formData.category;

    // If typing a custom category or selecting a default name
    if (
      categoryInput &&
      !categories.find((c) => c.id === categoryId && c.name === categoryInput)
    ) {
      // Check if the name exists in fetched categories
      const existing = categories.find(
        (c) =>
          c.name.toLowerCase() === categoryInput.toLowerCase() &&
          (c.type || c.kind || "").toLowerCase() ===
            formData.type.toLowerCase(),
      );

      if (existing) {
        categoryId = existing.id;
      } else {
        // Create new category
        try {
          const catRes = await axios.post(
            `${API_URL}/categories/`,
            { name: categoryInput, type: formData.type },
            { headers: { Authorization: `Bearer ${token}` } },
          );
          categoryId = catRes.data.id;
        } catch (error) {
          console.error("Error creating category:", error);
          setError(
            "Failed to create category. Please try a different name or select from the list.",
          );
          setIsSaving(false);
          return; // Stop here!
        }
      }
    }

    try {
      const now = new Date();
      let finalDate = formData.date;

      // If it's a new transaction and the selected date is today, use the full current timestamp
      const today = now.toISOString().split("T")[0];
      if (!initialData?.id && formData.date === today) {
        finalDate = now.toISOString();
      } else if (!initialData?.id) {
        // If it's a new transaction but picked a different day, use that day at current time
        const [year, month, day] = formData.date.split("-");
        const customDate = new Date(now);
        customDate.setFullYear(year, month - 1, day);
        finalDate = customDate.toISOString();
      }

      await onSave({
        ...formData,
        category: categoryId,
        date: finalDate,
      });
      onClose(); // Close on success
    } catch (error) {
      console.error("Save error:", error);
      setError(
        error.response?.data?.detail ||
          "Failed to save transaction. Please check your inputs.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const filteredCategories = categories.filter((c) => {
    const catType = (c.type || c.category_type || c.kind || "").toLowerCase();
    const formType = (formData.type || "").toLowerCase();
    return catType === formType;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg relative"
        >
          <GlassCard className="p-8 border-indigo-500/20 shadow-indigo-500/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display font-bold">
                {initialData?.id ? "Edit Transaction" : "Add Transaction"}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex bg-slate-900/50 p-1 rounded-xl border border-white/5 mb-6">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.type === "expense"
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                      : "text-slate-400"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.type === "income"
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "text-slate-400"
                  }`}
                >
                  Income
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Description / Merchant
                </label>
                <input
                  type="text"
                  required
                  className="input-field"
                  placeholder="e.g. Amazon, Starbucks"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    className="input-field"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    className="input-field"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <input
                    list="category-options"
                    required
                    className="input-field"
                    placeholder="Select or type category..."
                    value={categoryInput}
                    onChange={(e) => {
                      const val = e.target.value;
                      setCategoryInput(val);
                      // Update formData.category if it matches an existing ID
                      const match = categories.find((c) => c.name === val);
                      setFormData({
                        ...formData,
                        category: match ? match.id : val,
                      });
                    }}
                  />
                  <datalist id="category-options">
                    {/* Backend Categories */}
                    {filteredCategories.map((cat) => (
                      <option key={`cat-${cat.id}`} value={cat.name} />
                    ))}
                    {/* Default Fallbacks (if not already in backend list) */}
                    {DEFAULT_CATEGORIES[formData.type]
                      .filter(
                        (def) =>
                          !filteredCategories.some(
                            (c) => c.name.toLowerCase() === def.toLowerCase(),
                          ),
                      )
                      .map((def) => (
                        <option key={`def-${def}`} value={def} />
                      ))}
                  </datalist>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                  <p className="text-xs text-rose-400">{error}</p>
                </div>
              )}

              <div className="pt-6 flex gap-3">
                {initialData?.id && (
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => onDelete(initialData.id)}
                    className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500/20 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 group disabled:opacity-50 shadow-indigo-500/20"
                >
                  {isSaving ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      {initialData?.id ? "Update Record" : "Save Transaction"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </GlassCard>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TransactionModal;
