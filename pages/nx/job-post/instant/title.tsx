import { Input } from "@/components/atoms";
import { JobPostLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import { useState } from "react";

export default function JobPostTitle() {
  const [title, setTitle] = useState("");
  const router = useRouter();

  return (
    <JobPostLayout
      seo={{
        title: "Headline - Worklanc",
        description: "Headline - Worklanc",
        url: "/nx/job-post/instant/title",
      }}
      step={1}
      nextLabel="Next: Skills"
      onBack={() => router.back()}
      onNext={() => router.push("/nx/job-post/instant/skills")}
    >
      <div className="flex items-start gap-10">
        <div className="flex-1">
          <h1 className="text-3xl font-medium">
            Let's start with a strong title.
          </h1>
          <p className="text-sm mt-8">
            This helps your job post stand out to the right candidates. It’s the
            first thing they’ll see, so make it count!
          </p>
        </div>
        <div className="flex-1">
          <div className="space-y-2">
            <Input
              type="text"
              name="title"
              label="Write a title for your job post"
              labelClassName="text-sm!"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.trim().length > 0 && (
              <p className="text-xs text-slate-600">
                We’ll match you with candidates that specialize in{" "}
                <strong>Full Stack Development</strong>
              </p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-sm font-medium">Example titles</h2>
            <ul className="list-disc space-y-1 pl-4 mt-4 text-sm">
              <li>
                Build responsive WordPress site with booking/payment
                functionality
              </li>
              <li>
                Graphic designer needed to design ad creative for multiple
                campaigns
              </li>
              <li>Facebook ad specialist needed for product launch</li>
            </ul>
          </div>
        </div>
      </div>
    </JobPostLayout>
  );
}
