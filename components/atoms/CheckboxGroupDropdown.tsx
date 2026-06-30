import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";

export interface CheckboxGroupOptionItem {
  value: string;
  label: string;
}

interface CheckboxGroupDropdownProps {
  label?: string;
  placeholder?: string;
  name: string;
  labelClassName?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: string;
  options: CheckboxGroupOptionItem[];
  values: string[];
  onChange: (values: string[]) => void;
}

export default function CheckboxGroupDropdown({
  label,
  placeholder = "Select options",
  name,
  options,
  values,
  onChange,
  className,
  disabled,
  icon,
  required,
  error,
  labelClassName,
}: CheckboxGroupDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.label.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [options, search],
  );

  const selectedLabels = useMemo(
    () =>
      options
        .filter((option) => values.includes(option.value))
        .map((option) => option.label),
    [options, values],
  );

  const displayText =
    selectedLabels.length === 0
      ? placeholder
      : selectedLabels.length === 1
        ? selectedLabels[0]
        : `${selectedLabels.length} selected`;

  const toggleValue = (optionValue: string, checked: boolean) => {
    onChange(
      checked
        ? [...values, optionValue]
        : values.filter((value) => value !== optionValue),
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      setSearch("");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className={`w-full min-w-0 space-y-1 ${className ?? ""}`}>
      <div className="relative w-full min-w-0" ref={containerRef}>
        {label && (
          <label className={`text-sm font-medium ${labelClassName ?? ""}`}>
            {label} {required && <span>*</span>}
          </label>
        )}

        <motion.button
          type="button"
          whileTap={{ scale: disabled ? 1 : 0.97 }}
          disabled={disabled}
          className={`flex h-10 w-full min-w-0 max-w-full cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 group ${
            error
              ? "border-2 border-red-500"
              : disabled
                ? "cursor-not-allowed border border-slate-400 bg-slate-100"
                : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
          }`}
          onClick={() => !disabled && setOpen((prev) => !prev)}
        >
          {icon && (
            <Icon
              icon={icon}
              width={20}
              className="shrink-0 text-slate-700 transition-all duration-200 group-hover:text-black group-focus-within:text-black"
            />
          )}

          <div
            className={`min-w-0 flex-1 truncate text-left text-sm ${
              values.length === 0 ? "text-slate-600" : "text-slate-900"
            }`}
          >
            {displayText}
          </div>

          <Icon
            icon="mdi:chevron-down"
            className={`size-6 shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </motion.button>

        {values.map((value) => (
          <input key={value} type="hidden" name={name} value={value} readOnly />
        ))}

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute top-full z-20 mt-1 max-h-72 w-full overflow-y-auto rounded-lg border border-slate-300 bg-white shadow-lg no-scrollbar"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="sticky top-0 z-10 bg-white p-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  icon="mdi:search"
                  name={`${name}-search`}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </div>

              {filteredOptions.length === 0 ? (
                <div className="px-4 pb-4">
                  <p className="py-4 text-center text-sm text-slate-500">
                    No results found
                  </p>
                </div>
              ) : (
                <motion.ul
                  className="space-y-1 px-2 pb-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: { staggerChildren: 0.04 },
                    },
                  }}
                >
                  {filteredOptions.map((option) => (
                    <motion.li
                      key={option.value}
                      className="flex items-center gap-2 rounded-md p-2 transition-colors duration-200 hover:bg-slate-100"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      <Checkbox
                        className="h-5! w-5! rounded-sm!"
                        checked={values.includes(option.value)}
                        onCheck={(checked) =>
                          toggleValue(option.value, checked)
                        }
                      />
                      <button
                        type="button"
                        className="cursor-pointer text-left text-sm"
                        onClick={() =>
                          toggleValue(
                            option.value,
                            !values.includes(option.value),
                          )
                        }
                      >
                        {option.label}
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
}
