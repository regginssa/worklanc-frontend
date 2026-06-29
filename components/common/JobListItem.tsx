import CollapsableText from "./CollapsableText";
import { SkillsGroup } from "../molecules";
import { Icon } from "@iconify/react";
import { formatEarnedAmount } from "@/utils/math";
import type { BrowseJobListItem } from "@/types/job-browse";
import {
  formatClientLocationLine,
  formatListBudgetLine,
  formatPostedAgo,
  formatProposalCount,
  getJobFeedStatusLabel,
  getJobSkills,
} from "@/utils/jobBrowseDisplay";
import { IconButton } from "../atoms";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded bg-slate-200 animate-pulse ${
        className ?? ""
      }`}
    />
  );
}

function JobListItemSkeleton() {
  return (
    <li className="space-y-4 border-b border-slate-300 p-4">
      <div className="flex items-center gap-2 text-xs">
        <SkeletonBar className="h-3 w-20" />
        <SkeletonBar className="h-3 w-28" />
      </div>

      <SkeletonBar className="h-6 w-3/4" />

      <SkeletonBar className="h-3 w-40" />

      <div className="flex items-center gap-2">
        <Icon icon="mdi:map-marker-outline" className="size-5 text-slate-300" />
        <SkeletonBar className="h-4 w-48" />
      </div>

      <div className="space-y-2">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-2/3" />
      </div>

      <ul className="flex items-center flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index}>
            <SkeletonBar className="h-6 w-20 rounded-md" />
          </li>
        ))}
      </ul>

      <ul className="flex items-center gap-10 text-sm">
        <li className="flex items-center gap-2">
          <Icon
            icon="mdi:timer-check-outline"
            className="size-5 text-slate-300"
          />
          <SkeletonBar className="h-4 w-24" />
        </li>

        <li className="flex items-center gap-2">
          <Icon
            icon="solar:verified-check-bold"
            className="size-5 text-slate-300"
          />
          <SkeletonBar className="h-4 w-28" />
        </li>

        <li className="flex items-center gap-2">
          <Icon icon="mynaui:star-solid" className="size-5 text-slate-300" />
          <SkeletonBar className="h-4 w-8" />
        </li>

        <li className="flex items-center gap-1">
          <SkeletonBar className="h-4 w-12" />
          <SkeletonBar className="h-4 w-10" />
        </li>

        <li className="flex items-center gap-2">
          <Icon
            icon="mdi:map-marker-outline"
            className="size-5 text-slate-300"
          />
          <SkeletonBar className="h-4 w-32" />
        </li>
      </ul>
    </li>
  );
}

type JobListItemProps =
  | {
      loading: true;
      job?: never;
      onClock?: () => void;
    }
  | {
      loading?: false;
      job: BrowseJobListItem;
      onClock: () => void;
      onMarkRead?: () => void;
    };

export default function JobListItem(props: JobListItemProps) {
  if (props.loading) {
    return <JobListItemSkeleton />;
  }

  const { job, onClock, onMarkRead } = props;

  return (
    <li
      className={`space-y-4 border-b border-slate-300 cursor-pointer p-4 transition-colors duration-200 group ${
        job.isRead ? "bg-slate-100 hover:bg-slate-100" : "hover:bg-slate-100"
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="space-y-4 flex-1">
          <div className="flex items-center gap-2 text-xs">
            <span>{formatPostedAgo(job.publishedAt)}</span>
            <span>•</span>
            <span>Proposals: {formatProposalCount(job.proposalCount)}</span>
          </div>

          <h3
            className="text-xl cursor-pointer hover:text-blue-600 hover:underline group-hover:text-blue-600"
            onClick={onClock}
          >
            {job.title}
          </h3>
          <p className="text-xs text-slate-600">{formatListBudgetLine(job)}</p>
        </div>

        <div className="flex items-center gap-2">
          <IconButton
            variant="secondary"
            icon="mdi:dislike-outline"
            onClick={() => {}}
          />
          <IconButton
            variant="secondary"
            icon="mdi:heart-outline"
            onClick={() => {}}
          />
        </div>
      </div>

      {job.description && (
        <CollapsableText
          text={job.description}
          maxLength={400}
          textClassName="text-black"
          onViewMore={onMarkRead}
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

        <li className="flex items-center gap-1">
          <span className="font-medium">
            ${formatEarnedAmount(job.client.totalSpent)}
          </span>
          <span>spent</span>
        </li>

        <li className="flex items-center gap-2">
          <Icon icon="mdi:map-marker-outline" className="size-5" />
          <span>{formatClientLocationLine(job.client)}</span>
        </li>
      </ul>
    </li>
  );
}
