import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export interface CryptoAssetDropdownOption {
  value: string;
  label: string;
  description?: string;
  icon: StaticImageData;
}

interface CryptoAssetDropdownProps {
  label: string;
  subLabel?: string;
  name: string;
  placeholder?: string;
  options: CryptoAssetDropdownOption[];
  value: string;
  error?: string;
  disabled?: boolean;
  onSelect: (value: string) => void;
}

export default function CryptoAssetDropdown({
  label,
  subLabel,
  name,
  placeholder = "Select an option",
  options,
  value,
  error,
  disabled = false,
  onSelect,
}: CryptoAssetDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={rootRef} className="flex w-full flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>

      <div className="relative w-full">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          disabled={disabled}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          className={`flex h-10 lg:w-1/3 w-full items-center gap-3 rounded-lg px-4 py-2 transition-all duration-200 ${
            error
              ? "border-2 border-red-500"
              : disabled
              ? "cursor-not-allowed border border-slate-400 bg-slate-100"
              : "cursor-pointer border border-slate-400 hover:border-2 hover:border-black"
          }`}
        >
          {selectedOption ? (
            <>
              <Image
                src={selectedOption.icon}
                alt={selectedOption.label}
                width={20}
                height={20}
                className="size-5 shrink-0"
              />
              <span className="min-w-0 flex-1 truncate text-left text-sm text-slate-900">
                {selectedOption.label}
              </span>
            </>
          ) : (
            <span className="min-w-0 flex-1 truncate text-left text-sm text-slate-600">
              {placeholder}
            </span>
          )}

          <input type="hidden" name={name} value={value} readOnly />

          <Icon
            icon="mdi:chevron-down"
            width={20}
            className={`shrink-0 text-slate-700 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {open && !disabled && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute left-0 top-full z-40 mt-2 max-h-72 lg:w-1/3 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-md"
            >
              {options.map((option) => {
                const isSelected = option.value === value;

                return (
                  <li
                    key={option.value}
                    className="cursor-pointer px-3 py-3 transition hover:bg-slate-50"
                    onClick={() => {
                      onSelect(option.value);
                      setOpen(false);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={24}
                        height={24}
                        className="mt-0.5 size-6 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900">
                            {option.label}
                          </span>
                          {isSelected && (
                            <Icon
                              icon="mdi:check"
                              width={14}
                              className="text-blue-600"
                            />
                          )}
                        </div>
                        {option.description && (
                          <p className="mt-1 text-xs text-slate-600">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {(subLabel || error) && (
        <div className="space-y-1">
          {error && (
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:information-outline"
                width={16}
                className="text-red-500"
              />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {subLabel && !error && (
            <p className="text-xs text-slate-600">{subLabel}</p>
          )}
        </div>
      )}
    </div>
  );
}
