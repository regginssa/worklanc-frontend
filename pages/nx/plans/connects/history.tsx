import { Button, Dropdown, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import CoinsIcon from "@/public/assets/svgs/icons/other/coins.svg";
import EmptyIcon from "@/public/assets/svgs/icons/other/empty_teams.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

const DATE_OPTIONS = [
  { label: "Last 7 days", value: "last-7-days" },
  { label: "Last 30 days", value: "last-30-days" },
  { label: "Last 90 days", value: "last-90-days" },
];

export default function ConnectsHistory() {
  const [date, setDate] = useState(DATE_OPTIONS[0].value);
  const router = useRouter();

  return (
    <FreelancerLayout
      seo={{
        title: "Connects History - Worklanc",
        description: "Connects History - Worklanc",
        url: "nx/plans/connects/history",
      }}
    >
      <h1 className="text-4xl font-semibold">Connects History</h1>

      <div className="flex items-end gap-8">
        <div className="rounded-3xl flex-1 p-8 bg-slate-100 flex items-stretch justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-medium">My balance</h2>
            <p className="text-3xl font-medium mb-6">0 Connects</p>
            <Button
              type="primary"
              label="Buy Connects"
              classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
              onClick={() => router.push("/nx/plans/connects/buy")}
            />
          </div>

          <Image src={CoinsIcon} alt="Coins" className="w-[145px] h-[130px]" />
        </div>

        <div className="flex-1 flex items-center gap-8">
          <Input
            type="text"
            label="Search"
            labelClassName="text-sm! font-medium!"
            placeholder="Search..."
            classname="flex-1!"
            icon="mdi:search"
            name="search"
            value=""
            onChange={() => {}}
          />
          <Dropdown
            label="Date"
            name="date"
            options={DATE_OPTIONS}
            value={date}
            onSelect={(value) => setDate(value)}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4 py-28">
        <Image
          src={EmptyIcon}
          alt="Empty history"
          className="w-[145px] h-[130px]"
        />

        <p className="text-2xl font-medium">No Connects transactions.</p>
        <p className="text-xs text-slate-600">Try adjusting the filters</p>
      </div>
    </FreelancerLayout>
  );
}
