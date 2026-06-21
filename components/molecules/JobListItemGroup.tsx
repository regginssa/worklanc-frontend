import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { JobListItem } from "../common";
import JobPreviewDrawer from "./drawers/JobPreviewDrawer";
import JobsAPI from "@/lib/api/jobs";
import type { BrowseJobListItem } from "@/types/job-browse";

export default function JobListItemGroup() {
  const [open, setOpen] = useState(false);
  const [selectedUid, setSelectedUid] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["browse-jobs"],
    queryFn: JobsAPI.browse,
  });

  const jobs: BrowseJobListItem[] = data?.jobs ?? [];

  const handleOpen = (uid: string) => {
    setSelectedUid(uid);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUid(null);
  };

  if (isLoading) {
    return <p className="text-sm text-slate-600 px-4 py-8">Loading jobs...</p>;
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
            onClock={() => handleOpen(job.uid)}
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
