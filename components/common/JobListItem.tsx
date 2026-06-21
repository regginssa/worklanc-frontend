import CollapsableText from "./CollapsableText";
import { SkillsGroup } from "../molecules";
import { Icon } from "@iconify/react";
import { formatEarnedAmount } from "@/utils/math";
import type { BrowseJobListItem } from "@/types/job-browse";
import {
  formatClientLocationLine,
  formatListBudgetLine,
  formatLocationRestriction,
  formatPostedAgo,
  formatProposalCount,
  getJobFeedStatusLabel,
  getJobSkills,
} from "@/utils/jobBrowseDisplay";

export default function JobListItem({
  job,
  onClock,
}: {
  job: BrowseJobListItem;
  onClock: () => void;
}) {
  const locationRestriction = formatLocationRestriction(job);

  return (
    <li
      className="space-y-4 border-b border-slate-300 cursor-pointer hover:bg-slate-100 p-4 transition-colors duration-200 group"
      onClick={onClock}
    >
      <div className="flex items-center gap-2 text-xs">
        <span>{formatPostedAgo(job.publishedAt)}</span>
        <span>•</span>
        <span>Proposals: {formatProposalCount(job.proposalCount)}</span>
      </div>

      <h3 className="text-xl cursor-pointer hover:text-blue-600 hover:underline group-hover:text-blue-600">
        {job.title}
      </h3>

      <p className="text-xs text-slate-600">{formatListBudgetLine(job)}</p>

      {locationRestriction && (
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Icon icon="mdi:map-marker-outline" className="size-5" />
          <span>{locationRestriction}</span>
        </div>
      )}

      {job.description && (
        <CollapsableText
          text={job.description}
          maxLength={400}
          textClassName="text-black"
        />
      )}

      <SkillsGroup skills={getJobSkills(job)} />

      <ul className="flex items-center gap-10 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <Icon
            icon="mdi:timer-check-outline"
            className="size-5 text-blue-600"
          />
          <span>{getJobFeedStatusLabel()}</span>
        </li>

        {job.client.paymentVerified && (
          <li className="flex items-center gap-2">
            <Icon
              icon="solar:verified-check-bold"
              className="size-5 text-blue-600"
            />
            <span>Payment verified</span>
          </li>
        )}

        {job.client.ratingAverage != null && (
          <li className="flex items-center gap-2">
            <Icon icon="mynaui:star-solid" className="size-5 text-[#ff5900]" />
            <span>{job.client.ratingAverage}</span>
          </li>
        )}

        {job.client.totalSpent > 0 && (
          <li className="flex items-center gap-1">
            <span className="font-medium">
              ${formatEarnedAmount(job.client.totalSpent)}
            </span>
            <span>spent</span>
          </li>
        )}

        <li className="flex items-center gap-2">
          <Icon icon="mdi:map-marker-outline" className="size-5" />
          <span>{formatClientLocationLine(job.client)}</span>
        </li>
      </ul>
    </li>
  );
}
