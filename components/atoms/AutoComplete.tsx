import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export type AutoCompleteOption = {
  label: string;
  value: string;
};

interface AutoCompleteProps {
  label?: string;
  subLabel?: string;
  placeholder?: string;
  name: string;
  icon?: string;
  options: AutoCompleteOption[];
  value: string;
  selectedValues?: AutoCompleteOption[];
  className?: string;
  error?: string;
  loading?: boolean;
  onChange: (value: string) => void;
  onSelect: (option: AutoCompleteOption) => void;
  onRemove: (option: AutoCompleteOption) => void;
}

export default function AutoComplete({
  label,
  subLabel,
  placeholder,
  name,
  icon,
  options,
  value,
  selectedValues = [],
  className,
  error,
  loading = false,
  onChange,
  onSelect,
  onRemove,
}: AutoCompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [searched, setSearched] = useState<AutoCompleteOption[]>(options);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const query = value.trim().toLowerCase();
    if (!query) {
      setSearched(options);
      return;
    }

    setSearched(
      options.filter((option) => option.label.toLowerCase().includes(query))
    );
  }, [value, options]);

  return (
    <div ref={rootRef}>
      {label && (
        <div className="mb-2">
          <label className="text-sm">{label}</label>
        </div>
      )}
      <div className="relative">
        <div
          className={`w-full flex gap-2 py-2 px-4 rounded-lg ${
            error
              ? "border-2 border-red-500"
              : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
          } ${className} group transition-all duration-200`}
          onClick={() => setIsOpen(true)}
        >
          {icon && (
            <Icon
              icon={icon}
              width={20}
              className="text-slate-700 group-hover:text-black group-focus-within:text-black transition-all duration-200"
            />
          )}

          <div className="flex flex-wrap gap-2 flex-1">
            {selectedValues.map((value: any) => (
              <button
                key={value.value}
                className="py-1 px-3 flex items-center gap-1 bg-slate-200 rounded-full cursor-pointer"
                onClick={() => onRemove(value)}
              >
                <span className="text-xs">{value.label}</span>
                <Icon icon="mdi:times" className="w-4 h-4" />
              </button>
            ))}
            <input
              type="text"
              name={name}
              placeholder={placeholder}
              className="border-none outline-none text-sm flex-1 placeholder:text-slate-600"
              value={value}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>

          {loading && (
            <Icon
              icon="svg-spinners:bars-rotate-fade"
              className="w-5 h-5 text-slate-500"
            />
          )}
        </div>

        <AnimatePresence>
          {isOpen && searched.length > 0 && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-40 mt-2 flex max-h-64 flex-col overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-md"
            >
              {searched.map((option) => {
                const isSelected = selectedValues.some(
                  (selected) => selected.value === option.value
                );
                return (
                  <li
                    key={option.value}
                    className="flex w-full cursor-pointer items-center gap-2 p-2 text-sm transition hover:bg-slate-100"
                    onClick={() => {
                      onSelect(option);
                    }}
                  >
                    {isSelected ? (
                      <Icon icon="mdi:check" width={14} />
                    ) : (
                      <div className="w-[14px]" />
                    )}
                    <span>{option.label}</span>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {subLabel && (
        <div className="mt-1 flex justify-end">
          <p className="text-xs text-slate-500">{subLabel}</p>
        </div>
      )}
      {!!error && (
        <div className="w-full top-full mt-2 z-0 flex items-center gap-2">
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
}
