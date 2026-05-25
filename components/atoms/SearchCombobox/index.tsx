import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import Input from "../Input";
import { useEffect, useRef, useState } from "react";

interface SearchComboboxProps {
  label?: string;
  placeholder?: string;
  name: string;
  icon?: string;
  options: any[];
  defaultOption: any;
  labelClassName?: string;
  classname?: string;
  error?: string;
  required?: boolean;
  onSelect: (v: any) => void;
}

const SearchCombobox: React.FC<SearchComboboxProps> = ({
  label,
  placeholder,
  name,
  icon,
  defaultOption,
  options,
  classname,
  labelClassName,
  error,
  required,
  onSelect,
}) => {
  const [search, setSearch] = useState("");
  const [searchedOptions, setSearchedOptions] = useState(options);
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (search.trim().length === 0) setSearchedOptions(options);
    else setSearchedOptions(options.filter((opt) => opt.includes(search)));
  }, [search, options]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className={`flex flex-col items-start gap-1 relative ${classname}`}
    >
      {label && (
        <label className={labelClassName}>
          {label} {required && <span className="">*</span>}
        </label>
      )}

      {/* trigger */}
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        className={`w-full h-10 flex items-center gap-2 py-2 px-4 rounded-lg ${
          error
            ? "border-2 border-red-500"
            : "border border-slate-400 hover:border-2 hover:border-black"
        } transition-all duration-300`}
        onClick={() => setOpen((prev) => !prev)}
      >
        {icon && <Icon icon={icon} width={14} />}

        <input
          name={name}
          placeholder={placeholder}
          className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-slate-600"
          value={defaultOption}
          readOnly
        />

        <Icon
          icon="mdi:chevron-down"
          width={20}
          className={`transition-transform duration-200 text-slate-700 ${
            open ? "rotate-180" : ""
          }`}
        />
      </motion.button>

      {/* dropdown */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute bg-white top-full w-full max-h-64 overflow-y-auto z-40 mt-2 shadow-md rounded-lg border border-slate-200 flex flex-col"
          >
            {/* search */}
            <div className="sticky top-0 bg-white p-3 w-full border-b">
              <Input
                name="search-country"
                type="text"
                icon="mdi:search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </div>

            {/* options */}
            {searchedOptions.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center w-full gap-4">
                <Icon
                  icon="mdi:database-eye-off-outline"
                  width={32}
                  className="text-slate-500"
                />
                <p className="text-slate-600">Empty</p>
              </div>
            ) : (
              searchedOptions.map((option, index) => (
                <li
                  key={index}
                  className="text-sm flex items-center gap-2 cursor-pointer hover:bg-slate-100 transition w-full p-2"
                  onClick={() => {
                    onSelect(option);
                    setOpen(false);
                  }}
                >
                  {option === defaultOption ? (
                    <Icon icon="mdi:check" width={14} />
                  ) : (
                    <div className="w-[14px]" />
                  )}
                  <span>{option}</span>
                </li>
              ))
            )}
          </motion.ul>
        )}
      </AnimatePresence>

      {!!error && (
        <div className="absolute w-full top-full mt-2 z-0 flex items-center gap-2">
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

export default SearchCombobox;
