import CategoriesAPI from "@/lib/api/categories";
import CheckBoxGroup from "../molecules/CheckBoxGroup";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import SearchableGroupDropdown, {
  SearchableGroupOption,
} from "../atoms/SearchableGroupDropdown";
import { Checkbox, Input } from "../atoms";
import { countries, timezones as Timezones } from "country-data-list";
import { formatTimezone } from "@/utils/date";

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
        className="flex w-full cursor-pointer items-center justify-between text-left text-sm font-medium"
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

const FILTER_SECTIONS = [
  "category",
  "experienceLevel",
  "jobType",
  "numberOfProposals",
  "clientInfo",
  "clientHistory",
  "clientLocation",
  "clientTimezones",
  "projectLength",
  "hoursPerWeek",
  "jobDuration",
] as const;

export type JobFilterValue = {
  location: string[];
  category: string[];
  experienceLevel: string[];
  jobType: string[];
  numberOfProposals: string[];
  clientInfo: string[];
  clientHistory: string[];
  clientLocation: string[];
  clientTimezones: string[];
  projectLength: string[];
  hoursPerWeek: string[];
  jobDuration: string[];
  fixedPrice: string[];
  minHourlyRate: string;
  maxHourlyRate: string;
  minFixedPrice: string;
  maxFixedPrice: string;
};

const emptyFilterValue: JobFilterValue = {
  location: [],
  category: [],
  experienceLevel: [],
  jobType: [],
  numberOfProposals: [],
  clientInfo: [],
  clientHistory: [],
  clientLocation: [],
  clientTimezones: [],
  projectLength: [],
  hoursPerWeek: [],
  jobDuration: [],
  fixedPrice: [],
  minHourlyRate: "",
  maxHourlyRate: "",
  minFixedPrice: "",
  maxFixedPrice: "",
};

type JobFilterProps = {
  value?: Partial<JobFilterValue>;
  onChange?: (value: JobFilterValue) => void;
};

export default function JobFilter({ value, onChange }: JobFilterProps) {
  const [filterData, setFilterData] = useState<JobFilterValue>({
    ...emptyFilterValue,
    ...(value ?? {}),
  });
  const [expandedSections, setExpandedSections] = useState<
    Record<FilterSectionKey, boolean>
  >(
    Object.fromEntries(FILTER_SECTIONS.map((key) => [key, true])) as Record<
      FilterSectionKey,
      boolean
    >
  );

  const toggleSection = (key: FilterSectionKey) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.getAll,
  });

  useEffect(() => {
    if (!value) return;
    setFilterData({ ...emptyFilterValue, ...value });
  }, [value]);

  const updateFilterData = (next: JobFilterValue) => {
    setFilterData(next);
    onChange?.(next);
  };

  const locationOptions = [
    { label: "Local only", value: "local" },
    { label: "Worldwide", value: "global" },
  ];

  const experienceLevelOptions = [
    { label: "Entry level", value: "entry" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Expert", value: "expert" },
  ];

  const fixedPriceOptions = [
    { label: "Less than $100", value: "less_than_100" },
    { label: "$100 - $500", value: "100_to_500" },
    { label: "$500 - $1K", value: "500_to_1000" },
    { label: "$1K - $5K", value: "1000_to_5000" },
    { label: "$5K+", value: "5000_plus" },
  ];

  const numberOfProposalsOptions = [
    { label: "Fewer than 5", value: "fewer_than_5" },
    { label: "5 to 10", value: "5_to_10" },
    { label: "10 to 15", value: "10_to_15" },
    { label: "15 to 20", value: "15_to_20" },
    { label: "20 to 50", value: "20_to_50" },
  ];

  const clientInfoOptions = [
    { label: "My previous clients", value: "my_previous_clients" },
    { label: "Payment verified", value: "payment_verified" },
  ];

  const clientHistoryOptions = [
    { label: "No hires", value: "no_hires" },
    { label: "1 to 9 hires", value: "1_to_9_hires" },
    { label: "10+ hires", value: "10_plus_hires" },
  ];

  const projectLengthOptions = [
    { label: "1 to 3 months", value: "1-3" },
    { label: "3 to 6 months", value: "3-6" },
    { label: "More than 6 months", value: "6+" },
  ];

  const hoursPerWeekOptions = [
    { label: "Less than 30 hrs/week", value: "less_than_30_hrs_week" },
    { label: "More than 30 hrs/week", value: "more_than_30_hrs_week" },
  ];

  const jobDurationOptions = [
    { label: "Contract-to-hire roles", value: "yes" },
  ];

  const makeCategoryOptions = (): SearchableGroupOption[] => {
    const options: SearchableGroupOption[] = [];
    categories?.forEach((category) => {
      options.push({
        title: category.name,
        items: category.children.map((child) => ({
          label: child.name,
          value: child.slug,
        })),
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

  const makeTimezoneOptions = (): SearchableGroupOption[] => {
    const timezones = Timezones.all;
    const seenTimezones = new Set<string>();
    const timezoneItems = timezones
      .map((timezone) => ({ label: formatTimezone(timezone), value: timezone }))
      .filter((item) => {
        if (seenTimezones.has(item.label)) return false;
        seenTimezones.add(item.label);
        return true;
      });
    const options: SearchableGroupOption[] = [
      {
        title: "Timezones",
        items: timezoneItems,
      },
    ];
    return options;
  };

  return (
    <div className="space-y-4">
      <CheckBoxGroup
        options={locationOptions}
        value={filterData.location ?? []}
        onChange={(values) => {
          updateFilterData({ ...filterData, location: values });
        }}
      />

      <FilterSection
        key="category"
        title="Category"
        expanded={expandedSections.category}
        onToggle={() => toggleSection("category")}
      >
        <SearchableGroupDropdown
          name="category"
          placeholder="Select categories"
          options={makeCategoryOptions()}
          values={filterData.category ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, category: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="experienceLevel"
        title="Experience Level"
        expanded={expandedSections.experienceLevel}
        onToggle={() => toggleSection("experienceLevel")}
      >
        <CheckBoxGroup
          options={experienceLevelOptions}
          value={filterData.experienceLevel ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, experienceLevel: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="jobType"
        title="Job Type"
        expanded={expandedSections.jobType}
        onToggle={() => toggleSection("jobType")}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Checkbox
              className="size-5!"
              checked={filterData.jobType.includes("hourly")}
              onCheck={(checked) => {
                const next = checked
                  ? [...filterData.jobType, "hourly"]
                  : filterData.jobType.filter((item) => item !== "hourly");
                updateFilterData({ ...filterData, jobType: next });
              }}
            />
            <p className="flex-1 text-sm font-light">Hourly</p>
          </div>

          <div className="flex items-center gap-2 pl-5">
            <Checkbox className="size-5!" />
            <div className="flex-1 flex items-center gap-2">
              <Input
                type="number"
                name="minHourlyRate"
                placeholder="Min"
                icon="mdi:dollar"
                classname="h-8! w-24!"
                value={filterData.minHourlyRate ?? ""}
                onChange={(e) => {
                  updateFilterData({
                    ...filterData,
                    minHourlyRate: e.target.value,
                  });
                }}
              />
              <span className="text-sm font-light">/hr</span>
              <Input
                type="number"
                name="maxHourlyRate"
                placeholder="Max"
                icon="mdi:dollar"
                classname="h-8! w-24!"
                value={filterData.maxHourlyRate ?? ""}
                onChange={(e) => {
                  updateFilterData({
                    ...filterData,
                    maxHourlyRate: e.target.value,
                  });
                }}
              />
              <span className="text-sm font-light">/hr</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              className="size-5!"
              checked={filterData.jobType.includes("fixed")}
              onCheck={(checked) => {
                const next = checked
                  ? [...filterData.jobType, "fixed"]
                  : filterData.jobType.filter((item) => item !== "fixed");
                updateFilterData({ ...filterData, jobType: next });
              }}
            />
            <p className="flex-1 text-sm font-light">Fixed-Price</p>
          </div>

          <div className="pl-5">
            <CheckBoxGroup
              options={fixedPriceOptions}
              value={filterData.fixedPrice ?? []}
              onChange={(values) => {
                updateFilterData({ ...filterData, fixedPrice: values });
              }}
            />
            <div className="flex items-center gap-2 mt-2">
              <Checkbox
                className="size-5!"
                checked={
                  Boolean(filterData.minFixedPrice) ||
                  Boolean(filterData.maxFixedPrice)
                }
              />
              <div className="flex-1 flex items-center gap-2">
                <Input
                  type="number"
                  name="minFixedPrice"
                  placeholder="Min"
                  icon="mdi:dollar"
                  classname="h-8! w-24!"
                  value={filterData.minFixedPrice ?? ""}
                  onChange={(e) => {
                    updateFilterData({
                      ...filterData,
                      minFixedPrice: e.target.value,
                    });
                  }}
                />
                <Input
                  type="number"
                  name="maxFixedPrice"
                  placeholder="Max"
                  icon="mdi:dollar"
                  classname="h-8! w-24!"
                  value={filterData.maxFixedPrice ?? ""}
                  onChange={(e) => {
                    updateFilterData({
                      ...filterData,
                      maxFixedPrice: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </FilterSection>

      <FilterSection
        key="numberOfProposals"
        title="Number of Proposals"
        expanded={expandedSections.numberOfProposals}
        onToggle={() => toggleSection("numberOfProposals")}
      >
        <CheckBoxGroup
          options={numberOfProposalsOptions}
          value={filterData.numberOfProposals ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, numberOfProposals: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="numberOfProposals"
        title="Client Info"
        expanded={expandedSections.clientInfo}
        onToggle={() => toggleSection("clientInfo")}
      >
        <CheckBoxGroup
          options={clientInfoOptions}
          value={filterData.clientInfo ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, clientInfo: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="numberOfProposals"
        title="Client History"
        expanded={expandedSections.clientHistory}
        onToggle={() => toggleSection("clientHistory")}
      >
        <CheckBoxGroup
          options={clientHistoryOptions}
          value={filterData.clientHistory ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, clientHistory: values });
          }}
        />
      </FilterSection>

      <FilterSection
        title="Client location"
        expanded={expandedSections.clientLocation}
        onToggle={() => toggleSection("clientLocation")}
      >
        <SearchableGroupDropdown
          name="clientLocation"
          placeholder="Region or Country"
          options={makeLocationOptions()}
          values={filterData.clientLocation ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, clientLocation: values });
          }}
        />
      </FilterSection>

      <FilterSection
        title="Client time zones"
        expanded={expandedSections.clientTimezones}
        onToggle={() => toggleSection("clientTimezones")}
      >
        <SearchableGroupDropdown
          name="clientTimezones"
          placeholder="Select talent time zones"
          options={makeTimezoneOptions()}
          values={filterData.clientTimezones ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, clientTimezones: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="projectLength"
        title="Project length"
        expanded={expandedSections.projectLength}
        onToggle={() => toggleSection("projectLength")}
      >
        <CheckBoxGroup
          options={projectLengthOptions}
          value={filterData.projectLength ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, projectLength: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="hoursPerWeek"
        title="Hours per week"
        expanded={expandedSections.hoursPerWeek}
        onToggle={() => toggleSection("hoursPerWeek")}
      >
        <CheckBoxGroup
          options={hoursPerWeekOptions}
          value={filterData.hoursPerWeek ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, hoursPerWeek: values });
          }}
        />
      </FilterSection>

      <FilterSection
        key="jobDuration"
        title="Job duration"
        expanded={expandedSections.jobDuration}
        onToggle={() => toggleSection("jobDuration")}
      >
        <CheckBoxGroup
          options={jobDurationOptions}
          value={filterData.jobDuration ?? []}
          onChange={(values) => {
            updateFilterData({ ...filterData, jobDuration: values });
          }}
        />
      </FilterSection>
    </div>
  );
}
