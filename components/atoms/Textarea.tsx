import { Icon } from "@iconify/react";

interface TextareaProps {
  name: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  classname?: string;
  icon?: string;
  value: string | null;
  error?: string;
  required?: boolean;
  rows?: number;
  subLabel?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({
  name,
  label,
  placeholder,
  labelClassName,
  classname,
  icon,
  value,
  error,
  onChange,
  required,
  rows = 4,
  subLabel,
}) => {
  return (
    <div className={`flex flex-col items-start gap-1 ${classname}`}>
      {label && (
        <label className={labelClassName}>
          {label} {required && <span>*</span>}
        </label>
      )}
      <div
        className={`flex w-full gap-2 rounded-lg px-4 py-2 ${
          icon ? "items-start" : "items-center"
        } ${
          error
            ? "border-2 border-red-500"
            : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
        } group transition-all duration-200`}
      >
        {icon && (
          <Icon
            icon={icon}
            width={20}
            className="mt-0.5 shrink-0 text-slate-700 transition-all duration-200 group-hover:text-black group-focus-within:text-black"
          />
        )}
        <textarea
          name={name}
          placeholder={placeholder}
          rows={rows}
          required={required}
          value={value as any}
          onChange={onChange}
          className="min-h-[80px] w-full resize-y border-none bg-transparent text-sm outline-none placeholder:text-slate-600"
        />
      </div>
      {!!subLabel && (
        <div className="flex justify-end w-full">
          <span className="text-xs text-slate-600 text-right">{subLabel}</span>
        </div>
      )}
      {!!error && (
        <div className="flex items-center gap-2">
          <Icon
            icon="mdi:information-outline"
            width={16}
            className="text-red-500"
          />
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};

export default Textarea;
