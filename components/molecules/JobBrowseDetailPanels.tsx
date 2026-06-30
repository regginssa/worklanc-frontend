import { Icon } from "@iconify/react";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { Button, Input } from "@/components/atoms";
import { JobInProgressItemGroup, SkillsGroup } from "@/components/molecules";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { BrowseJobDetail } from "@/types/job-browse";
import {
  formatClientHireStats,
  formatClientHiresStats,
  formatClientLocalTime,
  formatClientLocationLine,
  formatClientSpendStats,
  formatExperienceSubtitle,
  formatHourlyRateDetail,
  formatJobLocationLabel,
  formatMemberSince,
  formatPostedAgo,
  formatPreferredLocationQualifications,
  formatProjectType,
  formatProposalCount,
  getJobAbsoluteUrl,
  getJobSkills,
} from "@/utils/jobBrowseDisplay";
import type {
  ClientReviewListItemType,
  JobInProgressItemType,
} from "@/components/common";
import ClientReviewListItemGroup from "./ClientReviewListItemGroup";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/hooks";
import { selectConnectsBalance } from "@/store/slices/userSlice";

const mapJobsInProgress = (
  items: BrowseJobDetail["jobsInProgress"]
): JobInProgressItemType[] =>
  items.map((item) => ({
    ...item,
    fromDate: new Date(item.fromDate),
    toDate: item.toDate ? new Date(item.toDate) : undefined,
  }));

const mapClientReviews = (
  items: BrowseJobDetail["clientReviews"]
): ClientReviewListItemType[] =>
  items.map((item) => ({
    ...item,
    fromDate: new Date(item.fromDate),
    toDate: item.toDate ? new Date(item.toDate) : undefined,
  }));

function SkeletonBar({ className }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded bg-slate-200 animate-pulse ${
        className ?? ""
      }`}
    />
  );
}

function JobBrowseDetailPanelsSkeleton({
  variant = "drawer",
}: {
  variant?: "drawer" | "page";
}) {
  const mainColumnClass = variant === "page" ? "w-3/4" : "w-2/3";

  return (
    <div className="flex items-start">
      <div className={`${mainColumnClass} border-r border-slate-300`}>
        <div className="p-8 border-b border-slate-300 space-y-8">
          <SkeletonBar className="h-6 w-2/3" />

          <div className="flex items-center gap-8">
            <SkeletonBar className="h-4 w-32" />
            <SkeletonBar className="h-4 w-28" />
          </div>
        </div>

        <div className="p-8 border-b border-slate-300 space-y-3">
          <SkeletonBar className="h-4 w-20" />
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-5/6" />
          <SkeletonBar className="h-4 w-2/3" />
        </div>

        <div className="p-8 border-b border-slate-300 grid grid-cols-3 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <SkeletonBar className="h-4 w-28" />
              <SkeletonBar className="h-3 w-20" />
            </div>
          ))}
        </div>

        <div className="p-8 border-b border-slate-300">
          <SkeletonBar className="h-4 w-48" />
        </div>

        <div className="p-8 border-b border-slate-300 space-y-6">
          <SkeletonBar className="h-6 w-56" />
          <div className="space-y-4">
            <SkeletonBar className="h-4 w-32" />
            <ul className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <SkeletonBar className="h-6 w-20 rounded-md" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <SkeletonBar className="h-6 w-52" />
              <SkeletonBar className="h-4 w-40" />
            </div>
            <div className="space-y-2">
              <SkeletonBar className="h-6 w-44" />
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletonBar key={index} className="h-4 w-36" />
              ))}
            </div>
          </div>
          <SkeletonBar className="h-6 w-80" />
        </div>
      </div>

      <div className="flex-1">
        <div className="p-8 space-y-8">
          <SkeletonBar className="h-20 w-full rounded-lg" />

          <div className="space-y-4">
            <SkeletonBar className="h-10 w-full rounded-full" />
            <SkeletonBar className="h-10 w-full rounded-full" />
            <SkeletonBar className="h-5 w-36" />
          </div>

          <div className="space-y-2">
            <SkeletonBar className="h-4 w-64" />
            <SkeletonBar className="h-4 w-40" />
          </div>

          <div className="space-y-4">
            <SkeletonBar className="h-6 w-40" />
            <SkeletonBar className="h-4 w-44" />
            <SkeletonBar className="h-4 w-36" />
            <SkeletonBar className="h-4 w-52" />
            <SkeletonBar className="h-4 w-48" />
            <SkeletonBar className="h-4 w-40" />
            <SkeletonBar className="h-4 w-56" />
            <SkeletonBar className="h-10 w-full rounded-lg" />
            <SkeletonBar className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

type JobBrowseDetailPanelsProps =
  | {
      loading: true;
      job?: never;
      variant?: "drawer" | "page";
    }
  | {
      loading?: false;
      job: BrowseJobDetail;
      variant?: "drawer" | "page";
    };

export default function JobBrowseDetailPanels(
  props: JobBrowseDetailPanelsProps
) {
  const balance = useAppSelector(selectConnectsBalance);
  if (props.loading) {
    return <JobBrowseDetailPanelsSkeleton variant={props.variant} />;
  }

  const { job, variant = "drawer" } = props;
  const [jobsInProgressOpen, setJobsInProgressOpen] = useState(true);
  const router = useRouter();
  const skills = getJobSkills(job);
  const clientLocalTime = formatClientLocalTime(job.client);
  const historyCount = job.jobsInProgress.length + job.clientReviews.length;
  const mainColumnClass = variant === "page" ? "w-3/4" : "w-2/3";
  const jobLink = getJobAbsoluteUrl(job.uid);

  const handleCopyJobLink = async () => {
    try {
      await navigator.clipboard.writeText(jobLink);
      toast.success("Copied", { position: "top-center" });
    } catch {
      toast.error("Could not copy link", { position: "top-center" });
    }
  };

  return (
    <>
      <div className="flex items-start">
        <div className={`${mainColumnClass} border-r border-slate-300`}>
          <div className="p-8 border-b border-slate-300 space-y-8">
            <h1 className="text-xl font-medium">{job.title}</h1>

            <div className="flex items-center gap-8 text-sm text-slate-600">
              <span>{formatPostedAgo(job.publishedAt)}</span>
              <div className="flex items-center gap-2">
                <Icon icon="mdi:map-marker-outline" className="size-5" />
                <span>{formatJobLocationLabel(job)}</span>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-slate-300">
            <p className="text-sm whitespace-pre-wrap">
              Summary
              <br />
              {job.description}
            </p>
          </div>

          <div className="p-8 border-b border-slate-300 grid grid-cols-3 gap-8">
            <div className="flex items-start gap-2">
              <Icon icon="mdi:clock-outline" className="size-5" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium">
                  {job.hoursPerWeekLabel || "Not specified"}
                </h3>
                <p className="text-xs text-slate-800">
                  {job.budgetType === "hourly" ? "Hourly" : "Fixed price"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Icon icon="mdi:calendar-outline" className="size-5" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium">
                  {job.durationLabel || "Not specified"}
                </h3>
                <p className="text-xs text-slate-800">Duration</p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Icon icon="stash:user-cog-light" className="size-5" />
              <div className="space-y-1 flex-1">
                <h3 className="text-sm font-medium">
                  {job.experienceLabel || "Not specified"}
                </h3>
                <p className="text-xs text-slate-800">
                  {formatExperienceSubtitle(job.experienceLevel)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Icon icon="mdi:timer-check-outline" className="size-5" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium">
                  {formatHourlyRateDetail(job)}
                </h3>
                <p className="text-xs text-slate-800">
                  {job.budgetType === "hourly" ? "Hourly" : "Fixed-Price"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 border-b border-slate-300">
            <p className="text-sm">
              <strong className="font-medium">Project Type:</strong>{" "}
              {formatProjectType(job)}
            </p>
          </div>

          <div className="p-8 border-b border-slate-300 space-y-6">
            <h3 className="text-xl font-medium">Skills and Expertise</h3>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Mandatory skills</h4>
              <SkillsGroup skills={skills} />
            </div>

            {skills.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Nice-to-have skills</h4>
                <SkillsGroup skills={skills} />
              </div>
            )}
          </div>

          <div className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium">
                  Preferred qualifications
                </h3>
                <ul className="space-y-2 text-sm mt-2">
                  <li className="flex items-start gap-1">
                    <span className="font-medium">Location:</span>
                    <span>{formatPreferredLocationQualifications(job)}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-medium">Activity on this job</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-1">
                    <span>Proposals:</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-sm p-2">
                          This range includes relevant proposals, but does not
                          include proposals that are withdrawn, declined, or
                          archived.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <span>{formatProposalCount(job.proposalCount)}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Last viewed by client:</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p className="text-sm p-2">
                          This is when the client last reviewed or interacted
                          with the applicants for this job.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                    <span>{formatProposalCount(job.proposalCount)}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Hires:</span>
                    <span>{job.interviewingCount}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Interviewing:</span>
                    <span>{job.interviewingCount}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Invites sent:</span>
                    <span>{job.invitesSent}</span>
                  </li>
                  <li className="flex items-center gap-1">
                    <span>Unanswered invites:</span>
                    <span>{job.unansweredInvites}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h4 className="text-xl font-medium">
                Upgrade your membership to see the bid range
              </h4>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-md">
                  <div className="space-y-4 p-4">
                    <h4 className="text-xl font-medium text-center">
                      Upgrade to a Plus plan for more Connects and other perks.
                    </h4>
                    <div className="flex items-center justify-center">
                      <Button
                        type="primary"
                        label="Upgrade Membership"
                        classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
                      />
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="p-8 space-y-8">
            {balance === 0 && (
              <div className="bg-slate-100 rounded-lg p-4 flex items-start gap-2">
                <Icon icon="grommet-icons:announce" className="size-6" />
                <div className="space-y-1 text-sm flex-1">
                  <p>
                    You'll need Connects to bid. They're like credits that show
                    clients you're serious.
                  </p>
                  <Link
                    href="#"
                    className="underline cursor-pointer hover:text-blue-600"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                type="primary"
                label={balance === 0 ? "Buy Connects to apply" : "Apply"}
                classname="py-2.5! w-full! rounded-full! font-medium! text-sm!"
                onClick={() =>
                  router.push(
                    balance === 0
                      ? "/nx/plans/connects/buy"
                      : `/jobs/${job.uid}/apply`
                  )
                }
              />
              <Button
                type="outline"
                label="Save job"
                size="medium"
                icon="mdi:heart-outline"
                classname="py-2.5! w-full! border! rounded-full! font-medium! text-sm!"
              />
              <button className="flex items-center gap-2 text-sm text-blue-600 py-2.5 w-full hover:underline font-medium cursor-pointer">
                <Icon icon="mdi:flag-variant-outline" className="size-5" />
                <span>Flag as inappropriate</span>
              </button>
            </div>

            <div className="space-y-2 text-sm text-slate-800">
              <div className="flex items-end gap-10">
                <span>Required Connects to submit a proposal:</span>
                <div className="flex items-center gap-1">
                  <span className="text-slate-900 font-medium">
                    {job.requiredConnects}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        This is the number of Connects required to submit a
                        proposal for this job.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <span>Available Connects:</span>
                <span className="text-slate-900 font-medium">{balance}</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-medium">About the client</h3>

              <ul className="space-y-1 text-xs text-slate-600">
                {job.client.paymentVerified && (
                  <li className="flex items-center gap-2">
                    <Icon
                      icon="solar:verified-check-bold"
                      className="text-blue-600 size-4"
                    />
                    <span className="text-xs text-slate-600 font-medium">
                      Payment method verified
                    </span>
                  </li>
                )}

                {job.client.ratingAverage != null && (
                  <>
                    <li className="text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Icon
                              key={index}
                              icon="mynaui:star-solid"
                              className="text-[#ff5900] size-4"
                            />
                          ))}
                        </div>
                        <span className="text-base font-medium">
                          {job.client.ratingAverage}
                        </span>
                      </div>
                      <p className="text-sm">
                        {job.client.ratingAverage} of {job.client.reviewCount}{" "}
                        reviews
                      </p>
                    </li>
                  </>
                )}
              </ul>

              <ul className="space-y-1 text-sm text-slate-600">
                <li className="space-y-1">
                  <p className="font-medium">
                    {formatClientLocationLine(job.client)}
                  </p>
                  <p>
                    {job.client.city ? job.client.city : ""} {clientLocalTime}
                  </p>
                </li>
              </ul>

              <ul className="space-y-1 text-sm text-slate-600">
                <li className="font-medium">
                  {job.client.jobsPosted} jobs posted
                </li>
                <li>{formatClientHireStats(job.client)}</li>
              </ul>

              <ul className="space-y-1 text-sm text-slate-600">
                <li className="font-medium">
                  {formatClientSpendStats(job.client)}
                </li>
                <li>{formatClientHiresStats(job.client)}</li>
              </ul>

              {job.client.avgHourlyRatePaid != null && (
                <ul className="space-y-1 text-sm text-slate-600">
                  <li className="font-medium">
                    ${job.client.avgHourlyRatePaid.toFixed(2)} /hr avg hourly
                    rate paid
                  </li>
                  <li>{job.client.totalHours} hours</li>
                </ul>
              )}

              {job.client.companySizeLabel && (
                <p className="text-sm text-slate-600">
                  {job.client.companySizeLabel}
                </p>
              )}

              <p className="text-xs text-slate-600">
                {formatMemberSince(job.client.memberSince)}
              </p>

              <div className="space-y-2">
                <Input
                  type="url"
                  name="jobLink"
                  label="Job link"
                  labelClassName="font-medium mb-2! block!"
                  disabled
                  value={jobLink}
                  onChange={() => {}}
                />
                <button
                  type="button"
                  className="text-sm text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={handleCopyJobLink}
                >
                  Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {historyCount > 0 && (
        <div className="p-8">
          <div className="border border-slate-300 rounded-3xl">
            <div className="p-8 border-b border-slate-300 space-y-6">
              <h3 className="text-xl font-medium">
                Client&apos;s recent history ({historyCount})
              </h3>

              {job.jobsInProgress.length > 0 && (
                <>
                  <button
                    type="button"
                    onClick={() => setJobsInProgressOpen((prev) => !prev)}
                    className="cursor-pointer w-full flex items-center justify-between text-sm"
                    aria-expanded={jobsInProgressOpen}
                  >
                    <span className="underline">Jobs in progress</span>
                    <motion.span
                      animate={{ rotate: jobsInProgressOpen ? 180 : 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Icon icon="mdi:chevron-down" className="size-6" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {jobsInProgressOpen && (
                      <motion.div
                        key="jobs-in-progress"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <JobInProgressItemGroup
                          items={mapJobsInProgress(job.jobsInProgress)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>

            {job.clientReviews.length > 0 && (
              <div className="p-8">
                <ClientReviewListItemGroup
                  items={mapClientReviews(job.clientReviews)}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
