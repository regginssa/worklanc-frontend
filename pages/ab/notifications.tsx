import { TabBar } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import { useState } from "react";

const tabs = [
  { label: "Activity", value: "activity" },
  { label: "Job alerts", value: "job_alerts" },
];

export default function Notifications() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <FreelancerLayout
      seo={{
        title: "Notifications",
        description: "Notifications",
        url: "/ab/notifications",
      }}
    >
      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTab={setSelectedTabIndex}
      />
    </FreelancerLayout>
  );
}
