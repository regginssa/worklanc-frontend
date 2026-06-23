import Image from "next/image";
import { CollapsableText } from "../common";
import UserAvatar from "@/public/assets/webps/avatars/man2.webp";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CheckIcon, CircleQuestionMark } from "lucide-react";
import { formatDate } from "date-fns";
import { Milestone } from "@/types/milestone";
import { JobBudgetType } from "@/types/job";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "../reui/stepper";

export default function ReviewNewContract({
  name,
  description,
  hourlyRate,
  weeklyLimit,
  endDate,
  clientEmail,
  milestones,
  budgetType,
  totalAmount,
}: {
  name: string;
  description: string;
  hourlyRate: number;
  weeklyLimit: number;
  endDate?: Date;
  clientEmail: string;
  milestones: Milestone[];
  budgetType: JobBudgetType;
  totalAmount: number;
}) {
  const lastMilestoneDueDate =
    milestones.length > 0 ? milestones[milestones.length - 1].dueDate : null;
  const endDateValue =
    budgetType === "hourly"
      ? endDate
        ? formatDate(endDate, "MMM d, yyyy")
        : "Undefined"
      : lastMilestoneDueDate
      ? formatDate(lastMilestoneDueDate, "MMM d, yyyy")
      : "Undefined";

  return (
    <div className="no-scrollbar overflow-y-auto space-y-8 px-8">
      <h1 className="text-2xl font-medium">Review contract</h1>

      <div className="space-y-1">
        <h2 className="text-3xl font-medium">{name}</h2>
        <CollapsableText
          text={description}
          maxLength={400}
          className="text-base! text-slate-600!"
        />
      </div>

      <div className="space-y-4 pb-8 border-b border-slate-300">
        <p className="text-xl font-medium">
          {budgetType === "hourly"
            ? `$${Number(hourlyRate).toFixed(2)}/hr`
            : `$${totalAmount.toFixed(2)}`}
        </p>

        <div className="flex items-center gap-4">
          <Image
            src={UserAvatar}
            alt="User"
            className="size-12 rounded-full object-cover"
          />

          <div className="space-y-1">
            <h3 className="text-sm font-medium">Marco Newer</h3>
            <p className="text-base text-slate-600">Freelancer</p>
          </div>
        </div>
      </div>

      {budgetType === "fixed" && milestones.length > 0 && (
        <div className="space-y-4 pb-8 border-b border-slate-300">
          <p className="text-xl font-medium">Milestones</p>

          <Stepper
            defaultValue={milestones.length}
            orientation="vertical"
            indicators={{
              completed: <CheckIcon className="size-3.5" />,
            }}
          >
            <StepperNav>
              {milestones.map((milestone, index) => (
                <StepperItem
                  key={index}
                  step={index + 1}
                  disabled
                  className="relative items-start not-last:flex-1"
                >
                  <StepperTrigger className="cursor-default items-start gap-2.5 pb-12 last:pb-0 disabled:opacity-100">
                    <StepperIndicator className="rounded-full bg-zinc-900 text-white data-[state=active]:bg-zinc-900 data-[state=active]:text-white data-[state=completed]:bg-zinc-900 data-[state=completed]:text-white data-[state=inactive]:bg-zinc-900 data-[state=inactive]:text-white">
                      <CheckIcon className="size-3.5" />
                    </StepperIndicator>
                    <div className="mt-0.5 text-left">
                      <StepperTitle className="text-lg font-light">
                        {milestone.name}
                      </StepperTitle>
                      <StepperDescription className="text-base mt-1">
                        ${milestone.amount.toFixed(2)}
                      </StepperDescription>
                    </div>
                  </StepperTrigger>
                  {index < milestones.length - 1 && (
                    <StepperSeparator className="group-data-[state=completed]/step:bg-zinc-900 absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" />
                  )}
                </StepperItem>
              ))}
            </StepperNav>
          </Stepper>
        </div>
      )}

      {budgetType === "hourly" && (
        <div className="space-y-4 pb-8 border-b border-slate-300 text-base">
          <div className="mb-2 flex items-center gap-2">
            <span className="">Weekly limit</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
              </TooltipTrigger>

              <TooltipContent side="top">
                <p className="text-sm p-2">
                  If the freelancer goes over this weekly limit, their client
                  will need to manually approve the extra hours worked.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>

          <p className="text-slate-600">{weeklyLimit} hrs/week</p>
        </div>
      )}

      <div className="space-y-4 pb-8 border-b border-slate-300 text-base">
        <div className="mb-2 flex items-center gap-2">
          <span className="">End date</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
            </TooltipTrigger>

            <TooltipContent side="top">
              <p className="text-sm p-2">
                This is a suggested end date. We will email both parties when
                the end date is reached but the contract will not be officially
                ended until it is done by the client or freelancer.
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <p className="text-slate-600">{endDateValue}</p>
      </div>

      <div className="space-y-4 pb-8 border-b border-slate-300 text-base">
        <p className="">Send to</p>

        <p className="text-slate-600">{clientEmail}</p>
      </div>
    </div>
  );
}
