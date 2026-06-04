import { Checkbox } from "@/components/atoms";

export interface CheckBoxGroupOption {
  value: string;
  label: string;
}

interface CheckBoxGroupProps {
  options: CheckBoxGroupOption[];
  value: string[];
  onChange: (value: string[]) => void;
  className?: string;
}

export default function CheckBoxGroup({
  options,
  value,
  onChange,
  className = "",
}: CheckBoxGroupProps) {
  const handleToggle = (optionValue: string) => {
    const nextValue = value.includes(optionValue)
      ? value.filter((item) => item !== optionValue)
      : [...value, optionValue];

    onChange(nextValue);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => {
        const isChecked = value.includes(option.value);

        return (
          <div
            key={option.value}
            role="checkbox"
            aria-checked={isChecked}
            tabIndex={0}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleToggle(option.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle(option.value);
              }
            }}
          >
            <Checkbox checked={isChecked} className="w-5! h-5! rounded-sm!" />
            <span className="text-sm">{option.label}</span>
          </div>
        );
      })}
    </div>
  );
}
