import { FreelancerSettingsLayout } from "@/components/layouts";
import Image from "next/image";
import EmptyIcon from "@/public/assets/svgs/icons/other/bag_open.svg";

export default function ConnectedServices() {
  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Connected Services - Worklanc",
        description: "Connected Services - Worklanc",
        url: "/freelancers/settings/connected-services",
      }}
    >
      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <h3 className="text-2xl font-medium">Connected services</h3>

        <div className="flex flex-col items-center justify-center gap-6">
          <Image
            src={EmptyIcon}
            alt="Empty connected services"
            className="w-[145px] h-[130px] object-contain"
          />
          <p className="">You have no connected services yet</p>
        </div>
      </div>
    </FreelancerSettingsLayout>
  );
}
