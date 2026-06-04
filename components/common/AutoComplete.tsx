import { Icon } from "@iconify/react";
import { CheckboxGroup } from "@/components/molecules";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type AutoCompleteOption = {
  label: string;
  value: string;
};

interface AutoCompleteProps {
  name: string;
  label?: string;
  placeholder?: string;
  labelClassName?: string;
  classname?: string;
  icon?: string;
  value: string;
  options?: AutoCompleteOption[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  roundedFull?: boolean;
  loading?: boolean;
  noResultsText?: string;
  maxResults?: number;
  multiple?: boolean;
  selectedValues?: string[];
  onChange: (value: string) => void;
  onSelect?: (option: AutoCompleteOption) => void;
  onSelectedChange?: (values: string[]) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  name,
  label,
  placeholder,
  labelClassName,
  classname,
  icon,
  value,
  options = [],
  error,
  roundedFull,
  onChange,
  onSelect,
  loading,
  required,
  disabled,
  noResultsText = "No results found",
  maxResults = 10,
  multiple = false,
  selectedValues = [],
  onSelectedChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const query = value.trim().toLowerCase();
    const list = query
      ? options.filter((option) =>
          option.label.toLowerCase().includes(query),
        )
      : options;

    return list.slice(0, maxResults);
  }, [value, options, maxResults]);

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
    if (!value.trim()) {
      setIsOpen(false);
      return;
    }

    setIsOpen(true);
  }, [value]);

  const handleInputChange = (nextValue: string) => {
    onChange(nextValue);
    setIsOpen(!!nextValue.trim());
  };

  const handleSelect = (option: AutoCompleteOption) => {
    onChange(option.label);
    onSelect?.(option);
    if (!multiple) {
      setIsOpen(false);
    }
  };

  const showDropdown =
    isOpen &&
    !!value.trim() &&
    !disabled &&
    (loading || filteredOptions.length > 0 || options.length > 0);

  return (
    <div
      ref={rootRef}
      className={`relative flex w-full min-w-0 flex-col items-start gap-1 ${classname}`}
    >
      {label && (
        <label className={labelClassName}>
          {label} {required && <span>*</span>}
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
            className="text-slate-700 group-hover:text-black group-focus-within:text-black transition-all duration-200 shrink-0"
          />
        )}
        <input
          type="text"
          name={name}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 min-w-0 placeholder:text-slate-600"
          required={required}
          value={value}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => value.trim() && setIsOpen(true)}
          disabled={disabled}
          autoComplete="off"
        />
        {loading && (
          <Icon
            icon="svg-spinners:bars-rotate-fade"
            className="text-slate-700 shrink-0"
            width={20}
          />
        )}
      </div>

      <AnimatePresence>
        {showDropdown && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full z-40 mt-2 flex max-h-64 flex-col overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-md"
          >
            {loading && filteredOptions.length === 0 ? (
              <li className="p-3 text-sm text-slate-500">Searching...</li>
            ) : filteredOptions.length > 0 ? (
              multiple ? (
                <li className="p-2" onMouseDown={(e) => e.preventDefault()}>
                  <CheckboxGroup
                    options={filteredOptions.map((option) => ({
                      label: option.label,
                      value: option.value,
                    }))}
                    value={selectedValues}
                    onChange={(values) => onSelectedChange?.(values)}
                    className="space-y-2"
                  />
                </li>
              ) : (
                filteredOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      className="flex w-full cursor-pointer items-center gap-2 p-2 text-left text-sm transition hover:bg-slate-100"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleSelect(option)}
                    >
                      <span>{option.label}</span>
                    </button>
                  </li>
                ))
              )
            ) : (
              <li className="p-3 text-sm text-slate-500">{noResultsText}</li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>

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

export default AutoComplete;
