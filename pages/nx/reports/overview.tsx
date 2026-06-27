import { FreelancerLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";
import { useRouter } from "next/router";

const tabs = [
  {
    label: "Work in progress",
    tooltip:
      "This includes hours logged for the current work week. They will be automatically sent to the client for review Sunday night UTC (the close of the work week). This also includes any fixed-price milestones that have been assigned to you. Unlike hourly timesheets, work on fixed-price milestones must be submitted when ready.",
    amount: 0,
    value: "in-progress",
  },
  {
    label: "In review",
    tooltip:
      "This represents hours logged last week that are now under review by your clients. Clients have 5 days to review your work diary. This also includes any fixed-price milestones you've submitted for review. Clients have 14 days to accept (or ask for changes on) submitted milestones.",
    amount: 0,
    value: "in-review",
  },
  {
    label: "Pending",
    tooltip:
      "This represents the standard security hold period in which funds cannot be withdrawn. Hourly payments are in the security period from the time the client review ends on Friday to when the funds are released on Wednesday. Payments for fixed-price milestones (and bonuses) have a 5-day security period from the time payment is made to funds availability.",
    amount: 0,
    value: "pending",
  },
  {
    label: "Available",
    tooltip:
      "These are funds available to withdraw. If you've set up automatic payments, this will usually show a zero balance, with the last payment indicated below. Click this tab to see a history of payments already sent.",
    amount: 0,
    value: "available",
  },
];

export default function Overview() {
  const router = useRouter();
  const activeTab =
    typeof router.query.tab === "string" ? router.query.tab : tabs[0].value;

  const handleTabClick = (value: string) => {
    router.replace(
      { pathname: router.pathname, query: { ...router.query, tab: value } },
      undefined,
      { shallow: true },
    );
  };

  return (
    <FreelancerLayout
      seo={{
        title: "Overview - Worklanc",
        description: "Overview of your reports",
        url: "/nx/reports/overview",
        keywords: "reports, overview",
      }}
    >
      <h1 className="text-4xl font-semibold">Overview</h1>

      <ul className="grid grid-cols-4">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className="space-y-4 group cursor-pointer"
            onClick={() => handleTabClick(tab.value)}
          >
            <div
              className={`flex items-center gap-2 group-hover:text-black ${
                activeTab === tab.value ? "text-black" : "text-slate-600"
              }`}
            >
              <span className="text-sm">{tab.label}</span>
              <Tooltip>
                <TooltipTrigger>
                  <CircleQuestionMark className="size-4" />
                </TooltipTrigger>

                <TooltipContent side="bottom">
                  <p className="text-sm p-2">{tab.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </div>

            <p className="text-2xl font-medium">${tab.amount.toFixed(2)}</p>
          </li>
        ))}
      </ul>

      <div className="w-full h-[1px] bg-slate-300"></div>

      <div className="py-10 flex flex-col items-center justify-center">
        <p className="text-2xl font-medium text-slate-600">
          You have no work in progress
        </p>
      </div>

      <p className="text-xs text-slate-600">
        Note: this report is updated every hour.
      </p>
    </FreelancerLayout>
  );
}
