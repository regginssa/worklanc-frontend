import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface ViewToggleProps {
  isListView: boolean;
  onChange: (isListView: boolean) => void;
}

export default function ViewToggle({ isListView, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center p-1 bg-slate-200 rounded-full max-w-52 h-10 w-full">
      <button
        onClick={() => onChange(false)}
        className="relative flex-1 cursor-pointer h-full flex items-center justify-center rounded-full text-slate-600"
      >
        {!isListView && (
          <motion.span
            layoutId="viewToggleIndicator"
            className="absolute inset-0 bg-white shadow-lg rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <Icon icon="system-uicons:grid" className="size-6 relative z-10" />
      </button>

      <button
        onClick={() => onChange(true)}
        className="relative flex-1 cursor-pointer h-full flex items-center justify-center rounded-full text-slate-600"
      >
        {isListView && (
          <motion.span
            layoutId="viewToggleIndicator"
            className="absolute inset-0 bg-white shadow-lg rounded-full"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
          />
        )}
        <Icon icon="cil:list" className="size-6 relative z-10" />
      </button>
    </div>
  );
}
