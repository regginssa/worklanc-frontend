import { FreelancerLayout } from "@/components/layouts";

export default function Overview() {
  return (
    <FreelancerLayout
      seo={{
        title: "Overview - Worklanc",
        description: "Overview of your reports",
        url: "/nx/reports/overview",
        keywords: "reports, overview",
      }}
    >
      <h1 className="text-3xl font-semibold">Overview</h1>
    </FreelancerLayout>
  );
}
