import { useState } from "react";
import { JobListItem } from "../common";
import JobPreviewDrawer from "./drawers/JobPreviewDrawer";

export default function JobListItemGroup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ul>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobListItem key={index} onClock={() => setOpen(true)} />
        ))}
      </ul>

      <JobPreviewDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
