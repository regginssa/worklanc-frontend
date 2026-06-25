import { Icon } from "@iconify/react";
import { motion } from "motion/react";

interface IconButtonProps {
  variant: "primary" | "secondary" | "outline" | "text";
  icon: string;
  className?: string;
  iconClassName?: string;
  onClick: () => void;
  onHover?: () => void;
  onLeave?: () => void;
  loading?: boolean;
  disabled?: boolean;
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
  iconClassName,
  onClick,
  onHover,
  onLeave,
  loading = false,
  disabled = false,
}: IconButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type="button"
      whileTap={isDisabled ? undefined : { scale: 0.95 }}
      className={`flex items-center justify-center p-2.5 transition-colors duration-200 ease-in-out ${
        variantClasses[variant]
      } ${className} ${
        isDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {loading ? (
        <Icon icon="svg-spinners:bars-rotate-fade" className="w-5 h-5" />
      ) : (
        <Icon icon={icon} className={`w-5 h-5 ${iconClassName}`} />
      )}
    </motion.button>
  );
}
