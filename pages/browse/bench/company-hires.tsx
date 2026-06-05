import { Button } from "@/components/atoms";
import { BenchLayout } from "@/components/layouts";
import UserIcon from "@/public/assets/svgs/icons/other/user.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CompanyHires() {
  const router = useRouter();

  return (
    <BenchLayout
      seo={{
        title: "Company hires - Worklanc",
        description: "Explore your company's hires",
        url: "/browse/bench/company-hires",
      }}
    >
      <section className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-medium">Company hires</h1>
          <p className="text-sm text-slate-600">Explore your company's hires</p>
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
            <p className="text-sm text-slate-600">An idea machine</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">A pleasure to work with</p>
          </div>
          <div className="bg-slate-200 flex flex-col items-center justify-center gap-10 rounded-3xl aspect-square">
            <Image src={UserIcon} alt="User" width={80} height={80} />
            <p className="text-sm text-slate-600">Your 5-star favorite</p>
          </div>
        </div>

        <p className="text-center text-sm">
          No one at your company has hired anyone yet. Add teammates to help you
          hire faster.
        </p>

        <div className="flex items-center justify-center">
          <Button
            type="outline"
            label="Add teammates to Company"
            size="medium"
            icon="mdi:plus"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={() =>
              router.push(
                "/nx/org-management/invitations/create?hmh_source=mytalent"
              )
            }
          />
        </div>
      </section>
    </BenchLayout>
  );
}
