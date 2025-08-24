// src/ui/ProgressReveal.jsx
import { motion } from "framer-motion";
import CountUp from "react-countup";

export default function ProgressReveal({ correct, total, xp, streak }) {
  const pct = Math.round((correct / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-5 shadow grid gap-4 sm:grid-cols-3"
    >
      <Stat
        label="Correct"
        value={<CountUp end={correct} />}
        suffix={` / ${total}`}
      />
      <Stat label="XP Gained" value={<CountUp end={xp} />} />
      <Stat label="Streak" value={<CountUp end={streak} />} suffix="🔥" />

      <div className="sm:col-span-3">
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            className="h-full bg-blue-600"
            transition={{ type: "spring", stiffness: 15 }}
          />
        </div>
        <div className="text-right text-sm mt-1">{pct}%</div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, suffix }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="text-2xl font-bold">
        {value}
        {suffix ? (
          <span className="text-base font-semibold ml-1">{suffix}</span>
        ) : null}
      </div>
    </div>
  );
}
