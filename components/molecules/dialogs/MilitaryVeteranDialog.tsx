import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MedalIcon from "@/public/assets/svgs/icons/other/medal.svg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  RadioGroup,
  SearchCombobox,
} from "@/components/atoms";
import { useState } from "react";
import { countries } from "country-data-list";

const branchOptions = [
  { label: "Army & Ground forces", value: "army_and_ground_forces" },
  {
    label: "Navy, Coast Guard and Marine forces",
    value: "navy_coast_guard_and_marine_forces",
  },
  { label: "Air Force", value: "air_force" },
  { label: "Space Force", value: "space_force" },
];

export default function MilitaryVeteranDialog({
  open,
  onClose,
  onSubmit,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  loading?: boolean;
}) {
  const [formData, setFormData] = useState({
    status: "served",
    country: "United States",
    firstName: "",
    lastName: "",
    activeDutyStartDate: new Date(),
    activeDutyEndDate: new Date(),
    branch: "",
  });
  const [isNext, setIsNext] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isNext) {
      onSubmit?.();
    } else {
      setIsNext(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        {isNext && (
          <DialogHeader className="px-4 pt-6">
            <DialogTitle className="text-3xl">
              Add your military service history
            </DialogTitle>
            <DialogDescription>
              Please ensure the details below match your official service
              records.
            </DialogDescription>
          </DialogHeader>
        )}

        <div
          className={`p-4 no-scrollbar max-h-[60vh] overflow-y-auto ${
            !isNext ? "flex items-stretch" : ""
          }`}
        >
          {!isNext && (
            <div className="w-2/5 flex flex-col items-center justify-center">
              <Image
                src={MedalIcon}
                alt="Medal"
                className="w-[140px] h-[130px]"
              />
            </div>
          )}
          <div className="flex-1 space-y-6">
            {!isNext && (
              <div className="space-y-2">
                <h1 className="text-lg font-medium">
                  Tell us about your military service history.
                </h1>

                <p className="text-sm text-slate-800 inline-block">
                  Looking for a way to stand out from the crowd? Military
                  veterans are routinely sought after by clients who are looking
                  to increase their engagement with the veteran business
                  community.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {!isNext ? (
                <div className="space-y-4">
                  <RadioGroup
                    options={[
                      {
                        title: "I served in the military for:",
                        value: "served",
                      },
                    ]}
                    value={formData.status}
                    onChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  />

                  <SearchCombobox
                    name="country"
                    options={countries.all.map((c) => c.name)}
                    defaultOption={formData?.country}
                    onSelect={(v: string) =>
                      setFormData({ ...formData, country: v })
                    }
                  />

                  <RadioGroup
                    options={[
                      {
                        title: "I did not serve in the military",
                        value: "not_served",
                      },
                      {
                        title: "I don’t want to disclose this information",
                        value: "dont_want_to_disclose",
                      },
                    ]}
                    value={formData.status}
                    onChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-8">
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                  <DatePicker
                    name="activeDutyStartDate"
                    label="Active Duty Start Date"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    value={formData.activeDutyStartDate}
                    onChange={(date: Date) =>
                      setFormData({
                        ...formData,
                        activeDutyStartDate: date as any,
                      })
                    }
                  />
                  <DatePicker
                    name="activeDutyEndDate"
                    label="Active Duty End Date"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    value={formData.activeDutyEndDate}
                    onChange={(date: Date) =>
                      setFormData({
                        ...formData,
                        activeDutyEndDate: date as any,
                      })
                    }
                  />
                  <Dropdown
                    name="branch"
                    label="Service Branch"
                    placeholder="Select branch"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    options={branchOptions}
                    value={formData.branch}
                    onSelect={(v) => setFormData({ ...formData, branch: v })}
                  />
                </div>
              )}

              <div className="flex items-center justify-end gap-2 mt-10">
                <button
                  type="button"
                  className="text-sm font-medium cursor-pointer py-2 px-4 hover:underline"
                  onClick={() => {
                    if (isNext) {
                      setIsNext(false);
                    } else {
                      onClose();
                    }
                  }}
                >
                  Cancel
                </button>
                <Button
                  type="primary"
                  label={isNext ? "Save" : "Next"}
                  isSubmit
                  loading={isNext && loading}
                  disabled={loading}
                  classname="py-2! px-4! rounded-full! text-sm! font-medium!"
                />
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
