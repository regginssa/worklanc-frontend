import { useMemo, useState } from "react";
import Link from "next/link";
import { SERVICE_FEE_PERCENT } from "@/utils/rate";
import { createEmptyMilestone, Milestone } from "@/types/milestone";
import AddMilestoneGroup from "./AddMilestoneGroup";

export default function NewContractMilestoneForm() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    createEmptyMilestone(),
  ]);

  const handleMilestoneChange = (
    index: number,
    updates: Partial<Milestone>
  ) => {
    setMilestones((previousMilestones) =>
      previousMilestones.map((milestone, milestoneIndex) =>
        milestoneIndex === index ? { ...milestone, ...updates } : milestone
      )
    );
  };

  const handleAddMilestone = () => {
    setMilestones((previousMilestones) => [
      ...previousMilestones,
      createEmptyMilestone(),
    ]);
  };

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

      <AddMilestoneGroup
        milestones={milestones}
        onMilestoneChange={handleMilestoneChange}
        onAddMilestone={handleAddMilestone}
      />

      <div className="flex items-center justify-between text-slate-600 font-light text-base">
        <p className="">
          {SERVICE_FEE_PERCENT}% Worklanc service fee{" "}
          <Link href="#" className="cursor-pointer text-blue-600 underline">
            Learn more
          </Link>
        </p>

        <span>${serviceFee.toFixed(2)}</span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-base">You'll receive</p>

        <span className="text-2xl font-medium">
          ${(totalAmount - serviceFee).toFixed(2)}
        </span>
      </div>
    </form>
  );
}
