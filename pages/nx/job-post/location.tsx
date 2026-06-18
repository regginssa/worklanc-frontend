import { JobPostLayout } from "@/components/layouts";
import { useJobPost } from "@/hooks/useJobPost";
import type { JobLocationType } from "@/types/job";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { SearchableGroupDropdown } from "@/components/atoms";
import { State } from "country-state-city";
import { countries, timezones as Timezones } from "country-data-list";
import { SearchableGroupOption } from "@/components/atoms/SearchableGroupDropdown";
import { formatTimezone } from "@/utils/date";

export default function JobPostLocation() {
  const router = useRouter();
  const { uid, job, isLoading, saving, saveStep, goBack } = useJobPost();
  const [location, setLocation] = useState<JobLocationType>("local");
  const [stateValues, setStateValues] = useState<string[]>([]);
  const [regionValues, setRegionValues] = useState<string[]>([]);

  useEffect(() => {
    if (!router.isReady) return;
    if (!uid) router.replace("/nx/job-post/welcome");
  }, [router.isReady, uid, router]);

  useEffect(() => {
    if (!job) return;
    if (job.locationType) setLocation(job.locationType);
    if (job.locationType === "local" && job.locationPreferences?.length) {
      setStateValues(job.locationPreferences);
    }
    if (job.locationType === "global" && job.locationPreferences?.length) {
      setRegionValues(job.locationPreferences);
    }
  }, [job]);

  const states = State.getStatesOfCountry("US");
  const timezones = Timezones.byCountry.US;

  const makeStateOptions = (): SearchableGroupOption[] => {
    const seenTimezones = new Set<string>();
    const timezoneItems = timezones
      .map((timezone) => ({ label: formatTimezone(timezone), value: timezone }))
      .filter((item) => {
        if (seenTimezones.has(item.label)) return false;
        seenTimezones.add(item.label);
        return true;
      });

    return [
      { title: "Time zones", items: timezoneItems },
      {
        title: "States",
        items: states.map((state) => ({
          label: state.name,
          value: state.name,
        })),
      },
    ];
  };

  const makeRegionOptions = (): SearchableGroupOption[] => {
    const regions = [
      { label: "Oceania", value: "oceania" },
      { label: "Americas", value: "americas" },
      { label: "Asia", value: "asia" },
      { label: "Europe", value: "europe" },
      { label: "Africa", value: "africa" },
    ];
    return [
      { title: "Regions", items: regions },
      {
        title: "Countries",
        items: countries.all.map((country) => ({
          label: country.name,
          value: country.alpha2,
        })),
      },
    ];
  };

  const getLabel = (options: SearchableGroupOption[], value: string): string => {
    for (const option of options) {
      for (const item of option.items) {
        if (item.value === value) return item.label;
      }
    }
    return value;
  };

  const stateOptions = makeStateOptions();
  const regionOptions = makeRegionOptions();

  const locationPreferences =
    location === "local" ? stateValues : regionValues;

  const handleNext = async () => {
    await saveStep(
      { locationType: location, locationPreferences },
      "/nx/job-post/budget",
      "/nx/job-post/location",
    );
  };

  const handleBack = async () => {
    await goBack(
      { locationType: location, locationPreferences },
      "/nx/job-post/duration",
      "/nx/job-post/location",
    );
  };

  if (!uid || isLoading) return null;

  return (
    <JobPostLayout
      seo={{
        title: "Location - Worklanc",
        description: "Location - Worklanc",
        url: "/nx/job-post/location",
      }}
      step={4}
      nextLabel={saving ? "Saving..." : "Next: Budget"}
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={saving}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1 space-y-8">
          <h1 className="text-3xl font-medium">
            Select your preferred talent location.
          </h1>
          <p className="text-sm">
            This increases proposals from talent in a specific region, but still
            opens your job post to all candidates.
          </p>
        </div>

        <div className="flex-1 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className={`p-4 border rounded-2xl space-y-2 cursor-pointer transition-colors duration-200 ${
                location === "local" ? "border-black" : "border-slate-300"
              }`}
              onClick={() => {
                setLocation("local");
                setStateValues([]);
              }}
            >
              <div className="flex items-center justify-between">
                <Icon icon="mdi:map-marker-outline" className="size-6" />
                <div
                  className={`w-5 h-5 overflow-hidden flex items-center border ${
                    location === "local" ? "border-black" : "border-slate-300"
                  } justify-center rounded-full`}
                >
                  <div
                    className={`w-2.5 h-2.5 bg-zinc-800 rounded-full transition-all duration-200 ${
                      location === "local" ? "scale-100" : "scale-0"
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-medium">Local</h3>
                <p className="text-sm text-slate-600">
                  Only local talent can submit proposals
                </p>
              </div>
            </motion.button>

            <motion.button
              type="button"
              whileTap={{ scale: 0.95 }}
              className={`p-4 border ${
                location === "global" ? "border-black" : "border-slate-300"
              } rounded-2xl space-y-2 cursor-pointer`}
              onClick={() => {
                setLocation("global");
                setRegionValues([]);
              }}
            >
              <div className="flex items-center justify-between">
                <Icon icon="mdi:globe" className="size-6" />
                <div
                  className={`w-5 h-5 overflow-hidden flex items-center border ${
                    location === "global" ? "border-black" : "border-slate-300"
                  } justify-center rounded-full`}
                >
                  <div
                    className={`w-2.5 h-2.5 bg-zinc-800 rounded-full transition-all duration-200 ${
                      location === "global" ? "scale-100" : "scale-0"
                    }`}
                  />
                </div>
              </div>
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-medium">Worldwide</h3>
                <p className="text-sm text-slate-600">
                  Talent in any location can submit proposals
                </p>
              </div>
            </motion.button>
          </div>

          {location === "local" ? (
            <div className="space-y-2">
              <SearchableGroupDropdown
                label="States or time zone preferences (optional)"
                labelClassName="mb-2 block"
                name="state"
                placeholder="Add states or timezones"
                options={stateOptions}
                values={stateValues}
                onChange={setStateValues}
              />
              <p className="mt-2 text-xs text-slate-600">
                These location preferences will be displayed to freelancers and
                agencies, but anyone can submit proposals.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-8">
                {stateValues.map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer border border-slate-400 rounded-full py-1.5 px-2 text-xs font-medium flex items-center gap-2"
                  >
                    {getLabel(stateOptions, value)}
                    <Icon
                      icon="mdi:times"
                      className="size-5 text-slate-800"
                      onClick={() =>
                        setStateValues(stateValues.filter((v) => v !== value))
                      }
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <SearchableGroupDropdown
                label="Region or country preferences (optional)"
                labelClassName="mb-2 block"
                name="region"
                placeholder="Add regions or countries"
                options={regionOptions}
                values={regionValues}
                onChange={setRegionValues}
              />
              <p className="mt-2 text-xs text-slate-600">
                These location preferences will be displayed to all candidates,
                but anyone can submit proposals.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-8">
                {regionValues.map((value) => (
                  <motion.button
                    key={value}
                    type="button"
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer border border-slate-400 rounded-full py-1.5 px-2 text-xs font-medium flex items-center gap-2"
                  >
                    {getLabel(regionOptions, value)}
                    <Icon
                      icon="mdi:times"
                      className="size-5 text-slate-800"
                      onClick={() =>
                        setRegionValues(regionValues.filter((v) => v !== value))
                      }
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </JobPostLayout>
  );
}
