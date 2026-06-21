import { SEO } from "@/components/atoms";
import { AuthorizedFooter, Header } from "@/components/organisms";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import JobsAPI from "@/lib/api/jobs";
import JobBrowseDetailPanels from "@/components/molecules/JobBrowseDetailPanels";

export default function JobPage() {
  const router = useRouter();
  const uid = router.isReady ? (router.query.uid as string | undefined) : undefined;

  const { data, isLoading, error } = useQuery({
    queryKey: ["browse-job", uid],
    queryFn: () => (uid ? JobsAPI.browseOne(uid) : Promise.resolve(null)),
    enabled: Boolean(uid),
  });

  const job = data?.job ?? null;

  return (
    <>
      <Header variant="talent" />
      <SEO
        title={job?.title || "Job posting"}
        url={uid ? `/jobs/${uid}` : "/jobs"}
        description={job?.description?.slice(0, 160) || "View job posting"}
      />
      <main className="w-full max-w-7xl mx-auto flex-1">
        {isLoading && (
          <p className="p-8 text-sm text-slate-600">Loading job...</p>
        )}
        {!isLoading && error && (
          <p className="p-8 text-sm text-slate-600">Job not found.</p>
        )}
        {!isLoading && !job && uid && (
          <p className="p-8 text-sm text-slate-600">Job not found.</p>
        )}
        {job && <JobBrowseDetailPanels job={job} variant="page" />}
      </main>
      <AuthorizedFooter />
    </>
  );
}
