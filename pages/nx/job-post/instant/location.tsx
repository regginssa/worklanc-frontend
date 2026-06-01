import { JobPostLayout } from "@/components/layouts";
import { useRouter } from "next/router";

export default function JobPostLocation() {
  const router = useRouter();

  return (
    <JobPostLayout
      seo={{
        title: "Location - Worklanc",
        description: "Location - Worklanc",
        url: "/nx/job-post/instant/location",
      }}
      step={2}
      nextLabel="Next: Duration"
      onBack={() => router.back()}
      onNext={() => router.push("/nx/job-post/instant/duration")}
      nextDisabled={false}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1 space-y-6">
          <h1 className="text-3xl font-medium">
            Select your preferred talent location.
          </h1>
          <p className="text-sm">
            This increases proposals from talent in a specific region, but still
            opens your job post to all candidates.
          </p>
        </div>
        <div className="flex-1"></div>
      </div>
    </JobPostLayout>
  );
}
