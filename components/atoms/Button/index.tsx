import { Icon } from "@iconify/react";
import Link from "next/link";
import { motion } from "motion/react";

interface ButtonProps {
  type: "primary" | "secondary" | "outline" | "link" | "icon" | "text";
  label?: string;
  icon?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  width?: "full";
  classname?: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  icon,
  size,
  disabled,
  loading,
  href,
  width,
  classname,
  onClick,
}) => {
  const buttonClasses = {
    primary: `${
      loading || disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    } ${"bg-blue-600 hover:bg-blue-500"} text-white`,
    size: `${
      size === "small"
        ? "px-5 py-2 text-sm"
        : size === "medium"
          ? "px-7 py-[10px] text-sm"
          : "px-12 py-3 text-lg"
    } ${width === "full" && "w-full"}`,
    fontSize: `${
      size === "small" ? "text-xs" : size === "medium" ? "text-sm" : "text-sm"
    }`,
  };

  const sizeClasses = {
    small: "px-3 py-1 text-xs",
    medium: "px-7 py-3 text-sm",
    large: "px-12 py-3 text-lg",
  };

  const iconSizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6",
  };

  if (type === "primary") {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`${buttonClasses.primary} ${buttonClasses.size} ${classname} rounded-xl transition-all duration-150 ease-in-out flex items-center justify-center gap-2`}
        onClick={onClick}
      >
        {icon && !loading && (
          <Icon icon={icon} className="w-4 h-4" color="white" />
        )}
        {label}
        {loading && (
          <Icon
            icon="svg-spinners:bars-rotate-fade"
            className="w-4 h-4"
            color="white"
          />
        )}
      </motion.button>
    );
  }

  if (type === "outline" && size) {
    return (
      <motion.button
        whileTap={{ scale: 0.95 }}
        className={`border-2 border-blue-600 text-blue-600 ${classname} hover:border-blue-500 hover:text-blue-500 font-semibold rounded-xl transition-all duration-300 ease-in-out flex items-center gap-2 justify-center ${
          loading || disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer"
        } ${sizeClasses[size]}`}
        onClick={onClick}
        disabled={disabled || loading}
      >
        {icon && !loading && <Icon icon={icon} className="w-4 h-4 mr-2" />}
        {label}
        {loading && (
          <Icon icon="svg-spinners:bars-rotate-fade" className="w-4 h-4 ml-2" />
        )}
      </motion.button>
    );
  }

  if (type === "link" && href) {
    return (
      <Link
        href={href}
        className={`${size} ${classname} transition-all duration-300 ease-in-out`}
      >
        {label}
      </Link>
    );
  }

  if (type === "text" && size) {
    return (
      <button
        className={`${
          sizeClasses[size]
        } ${classname} transition-all duration-300 ease-in-out cursor-pointer`}
      >
        {label}
      </button>
    );
  }

  if (type === "icon" && icon && size) {
    return (
      <button
        className={`p-2 rounded-full hover:bg-[#252525] transition-all duration-300 ease-in-out cursor-pointer ${classname}`}
        onClick={onClick}
      >
        <Icon
          icon={icon}
          className={`${iconSizeClasses[size]}`}
          color="white"
        />
      </button>
    );
  }

  return null;
};

export default Button;
