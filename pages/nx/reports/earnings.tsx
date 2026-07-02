import { Button, TabBar } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import Link from "next/link";
import { useState } from "react";
import FolderIcon from "@/public/assets/svgs/icons/other/folder_open.svg";
import Image from "next/image";

const tabs = [
  { label: "Billing & Earnings", value: "billing-and-earnings" },
  { label: "Lifetime Billed", value: "lifetime-billed" },
];

export default function EarningsReportsPage() {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  return (
    <FreelancerLayout
      seo={{
        title: "Billings & Earnings - Worklanc",
        description: "View your billing and earnings history.",
        url: "/nx/reports/earnings",
      }}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold">Billings & Earnings</h1>
        <p className="text-sm text-slate-600">
          View your earnings and any applicable fees or taxes by client for the
          past 3 years. For earnings past three years, go to{" "}
          <Link
            href="/nx/payments/reports/transaction-history"
            className="text-black cursor-pointer underline"
          >
            transaction history
          </Link>
          .
        </p>
      </div>

      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTab={setSelectedTabIndex}
      />

      <div className="flex items-center justify-end">
        <Button
          type="primary"
          label="Download CSV"
          classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
        />
      </div>

      <div className="py-20 bg-slate-50 flex flex-col items-center justify-center gap-6 rounded-xl">
        <Image src={FolderIcon} alt="Folder" className="w-[145px] h-[130px]" />
        <div className="space-y-2 text-center">
          <h4 className="text-2xl font-semibold">
            There are no earnings to display for the selected date range.
          </h4>
          <p className="text-sm font-light">
            If you believe this is a mistake, please contact customer support.
          </p>
        </div>

        <Button
          type="primary"
          label="Contact customer support"
          classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
        />
      </div>
    </FreelancerLayout>
  );
}
