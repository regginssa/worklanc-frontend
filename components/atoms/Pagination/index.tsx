import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import Input from "../Input";

type PageItem = number | "ellipsis";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  className?: string;
}

function buildPageItems(
  currentPage: number,
  totalPages: number
): PageItem[] {
  if (totalPages <= 0) return [];
  if (totalPages === 1) return [1];
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>([1, totalPages]);

  for (let page = currentPage - 1; page <= currentPage + 1; page++) {
    if (page >= 1 && page <= totalPages) pages.add(page);
  }

  if (currentPage <= 3) {
    pages.add(2);
    pages.add(3);
  }

  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1);
    pages.add(totalPages - 2);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const items: PageItem[] = [];

  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) {
      items.push("ellipsis");
    }
    items.push(page);
  });

  return items;
}

const pageButtonClass = (isActive: boolean, isDisabled: boolean) =>
  `min-w-10 h-10 px-2 flex items-center justify-center rounded-lg text-sm font-medium transition-colors duration-200 ${
    isActive
      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
      : isDisabled
        ? "text-slate-400 cursor-not-allowed"
        : "text-slate-800 hover:bg-slate-100 cursor-pointer"
  }`;

const navButtonClass = (isDisabled: boolean) =>
  `size-10 flex items-center justify-center rounded-lg transition-colors duration-200 ${
    isDisabled
      ? "text-slate-300 cursor-not-allowed"
      : "text-slate-700 hover:bg-slate-100 cursor-pointer"
  }`;

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  disabled = false,
  className = "",
}: PaginationProps) {
  const [openEllipsisIndex, setOpenEllipsisIndex] = useState<number | null>(
    null
  );
  const [jumpValue, setJumpValue] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);

  const pageItems = useMemo(
    () => buildPageItems(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const prevDisabled = disabled || currentPage <= 1;
  const nextDisabled = disabled || currentPage >= totalPages || totalPages === 0;

  useEffect(() => {
    if (openEllipsisIndex === null) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenEllipsisIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openEllipsisIndex]);

  useEffect(() => {
    setOpenEllipsisIndex(null);
    setJumpValue("");
  }, [currentPage]);

  const handleJump = () => {
    const page = Number.parseInt(jumpValue, 10);
    if (Number.isNaN(page) || page < 1 || page > totalPages) return;
    onPageChange(page);
    setOpenEllipsisIndex(null);
    setJumpValue("");
  };

  if (totalPages <= 0) return null;

  return (
    <nav
      className={`flex items-center justify-center gap-1 ${className}`}
      aria-label="Pagination"
    >
      <button
        type="button"
        className={navButtonClass(prevDisabled)}
        disabled={prevDisabled}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
      >
        <Icon icon="mdi:chevron-left" className="size-6" />
      </button>

      {pageItems.map((item, index) =>
        item === "ellipsis" ? (
          <div
            key={`ellipsis-${index}`}
            className="relative"
            ref={openEllipsisIndex === index ? menuRef : undefined}
          >
            <button
              type="button"
              className={pageButtonClass(false, disabled)}
              disabled={disabled}
              onClick={() =>
                setOpenEllipsisIndex(
                  openEllipsisIndex === index ? null : index
                )
              }
              aria-label="Jump to page"
              aria-expanded={openEllipsisIndex === index}
            >
              ...
            </button>

            <AnimatePresence>
              {openEllipsisIndex === index && (
                <motion.div
                  className="absolute bottom-full left-1/2 z-20 mb-2 w-48 -translate-x-1/2 rounded-lg border border-slate-300 bg-white p-3 shadow-lg"
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  <p className="mb-2 text-xs font-medium text-slate-600">
                    Go to page
                  </p>
                  <Input
                    type="number"
                    name="jumpToPage"
                    placeholder={`1–${totalPages}`}
                    value={jumpValue}
                    onChange={(e) => setJumpValue(e.target.value)}
                    disabled={disabled}
                  />
                  <button
                    type="button"
                    className="mt-2 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                    disabled={
                      disabled ||
                      !jumpValue ||
                      Number.parseInt(jumpValue, 10) < 1 ||
                      Number.parseInt(jumpValue, 10) > totalPages
                    }
                    onClick={handleJump}
                  >
                    Go
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <button
            key={item}
            type="button"
            className={pageButtonClass(item === currentPage, disabled)}
            disabled={disabled || item === currentPage}
            onClick={() => onPageChange(item)}
            aria-label={`Page ${item}`}
            aria-current={item === currentPage ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        className={navButtonClass(nextDisabled)}
        disabled={nextDisabled}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
      >
        <Icon icon="mdi:chevron-right" className="size-6" />
      </button>
    </nav>
  );
}
