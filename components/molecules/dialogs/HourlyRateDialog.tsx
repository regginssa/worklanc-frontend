import { Button, Input } from "@/components/atoms";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";

export default function HourlyRateDialog({
  open,
  onClose,
  rate,
  onChangeRate,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  rate: number;
  onChangeRate: (rate: number) => void;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Change hourly rate</DialogTitle>
          <DialogDescription>
            Please note that your new hourly rate will only apply to new
            contracts.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] space-y-4 overflow-y-auto">
          <p className="text-sm text-slate-600">
            Your profile rate: <strong>$52.00</strong>/hr
          </p>

          <ul className="">
            <li className="flex items-center justify-between border-b border-slate-300 py-4">
              <div>
                <label className="text-sm font-medium">Hourly Rate *</label>
                <p className="text-xs text-slate-600">
                  Total amount the client will see
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="$0.00"
                  value={rate}
                  onChange={(e) => onChangeRate(Number(e.target.value))}
                />
                <span className="text-sm text-slate-600">/ hr</span>
              </div>
            </li>

            <li className="flex items-center justify-between border-b border-slate-300 py-4">
              <div>
                <label className="text-sm font-medium">
                  Worklanc Service Fee
                </label>
                <p className="text-xs text-slate-600">
                  Fees vary and are shown before contract acceptance
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="$0.00"
                  disabled
                  value=""
                  onChange={(e) => {}}
                />
                <span className="text-sm text-slate-600">/ hr</span>
              </div>
            </li>

            <li className="flex items-center justify-between py-4">
              <div>
                <label className="text-sm font-medium">You'll Receive</label>
                <div className="flex items-center gap-2 text-slate-600">
                  <p className="text-xs">
                    The estimated amount you'll receive after service fees
                  </p>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon
                        icon="mdi:question-mark-circle-outline"
                        className="w-4 h-4"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="text-sm p-2">
                        Depending on hours billed, amount shown may vary
                        slightly due to rounding
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Input
                  name="hourlyRate"
                  type="number"
                  placeholder="$0.00"
                  disabled
                  value=""
                  onChange={(e) => {}}
                />
                <span className="text-sm text-slate-600">/ hr</span>
              </div>
            </li>
          </ul>
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
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
