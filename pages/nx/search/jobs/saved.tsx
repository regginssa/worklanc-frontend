import { FreelancerLayout } from "@/components/layouts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import FavoriteIcon from "@/public/assets/svgs/icons/other/favorite.svg";
import Image from "next/image";

export default function SavedJobsPage() {
  return (
    <FreelancerLayout
      seo={{
        title: "Saved Jobs - Worklanc",
        description: "Saved jobs",
        url: "/nx/search/jobs/saved",
      }}
    >
      <div className="pb-4 border-b border-slate-300">
        <Link
          href="/nx/find-work"
          className="flex items-center gap-2 cursor-pointer text-blue-600 text-sm font-medium underline"
        >
          <ArrowLeft className="size-5" />
          Return to search
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center py-20 space-y-8">
        <Image
          src={FavoriteIcon}
          alt="Favorite"
          className="w-[145px] h-[130px]"
        />
        <p className="text-xl font-medium text-slate-600">
          Keep track of jobs you're interested in. Select the heart icon on a
          job post to save it for later.
        </p>
      </div>
    </FreelancerLayout>
  );
}
