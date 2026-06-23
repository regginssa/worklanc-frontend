import { DatePicker, Input } from "../atoms";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { Milestone } from "@/types/milestone";

export default function AddMilestoneGroup({
  milestones,
  onMilestoneChange,
  onAddMilestone,
}: {
  milestones: Milestone[];
  onMilestoneChange: (index: number, updates: Partial<Milestone>) => void;
  onAddMilestone: () => void;
}) {
  return (
    <ul className="space-y-8">
      {milestones.map((milestone, index) => (
        <li key={index} className="space-y-8">
          <Input
            type="text"
            name={`milestone-name-${index}`}
            label={`Milestone ${index + 1}`}
            placeholder="Title"
            labelClassName="block mb-2! text-sm! font-medium!"
            value={milestone.name}
            onChange={(event) =>
              onMilestoneChange(index, { name: event.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-8">
            <Input
              type="number"
              name={`milestone-amount-${index}`}
              label="Amount"
              placeholder="0"
              labelClassName="block mb-2! text-sm! font-medium!"
              value={milestone.amount}
              onChange={(event) =>
                onMilestoneChange(index, {
                  amount: Number(event.target.value) || 0,
                })
              }
            />
            <DatePicker
              name={`milestone-date-${index}`}
              label="Due date"
              placeholder="Due date"
              labelClassName="block mb-2! text-sm! font-medium!"
              value={milestone.dueDate}
              onChange={(date) => onMilestoneChange(index, { dueDate: date })}
            />
          </div>
        </li>
      ))}

      <motion.button
        type="button"
        whileTap={{ scale: 0.95 }}
        onClick={onAddMilestone}
        className="flex items-center gap-2 text-sm font-medium text-blue-600 cursor-pointer"
      >
        <Plus className="size-4" />
        Add milestone
      </motion.button>
    </ul>
  );
}
