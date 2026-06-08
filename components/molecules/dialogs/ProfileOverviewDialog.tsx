import { Button, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ProfileOverviewDialog({
  open,
  onClose,
  overview,
  onChangeOverview,
  onSave,
  loading = false,
  errors = {},
}: {
  open: boolean;
  onClose: () => void;
  overview: string;
  onChangeOverview: (overview: string) => void;
  onSave: () => void;
  loading?: boolean;
  errors?: { overview?: string };
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Profile overview</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] space-y-6 overflow-y-auto">
          <div className="space-y-2 text-sm text-slate-600">
            <p className="">
              Use this space to show clients you have the skills and experience
              they're looking for.
            </p>

            <ul className="list-disc list-inside">
              <li>Describe your strengths and skills</li>
              <li>Highlight projects, accomplishments and education</li>
              <li>Keep it short and make sure it's error-free</li>
            </ul>
          </div>

          <div>
            <Textarea
              label="Profile overview"
              name="overview"
              labelClassName="mb-2!"
              rows={5}
              value={overview}
              onChange={(e: any) => onChangeOverview(e.target.value)}
              error={errors.overview}
            />
            <p className="text-right text-slate-600 text-sm">
              5000 characters left
            </p>
          </div>
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
