import { Button, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type OtherExperienceFormData = {
  subject: string;
  description: string;
};

export const emptyOtherExperienceForm = (): OtherExperienceFormData => ({
  subject: "",
  description: "",
});

export default function OtherExperienceDialog({
  open,
  onClose,
  onSave,
  formData,
  onChangeFormData,
  loading = false,
  errors = {},
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: OtherExperienceFormData;
  onChangeFormData: (data: OtherExperienceFormData) => void;
  loading?: boolean;
  errors?: { subject?: string };
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add other experience</DialogTitle>
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
            error={errors.subject}
          />

          <Textarea
            label="Description"
            name="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChangeFormData({ ...formData, description: e.target.value })
            }
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <button className="cursor-pointer py-2.5 px-5 text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Save experience"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            loading={loading}
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
