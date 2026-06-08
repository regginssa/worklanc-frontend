import { Button, Input } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";

export type VideoIntroFormData = {
  url: string;
};

export const emptyVideoIntroForm = (): VideoIntroFormData => ({
  url: "",
});

export type VideoIntroFormErrors = {
  url?: string;
};

export default function VideoIntroductionDialog({
  open,
  onClose,
  loading = false,
  isEditing = false,
  formData,
  onChangeFormData,
  errors = {},
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  isEditing?: boolean;
  formData: VideoIntroFormData;
  onChangeFormData: (data: VideoIntroFormData) => void;
  errors?: VideoIntroFormErrors;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">
            {isEditing ? "Edit video introduction" : "Add video introduction"}
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] space-y-2 overflow-y-auto">
          <Input
            type="url"
            name="url"
            label="Link to your YouTube video"
            placeholder="Ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            labelClassName="text-sm font-medium mb-2! block!"
            value={formData.url}
            onChange={(e) =>
              onChangeFormData({ ...formData, url: e.target.value })
            }
            error={errors.url}
          />

          <Link
            href="#"
            className="block cursor-pointer text-sm hover:underline"
          >
            Does your video meet Worklanc's guidelines?
          </Link>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="cursor-pointer px-5 py-2.5 text-sm font-medium">
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
