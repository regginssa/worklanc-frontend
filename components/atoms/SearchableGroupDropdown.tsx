import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Checkbox from "./Checkbox";
import Input from "./Input";

export interface SearchableGroupOptionItem {
  value: string;
  label: string;
}

export interface SearchableGroupOption {
  title: string;
  items: SearchableGroupOptionItem[];
}

interface SearchableGroupDropdownProps {
  label?: string;
  placeholder?: string;
  name: string;
  labelClassName?: string;
  className?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: string;
  options: SearchableGroupOption[];
  values: string[];
  onChange: (values: string[]) => void;
}

export default function SearchableGroupDropdown({
  label,
  onChange,
  name,
  options,
  values,
  className,
  disabled,
  icon,
  required,
  error,
  labelClassName,
  placeholder,
}: SearchableGroupDropdownProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = options
    .map((option) => ({
      ...option,
      items: option.items.filter((item) =>
        item.label.toLowerCase().includes(search.trim().toLowerCase())
      ),
    }))
    .filter((option) => option.items.length > 0);

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
    <div className={`space-y-1 ${className}`}>
      <div className="relative" ref={containerRef}>
        {label && (
          <label className={`text-sm ${labelClassName} font-medium`}>
            {label} {required && <span>*</span>}
          </label>
        )}

        <motion.button
          whileTap={{ scale: 0.97 }}
          className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg cursor-pointer ${
            error
              ? "border-2 border-red-500"
              : disabled
              ? "border border-slate-400 bg-slate-100 cursor-not-allowed"
              : "border border-slate-400 hover:border-2 hover:border-black focus-within:border-2 focus-within:border-black"
          } group transition-all duration-200`}
          onClick={() => setOpen(!open)}
        >
          {icon && (
            <Icon
              icon={icon}
              width={20}
              className="text-slate-700 group-hover:text-black group-focus-within:text-black transition-all duration-200"
            />
          )}
          <div className="bg-transparent border-none outline-none text-sm flex-1 text-left text-slate-600">
            {placeholder}
          </div>
          <Icon
            icon="mdi:chevron-down"
            className={`size-6 transition-transform duration-200 ${
              open ? "rotate-180" : "rotate-0"
            }`}
          />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              className="absolute mt-1 top-full w-full bg-white shadow-lg border border-slate-300 rounded-lg z-10 space-y-4 max-h-72 overflow-y-auto"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="sticky bg-white top-0 p-2">
                <Input
                  type="text"
                  placeholder="Search..."
                  icon="mdi:search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="px-4 pb-4">
                {filteredOptions.length === 0 && (
                  <p className="text-sm text-slate-500 text-center py-4">
                    No results found
                  </p>
                )}
                {filteredOptions.map((option, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-medium text-slate-600 uppercase mb-4 mt-4">
                      {option.title}
                    </h4>

                    <motion.ul
                      className="space-y-2"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.04 },
                        },
                      }}
                    >
                      {option.items.map((item) => (
                        <motion.li
                          key={item.value}
                          className="flex items-center gap-2"
                          variants={{
                            hidden: { opacity: 0, x: -10 },
                            visible: { opacity: 1, x: 0 },
                          }}
                          transition={{ duration: 0.15 }}
                        >
                          <Checkbox
                            checked={values.includes(item.value)}
                            onCheck={(v: boolean) =>
                              onChange(
                                v
                                  ? [...values, item.value]
                                  : values.filter(
                                      (value: string) => value !== item.value
                                    )
                              )
                            }
                          />
                          <p className="text-sm">{item.label}</p>
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                ))}
              </div>
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
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
}
