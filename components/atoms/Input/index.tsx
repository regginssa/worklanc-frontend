import { Icon } from "@iconify/react";
import { useState } from "react";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  subLabel?: string;
  placeholder?: string;
  labelClassName?: string;
  classname?: string;
  icon?: string;
  value: any;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  loading?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter?: () => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  subLabel,
  placeholder,
  labelClassName,
  classname,
  icon,
  value,
  error,
  onChange,
  required,
  disabled,
  maxLength,
  loading,
  onEnter,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col items-start gap-1 ${classname}`}>
      {label && (
        <label className={labelClassName}>
          {label} {required && <span className="">*</span>}
        </label>
      )}
      <div
        className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg ${
          error
            ? "border-2 border-red-500"
            : disabled
            ? "border border-slate-400 dark:border-border bg-slate-100 dark:bg-muted cursor-not-allowed"
            : "border border-slate-400 dark:border-border hover:border-2 hover:border-black dark:hover:border-ring focus-within:border-2 focus-within:border-black dark:focus-within:border-ring"
        } group transition-all duration-200 overflow-hidden`}
      >
        {icon && (
          <Icon
            icon={icon}
            width={20}
            className="text-slate-700 dark:text-muted-foreground group-hover:text-black dark:group-hover:text-foreground group-focus-within:text-black dark:group-focus-within:text-foreground transition-all duration-200"
          />
        )}
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 text-foreground placeholder:text-slate-600 dark:placeholder:text-muted-foreground"
          required={required}
          value={value}
          onChange={(e: any) => onChange(e)}
          disabled={disabled}
          maxLength={maxLength}
          onKeyDown={(e) => {
            if (e.key === "Enter" && onEnter) {
              onEnter();
            }
          }}
        />

        {loading && (
          <Icon
            icon="svg-spinners:bars-rotate-fade"
            className={`w-4 h-4 text-slate-500`}
          />
        )}

        {type === "password" && (
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            width={20}
            className="text-slate-700"
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
      {(subLabel || error) && (
        <div className="flex items-center justify-between gap-6">
          {!!error && (
            <div className="flex items-start gap-2 flex-1">
              <Icon
                icon="mdi:information-outline"
                width={16}
                className="text-red-500"
              />
              <p className="text-red-600 text-sm flex-1">{error}</p>
            </div>
          )}
          {subLabel && <p className="text-xs text-slate-600 dark:text-muted-foreground">{subLabel}</p>}
        </div>
      )}
    </div>
  );
};

export default Input;
