import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CheckBoxGroup from "../CheckBoxGroup";

import { ChevronDown } from "lucide-react";

import SearchableGroupDropdown, {
  SearchableGroupOption,
} from "@/components/atoms/SearchableGroupDropdown";

import { countries } from "country-data-list";

import { useQuery } from "@tanstack/react-query";

import CategoriesAPI from "@/lib/api/categories";

import { useState } from "react";

import { Button } from "@/components/atoms";

import { AnimatePresence, motion } from "motion/react";

const clientInfoOptions = [
  { label: "Payment verified", value: "payment_verified" },

  { label: "My previous clients", value: "my_previous_clients" },
];

const experienceLevelOptions = [
  { label: "Entry level", value: "entry_level" },

  { label: "Intermediate", value: "intermediate" },

  { label: "Expert", value: "expert" },
];

const numberOfProposalsOptions = [
  { label: "Fewer than 5", value: "fewer_than_5" },

  { label: "5 to 10", value: "5_to_10" },

  { label: "10 to 15", value: "10_to_15" },

  { label: "15 to 20", value: "15_to_20" },

  { label: "20 to 50", value: "20_to_50" },
];

const jobTypeOptions = [
  { label: "Hourly", value: "hourly" },

  { label: "Fixed-Price", value: "fixed_price" },
];

const clientHistoryOptions = [
  { label: "No hires", value: "no_hires" },

  { label: "1 to 9 hires", value: "1_to_9_hires" },

  { label: "10+ hires", value: "10_plus_hires" },
];

const hoursPerWeekOptions = [
  { label: "Less than 10 hrs/week", value: "less_than_10_hrs" },

  { label: "10 to 30 hrs/week", value: "10_to_30_hrs" },

  { label: "More than 30 hrs/week", value: "more_than_30_hrs" },
];

const projectLengthOptions = [
  { label: "Less than one month", value: "less_than_one_month" },

  { label: "1 to 3 months", value: "1_to_3_months" },

  { label: "3 to 6 months", value: "3_to_6_months" },

  { label: "More than 6 months", value: "more_than_6_months" },
];

const FILTER_SECTIONS = [
  "clientInfo",

  "experienceLevel",

  "numberOfProposals",

  "jobType",

  "clientHistory",

  "hoursPerWeek",

  "projectLength",
] as const;

type FilterSectionKey = (typeof FILTER_SECTIONS)[number];

function FilterSection({
  title,

  expanded,

  onToggle,

  children,
}: {
  title: string;

  expanded: boolean;

  onToggle: () => void;

  children: React.ReactNode;
}) {
  return (
    <div className={`space-y-4 ${expanded ? "relative" : ""}`}>
      <button
        type="button"
        aria-expanded={expanded}
        className="flex w-full cursor-pointer items-center justify-between text-base"
        onClick={onToggle}
      >
        <span>{title}</span>

        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown className="size-4" />
        </motion.span>
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
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function JobFiltersDialog({
  open,

  onClose,
}: {
  open: boolean;

  onClose: () => void;
}) {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const [expandedSections, setExpandedSections] = useState<
    Record<FilterSectionKey, boolean>
  >(
    Object.fromEntries(FILTER_SECTIONS.map((key) => [key, true])) as Record<
      FilterSectionKey,
      boolean
    >
  );

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],

    queryFn: CategoriesAPI.getAll,
  });

  const toggleSection = (key: FilterSectionKey) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const makeCategoryOptions = (): SearchableGroupOption[] => {
    const options: SearchableGroupOption[] = [];

    categories?.forEach((category) => {
      options.push({
        title: category.name,

        items: [
          { label: `All ${category.name}`, value: `all_${category.slug}` },

          ...category.children.map((child) => ({
            label: child.name,

            value: child.slug,
          })),
        ],
      });
    });

    return options;
  };

  const makeLocationOptions = (): SearchableGroupOption[] => {
    const regions = [
      { label: "Asia", value: "asia" },

      { label: "Africa", value: "africa" },

      { label: "Americas", value: "americas" },

      { label: "Europe", value: "europe" },

      { label: "Oceania", value: "oceania" },
    ];

    const options: SearchableGroupOption[] = [
      {
        title: "Local",

        items: [{ label: "Search your location only", value: "local" }],
      },

      {
        title: "Regions",

        items: regions,
      },

      {
        title: "Countries",

        items: countries.all.map((country) => ({
          label: country.name,

          value: country.alpha2,
        })),
      },
    ];

    return options;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl max-h-[85vh] flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Filters</DialogTitle>

          <DialogDescription>
            Filters will only apply to "Best match", "Most recent" and "U.K.
            only" searches.
          </DialogDescription>
        </DialogHeader>

        <div
          className={`min-h-0 flex-1 overflow-y-auto px-4 no-scrollbar space-y-6 ${
            showMoreFilters ? "pb-32" : "pb-4"
          }`}
        >
          <CheckBoxGroup
            options={[{ label: "UK only", value: "UK only" }]}
            value={[]}
            onChange={() => {}}
          />

          <FilterSection
            title="Client info"
            expanded={expandedSections.clientInfo}
            onToggle={() => toggleSection("clientInfo")}
          >
            <CheckBoxGroup
              options={clientInfoOptions}
              value={[]}
              onChange={() => {}}
            />
          </FilterSection>

          <FilterSection
            title="Experience level"
            expanded={expandedSections.experienceLevel}
            onToggle={() => toggleSection("experienceLevel")}
          >
            <CheckBoxGroup
              options={experienceLevelOptions}
              value={[]}
              onChange={() => {}}
            />
          </FilterSection>

          <FilterSection
            title="Number of proposals"
            expanded={expandedSections.numberOfProposals}
            onToggle={() => toggleSection("numberOfProposals")}
          >
            <CheckBoxGroup
              options={numberOfProposalsOptions}
              value={[]}
              onChange={() => {}}
            />
          </FilterSection>

          <FilterSection
            title="Job type"
            expanded={expandedSections.jobType}
            onToggle={() => toggleSection("jobType")}
          >
            <CheckBoxGroup
              options={jobTypeOptions}
              value={[]}
              onChange={() => {}}
            />
          </FilterSection>

          <FilterSection
            title="Client history"
            expanded={expandedSections.clientHistory}
            onToggle={() => toggleSection("clientHistory")}
          >
            <CheckBoxGroup
              options={clientHistoryOptions}
              value={[]}
              onChange={() => {}}
            />
          </FilterSection>

          <AnimatePresence initial={false}>
            {showMoreFilters && (
              <motion.div
                key="more-filters"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  height: { duration: 0.3, ease: "easeInOut" },

                  opacity: { duration: 0.2, ease: "easeInOut" },
                }}
                className="overflow-visible space-y-6"
              >
                <FilterSection
                  title="Hours per week"
                  expanded={expandedSections.hoursPerWeek}
                  onToggle={() => toggleSection("hoursPerWeek")}
                >
                  <CheckBoxGroup
                    options={hoursPerWeekOptions}
                    value={[]}
                    onChange={() => {}}
                  />
                </FilterSection>

                <FilterSection
                  title="Project length"
                  expanded={expandedSections.projectLength}
                  onToggle={() => toggleSection("projectLength")}
                >
                  <CheckBoxGroup
                    options={projectLengthOptions}
                    value={[]}
                    onChange={() => {}}
                  />
                </FilterSection>

                <SearchableGroupDropdown
                  name="location"
                  label="Select Client location"
                  labelClassName="text-base! mb-2! block!"
                  placeholder="Select Client location"
                  options={makeLocationOptions()}
                  values={[]}
                  onChange={() => {}}
                />

                <SearchableGroupDropdown
                  name="category"
                  label="Select Category"
                  labelClassName="text-base! mb-2! block!"
                  placeholder="Select Category"
                  disabled={categoriesLoading}
                  options={makeCategoryOptions()}
                  values={[]}
                  onChange={() => {}}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center">
            <button
              type="button"
              className="text-blue-600 text-sm font-medium cursor-pointer flex items-center gap-2"
              onClick={() => setShowMoreFilters(!showMoreFilters)}
            >
              <span>Show {showMoreFilters ? "less" : "more"} filters</span>

              <motion.span
                animate={{ rotate: showMoreFilters ? 180 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="size-4" />
              </motion.span>
            </button>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
              Cancel
            </button>
          </DialogClose>

          <Button
            type="primary"
            label="Apply"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
