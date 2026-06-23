import { useMemo } from "react";
import Link from "next/link";
import { SERVICE_FEE_PERCENT } from "@/utils/rate";
import { Milestone } from "@/types/milestone";
import AddMilestoneGroup from "./AddMilestoneGroup";
import { Tag } from "lucide-react";

export type NewContractMilestoneFormProps = {
  milestones: Milestone[];
  onMilestoneChange: (index: number, updates: Partial<Milestone>) => void;
  onAddMilestone: () => void;
};

export default function NewContractMilestoneForm({
  milestones,
  onMilestoneChange,
  onAddMilestone,
}: NewContractMilestoneFormProps) {
  const totalAmount = useMemo(
    () =>
      milestones.reduce(
        (sum, milestone) => sum + (Number(milestone.amount) || 0),
        0
      ),
    [milestones]
  );

  const serviceFee = totalAmount * (SERVICE_FEE_PERCENT / 100);

  return (
    <form className="no-scrollbar overflow-y-auto space-y-8 px-8">
      <h1 className="text-2xl font-medium">Contract amount</h1>

      <div className="flex items-center justify-center">
        <span className="text-5xl font-medium">${totalAmount.toFixed(2)}</span>
      </div>

      <AddMilestoneGroup
        milestones={milestones}
        onMilestoneChange={onMilestoneChange}
        onAddMilestone={onAddMilestone}
      />

      <div className="flex items-center justify-between text-slate-600 font-light text-base">
        <p>
          {SERVICE_FEE_PERCENT}% Worklanc service fee{" "}
          <Link href="#" className="cursor-pointer text-blue-600 underline">
            Learn more
          </Link>
        </p>

        <span>${serviceFee.toFixed(2)}</span>
      </div>

      {totalAmount > 0 && (
        <div className="flex items-center gap-4 rounded-sm freelancer-plus-alert p-4 mt-6 text-white text-sm">
          <Tag className="size-5" />
          <p>
            Keep the entire ${Number(totalAmount).toFixed(2)}, no service fee,
            if you upgrade to{" "}
            <Link href="#" className="font-medium underline cursor-pointer">
              FL+
            </Link>
            .
          </p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-base">You'll receive</p>

        <span className="text-2xl font-medium">
          ${(totalAmount - serviceFee).toFixed(2)}
        </span>
      </div>
    </form>
  );
}
