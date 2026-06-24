import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function StaySafeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col p-0! overflow-hidden!">
        <div className="flex items-stretch">
          <div className="w-2/5 bg-blue-600"></div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
