import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";
import UserIcon from "@/public/assets/svgs/icons/other/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function AllSaves() {
  const router = useRouter();

  return (
    <BenchLayout
      seo={{
        title: "Saved talent - Worklanc",
        description: "Look up people you've saved",
        url: "/browse/bench/all-saves",
      }}
    >
      <section>
        <h1 className="text-3xl font-medium">Saved talent</h1>
        <p className="text-sm text-slate-600">Look up people you've saved</p>
      </section>

      <section className="space-y-10">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">Your next superstar</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">
              Someone to bring your vision to life
            </p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">A strategic thinker</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm">
            You haven’t saved anyone yet. Start saving to help you remember
            talent that caught your eye.
          </p>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="outline"
            label="Find Talent"
            size="medium"
            icon="mdi:search"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={() => router.push("/nx/search/talent")}
          />
        </div>
      </section>
    </BenchLayout>
  );
}
