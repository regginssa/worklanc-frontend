import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

export type DropdownOption = {
  label: string;
  value: any;
};

interface DropdownProps {
  label?: string;
  name: string;
  placeholder?: string;
  icon?: string;
  options: string[] | DropdownOption[];
  value: any;
  labelClassName?: string;
  classname?: string;
  error?: string;
  disabled?: boolean;
  onSelect: (value: any) => void;
}

function normalizeOptions(
  options: string[] | DropdownOption[]
): DropdownOption[] {
  return options.map((option) =>
    typeof option === "string" ? { label: option, value: option } : option
  );
}

export default function Dropdown({
  label,
  name,
  placeholder = "Select an option",
  icon,
  options,
  value,
  labelClassName = "",
  classname = "",
  error,
  disabled = false,
  onSelect,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const normalizedOptions = useMemo(() => normalizeOptions(options), [options]);

  const selectedLabel =
    normalizedOptions.find((option) => option.value === value)?.label ?? "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={rootRef}
      className={`flex w-full min-w-0 flex-col items-start gap-1 ${classname}`}
    >
      {label && (
        <label className={`text-sm font-medium ${labelClassName}`}>
          {label}
        </label>
      )}

      <div className="relative w-full min-w-0 max-w-full">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          className={`flex h-10 w-full min-w-0 max-w-full overflow-hidden items-center gap-2 rounded-lg px-4 py-2 transition-all duration-300 cursor-pointer ${
            error
              ? "border-2 border-red-500"
              : disabled
              ? "bg-slate-100 dark:bg-muted cursor-not-allowed! border border-slate-400 dark:border-border"
              : "border border-slate-400 dark:border-border hover:border-2 hover:border-black dark:hover:border-ring"
          }`}
          disabled={disabled}
          onClick={() => setOpen((prev) => !prev)}
        >
          {icon && (
            <Icon icon={icon} width={14} className="shrink-0 text-slate-700 dark:text-muted-foreground" />
          )}

          <span
            className={`min-w-0 flex-1 truncate text-left text-sm ${
              selectedLabel ? "text-slate-900 dark:text-foreground" : "text-slate-600 dark:text-muted-foreground"
            }`}
          >
            {selectedLabel || placeholder}
          </span>

          <input type="hidden" name={name} value={value} readOnly />

          <Icon
            icon="mdi:chevron-down"
            width={20}
            className={`shrink-0 text-slate-700 dark:text-muted-foreground transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 right-0 top-full z-40 mt-2 flex w-full max-h-64 flex-col overflow-x-hidden overflow-y-auto rounded-lg border border-slate-200 dark:border-border bg-white dark:bg-card shadow-md"
            >
              {normalizedOptions.length === 0 ? (
                <li className="flex h-40 flex-col items-center justify-center gap-4 p-4">
                  <Icon
                    icon="mdi:database-eye-off-outline"
                    width={32}
                    className="text-slate-500"
                  />
                  <p className="text-slate-600">Empty</p>
                </li>
              ) : (
                normalizedOptions.map((option) => {
                  const isSelected = option.value === value;
                  return (
                    <li
                      key={option.value}
                      className="flex w-full cursor-pointer items-center gap-2 p-2 text-sm transition hover:bg-slate-100 dark:hover:bg-accent"
                      onClick={() => {
                        onSelect(option.value);
                        setOpen(false);
                      }}
                    >
                      {isSelected ? (
                        <Icon icon="mdi:check" width={14} />
                      ) : (
                        <div className="w-[14px]" />
                      )}
                      <span className="min-w-0 flex-1 truncate">
                        {option.label}
                      </span>
                    </li>
                  );
                })
              )}
            </motion.ul>
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
