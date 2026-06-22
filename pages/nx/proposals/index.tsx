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
import { InviteProposalListItemType } from "@/components/common";
import { InviteProposalListItemGroup } from "@/components/molecules";
import DiscussionIcon from "@/public/assets/svgs/icons/other/discussion.svg";
import Image from "next/image";
import Link from "next/link";

const tabs = [
  { label: "Active", value: "active" },
  { label: "Referral", value: "referral" },
  { label: "Achieved", value: "achieved" },
];

const mockInviteProposals: InviteProposalListItemType[] = [
  {
    receivedDate: new Date("2026-06-09"),
    project: { uid: "1", title: "Design a new logo for my startup" },
    client: { totalSpent: 1000, totalHires: 1, paymentVerified: true },
  },
  {
    receivedDate: new Date("2026-06-08"),
    project: { uid: "2", title: "Create a new website for my business" },
    client: { totalSpent: 2000, totalHires: 2, paymentVerified: false },
  },
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

        {selectedTabIndex === 0 && (
          <>
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
                  <h2 className="text-2xl font-medium">
                    Invites from clients (1)
                  </h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        Clients may contact you first about a job posting. If
                        you don't want these inquiries, you can set your profile
                        to private.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  <span className="py-1 px-2 rounded-sm bg-blue-100 text-blue-900 text-xs font-medium">
                    0 connects to apply to these jobs
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Icon
                      icon="mdi:lightning-bolt-outline"
                      className="size-4"
                    />
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

              <InviteProposalListItemGroup items={mockInviteProposals} />
            </div>

            <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-medium">Active proposals (1)</h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        These are proposals that you are discussing with a
                        client.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <InviteProposalListItemGroup items={mockInviteProposals} />
            </div>

            <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-medium">
                    Submitted proposals (1)
                  </h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        These are proposals you sent which have not yet received
                        a reply.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <InviteProposalListItemGroup items={mockInviteProposals} />
            </div>
          </>
        )}

        {selectedTabIndex === 1 && (
          <>
            <div className="py-20 border border-slate-300 rounded-3xl flex flex-col items-center justify-center gap-10">
              <Image
                src={DiscussionIcon}
                alt="Discussion"
                className="w-[300px] h-[268px]"
              />
              <div className="space-y-4">
                <h2 className="text-2xl font-medium text-center">
                  You haven’t referred anyone yet
                </h2>

                <div className="flex flex-col items-center justify-center gap-1">
                  <p className="text-sm text-center">
                    When declining an invitation, you can make a referral to
                    help other freelancers succeed and help clients fill their
                    job
                  </p>
                  <Link
                    href="#"
                    className="text-sm underline cursor-pointer hover:text-blue-600"
                  >
                    Learn more about referring freelancers
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}

        {selectedTabIndex === 2 && (
          <>
            <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-medium">
                    Archived proposals (0)
                  </h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        This screen displays all of your archived proposals. It
                        includes the date communication began with the client
                        and the reason the proposal was archived.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div className="p-8 border border-slate-300 rounded-3xl space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-medium">
                    Archived interviews (0)
                  </h2>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 cursor-pointer text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        These are interview invitations which have been
                        archived.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </FreelancerLayout>
  );
}
