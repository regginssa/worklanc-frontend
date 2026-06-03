import { Button } from "@/components/atoms";
import { OrgManagementLayout } from "@/components/layouts";
import Image from "next/image";
import { useRouter } from "next/router";
import TargetArrowIcon from "@/public/assets/svgs/icons/other/target_arrow.svg";

export default function Invitations() {
  const router = useRouter();

  return (
    <OrgManagementLayout
      seo={{
        title: "Invitations - Worklanc",
        description: "Invitations - Worklanc",
        url: "/nx/org-management/invitations",
      }}
    >
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-medium">Pending Invitations</h1>
        <Button
          type="primary"
          label="Invite Members"
          classname="py-2.5! px-5! text-sm! font-medium!"
          onClick={() => router.push("/nx/org-management/invitations/create")}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-10">
        <Image
          src={TargetArrowIcon}
          alt="target-arrow"
          className="w-[145px] h-[130px]"
        />

        <p className="text-lg text-slate-600 font-medium">
          You have no pending invitations yet
        </p>
        <p className="text-sm text-slate-600 font-medium">
          Get started by invited someone to join you.
        </p>
      </div>
    </OrgManagementLayout>
  );
}
