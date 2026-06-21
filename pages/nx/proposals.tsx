import { IconButton, TabBar } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { Icon } from "@iconify/react";

const tabs = [
  { label: "Active", value: "active" },
  { label: "Referral", value: "referral" },
  { label: "Achieved", value: "achieved" },
];

export default function Proposals() {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

  return (
    <FreelancerLayout
      seo={{
        title: "Proposals",
        description: "Proposals",
        url: "/nx/proposals",
      }}
    >
      <h1 className="text-4xl font-semibold">My proposals</h1>

      <div className="space-y-4">
        <TabBar
          tabs={tabs}
          selectedTabIndex={selectedTabIndex}
          onTab={(idx) => setSelectedTabIndex(idx)}
        />

        <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-medium">Offers (0)</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm p-2">
                  These are offers sent from clients.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>

        <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-medium">Invites from clients (1)</h2>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Clients may contact you first about a job posting. If you
                    don't want these inquiries, you can set your profile to
                    private.
                  </p>
                </TooltipContent>
              </Tooltip>
              <span className="py-1 px-2 rounded-sm bg-blue-100 text-blue-900 text-xs font-medium">
                0 connects to apply to these jobs
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-slate-600">
                <Icon icon="mdi:lightning-bolt-outline" className="size-4" />
                <span className="text-sm">Available now</span>
              </div>

              <span className="text-sm font-light">Off</span>
              <IconButton
                variant="outline"
                className="p-1! border!"
                icon="mdi:pencil-outline"
                onClick={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}
