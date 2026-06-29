import CheckBoxGroup from "../molecules/CheckBoxGroup";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";

const FILTER_SECTIONS = [
  "category",
  "hourlyRate",
  "location",
  "timezones",
  "talentType",
  "jobSuccess",
  "earnedAmount",
  "hoursBilled",
  "englishLevel",
  "otherLanguages",
] as const;

type FilterSectionKey = (typeof FILTER_SECTIONS)[number];

function FilterSection({
  title,
  expanded,
  onToggle,
  titleExtra,
  children,
}: {
  title: string;
  expanded: boolean;
  onToggle: () => void;
  titleExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className={`py-2 ${expanded ? "relative" : ""}`}>
      <button
        type="button"
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center justify-between text-left"
        onClick={onToggle}
      >
        {titleExtra ?? <span>{title}</span>}
        <Icon
          icon="mdi:chevron-down"
          className={`size-5 shrink-0 text-slate-700 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, ease: "easeInOut" },
            }}
            className="overflow-visible"
          >
            <div className="relative space-y-4 overflow-visible pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const locationOptions = [
  { label: "Local only", value: "local_only" },
  { label: "Worldwide", value: "worldwide" },
];

export default function JobFilter() {
  return (
    <div className="space-y-4">
      <CheckBoxGroup options={locationOptions} value={[]} onChange={() => {}} />
    </div>
  );
}
