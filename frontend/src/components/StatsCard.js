"use client";

import { motion } from "framer-motion";

export default function StatsCard({ value, label, color = "text-primary", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-surface-card rounded-xl p-6 shadow-sm border border-outline-variant/20"
    >
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="text-sm text-on-surface-variant mt-1">{label}</p>
    </motion.div>
  );
}
