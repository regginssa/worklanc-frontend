import {
  Button,
  Input,
  RadioGroup,
  SearchableDropdown,
} from "@/components/atoms";
import { WmLayout } from "@/components/layouts";
import { useState } from "react";
import { Icon } from "@iconify/react";
import CheckBoxGroup from "@/components/molecules/CheckBoxGroup";
import { AnimatePresence, motion } from "motion/react";
import { JobPostsCardGroup } from "@/components/molecules";

const postedByOptions = [
  { label: "All coworkers", value: "all-coworkers" },
  { label: "Me", value: "me" },
];

const visibilityOptions = [
  { title: "All", value: "all" },
  { title: "Invite-only", value: "invite-only" },
  { title: "Public", value: "public" },
];

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Drafts", value: "drafts" },
  { label: "Open", value: "open" },
  { label: "Filled", value: "filled" },
  { label: "Closed", value: "closed" },
];

const typeOptions = [
  { title: "All", value: "all" },
  { title: "Fixed-price", value: "fixed-price" },
  { title: "Hourly", value: "hourly" },
];

export default function AllJobs() {
  const [openFilters, setOpenFilters] = useState(false);
  const [searchFormData, setSearchFormData] = useState({
    keyword: "",
    postedBy: "all-coworkers",
    visibility: "all",
    status: ["all"],
    type: "all",
  });

  return (
    <WmLayout
      seo={{
        title: "Job postings - All jobs",
        description: "View all job postings on Worklanc",
        url: "/nx/wm/all-jobs",
        keywords: "job postings, all jobs, Worklanc",
      }}
    >
      <div
        className={`space-y-6 border-b pb-6 transition-colors duration-200 ${
          openFilters ? "border-black" : "border-slate-300"
        }`}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-medium">All job posts</h1>
          <Button
            type="primary"
            label="Post a new job"
            classname="py-2! px-5! rounded-full! text-sm! font-medium!"
          />
        </div>

        <div className="flex items-center gap-6">
          <Input
            type="text"
            name="search"
            placeholder="Search job postings"
            icon="mingcute:search-line"
            classname="w-1/2!"
            value={searchFormData.keyword}
            onChange={(e) =>
              setSearchFormData({ ...searchFormData, keyword: e.target.value })
            }
          />

          <button
            className="text-blue-600 text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline"
            onClick={() => setOpenFilters(!openFilters)}
          >
            <Icon
              icon="mi:filter"
              className={`size-5 ${
                openFilters ? "text-blue-600" : "text-slate-700"
              }`}
            />
            <span>Filters</span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {openFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="py-10 border-t border-black flex items-start gap-20">
                <SearchableDropdown
                  name="postedBy"
                  label="Posted by"
                  labelClassName="text-sm font-medium mb-2! block"
                  className="w-1/4!"
                  options={postedByOptions}
                  value={searchFormData.postedBy}
                  onChange={(value) =>
                    setSearchFormData({ ...searchFormData, postedBy: value })
                  }
                />

                <div className="space-y-2">
                  <p className="text-sm">Visibility</p>
                  <RadioGroup
                    options={visibilityOptions}
                    value={searchFormData.visibility}
                    onChange={(value) =>
                      setSearchFormData({
                        ...searchFormData,
                        visibility: value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm">Status</p>
                  <CheckBoxGroup
                    options={statusOptions}
                    value={searchFormData.status}
                    onChange={(value) =>
                      setSearchFormData({ ...searchFormData, status: value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm">Type</p>
                  <RadioGroup
                    options={typeOptions}
                    value={searchFormData.type}
                    onChange={(value) =>
                      setSearchFormData({ ...searchFormData, type: value })
                    }
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <JobPostsCardGroup jobs={[]} />
    </WmLayout>
  );
}
