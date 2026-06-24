import { Button, Checkbox } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function JobPreferenceDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Edit Job Preference</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-6 space-y-6">
          <h3 className="text-2xl font-medium">
            Introducing contract-to-hire opportunities
          </h3>

          <div className="flex items-start gap-2">
            <Checkbox className="size-5!" />
            <p className="text-slate-600 text-sm font-light">
              <strong className="text-black">
                I'm open to contract-to-hire opportunities -
              </strong>{" "}
              You can show clients you’re open to starting with a contract, and
              later exploring a full-time option
            </p>
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
