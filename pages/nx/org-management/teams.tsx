import { Button } from "@/components/atoms";
import { OrgManagementLayout } from "@/components/layouts";
import TeamsIcon from "@/public/assets/svgs/icons/other/teams.svg";
import Image from "next/image";

export default function Teams() {
  return (
    <OrgManagementLayout
      seo={{
        title: "Teams - Worklanc",
        description: "Teams - Worklanc",
        url: "/nx/org-management/teams",
      }}
    >
      <h1 className="text-2xl font-medium px-4">Teams</h1>
      <div className="flex flex-col items-center justify-center gap-6">
        <Image src={TeamsIcon} alt="Teams" className="w-[145px] h-[130px]" />
        <h2 className="text-xl">Create your first team</h2>
        <p className="text-sm text-gray-500">
          Invite teammates to streamline hiring, manage contracts, and
          collaborate in one place.
        </p>
        <Button
          type="primary"
          label="Create a team"
          icon="mdi:plus"
          classname="py-2.5! px-5! text-sm! font-medium!"
        />
      </div>
    </OrgManagementLayout>
  );
}
