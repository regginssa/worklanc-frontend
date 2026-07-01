import { Button, Input } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

export type AdvancedSearchJobsFormData = {
  allOfTheseWords: string;
  anyOfTheseWords: string;
  noneOfTheseWords: string;
  exactPhrase: string;
  titleSearch: string;
  skillsSearch: string;
};

export default function AdvancedSearchJobsDialog({
  open,
  onClose,
  formData,
  onSearch,
}: {
  open: boolean;
  onClose: () => void;
  formData: AdvancedSearchJobsFormData;
  onSearch: (formData: AdvancedSearchJobsFormData) => void;
}) {
  const [draft, setDraft] = useState<AdvancedSearchJobsFormData>(formData);

  useEffect(() => {
    if (open) setDraft(formData);
  }, [open, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSearch = () => {
    onSearch(draft);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Advanced search</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-4">
          <Input
            type="text"
            name="allOfTheseWords"
            label="All of these words"
            labelClassName="text-sm font-medium mb-2! block!"
            value={draft.allOfTheseWords}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="anyOfTheseWords"
            label="Any of these words"
            labelClassName="text-sm font-medium mb-2! block!"
            value={draft.anyOfTheseWords}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="noneOfTheseWords"
            label="None of these words"
            labelClassName="text-sm font-medium mb-2! block!"
            value={draft.noneOfTheseWords}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="exactPhrase"
            label="The exact phrase"
            labelClassName="text-sm font-medium mb-2! block!"
            value={draft.exactPhrase}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="titleSearch"
            label="Title search"
            labelClassName="text-sm font-medium mb-2! block!"
            value={draft.titleSearch}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="skillsSearch"
            label="Skills search"
            labelClassName="text-sm font-medium mb-2! block!"
            value={draft.skillsSearch}
            onChange={handleInputChange}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium hover:underline">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Search"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={handleSearch}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
