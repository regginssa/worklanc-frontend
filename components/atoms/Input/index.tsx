import { Icon } from "@iconify/react";
import { useState } from "react";

interface InputProps {
  type: string;
  name: string;
  label?: string;
  placeholder?: string;
  classname?: string;
  icon?: string;
  value: any;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  label,
  placeholder,
  classname,
  icon,
  value,
  error,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col items-start gap-1 ${classname}`}>
      {label && <label className="">{label}</label>}
      <div
        className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg ${error ? "border-2 border-red-500" : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"} group transition-all duration-200`}
      >
        {icon && (
          <Icon
            icon={icon}
            width={20}
            className="text-slate-700 group-hover:text-black group-focus-within:text-black transition-all duration-200"
          />
        )}
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-slate-600"
          value={value}
          onChange={(e: any) => onChange(e)}
        />

        {type === "password" && (
          <Icon
            icon={showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"}
            width={20}
            className="text-slate-700"
            onClick={() => setShowPassword(!showPassword)}
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
