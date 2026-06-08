import { Button, Input } from "@/components/atoms";
import { TITLE_MAX_LENGTH } from "@/utils/validateFreelancerProfileForms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function TitleDialog({
  open,
  onClose,
  title,
  onChangeTitle,
  onSave,
  loading = false,
  errors = {},
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  onChangeTitle: (title: string) => void;
  onSave: () => void;
  loading?: boolean;
  errors?: { title?: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Edit your title</DialogTitle>
          <DialogDescription>
            Enter a single sentence description of your professional
            skills/experience (e.g. Expert Web Designer with Ajax experience)
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          <Input
            type="text"
            name="title"
            label="Your title"
            placeholder="Ex: Software Engineer"
            labelClassName="text-sm font-medium"
            required
            value={title}
            maxLength={TITLE_MAX_LENGTH}
            onChange={(e) => onChangeTitle(e.target.value)}
            error={errors.title}
          />
          <p className="text-right text-sm text-slate-600">
            {(title ?? "").length}/{TITLE_MAX_LENGTH} characters
          </p>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Save"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            loading={loading}
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
