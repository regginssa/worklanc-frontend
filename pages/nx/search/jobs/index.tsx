import { Dropdown, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { JobListItemGroup } from "@/components/molecules";
import { JobFilter } from "@/components/organisms";

const sortByOptions = [
  { label: "Sort by: Best Matches", value: "best_matches" },
  { label: "Sort by: Most Recent", value: "most_recent" },
  { label: "Sort by: Client spend", value: "client_spend" },
  { label: "Sort by: Client rating", value: "client_rating" },
];

export default function SearchJobsPage() {
  const [formData, setFormData] = useState({
    keyword: "",
    sortBy: sortByOptions[0].value,
  });
  const router = useRouter();
  const { keyword } = router.query;

  useEffect(() => {
    if (keyword) {
      setFormData({ ...formData, keyword: keyword as string });
    }
  }, [keyword]);

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
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 cursor-pointer text-sm font-medium h-10 px-6"
        >
          Advanced search
        </motion.button>
      </div>

      <div className="flex items-start gap-4">
        {/* FILTERS */}
        <div className="w-1/4">
          <JobFilter />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between pb-4 border-b border-slate-300">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="text-blue-600 cursor-pointer text-sm font-medium flex items-center gap-2"
            >
              <Icon
                icon="material-symbols:folder-outline-rounded"
                className="size-5"
              />
              <span>Save search</span>
            </motion.button>

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
                onSelect={(value) =>
                  setFormData({ ...formData, sortBy: value })
                }
              />
            </div>
          </div>

          <JobListItemGroup />
        </div>
      </div>
    </FreelancerLayout>
  );
}
