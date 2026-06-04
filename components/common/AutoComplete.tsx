import { Icon } from "@iconify/react";

interface AutoCompleteProps {
  name: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  classname?: string;
  icon?: string;
  value: any;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  roundedFull?: boolean;
  loading?: boolean;
  onChange: (value: string) => void;
}

const Input: React.FC<AutoCompleteProps> = ({
  name,
  label,
  placeholder,
  labelClassName,
  classname,
  icon,
  value,
  error,
  roundedFull,
  onChange,
  loading,
  required,
  disabled,
}) => {
  return (
    <div className={`flex flex-col items-start gap-1 ${classname}`}>
      {label && (
        <label className={labelClassName}>
          {label} {required && <span className="">*</span>}
        </label>
      )}
      <div
        className={`w-full h-10 flex items-center gap-2 py-2 px-4 ${
          roundedFull ? "rounded-full" : "rounded-lg"
        } ${
          error
            ? "border-2 border-red-500"
            : disabled
            ? "border border-slate-400 bg-slate-100 cursor-not-allowed"
            : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
        } group transition-all duration-200`}
      >
        {icon && (
          <Icon
            icon={icon}
            width={20}
            className="text-slate-700 group-hover:text-black group-focus-within:text-black transition-all duration-200"
          />
        )}
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-slate-600"
          required={required}
          value={value}
          onChange={(e: any) => onChange(e.target.value)}
          disabled={disabled}
        />
        {loading && (
          <Icon
            icon="svg-spinners:bars-rotate-fade"
            className="text-slate-700"
            width={20}
          />
        )}
      </div>
      {!!error && (
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:information-outline"
            width={16}
            className="text-red-500"
          />
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
