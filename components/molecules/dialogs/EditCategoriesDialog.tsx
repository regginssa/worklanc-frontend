import { Button, Checkbox } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CategoriesAPI from "@/lib/api/categories";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function EditCategoriesDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [openCategorySlugs, setOpenCategorySlugs] = useState<string[]>([]);

  const { data: categories, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: CategoriesAPI.getAll,
  });

  useEffect(() => {
    if (!open) {
      setOpenCategorySlugs([]);
      return;
    }

    if (categories?.length && openCategorySlugs.length === 0) {
      setOpenCategorySlugs([categories[0].slug]);
    }
  }, [open, categories, openCategorySlugs.length]);

  const toggleCategory = (slug: string) => {
    setOpenCategorySlugs((previous) =>
      previous.includes(slug)
        ? previous.filter((item) => item !== slug)
        : [...previous, slug]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Edit Categories</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-6 space-y-6 overflow-y-auto max-h-[60vh] no-scrollbar">
          <div className="space-y-2">
            <h3 className="text-2xl font-medium">
              What are the main services you offer to clients?
            </h3>
            <p className="text-sm text-slate-600 font-light">
              Select up to 10 categories.
            </p>
          </div>

          <div className="flex flex-wrap gap-2"></div>

          <div className="border border-slate-300 rounded-3xl">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`p-6 space-y-6 ${
                      index < 3 ? "border-b border-slate-300" : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-56 rounded-md bg-slate-200 animate-pulse" />
                      <div className="size-4 rounded bg-slate-200 animate-pulse" />
                    </div>

                    <ul className="grid grid-cols-2 gap-4">
                      {Array.from({ length: 6 }).map((_, childIndex) => (
                        <li key={childIndex}>
                          <div className="flex items-center gap-2">
                            <div className="size-5 shrink-0 rounded bg-slate-200 animate-pulse" />
                            <div className="h-4 flex-1 rounded bg-slate-200 animate-pulse" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              : categories?.map((category, index) => {
                  const isCategoryOpen = openCategorySlugs.includes(
                    category.slug
                  );

                  return (
                    <div
                      key={category.slug}
                      className={`p-6 ${
                        index < (categories?.length ?? 0) - 1
                          ? "border-b border-slate-300"
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.slug)}
                        className="w-full flex items-center justify-between cursor-pointer"
                        aria-expanded={isCategoryOpen}
                      >
                        <span className="text-2xl font-medium">
                          {category.name}
                        </span>
                        <motion.span
                          animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                          <ChevronDown className="size-4 text-slate-600" />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isCategoryOpen && (
                          <motion.div
                            key={category.slug}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <ul className="grid grid-cols-2 gap-4 pt-6">
                              {category.children.map((child) => (
                                <li key={child.slug}>
                                  <button
                                    type="button"
                                    className="w-full flex items-center gap-2 cursor-pointer"
                                  >
                                    <Checkbox className="size-5!" />
                                    <span className="text-sm font-medium">
                                      {child.name}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium hover:underline">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Update"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
