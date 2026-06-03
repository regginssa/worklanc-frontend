import Image from "next/image";
import React, { useState } from "react";
import { Icon } from "@iconify/react";

export interface ICheckboxOption {
  id: string;
  label: string;
  count?: number;
  iconUrl?: string;
}

interface CheckboxGroupProps {
  options: ICheckboxOption[];
  defaultValues?: string[];
  onChange?: (selectedValues: string[]) => void;
  className?: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  defaultValues = [],
  onChange,
  className = "",
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);

  const handleToggle = (optionId: string) => {
    const newSelectedValues = selectedValues.includes(optionId)
      ? selectedValues.filter((id) => id !== optionId)
      : [...selectedValues, optionId];

    setSelectedValues(newSelectedValues);
    if (onChange) {
      onChange(newSelectedValues);
    }
  };

  const getCheckboxStyles = (isChecked: boolean) => {
    const baseStyles =
      "w-5 h-5 rounded border flex items-center justify-center cursor-pointer transition-all duration-200";

    if (isChecked) {
      return `${baseStyles} border-transparent ring-blue-600 ring-2 `;
    }

    return `${baseStyles} border-gray-400 group-hover:outline-none group-hover:ring-2 group-hover:ring-black group-hover:border-transparent`;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.id);

        return (
          <label
            key={option.id}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleToggle(option.id)}
                className="sr-only"
              />
              <div className={getCheckboxStyles(isChecked)}>
                {/* Animated checkmark */}
                <div
                  className="text-white text-sm font-bold transition-all duration-200 ease-out"
                  style={{
                    transform: isChecked
                      ? "scale(1) rotate(0deg)"
                      : "scale(0) rotate(-90deg)",
                    opacity: isChecked ? 1 : 0,
                  }}
                >
                  <Icon
                    icon="material-symbols:check"
                    className={`text-blue-600 w-5 h-5`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-1">
              {/* Icon */}
              {option.iconUrl && (
                <div className="relative w-7 h-7">
                  <Image src={option.iconUrl} alt={option.label} fill />
                </div>
              )}

              {/* Label and count */}
              <span className="text-sm">
                {option.label}
                {option.count && (
                  <span className="text-gray-500 ml-1">
                    ({option.count.toLocaleString()})
                  </span>
                )}
              </span>
            </div>
          </label>
        );
      })}
    </div>
  );
};

export default CheckboxGroup;
