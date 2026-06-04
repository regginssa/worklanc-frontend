import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Icon } from "@iconify/react";
import { Checkbox, RadioGroup } from "../atoms";
import TopRatedPlusIcon from "@/public/assets/svgs/icons/badges/top_rated_plus.svg";
import TopRatedIcon from "@/public/assets/svgs/icons/badges/top_rated.svg";
import RisingTalentIcon from "@/public/assets/svgs/icons/badges/rising_talent.svg";
import Image from "next/image";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SearchableGroupDropdown, {
  SearchableGroupOption,
} from "../atoms/SearchableGroupDropdown";
import {
  countries,
  timezones as Timezones,
  languages as countryLanguages,
} from "country-data-list";
import { formatTimezone } from "@/utils/date";
import { AutoComplete } from "../common";
import CheckBoxGroup from "../molecules/CheckBoxGroup";

const talentTypeOptions = [
  { title: "Freelancers & Agencies", value: "freelancers_agencies" },
  { title: "Freelancers", value: "freelancers" },
  { title: "Agencies", value: "agencies" },
];

const jobSuccessOptions = [
  { title: "Any job success", value: "any_job_success" },
  { title: "80% & up", value: "80_up" },
  { title: "90% & up", value: "90_up" },
];

const earnedAmountOptions = [
  { title: "Any amount earned", value: "any_amount_earned" },
  { title: "$1+ earned", value: "1_plus" },
  { title: "$100+ earned", value: "100_plus" },
  { title: "$1K+ earned", value: "1000_plus" },
  { title: "$10K+ earned", value: "10000_plus" },
  { title: "No earnings yet", value: "no_earnings" },
];

const hoursBilledOptions = [
  { title: "Any hours", value: "any_hours" },
  { title: "1+ hours billed", value: "1_plus" },
  { title: "100+ hours billed", value: "100_plus" },
  { title: "1,000+ hours billed", value: "1000_plus" },
];

const englishLevelOptions = [
  { title: "Any level", value: "any_level" },
  { title: "Basic", value: "basic" },
  { title: "Conversational", value: "conversational" },
  { title: "Fluent", value: "fluent" },
  { title: "Native or Bilingual", value: "native" },
];

const FILTER_SECTIONS = [
  "talentBadge",
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

export default function TalentFilter() {
  const [hourlyRate, setHourlyRate] = useState([10, 100]);
  const [locationValues, setLocationValues] = useState<string[]>([]);
  const [otherLanguagesKeyword, setOtherLanguagesKeyword] = useState("");
  const [otherLanguages, setOtherLanguages] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<
    Record<FilterSectionKey, boolean>
  >(
    Object.fromEntries(FILTER_SECTIONS.map((key) => [key, true])) as Record<
      FilterSectionKey,
      boolean
    >
  );

  const timezones = Timezones.all;
  const languageOptions = countryLanguages.all
    .filter((language) => language.name !== "English")
    .map((language) => ({
      label: language.name,
      value: language.name,
    }));
  languageOptions.unshift({ label: "Any language", value: "any" });

  const toggleSection = (key: FilterSectionKey) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
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
    <div className="w-1/4 overflow-visible rounded-lg bg-slate-50 p-4 space-y-1 text-sm">
      <FilterSection
        title="Talent badge"
        expanded={expandedSections.talentBadge}
        onToggle={() => toggleSection("talentBadge")}
        titleExtra={
          <div className="flex items-center gap-2">
            <span>Talent badge</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="inline-flex"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  <Icon
                    icon="mdi:question-mark-circle-outline"
                    className="w-4 h-4"
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm p-2">
                  <Link href="#" className="underline cursor-pointer">
                    Learn more
                  </Link>{" "}
                  about talent quality badges.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        }
      >
        <ul className="space-y-4">
          <li className="flex items-center gap-4">
            <Checkbox className="rounded-md!" />
            <Image
              src={TopRatedPlusIcon}
              alt="Top Rated Plus"
              width={24}
              height={24}
            />
            <span>Top Rated Plus</span>
          </li>
          <li className="flex items-center gap-4">
            <Checkbox className="rounded-md!" />
            <Image src={TopRatedIcon} alt="Top Rated" width={24} height={24} />
            <span>Top Rated</span>
          </li>
          <li className="flex items-center gap-4">
            <Checkbox className="rounded-md!" />
            <Image
              src={RisingTalentIcon}
              alt="Rising Talent"
              width={24}
              height={24}
            />
            <span>Rising Talent</span>
          </li>
        </ul>
      </FilterSection>

      <FilterSection
        title="Hourly rate"
        expanded={expandedSections.hourlyRate}
        onToggle={() => toggleSection("hourlyRate")}
      >
        <Slider
          value={hourlyRate}
          onValueChange={setHourlyRate}
          max={100}
          min={10}
          step={1}
        />
        <div className="flex items-center justify-between">
          <span className="text-slate-600 font-medium">
            ${hourlyRate[0]}/hr
          </span>
          <span className="text-slate-600 font-medium">
            ${hourlyRate[1]}/hr
          </span>
        </div>
      </FilterSection>

      <FilterSection
        title="Location"
        expanded={expandedSections.location}
        onToggle={() => toggleSection("location")}
      >
        <SearchableGroupDropdown
          name="location"
          placeholder="Region or Country"
          options={makeLocationOptions()}
          values={locationValues}
          onChange={setLocationValues}
        />
      </FilterSection>

      <FilterSection
        title="Talent time zones"
        expanded={expandedSections.timezones}
        onToggle={() => toggleSection("timezones")}
      >
        <SearchableGroupDropdown
          name="timezones"
          placeholder="Select talent time zones"
          options={makeTimezoneOptions()}
          values={locationValues}
          onChange={setLocationValues}
        />
      </FilterSection>

      <FilterSection
        title="Talent type"
        expanded={expandedSections.talentType}
        onToggle={() => toggleSection("talentType")}
      >
        <RadioGroup
          name="type"
          options={talentTypeOptions}
          value="freelancers_agencies"
          onChange={() => {}}
        />
      </FilterSection>

      <FilterSection
        title="Job success"
        expanded={expandedSections.jobSuccess}
        onToggle={() => toggleSection("jobSuccess")}
      >
        <RadioGroup
          name="jobSuccess"
          options={jobSuccessOptions}
          value="any_job_success"
          onChange={() => {}}
        />
      </FilterSection>

      <FilterSection
        title="Earned amount"
        expanded={expandedSections.earnedAmount}
        onToggle={() => toggleSection("earnedAmount")}
      >
        <RadioGroup
          name="earnedAmount"
          options={earnedAmountOptions}
          value="any_amount_earned"
          onChange={() => {}}
        />
      </FilterSection>

      <FilterSection
        title="Hours billed"
        expanded={expandedSections.hoursBilled}
        onToggle={() => toggleSection("hoursBilled")}
      >
        <RadioGroup
          name="hoursBilled"
          options={hoursBilledOptions}
          value="any_hours"
          onChange={() => {}}
        />
      </FilterSection>

      <FilterSection
        title="English level"
        expanded={expandedSections.englishLevel}
        onToggle={() => toggleSection("englishLevel")}
      >
        <RadioGroup
          name="englishLevel"
          options={englishLevelOptions}
          value="any_level"
          onChange={() => {}}
        />
      </FilterSection>

      <FilterSection
        title="Other languages"
        expanded={expandedSections.otherLanguages}
        onToggle={() => toggleSection("otherLanguages")}
      >
        <AutoComplete
          name="otherLanguages"
          placeholder="Search languages"
          options={languageOptions}
          multiple
          selectedValues={otherLanguages}
          value={otherLanguagesKeyword}
          onChange={setOtherLanguagesKeyword}
          onSelectedChange={setOtherLanguages}
        />

        {otherLanguages.length > 0 && (
          <CheckBoxGroup
            options={otherLanguages.map((language) => ({
              label: language,
              value: language,
            }))}
            value={otherLanguages}
            onChange={setOtherLanguages}
          />
        )}
      </FilterSection>
    </div>
  );
}
