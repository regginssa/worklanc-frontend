import { Button, SearchableDropdown } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import CategoryAPI from "@/lib/api/categories";
import { useEffect, useState } from "react";

export default function ProjectCategoryDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (formData: any) => void;
}) {
  const [formData, setFormData] = useState<any>({});
  const [subCategoryOptions, setSubCategoryOptions] = useState<any>([]);
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryAPI.getAll(),
  });

  const categoryOptions =
    categories?.map((c) => ({ label: c.name, value: c.slug })) ?? [];

  useEffect(() => {
    if (formData.category) {
      const selectedCategory = categories?.find(
        (c) => c.slug === formData.category
      );

      setSubCategoryOptions(
        selectedCategory?.children?.map((child: any) => ({
          label: child.name,
          value: child.slug,
        })) ?? []
      );
    } else {
      setSubCategoryOptions([]);
    }
  }, [categories, formData.category]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Project categorization</DialogTitle>
        </DialogHeader>

        <form className="px-4 pb-4 no-scrollbar h-[50vh] overflow-y-auto space-y-4">
          <p className="text-base">
            Select a relevant category to help clients find your project.
          </p>

          <SearchableDropdown
            name="category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData.category ?? ""}
            onChange={(value) => setFormData({ ...formData, category: value })}
          />

          <SearchableDropdown
            name="subCategory"
            placeholder="Narrow down your category"
            options={subCategoryOptions}
            disabled={!subCategoryOptions.length}
            value={formData.subCategory ?? ""}
            onChange={(value) =>
              setFormData({ ...formData, subCategory: value })
            }
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium hover:underline">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Save"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={() => onSave(formData)}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
