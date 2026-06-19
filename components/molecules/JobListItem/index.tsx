import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/atoms";
import {
  getJobActionItems,
  getJobPrimaryAction,
  getJobStatusDescription,
  getJobStatusLabel,
  type JobCardProps,
} from "@/utils/jobDisplay";

export default function JobListItem({
  title,
  status,
  onFillInDraft,
  onVerifyAndPublish,
  onGetShortlist,
}: JobCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const statusLabel = useMemo(() => getJobStatusLabel(status), [status]);
  const description = useMemo(() => getJobStatusDescription(status), [status]);
  const actionItems = useMemo(() => getJobActionItems(status), [status]);
  const primaryAction = useMemo(
    () =>
      getJobPrimaryAction(status, {
        onFillInDraft,
        onVerifyAndPublish,
        onGetShortlist,
      }),
    [status, onFillInDraft, onVerifyAndPublish, onGetShortlist],
  );

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("[data-job-actions-menu]") &&
        !target.closest("[data-job-actions-trigger]")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <li className="border w-full border-slate-300 rounded-3xl p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-8 min-w-0">
          <div className="size-12 shrink-0 rounded-full bg-slate-300 flex items-center justify-center">
            <Icon icon="fe:list-task" className="text-white size-6" />
          </div>
          <h4 className="font-medium shrink-0">{title}</h4>
          <div className="shrink-0">
            <span className="py-1 px-2 text-xs font-light bg-blue-200 rounded-sm text-blue-800">
              {statusLabel}
            </span>
          </div>
          {description && (
            <p className="text-sm truncate">{description}</p>
          )}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          {primaryAction && (
            <Button
              type={primaryAction.type}
              label={primaryAction.label}
              size="medium"
              classname="py-2.5! px-5! border! font-medium! text-sm! rounded-full!"
              onClick={primaryAction.onClick}
            />
          )}

          {actionItems && (
            <div className="relative" data-job-actions-trigger>
              <motion.button
                type="button"
                whileTap={{ scale: 0.95 }}
                aria-expanded={menuOpen}
                aria-haspopup="menu"
                onClick={() => setMenuOpen((open) => !open)}
                className="text-slate-900 cursor-pointer p-2 border border-slate-300 rounded-full hover:bg-slate-200 transition-colors duration-200"
              >
                <Icon icon="tabler:dots" className="size-6" />
              </motion.button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.ul
                    role="menu"
                    data-job-actions-menu
                    className="absolute top-full right-0 mt-1 z-20 min-w-48 overflow-hidden rounded-lg border border-slate-300 bg-white text-sm font-medium shadow-lg"
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    {actionItems.map((label) => (
                      <li key={label} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          className="block w-full cursor-pointer py-2 px-4 text-left hover:bg-slate-100 transition-colors duration-200"
                          onClick={() => setMenuOpen(false)}
                        >
                          {label}
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export type { JobCardProps as JobListItemProps };
