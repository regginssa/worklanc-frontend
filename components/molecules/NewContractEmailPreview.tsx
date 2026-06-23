import { Milestone } from "@/types/milestone";
import { Button, WorklancLogo } from "../atoms";
import { formatDate } from "date-fns";
import { JobBudgetType } from "@/types/job";

export default function NewContractEmailPreview({
  name,
  amount,
  milestones,
  budgetType,
  weeklyLimit,
}: {
  name: string;
  amount: number;
  milestones: Milestone[];
  budgetType: JobBudgetType;
  weeklyLimit?: number;
}) {
  return (
    <div className="no-scrollbar overflow-y-auto space-y-8 px-8">
      <h1 className="text-2xl font-medium">Email preview</h1>

      <div className="w-full max-w-3xl mx-auto rounded-md overflow-hidden border border-slate-300 shadow-lg mt-10 relative">
        <div className="p-4 bg-blue-600">
          <WorklancLogo variant="dark" />
        </div>

        <div className="p-6 space-y-4">
          <p className="text-base">
            Hi Jhon,
            <br />
            <br />
            This is Marco Newer. I've proposed a contract for you on Worklanc,
            with the following information. As next steps, simply sign up to
            review and accept the proposal.
          </p>

          <div className="space-y-1 text-base font-semibold">
            <p>Proposal: {name}</p>
            <p>
              Total: ${amount.toFixed(2)}
              {budgetType === "hourly" && ` / hour`}
            </p>
            {budgetType === "hourly" && weeklyLimit && (
              <p>Weekly limit: {weeklyLimit} hours</p>
            )}
          </div>

          {budgetType === "fixed" && milestones.length > 0 && (
            <ul className="text-sm">
              <li className="border-t border-slate-300 py-2 flex items-center font-medium">
                <p className="flex-1">Milestone</p>
                <p className="flex-1">Delivery date</p>
                <p className="flex-1">Amount</p>
              </li>

              {milestones.map((milestone, index) => (
                <li
                  className={`border-t border-slate-300 ${
                    index === milestones.length - 1 && "border-b"
                  } py-2 flex items-center font-medium`}
                >
                  <p className="flex-1 line-clamp-1">{milestone.name}</p>
                  <p className="flex-1 line-clamp-1">
                    {formatDate(milestone.dueDate, "MMM d, yyyy")}
                  </p>
                  <p className="flex-1 line-clamp-1">
                    ${milestone.amount.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <Button
            type="primary"
            label="Sign up to view"
            classname="px-8! py-2.5! text-sm! font-medium! rounded-md!"
          />
        </div>

        <div className="absolute inset-0 cursor-pointer z-10"></div>
      </div>
    </div>
  );
}
