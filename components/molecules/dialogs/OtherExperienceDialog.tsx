import { Button, DatePicker, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function OtherExperienceDialog({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}) {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add certification</DialogTitle>
        </DialogHeader>

        <form className="px-4 pb-4 no-scrollbar max-h-[60vh] space-y-6 overflow-y-auto">
          <Input
            type="text"
            name="subject"
            label="Subject"
            labelClassName="text-sm font-medium"
            required
            value={formData.subject}
            onChange={handleInputChange}
          />

          <Textarea
            label="Description"
            name="description"
            rows={8}
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Add certification"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            disabled
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
