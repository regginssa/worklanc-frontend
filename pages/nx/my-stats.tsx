import { Button, CircleProgress } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";

export default function MyStats() {
  return (
    <FreelancerLayout
      seo={{
        title: "My stats - Worklanc",
        description: "Your stats and analytics",
        url: "/nx/my-stats",
      }}
    >
      <div className="">
        <h1 className="text-4xl font-medium">My stats</h1>
        <p className="text-sm mt-2">
          View proposal history, earnings, profile analytics, and your Job
          Success Score.
        </p>
        <p className="text-xs text-slate-600 mt-1">
          Stats are not updated in real-time and may take up to 24 hours to
          reflect recent activity.
        </p>
      </div>

      <div className="flex items-center gap-8">
        <div className="flex-1 space-y-8">
          <div className="border border-slate-300 p-8 rounded-3xl">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-medium">12-month earnings</h2>
                <Link
                  href="#"
                  className="text-sm underline cursor-pointer mt-4 block"
                >
                  Transaction history
                </Link>
              </div>

              <span className="text-2xl font-medium">$120,000.00</span>
            </div>
          </div>

          <div className="border border-slate-300 p-8 rounded-3xl flex items-center gap-8 justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-medium">Job Success Score</h2>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMark className="w-6 h-6" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm p-2">
                      Your Job Success Score is based on several factors,
                      including clients’ overall satisfaction with your work.
                      <br />
                      <br />
                      We calculate your score daily based on 6-, 12-, and
                      24-month timeframes. Your profile will display the highest
                      score of these timeframes.A high score can help boost your
                      visibility and win more clients.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <p className="text-sm text-slate-600">
                Leverage Job Success insights to help you learn how to earn or
                regain a score.
              </p>

              <Button
                type="outline"
                label="View insights"
                size="medium"
                classname="py-1.5! px-5! rounded-full! text-sm! font-medium!"
              />
            </div>

            <div className="flex flex-col items-center justify-center gap-6">
              <CircleProgress value={0} size={130} strokeWidth={8} />
              <div className="flex items-center gap-2 text-sm">
                <span>No score</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleQuestionMark className="w-5 h-5" />
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="text-sm p-2">
                      You need more work to establish a Job Success Score or
                      your number of eligible jobs has dropped below 2.{" "}
                      <Link href="#" className="underline cursor-pointer">
                        See how score ranges are defined.
                      </Link>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-8"></div>
      </div>
    </FreelancerLayout>
  );
}
