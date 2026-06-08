import { Button, Checkbox, RadioGroup } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { HoursPerWeek } from "@/types/user";

const HOURS_OPTIONS = [
  { title: "More than 30 hrs/week", value: "more_than_30" },
  { title: "Less than 30 hrs/week", value: "less_than_30" },
  { title: "As needed - open to offers", value: "as_needed" },
  { title: "None", value: "none" },
];

export type AvailabilityFormData = {
  hoursPerWeek: HoursPerWeek | "";
  openToContractToHire: boolean;
};

export const emptyAvailabilityForm = (): AvailabilityFormData => ({
  hoursPerWeek: "",
  openToContractToHire: false,
});

export type AvailabilityFormErrors = {
  hoursPerWeek?: string;
};

export default function AvailabilityDialog({
  open,
  onClose,
  loading = false,
  formData,
  onChangeFormData,
  errors = {},
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  loading?: boolean;
  formData: AvailabilityFormData;
  onChangeFormData: (data: AvailabilityFormData) => void;
  errors?: AvailabilityFormErrors;
  onSave: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Availability</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto px-4 pb-4 no-scrollbar max-h-[60vh]">
          <div>
            <h3 className="text-xl font-medium">Hours per week</h3>
            <p className="mt-2 text-sm text-slate-600">
              Knowing how much you can work helps clients find the right jobs
              for you.
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm">I can currently work</label>
            <RadioGroup
              options={HOURS_OPTIONS}
              value={formData.hoursPerWeek}
              onChange={(value) =>
                onChangeFormData({
                  ...formData,
                  hoursPerWeek: value as HoursPerWeek,
                })
              }
            />
            {errors.hoursPerWeek && (
              <p className="text-sm text-red-600">{errors.hoursPerWeek}</p>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Contract-to-hire</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={formData.openToContractToHire}
                  onCheck={(checked) =>
                    onChangeFormData({
                      ...formData,
                      openToContractToHire: checked,
                    })
                  }
                />
                <p className="text-sm font-medium">
                  I&apos;m open to contract-to-hire opportunities
                </p>
              </div>
              <p className="text-sm text-slate-600">
                This means you&apos;ll start with a contract and may later
                explore a full-time option.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="cursor-pointer px-5 py-2.5 text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Save availability"
            classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
            loading={loading}
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
