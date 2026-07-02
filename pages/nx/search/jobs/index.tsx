import { Button, Dropdown, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { JobListItemGroup } from "@/components/molecules";
import { JobFilter } from "@/components/organisms";
import type { BrowseJobsParams } from "@/types/job-browse";
import type { JobFilterValue } from "@/components/organisms/JobFilter";
import { AdvancedSearchJobsDialog } from "@/components/molecules";
import JobsAPI from "@/lib/api/jobs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TurnstileAccessGate from "@/components/molecules/security/TurnstileAccessGate";
import { getTurnstileSession } from "@/lib/security/turnstile";

const sortByOptions = [
  { label: "Sort by: Best Matches", value: "best_matches" },
  { label: "Sort by: Most Recent", value: "most_recent" },
  { label: "Sort by: Client spend", value: "client_spend" },
  { label: "Sort by: Client rating", value: "client_rating" },
];

export default function SearchJobsPage() {
  const turnstileVerified = Boolean(getTurnstileSession("find_work"));
  const queryClient = useQueryClient();
  const [advancedSearchDialogOpen, setAdvancedSearchDialogOpen] =
    useState(false);
  const [fromRecentSearch, setFromRecentSearch] = useState("");
  const [filters, setFilters] = useState<JobFilterValue>({
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
  });
  const [formData, setFormData] = useState({
    keyword: "",
    sortBy: sortByOptions[0].value,
  });
  const [advancedSearchFormData, setAdvancedSearchFormData] = useState({
    allOfTheseWords: "",
    anyOfTheseWords: "",
    noneOfTheseWords: "",
    exactPhrase: "",
    titleSearch: "",
    skillsSearch: "",
  });
  const [saveSearchOpen, setSaveSearchOpen] = useState(false);
  const [searchName, setSearchName] = useState("");
  const router = useRouter();
  const toSortParam = (sortBy: string) => {
    if (sortBy === "most_recent") return "created_at+desc";
    return "relevance+desc";
  };

  const fromSortParam = (sort: string) => {
    if (sort === "created_at+desc") return "most_recent";
    return "best_matches";
  };

  const parseList = (value: string | string[] | undefined) => {
    const raw = Array.isArray(value) ? value.join(",") : value || "";
    return raw
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  };

  const toSingle = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] || "" : value || "";

  useEffect(() => {
    if (!router.isReady) return;
    const q = router.query;
    const nextKeyword = toSingle(q.q || q.keyword);
    const nextSortBy = fromSortParam(toSingle(q.sort || q.sortBy));
    setFormData({ keyword: nextKeyword, sortBy: nextSortBy });
    setSearchName(nextKeyword);
    setFromRecentSearch(toSingle(q.from_recent_search));
    setAdvancedSearchFormData({
      allOfTheseWords: toSingle(q.allOfTheseWords),
      anyOfTheseWords: toSingle(q.anyOfTheseWords),
      noneOfTheseWords: toSingle(q.noneOfTheseWords),
      exactPhrase: toSingle(q.exactPhrase),
      titleSearch: toSingle(q.titleSearch),
      skillsSearch: toSingle(q.skillsSearch),
    });
    setFilters((prev) => ({
      ...prev,
      location: parseList(q.location),
      category: parseList(q.category),
      experienceLevel: parseList(q.experienceLevel),
      jobType: parseList(q.jobType),
      numberOfProposals: parseList(q.numberOfProposals),
      clientInfo: parseList(q.clientInfo),
      clientHistory: parseList(q.clientHistory),
      clientLocation: parseList(q.clientLocation),
      clientTimezones: parseList(q.clientTimezones),
      projectLength: parseList(q.projectLength),
      hoursPerWeek: parseList(q.hoursPerWeek),
      jobDuration: parseList(q.jobDuration),
      minHourlyRate: toSingle(q.minHourlyRate),
      maxHourlyRate: toSingle(q.maxHourlyRate),
      minFixedPrice: toSingle(q.minFixedPrice),
      maxFixedPrice: toSingle(q.maxFixedPrice),
    }));
  }, [router.isReady, router.query]);

  const browseParams: BrowseJobsParams = {
    from_recent_search: fromRecentSearch,
    q: formData.keyword,
    sort: toSortParam(formData.sortBy),
    location: filters.location,
    category: filters.category,
    experienceLevel: filters.experienceLevel,
    jobType: filters.jobType,
    numberOfProposals: filters.numberOfProposals,
    clientInfo: filters.clientInfo,
    clientHistory: filters.clientHistory,
    clientLocation: filters.clientLocation,
    clientTimezones: filters.clientTimezones,
    projectLength: filters.projectLength,
    hoursPerWeek: filters.hoursPerWeek,
    jobDuration: filters.jobDuration,
    minHourlyRate: filters.minHourlyRate,
    maxHourlyRate: filters.maxHourlyRate,
    minFixedPrice: filters.minFixedPrice,
    maxFixedPrice: filters.maxFixedPrice,
    allOfTheseWords: advancedSearchFormData.allOfTheseWords,
    anyOfTheseWords: advancedSearchFormData.anyOfTheseWords,
    noneOfTheseWords: advancedSearchFormData.noneOfTheseWords,
    exactPhrase: advancedSearchFormData.exactPhrase,
    titleSearch: advancedSearchFormData.titleSearch,
    skillsSearch: advancedSearchFormData.skillsSearch,
  };

  useEffect(() => {
    if (!router.isReady) return;
    const nextQuery: Record<string, string> = {};
    Object.entries(browseParams).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) nextQuery[key] = value.join(",");
      } else if (value != null && String(value).trim().length > 0) {
        nextQuery[key] = String(value);
      }
    });

    const currentSearch = new URLSearchParams(
      Object.entries(router.query).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(",") : String(value),
      ]),
    ).toString();
    const nextSearch = new URLSearchParams(nextQuery).toString();
    if (currentSearch === nextSearch) return;
    void router.replace(
      { pathname: router.pathname, query: nextQuery },
      undefined,
      { shallow: true },
    );
  }, [router, router.isReady, browseParams]);

  const { data: savedSearchesData } = useQuery({
    queryKey: ["job-saved-searches"],
    queryFn: JobsAPI.listSavedSearches,
    enabled: turnstileVerified,
  });

  const saveSearchMutation = useMutation({
    mutationFn: JobsAPI.saveSearch,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["job-saved-searches"] });
      setSaveSearchOpen(false);
    },
  });

  if (!turnstileVerified) {
    return <TurnstileAccessGate scope="find_work" />;
  }

  return (
    <FreelancerLayout
      seo={{
        title: "Search Freelance Jobs on Worklanc",
        description: "Search freelance jobs on Worklanc",
        url: "/nx/search/jobs",
      }}
    >
      <div className="flex items-center gap-2">
        <Input
          type="text"
          name="search"
          placeholder="Search for jobs"
          icon="mdi:search"
          classname="w-1/2!"
          value={formData.keyword}
          onChange={(e) =>
            setFormData({ ...formData, keyword: e.target.value })
          }
          onEnter={() => setFromRecentSearch("true")}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 cursor-pointer text-sm font-medium h-10 px-6 hover:underline"
          onClick={() => setAdvancedSearchDialogOpen(true)}
        >
          Advanced search
        </motion.button>
      </div>

      <div className="flex items-start gap-4">
        {/* FILTERS */}
        <div className="w-1/4">
          <JobFilter value={filters} onChange={setFilters} />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between pb-4 border-b border-slate-300">
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 cursor-pointer text-sm font-medium flex items-center gap-2 hover:underline"
                onClick={() => setSaveSearchOpen(true)}
              >
                <Icon
                  icon="material-symbols:folder-outline-rounded"
                  className="size-5"
                />
                <span>Save search</span>
              </motion.button>

              {saveSearchOpen && (
                <div className="absolute top-full left-0 w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Save search such as
                    </span>
                    <Icon
                      icon="mdi:close"
                      className="size-5 cursor-pointer"
                      onClick={() => setSaveSearchOpen(false)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Input
                      type="text"
                      name="searchName"
                      placeholder="Search name"
                      value={searchName}
                      onChange={(e) => setSearchName(e.target.value)}
                    />
                    <Button
                      type="primary"
                      label="Save"
                      classname="w-full! rounded-full! py-2.5! text-sm! font-medium!"
                      onClick={() =>
                        saveSearchMutation.mutate({
                          name: searchName || formData.keyword || "Saved search",
                          params: browseParams,
                        })
                      }
                    />
                    <p className="text-xs text-slate-600">
                      Saving this search will save the query and all the filters
                      that are currently applied. Results from your saved
                      searches will appear in My Feed
                    </p>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-light">Your saved searches</p>
                    <ul className="flex flex-wrap text-sm font-light">
                      {(savedSearchesData?.searches ?? []).map((item) => (
                        <li
                          key={item.id}
                          className="underline cursor-pointer mr-3"
                          onClick={() => {
                            const params = item.params ?? {};
                            setFromRecentSearch("true");
                            setFormData({
                              keyword:
                                params.q || params.keyword || formData.keyword,
                              sortBy: fromSortParam(
                                params.sort || params.sortBy || "relevance+desc",
                              ),
                            });
                            setAdvancedSearchFormData({
                              allOfTheseWords: params.allOfTheseWords || "",
                              anyOfTheseWords: params.anyOfTheseWords || "",
                              noneOfTheseWords: params.noneOfTheseWords || "",
                              exactPhrase: params.exactPhrase || "",
                              titleSearch: params.titleSearch || "",
                              skillsSearch: params.skillsSearch || "",
                            });
                            setFilters((prev) => ({
                              ...prev,
                              location: params.location ?? [],
                              category: params.category ?? [],
                              experienceLevel: params.experienceLevel ?? [],
                              jobType: params.jobType ?? [],
                              numberOfProposals: params.numberOfProposals ?? [],
                              clientInfo: params.clientInfo ?? [],
                              clientHistory: params.clientHistory ?? [],
                              clientLocation: params.clientLocation ?? [],
                              clientTimezones: params.clientTimezones ?? [],
                              projectLength: params.projectLength ?? [],
                              hoursPerWeek: params.hoursPerWeek ?? [],
                              jobDuration: params.jobDuration ?? [],
                              minHourlyRate: params.minHourlyRate ?? "",
                              maxHourlyRate: params.maxHourlyRate ?? "",
                              minFixedPrice: params.minFixedPrice ?? "",
                              maxFixedPrice: params.maxFixedPrice ?? "",
                            }));
                            setSaveSearchOpen(false);
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 cursor-pointer text-sm font-medium flex items-center gap-2 shrink-0 whitespace-nowrap"
              >
                <Icon icon="mdi:heart-outline" className="size-5" />
                <span>Saved jobs</span>
              </motion.button>

              <Dropdown
                name="sortBy"
                options={sortByOptions}
                value={formData.sortBy}
                classname="max-w-56! w-full!"
                onSelect={(value) => setFormData({ ...formData, sortBy: value })}
              />
            </div>
          </div>

          <JobListItemGroup
            params={browseParams}
            keyword={formData.keyword}
            matchedSkills={formData.keyword
              .split(/\s+/)
              .map((word) => word.trim())
              .filter(Boolean)}
          />
        </div>
      </div>

      <AdvancedSearchJobsDialog
        open={advancedSearchDialogOpen}
        onClose={() => setAdvancedSearchDialogOpen(false)}
        formData={advancedSearchFormData}
        onSearch={(values) => {
          setAdvancedSearchFormData(values);
          setFromRecentSearch("true");
        }}
      />
    </FreelancerLayout>
  );
}
