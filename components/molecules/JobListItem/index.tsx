import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { Button } from "@/components/atoms";

interface JobListItemProps {
  title?: string;
  statusLabel?: string;
  description?: string;
  actionLabel?: string;
}

export default function JobListItem({
  title = "Fintech SaaS Platform",
  statusLabel = "Draft job post",
  description = "Add details to your draft",
  actionLabel = "Fill in draft",
}: JobListItemProps) {
  return (
    <li className="border w-full border-slate-300 rounded-3xl p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <div className="size-12 rounded-full bg-slate-300 flex items-center justify-center">
            <Icon icon="fe:list-task" className="text-white size-6" />
          </div>
          <h4 className="font-medium">{title}</h4>
          <div>
            <span className="py-1 px-2 text-xs font-light bg-blue-200 rounded-sm text-blue-800">
              {statusLabel}
            </span>
          </div>

          <p className="text-sm">{description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            type="outline"
            label={actionLabel}
            size="medium"
            classname="py-2.5! px-5! border! font-medium! text-sm! rounded-full!"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-slate-900 cursor-pointer p-2 border border-slate-300 rounded-full hover:bg-slate-200 transition-colors duration-200"
          >
            <Icon icon="tabler:dots" className="size-6" />
          </motion.button>
        </div>
      </div>
    </li>
  );
}
