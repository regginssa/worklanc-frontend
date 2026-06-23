import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function BoostYourProfileDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-4xl flex-col no-scrollbar max-h-[60vh] overflow-y-auto">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Boost your profile</DialogTitle>
          <DialogDescription>
            With a boost, you can bid Connects to jump to the top of search
            results. We only charge if a client clicks on your profile or views
            your video.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 grid grid-cols-2 gap-10"></div>
      </DialogContent>
    </Dialog>
  );
}
