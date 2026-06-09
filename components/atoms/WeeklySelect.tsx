"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  WeeklyCalendar,
  type WeekRange,
} from "@/components/ui/weekly-calendar";

export type { WeekRange };

interface WeeklySelectProps {
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  name: string;
  icon?: string;
  required?: boolean;
  classname?: string;
  error?: string;
  disabled?: boolean;
  value: WeekRange | null;
  onChange: (week: WeekRange) => void;
  getWeekTotal?: (weekStart: Date) => number;
}

function formatWeekLabel(week: WeekRange) {
  return `${format(week.start, "MMM d")} – ${format(week.end, "MMM d, yyyy")}`;
}

export default function WeeklySelect({
  label,
  labelClassName,
  name,
  required,
  classname,
  icon,
  placeholder = "Select week",
  error,
  disabled,
  value,
  onChange,
  getWeekTotal,
}: WeeklySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className={`flex flex-col items-start gap-1 ${classname}`}>
        {label && (
          <label
            htmlFor={name}
            className={`${labelClassName ?? ""} text-sm font-medium`}
          >
            {label} {required && <span>*</span>}
          </label>
        )}

        <PopoverTrigger asChild>
          <button
            id={name}
            name={name}
            type="button"
            disabled={disabled}
            className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg text-left ${
              error
                ? "border-2 border-red-500"
                : disabled
                  ? "border border-slate-400 bg-slate-100 cursor-not-allowed"
                  : "border border-slate-400 hover:border-2 hover:border-black focus-visible:border-2 focus-visible:border-black focus-visible:outline-none"
            } group transition-all duration-200`}
          >
            {icon && (
              <Icon
                icon={icon}
                width={20}
                className="text-slate-700 group-hover:text-black group-focus-visible:text-black transition-all duration-200"
              />
            )}

            <span
              className={`bg-transparent text-sm flex-1 ${
                value ? "text-slate-900" : "text-slate-600"
              }`}
            >
              {value ? formatWeekLabel(value) : placeholder}
            </span>

            <Icon
              icon="mdi:calendar-outline"
              width={20}
              className="text-slate-700 shrink-0"
            />
          </button>
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

      <PopoverContent
        className="w-auto overflow-hidden border border-slate-200 p-0 shadow-lg"
        align="start"
      >
        <WeeklyCalendar
          selected={value}
          defaultMonth={value?.start}
          onSelect={(week) => {
            onChange(week);
            setOpen(false);
          }}
          getWeekTotal={getWeekTotal}
        />
      </PopoverContent>
    </Popover>
  );
}
