import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface IconButtonProps {
  variant: "primary" | "secondary" | "outline" | "text";
  icon: string;
  className?: string;
  onClick: () => void;
}

const variantClasses = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-500 border border-blue-600 rounded-full",
  secondary:
    "bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200 rounded-full",
  outline:
    "border-2 border-blue-600 text-blue-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-500 rounded-full",
  text: "text-slate-700 hover:bg-slate-100 rounded-full",
};

export default function IconButton({
  variant,
  icon,
  className,
  onClick,
}: IconButtonProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      className={`flex items-center justify-center p-2.5 transition-colors duration-200 ease-in-out cursor-pointer ${variantClasses[variant]} ${className}`}
      onClick={onClick}
    >
      <Icon icon={icon} className="w-5 h-5" />
    </motion.button>
  );
}
