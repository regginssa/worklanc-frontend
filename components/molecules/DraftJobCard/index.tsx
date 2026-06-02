import { Icon } from "@iconify/react";
import { Button } from "@/components/atoms";

interface DraftJobCardProps {
  title?: string;
  statusLabel?: string;
  description?: string;
  actionLabel?: string;
}

export default function DraftJobCard({
  title = "Fintech SaaS Platform",
  statusLabel = "Draft job post",
  description = "Add details to your draft",
  actionLabel = "Fill in draft",
}: DraftJobCardProps) {
  return (
    <div className="border border-slate-300 rounded-3xl p-6 h-full flex flex-col justify-between">
      <div className="w-full space-y-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-full bg-slate-300 flex items-center justify-center">
              <Icon icon="fe:list-task" className="text-white size-6" />
            </div>
            <h4 className="font-medium">{title}</h4>
          </div>
          <button className="text-slate-900 cursor-pointer p-1 rounded-full hover:bg-slate-200 transition-all duration-200">
            <Icon icon="tabler:dots" className="size-6" />
          </button>
        </div>

        <div>
          <span className="py-1 px-2 text-xs font-light bg-blue-200 rounded-sm text-blue-800">
            {statusLabel}
          </span>
        </div>

        <p className="text-xl font-medium">{description}</p>
      </div>

      <Button
        type="outline"
        label={actionLabel}
        size="medium"
        classname="py-2.5! font-medium! text-sm! rounded-full! w-full! mt-20"
      />
    </div>
  );
}
