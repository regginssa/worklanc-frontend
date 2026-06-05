import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";
import UserIcon from "@/public/assets/svgs/icons/other/user.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Byo() {
  const router = useRouter();

  return (
    <BenchLayout
      seo={{
        title: "Direct contracts - Worklanc",
        description: "Find talents your company has brought to Worklanc",
        url: "/browse/bench/byo",
      }}
    >
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Direct contracts</h1>
          <p className="text-sm text-slate-600">
            Find talents your company has brought to Worklanc
          </p>
        </div>
        <Button
          type="primary"
          label="Share list"
          classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          disabled
        />
      </section>

      <section className="space-y-10">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">Your favorite collaborator</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">A great communicator</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">Someone you can count on</p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm">
            Already working with freelancers outside of Worklanc? Simplify
            things by inviting them to join and use Worklanc’s collaboration,
            time tracking, and payment tools
          </p>
          <Link href="#" className="text-sm underline cursor-pointer">
            See how it works
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="outline"
            label="Invite Talent"
            size="medium"
            icon="mdi:plus"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={() => router.push("/nx/byo/form/new")}
          />
        </div>
      </section>
    </BenchLayout>
  );
}
