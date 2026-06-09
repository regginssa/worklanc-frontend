import { WeeklySelect, type WeekRange } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react/dist/iconify.js";
import { addDays, startOfWeek } from "date-fns";
import Image from "next/image";
import { useState } from "react";
import NotFoundIcon from "@/public/assets/svgs/icons/other/not_found.svg";

function getCurrentWeek(): WeekRange {
  const start = startOfWeek(new Date(), { weekStartsOn: 1 });
  return { start, end: addDays(start, 6) };
}

export default function WeeklySummary() {
  const [selectedWeek, setSelectedWeek] = useState<WeekRange | null>(
    getCurrentWeek
  );

  return (
    <ClientLayout
      seo={{
        title: "Weekly Summary - Worklanc",
        description: "Weekly summary of your projects and tasks",
        url: "/nx/reports/client/weekly-summary",
      }}
    >
      <div className="space-y-6">
        <h1 className="text-4xl font-semibold">Weekly summary</h1>

        <div className="flex items-end gap-10">
          <WeeklySelect
            name="week"
            label="Select week"
            placeholder="Select week"
            value={selectedWeek}
            onChange={setSelectedWeek}
            classname="w-72"
          />

          <div className="flex items-center gap-2 mb-2">
            <span>Times based on UTC.</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <Icon
                  icon="mdi:question-mark-circle-outline"
                  className="h-4 w-4"
                />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="p-2 text-sm">
                  Coordinated Universal Time (UTC) is used so payments and
                  reports are consistent. Current local time in UTC is 3:16 PM,
                  Tuesday, June 9, 2026
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="aspect-square rounded-lg border border-slate-200 p-6">
            <h3 className="text-xl font-medium">Total</h3>

            <ul className="mt-6 text-slate-600">
              <li className="py-2 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span>Hourly (0:00 hrs)</span>
                  <span>$0.00</span>
                </div>
                <div className="pl-2 flex items-center justify-between">
                  <span>∟Manual time (0:00 hrs)</span>
                  <span>$0.00</span>
                </div>
              </li>

              <li className="py-2 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span>Fixed price and other</span>
                  <span>$0.00</span>
                </div>
              </li>
            </ul>

            <div className="flex justify-end mt-2">
              <span className="text-lg font-medium text-slate-600">$0.00</span>
            </div>
          </div>

          <div className="flex aspect-square flex-col rounded-lg border border-slate-200 p-6">
            <h3 className="text-xl font-medium">Top 5 contracts</h3>

            <div className="flex min-h-0 flex-1 w-full flex-col items-center justify-center">
              <p className="text-sm text-slate-600">
                There is no data for the selected week
              </p>
            </div>
          </div>

          <div className="flex aspect-square flex-col rounded-lg border border-slate-200 p-6">
            <h3 className="text-xl font-medium">Top 5 activities</h3>

            <div className="flex min-h-0 flex-1 w-full flex-col items-center justify-center">
              <p className="text-sm text-slate-600">
                There is no data for the selected week
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-medium">Hourly</h2>
        <div className="w-full flex flex-col items-center justify-center gap-6 bg-slate-50 py-20">
          <Image
            src={NotFoundIcon}
            alt="Not found"
            className="w-[145px] h-[130px]"
          />

          <div className="space-y-2 text-center">
            <h4 className="text-2xl font-medium">No records to show</h4>
            <p className="text-sm">
              There is no hourly data for the selected week
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-3xl font-medium">Fixed price and other payments</h2>
        <div className="w-full flex flex-col items-center justify-center gap-6 bg-slate-50 py-20">
          <Image
            src={NotFoundIcon}
            alt="Not found"
            className="w-[145px] h-[130px]"
          />

          <div className="space-y-2 text-center">
            <h4 className="text-2xl font-medium">No records to show</h4>
            <p className="text-sm">
              There is no fixed price or other payments data for the selected
              week
            </p>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
