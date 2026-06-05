import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";
import UserIcon from "@/public/assets/svgs/icons/other/user.svg";
import Image from "next/image";

export default function MyHires() {
  return (
    <BenchLayout
      seo={{
        title: "Your hires - Worklanc",
        description: "Look up people you've worked with",
        url: "/browse/bench/my-hires",
      }}
    >
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Your hires</h1>
          <p className="text-sm text-slate-600">
            Look up people you've worked with
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
            <p className="text-sm text-slate-600">An absolute lifesaver</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">A long-term collaborator</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">Your go-to problem solver</p>
          </div>
        </div>

        <p className="text-center text-sm">
          You haven’t hired anyone yet. Start searching for the right fit for
          your next project.
        </p>

        <div className="flex items-center justify-center">
          <Button
            type="outline"
            label="Find Talent"
            size="medium"
            icon="mdi:search"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </div>
      </section>
    </BenchLayout>
  );
}
