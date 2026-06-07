import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";
import UserIcon from "@/public/assets/svgs/icons/other/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SavedProjects() {
  const router = useRouter();

  return (
    <BenchLayout
      seo={{
        title: "Saved projects - Worklanc",
        description: "Ready-to-buy projects to help you get work done fast",
        url: "/browse/bench/all-saves",
      }}
    >
      <section>
        <h1 className="text-3xl font-medium">Saved projects</h1>
        <p className="text-sm text-slate-600">
          Ready-to-buy projects to help you get work done fast
        </p>
      </section>

      <section className="space-y-10">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">A clear scope</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">Upfront prices</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">No surprises</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm">
            You haven’t saved any projects.{" "}
            <Link href="#" className="cursor-pointer underline">
              Browse Project Catalog
            </Link>{" "}
            to find solutions to your most urgent needs.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="outline"
            label="Find Projects"
            size="medium"
            icon="mdi:search"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={() => router.push("/services/search")}
          />
        </div>
      </section>
    </BenchLayout>
  );
}
