import { Icon } from "@iconify/react";
import { Button } from "@/components/atoms";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { JobStatus } from "@/types/job";

const draftActionItems = ["Edit draft", "Remove draft"] as const;
const pendingActionItems = ["Edit draft", "Remove draft"] as const;
const openActionItems = [
  "View proposals",
  "View job posting",
  "Invite freelancers",
  "Edit posting",
  "Reuse posting",
  "Remove posting",
] as const;

interface DraftJobCardProps {
  title: string;
  status: JobStatus;
  onFillInDraft?: () => void;
  onVerifyAndPublish?: () => void;
  onGetShortlist?: () => void;
}

export default function DraftJobCard({
  title = "Fintech SaaS Platform",
  status = "draft",
  onFillInDraft,
  onVerifyAndPublish,
  onGetShortlist,
}: DraftJobCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusLabel = useMemo(() => {
    switch (status) {
      case "draft":
        return "Draft job post";
      case "pending":
        return "Pending job post";
      case "open":
        return "Open job post";
      case "completed":
        return "Completed job post";
      case "cancelled":
        return "Cancelled job post";
    }
  }, [status]);

  const description = useMemo(() => {
    switch (status) {
      case "draft":
        return "Add details to your draft";
      case "pending":
        return "Verify and publish your job";
      case "open":
        return "Hire faster with CHRLE using AI-powered recruiting";
    }
  }, [status]);

  const actionItems = useMemo(() => {
    switch (status) {
      case "draft":
        return draftActionItems;
      case "pending":
        return pendingActionItems;
      case "open":
        return openActionItems;
    }
  }, [status, draftActionItems, pendingActionItems, openActionItems]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("[data-draft-actions-menu]") &&
        !target.closest("[data-draft-actions-trigger]")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleAction = (label: any) => {
    setMenuOpen(false);
  };

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
          <div className="relative shrink-0" data-draft-actions-trigger>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="text-slate-900 cursor-pointer p-1 rounded-full hover:bg-slate-200 transition-all duration-200"
            >
              <Icon icon="tabler:dots" className="size-6" />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.ul
                  role="menu"
                  data-draft-actions-menu
                  className="absolute top-full right-0 mt-1 z-20 min-w-48 overflow-hidden rounded-lg border border-slate-300 bg-white text-sm font-medium shadow-lg"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {actionItems?.map((label) => (
                    <li key={label} role="none">
                      <button
                        type="button"
                        role="menuitem"
                        className="block w-full cursor-pointer py-2 px-4 text-left hover:bg-slate-100 transition-colors duration-200"
                        onClick={() => handleAction(label)}
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div>
          <span className="py-1 px-2 text-xs font-light bg-blue-200 rounded-sm text-blue-800">
            {statusLabel}
          </span>
        </div>

        <p className="text-xl font-medium">{description}</p>
      </div>

      {status === "draft" && (
        <Button
          type="outline"
          label="Fill in draft"
          size="medium"
          classname="py-2.5! font-medium! text-sm! rounded-full! w-full! mt-20"
          onClick={onFillInDraft}
        />
      )}

      {status === "pending" && (
        <Button
          type="primary"
          label="Verify and publish your job"
          size="medium"
          classname="py-2.5! font-medium! text-sm! rounded-full! w-full! mt-20"
          onClick={onVerifyAndPublish}
        />
      )}

      {status === "open" && (
        <Button
          type="outline"
          label="Get a shortlist"
          size="medium"
          classname="py-2.5! font-medium! text-sm! rounded-full! w-full! mt-20"
          onClick={onGetShortlist}
        />
      )}
    </div>
  );
}
