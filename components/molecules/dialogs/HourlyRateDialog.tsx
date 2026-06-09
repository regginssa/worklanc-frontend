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
import { SERVICE_FEE_PERCENT, type HourlyRateForm } from "@/utils/rate";

export default function HourlyRateDialog({
  open,
  onClose,
  rateForm,
  currentRate,
  onChangeRate,
  onSave,
  loading = false,
  errors = {},
}: {
  open: boolean;
  onClose: () => void;
  rateForm: HourlyRateForm;
  currentRate?: number | null;
  onChangeRate: (rate: string) => void;
  onSave: () => void;
  loading?: boolean;
  errors?: { rate?: string };
}) {
  const formattedCurrentRate =
    currentRate != null && currentRate > 0
      ? `$${currentRate.toFixed(2)}`
      : "Not set";

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
            Your profile rate: <strong>{formattedCurrentRate}</strong>
            {currentRate != null && currentRate > 0 ? "/hr" : null}
          </p>

          <ul>
            <li className="flex items-center justify-between border-b border-slate-300 py-4">
              <div>
                <label className="text-sm font-medium">Hourly Rate *</label>
                <p className="text-xs text-slate-600">
                  Total amount the client will see
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 font-medium">$</span>
                <Input
                  name="rate"
                  type="number"
                  placeholder="$0.00"
                  value={rateForm.rate}
                  onChange={(e) => onChangeRate(e.target.value)}
                  error={errors.rate}
                />
                <span className="text-sm text-slate-600">/ hr</span>
              </div>
            </li>

            <li className="flex items-center gap-4 justify-between border-b border-slate-300 py-4">
              <div className="flex-1">
                <label className="text-sm font-medium">Service fee</label>
                <p className="text-xs text-slate-600">
                  This helps us run the platform and provide services like
                  payment protection and customer support.
                </p>
                <p className="text-xs text-slate-900">
                  {SERVICE_FEE_PERCENT}% service fee — ${rateForm.fee}/hr
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 font-medium">$</span>
                <Input
                  name="fee"
                  type="number"
                  placeholder="$0.00"
                  disabled
                  value={rateForm.fee}
                  onChange={() => {}}
                />
                <span className="text-sm text-slate-600">/ hr</span>
              </div>
            </li>

            <li className="flex items-center justify-between py-4">
              <div>
                <label className="text-sm font-medium">You'll get</label>
                <div className="flex items-center gap-2 text-slate-600">
                  <p className="text-xs">
                    The estimated amount you'll receive after service fees
                  </p>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon
                        icon="mdi:question-mark-circle-outline"
                        className="h-4 w-4"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="p-2 text-sm">
                        Depending on hours billed, amount shown may vary
                        slightly due to rounding
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-600 font-medium">$</span>
                <Input
                  name="estimated"
                  type="number"
                  placeholder="$0.00"
                  disabled
                  value={rateForm.estimated}
                  onChange={() => {}}
                />
                <span className="text-sm text-slate-600">/ hr</span>
              </div>
            </li>
          </ul>
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
