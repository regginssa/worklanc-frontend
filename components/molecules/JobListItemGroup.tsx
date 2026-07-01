import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { JobListItem } from "../common";
import JobPreviewDrawer from "./drawers/JobPreviewDrawer";
import JobsAPI from "@/lib/api/jobs";
import type { BrowseJobListItem, BrowseJobsParams } from "@/types/job-browse";

type JobListItemGroupProps = {
  params?: BrowseJobsParams;
  keyword?: string;
  matchedSkills?: string[];
};

export default function JobListItemGroup({
  params = {},
  keyword = "",
  matchedSkills = [],
}: JobListItemGroupProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["browse-jobs", params],
    queryFn: () => JobsAPI.browse(params),
  });

  const jobs: BrowseJobListItem[] = data?.jobs ?? [];

  const markJobReadInCache = (uid: string) => {
    queryClient.setQueriesData(
      { queryKey: ["browse-jobs"] },
      (current: { jobs: BrowseJobListItem[] } | undefined) => {
        if (!current?.jobs) return current;
        return {
          jobs: current.jobs.map((job) =>
            job.uid === uid ? { ...job, isRead: true } : job,
          ),
        };
      },
    );
  };

  const markJobAsRead = async (uid: string) => {
    markJobReadInCache(uid);
    await JobsAPI.markBrowseRead(uid);
  };

  const handleOpen = (uid: string) => {
    void markJobAsRead(uid);
    setSelectedUid(uid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUid(null);
  };

  if (isLoading) {
    return (
      <ul>
        {Array.from({ length: 5 }).map((_, index) => (
          <JobListItem key={index} loading />
        ))}
      </ul>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="text-sm text-slate-600 px-4 py-8">
        No open jobs yet. Check back soon.
      </p>
    );
  }

  return (
    <>
      <ul>
        {jobs.map((job) => (
          <JobListItem
            key={job.uid}
            job={job}
            loading={isFetching}
            keyword={keyword}
            matchedSkills={matchedSkills}
            onClock={() => handleOpen(job.uid)}
            onMarkRead={() => markJobAsRead(job.uid)}
          />
        ))}
      </ul>

      <JobPreviewDrawer
        uid={selectedUid}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}
