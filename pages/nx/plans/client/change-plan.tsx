import { Button } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function ChangePlan() {
  const router = useRouter();

  return (
    <ClientLayout
      seo={{
        title: "Membership plans - Worklanc",
        description: "Membership plans - Worklanc",
        url: "/nx/plans/client/change-plan",
      }}
    >
      <div className="">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer text-sm hover:underline font-medium flex items-center gap-2"
          onClick={() => router.back()}
        >
          <Icon icon="mdi:chevron-left" className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      </div>

      <h1 className="text-4xl font-semibold">Membership plans</h1>

      <div className="w-[80%] mx-auto grid grid-cols-2 gap-8">
        <div className="border border-slate-300 p-8 rounded-3xl space-y-8">
          <div>
            <h2 className="text-2xl font-medium">Basic</h2>
            <p className="text-sm font-light text-slate-600 mt-1">
              For starting out
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">5% Service fee</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <Icon icon="mdi:information-outline" className="size-5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm p-2">
                  5% Marketplace fee. Eligible ACH payments discounted to 3%. A
                  contract initiation fee is charged per contract.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="pb-6 border-b border-slate-300">
            <Button
              type="primary"
              label="Current plan"
              classname="py-2.5! w-full! font-medium! text-sm! rounded-full!"
              disabled
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium">Basic plan includes:</p>
            <ul className="space-y-2 text-sm text-slate-600 font-light list-disc list-inside">
              <li>Worklanc's global freelance marketplace</li>
              <li>Access to AI-powered features</li>
              <li>Collaboration and project tracking tools</li>
              <li>Standard reporting</li>
              <li>Pay as work is completed</li>
              <li>30 invites per job post</li>
            </ul>
          </div>
        </div>

        <div className="border-4 border-blue-300 p-8 rounded-3xl space-y-8 relative">
          <div className="absolute py-1.5 px-4 rounded-bl-2xl bg-blue-300 text-sm top-0 right-0 rounded-tr-2xl">
            <span className="uppercase font-medium">Popular</span>
          </div>
          <div>
            <h2 className="text-2xl font-medium">Business Plus</h2>
            <p className="text-sm font-light text-slate-600 mt-1">
              For growing
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">10% Service fee</span>

            <Tooltip>
              <TooltipTrigger asChild>
                <Icon icon="mdi:information-outline" className="size-5" />
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p className="text-sm p-2">
                  10% Business Plus fee. Eligible ACH payments discounted to 8%.
                  No contract initiation fee, with the exception of fixed-price
                  contracts of $100 USD or less.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <div className="pb-6 border-b border-slate-300">
            <Button
              type="primary"
              label="Select plan"
              classname="py-2.5! w-full! font-medium! text-sm! rounded-full!"
              disabled
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium">Everything in Basic, plus:</p>
            <ul className="space-y-2 text-sm text-slate-600 font-light list-disc list-inside">
              <li>Instant access to pre-vetted top 1% of talent</li>
              <li>Uma Recruiter</li>
              <li>Teams controls</li>
              <li>Advanced reporting</li>
              <li>Priority 24/7 support</li>
              <li>
                <span className="inline-flex items-center gap-2 align-middle">
                  <span>Flexible Net 30 terms</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon icon="mdi:information-outline" className="size-5" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-sm p-2">
                        Monthly invoicing with 30-day payment terms for U.S.
                        based companies only, will require an application and
                        approval.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </span>
              </li>
              <li>60 invites per job post</li>
              <li>15 direct messages per day</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-[80%] mx-auto">
        <div className="flex items-center justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer text-sm font-light underline flex items-center gap-2"
          >
            <span>Compare features across plans</span>
            <Icon icon="mdi:chevron-down" className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </ClientLayout>
  );
}
