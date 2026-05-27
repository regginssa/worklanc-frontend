import Dropdown, { type DropdownOption } from "@/components/atoms/Dropdown";
import { useMemo } from "react";

const MONTHS: DropdownOption[] = [
  { label: "January", value: "1" },
  { label: "February", value: "2" },
  { label: "March", value: "3" },
  { label: "April", value: "4" },
  { label: "May", value: "5" },
  { label: "June", value: "6" },
  { label: "July", value: "7" },
  { label: "August", value: "8" },
  { label: "September", value: "9" },
  { label: "October", value: "10" },
  { label: "November", value: "11" },
  { label: "December", value: "12" },
];

function buildYearOptions(minYear: number, maxYear: number): DropdownOption[] {
  const years: DropdownOption[] = [];
  for (let year = maxYear; year >= minYear; year -= 1) {
    years.push({ label: String(year), value: String(year) });
  }
  return years;
}

function mergeDate(month: number, year: number, current: Date): Date {
  const daysInMonth = new Date(year, month, 0).getDate();
  const day = Math.min(current.getDate(), daysInMonth);
  return new Date(year, month - 1, day);
}

export interface DateDropdownProps {
  label?: string;
  monthLabel?: string;
  yearLabel?: string;
  name: string;
  value?: Date | null;
  onChange: (date: Date) => void;
  minYear?: number;
  maxYear?: number;
  error?: string;
  classname?: string;
  required?: boolean;
  disabled?: boolean;
}

export default function DateDropdown({
  label,
  monthLabel = "Month",
  yearLabel = "Year",
  name,
  value,
  onChange,
  minYear,
  maxYear,
  error,
  classname = "",
  required = false,
  disabled = false,
}: DateDropdownProps) {
  const currentYear = new Date().getFullYear();
  const yearMin = minYear ?? currentYear - 80;
  const yearMax = maxYear ?? currentYear + 1;

  const yearOptions = useMemo(
    () => buildYearOptions(yearMin, yearMax),
    [yearMin, yearMax]
  );

  const monthValue = value ? String(value.getMonth() + 1) : "";
  const yearValue = value ? String(value.getFullYear()) : "";

  const handleMonthSelect = (selectedMonth: string) => {
    const anchor = value ?? new Date();
    onChange(
      mergeDate(Number(selectedMonth), anchor.getFullYear(), anchor)
    );
  };

  const handleYearSelect = (selectedYear: string) => {
    const anchor = value ?? new Date();
    onChange(
      mergeDate(anchor.getMonth() + 1, Number(selectedYear), anchor)
    );
  };

  return (
    <div className={`flex w-full flex-col gap-2 ${classname}`}>
      {label && (
        <p className="text-sm font-medium">
          {label} {required && <span>*</span>}
        </p>
      )}

      <div className="flex w-full items-start gap-4">
        <Dropdown
          name={`${name}-month`}
          placeholder="Month"
          options={MONTHS}
          value={monthValue}
          onSelect={handleMonthSelect}
          classname="flex-1"
          disabled={disabled}
        />
        <Dropdown
          name={`${name}-year`}
          placeholder="Year"
          options={yearOptions}
          value={yearValue}
          onSelect={handleYearSelect}
          classname="flex-1"
          disabled={disabled}
        />
      </div>

      {!!error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
