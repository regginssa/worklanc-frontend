import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MedalIcon from "@/public/assets/svgs/icons/other/medal.svg";
import Image from "next/image";
import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  RadioGroup,
  SearchCombobox,
} from "@/components/atoms";
import { useEffect, useState } from "react";
import { countries } from "country-data-list";

export const MILITARY_BRANCH_OPTIONS = [
  { label: "Army & Ground forces", value: "army_and_ground_forces" },
  {
    label: "Navy, Coast Guard and Marine forces",
    value: "navy_coast_guard_and_marine_forces",
  },
  { label: "Air Force", value: "air_force" },
  { label: "Space Force", value: "space_force" },
] as const;

export type MilitaryVeteranFormStatus =
  | "served"
  | "not_served"
  | "dont_want_to_disclose";

export type MilitaryVeteranFormData = {
  status: MilitaryVeteranFormStatus;
  country: string;
  countryCode: string;
  firstName: string;
  lastName: string;
  activeDutyStartDate: Date | null;
  activeDutyEndDate: Date | null;
  branch: string;
};

const countryCodeFromName = (countryName: string) =>
  countries.all.find((country) => country.name === countryName)?.alpha2 || "US";

export const emptyMilitaryVeteranForm = (): MilitaryVeteranFormData => ({
  status: "served",
  country: "United States",
  countryCode: "US",
  firstName: "",
  lastName: "",
  activeDutyStartDate: new Date(),
  activeDutyEndDate: new Date(),
  branch: "",
});

export type MilitaryVeteranFormErrors = {
  status?: string;
  country?: string;
  firstName?: string;
  lastName?: string;
  activeDutyStartDate?: string;
  activeDutyEndDate?: string;
  branch?: string;
};

export default function MilitaryVeteranDialog({
  open,
  onClose,
  onSave,
  loading = false,
  startAtServiceForm = false,
  isEditing = false,
  formData,
  onChangeFormData,
  errors = {},
}: {
  open: boolean;
  onClose: () => void;
  onSave: (
    step: "selection" | "service"
  ) => Promise<"close" | "stay" | "advance"> | "close" | "stay" | "advance";
  loading?: boolean;
  startAtServiceForm?: boolean;
  isEditing?: boolean;
  formData: MilitaryVeteranFormData;
  onChangeFormData: (data: MilitaryVeteranFormData) => void;
  errors?: MilitaryVeteranFormErrors;
}) {
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsNext(false);
      return;
    }
    setIsNext(startAtServiceForm);
  }, [open, startAtServiceForm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const step = isNext ? "service" : "selection";
    const outcome = await onSave(step);

    if (outcome === "close") {
      onClose();
    } else if (outcome === "advance") {
      setIsNext(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    onChangeFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        {isNext && (
          <DialogHeader className="px-4 pt-6">
            <DialogTitle className="text-3xl">
              {isEditing
                ? "Edit your military service history"
                : "Add your military service history"}
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
            <div className="flex w-2/5 flex-col items-center justify-center">
              <Image
                src={MedalIcon}
                alt="Medal"
                className="h-[130px] w-[140px]"
              />
            </div>
          )}
          <div className="flex-1 space-y-6">
            {!isNext && (
              <div className="space-y-2">
                <h1 className="text-lg font-medium">
                  Tell us about your military service history.
                </h1>

                <p className="inline-block text-sm text-slate-800">
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
                      onChangeFormData({
                        ...formData,
                        status: value as MilitaryVeteranFormStatus,
                      })
                    }
                  />

                  {formData.status === "served" && (
                    <SearchCombobox
                      name="country"
                      options={countries.all.map((c) => c.name)}
                      defaultOption={formData.country}
                      onSelect={(value: string) =>
                        onChangeFormData({
                          ...formData,
                          country: value,
                          countryCode: countryCodeFromName(value),
                        })
                      }
                    />
                  )}
                  {errors.country && (
                    <p className="text-sm text-red-600">{errors.country}</p>
                  )}

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
                      onChangeFormData({
                        ...formData,
                        status: value as MilitaryVeteranFormStatus,
                      })
                    }
                  />
                  {errors.status && (
                    <p className="text-sm text-red-600">{errors.status}</p>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-8">
                  {isEditing && (
                    <div className="col-span-2">
                      <SearchCombobox
                        name="country"
                        label="Country"
                        labelClassName="text-sm! font-medium! mb-1! block!"
                        options={countries.all.map((country) => country.name)}
                        defaultOption={formData.country}
                        onSelect={(value: string) =>
                          onChangeFormData({
                            ...formData,
                            country: value,
                            countryCode: countryCodeFromName(value),
                          })
                        }
                        error={errors.country}
                      />
                    </div>
                  )}
                  <Input
                    type="text"
                    name="firstName"
                    label="First Name"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    placeholder="Enter first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                  />
                  <Input
                    type="text"
                    name="lastName"
                    label="Last Name"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    placeholder="Enter last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                  />
                  <DatePicker
                    name="activeDutyStartDate"
                    label="Active Duty Start Date"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    value={formData.activeDutyStartDate}
                    onChange={(date: Date) =>
                      onChangeFormData({
                        ...formData,
                        activeDutyStartDate: date,
                      })
                    }
                    error={errors.activeDutyStartDate}
                  />
                  <DatePicker
                    name="activeDutyEndDate"
                    label="Active Duty End Date"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    value={formData.activeDutyEndDate}
                    onChange={(date: Date) =>
                      onChangeFormData({
                        ...formData,
                        activeDutyEndDate: date,
                      })
                    }
                    error={errors.activeDutyEndDate}
                  />
                  <Dropdown
                    name="branch"
                    label="Service Branch"
                    placeholder="Select branch"
                    labelClassName="text-sm! font-medium! mb-1! block!"
                    options={[...MILITARY_BRANCH_OPTIONS]}
                    value={formData.branch}
                    onSelect={(value) =>
                      onChangeFormData({ ...formData, branch: value })
                    }
                    error={errors.branch}
                  />
                </div>
              )}

              <div className="mt-10 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="cursor-pointer px-4 py-2 text-sm font-medium hover:underline"
                  onClick={() => {
                    if (isNext && !startAtServiceForm) {
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
                  loading={loading}
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
