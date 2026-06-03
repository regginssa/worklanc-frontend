import { Button } from "@/components/atoms";
import { OrgManagementLayout } from "@/components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CompanySettings() {
  const router = useRouter();

  return (
    <OrgManagementLayout
      seo={{
        title: "Invitations - Worklanc",
        description: "Invitations - Worklanc",
        url: "/nx/org-management/invitations",
      }}
    >
      <div className="p-4 rounded-md border-2 border-blue-300 space-y-4">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-medium">
            Link your email domain to easily add teammates
          </h1>
          <div className="flex items-center justify-center text-white text-xs py-1 px-3 freelancer-plus-alert rounded-full">
            Unlock Business Plus
          </div>
        </div>
        <div className="text-sm">
          <p className="font-medium mb-1 text-slate-600">
            Connect your company email domain so new teammates automatically
            join your company on Upwork. This feature is included in your
            Business Plus membership.
          </p>
          <Link href="#" className="text-blue-600 underline cursor-pointer">
            Learn more
          </Link>
        </div>
        <Button
          type="outline"
          label="Upgrade"
          size="medium"
          classname="py-2! px-6! text-sm! font-medium! rounded-md!"
          onClick={() =>
            router.push(
              "/nx/plans/client/change-plan?returnUrl=eyJzdWNjZXNzIjoiL254L29yZy1tYW5hZ2VtZW50L3NldHRpbmdzIn0%3D"
            )
          }
        />
      </div>
    </OrgManagementLayout>
  );
}
