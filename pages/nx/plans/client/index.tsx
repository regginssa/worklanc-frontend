import { Button } from "@/components/atoms";
import { ClientSettingsLayout } from "@/components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";

export default function ClientPlans() {
  const router = useRouter();

  return (
    <ClientSettingsLayout
      seo={{
        title: "Membership - Worklanc",
        description: "Membership - Worklanc",
        url: "nx/plans/client",
      }}
    >
      <h2 className="text-3xl font-medium">Membership Settings</h2>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase">Current plan</p>
            <h2 className="text-2xl font-medium mt-2">Basic</h2>
          </div>
          <Button
            type="primary"
            label="Upgrade membership"
            classname="py-2! px-5! text-sm! font-medium! rounded-md!"
            onClick={() => router.push("/nx/plans/client/change-plan")}
          />
        </div>

        <p className="text-sm text-slate-600">
          Plan start date: 5/29/2026{" "}
          <Link href="#" className="text-black cursor-pointer underline">
            See your plans benefits
          </Link>
        </p>
      </div>
    </ClientSettingsLayout>
  );
}
