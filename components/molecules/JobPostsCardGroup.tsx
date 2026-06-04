import Link from "next/link";
import { Button, IconButton, Pagination } from "../atoms";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

interface JobPostsCardGroupProps {
  jobs: [];
  totalPages?: number;
}

const actionItems = [
  { label: "Edit draft", href: "#" },
  { label: "Remove draft", href: "#" },
];

export default function JobPostsCardGroup({
  jobs,
  totalPages = 100,
}: JobPostsCardGroupProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openActionsIndex, setOpenActionsIndex] = useState<number | null>(null);

  useEffect(() => {
    if (openActionsIndex === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest("[data-job-actions-menu]") &&
        !target.closest("[data-job-actions-trigger]")
      ) {
        setOpenActionsIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openActionsIndex]);

  const items = Array.from({ length: 10 });

  return (
    <div>
      <ul>
        {items.map((_, index) => (
          <li
            key={index}
            className={`flex items-start justify-between p-8 border-b border-slate-300 hover:bg-slate-100 transition-colors duration-200 ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <div>
              <Link
                href="#"
                className="text-xl font-medium cursor-pointer hover:underline"
              >
                Fintech SaaS Platform Development
              </Link>
              <p className="mt-2 text-slate-600 text-sm">
                Created 4 days ago by You
              </p>
              <p className="mt-4 text-sm text-slate-800">
                Draft - Saved Jun 2, 2026
              </p>
            </div>
            <div
              className="flex items-center gap-4 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                type="outline"
                label="Edit draft"
                size="medium"
                classname="border! rounded-full! text-sm! font-medium! py-2! px-5!"
              />
              <div className="relative" data-job-actions-trigger>
                <IconButton
                  icon="mdi:dots-horizontal"
                  variant="outline"
                  className="border!"
                  onClick={() =>
                    setOpenActionsIndex(
                      openActionsIndex === index ? null : index
                    )
                  }
                />
                <AnimatePresence>
                  {openActionsIndex === index && (
                    <motion.ul
                      data-job-actions-menu
                      className="absolute top-full right-0 mt-1 z-20 min-w-36 overflow-hidden rounded-lg border border-slate-300 bg-white text-sm font-medium shadow-lg"
                      initial={{ opacity: 0, y: -8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.95 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      {actionItems.map((item) => (
                        <li
                          key={item.label}
                          className="block cursor-pointer py-2 px-4 hover:bg-slate-100 transition-colors duration-200"
                          onClick={() => setOpenActionsIndex(null)}
                        >
                          {item.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <p className="text-sm">1 - 10 of 100 Job posts</p>
        <Pagination
          className="py-8"
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
