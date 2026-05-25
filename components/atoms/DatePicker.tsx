import { useState } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Icon } from "@iconify/react";
import { format } from "date-fns";

interface DatePickerProps {
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  name: string;
  icon?: string;
  required?: boolean;
  classname?: string;
  error?: string;
  disabled?: boolean;
  value: any;
  onChange: (date: Date) => void;
}

export default function DatePicker({
  label,
  labelClassName,
  name,
  required,
  classname,
  icon,
  placeholder,
  error,
  disabled,
  value,
  onChange,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={`flex flex-col items-start gap-1 ${classname}`}>
        {label && (
          <label className={`${labelClassName} text-sm font-medium`}>
            {label} {required && <span className="">*</span>}
          </label>
        )}
        <PopoverTrigger asChild>
          <div
            className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg ${
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
              value={format(value, "PPP")}
              disabled={disabled}
            />
            <Icon
              icon="mdi:calendar-outline"
              width={20}
              className="text-slate-700"
            />
          </div>
        </PopoverTrigger>
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
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          defaultMonth={value}
          onSelect={(date) => {
            if (!date) return;
            onChange(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
