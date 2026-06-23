import { useEffect, useState } from "react";
import { DatePicker, Input, RadioGroup, Textarea } from "../atoms";
import { ContractTypeRadioGroup } from "../common";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CircleQuestionMark, Tag } from "lucide-react";
import { SERVICE_FEE_PERCENT } from "@/utils/rate";

const endDateOptions = [
  { title: "Undefined", value: null },
  { title: "Specific date", value: "specific_date" },
];

export default function NewContractForm({
  formData,
  onFormDataChange,
}: {
  formData: any;
  onFormDataChange: (formData: any) => void;
}) {
  useEffect(() => {
    if (formData.hourlyRate) {
      onFormDataChange({
        ...formData,
        receivedHourlyRate: (
          formData.hourlyRate *
          (1 - SERVICE_FEE_PERCENT / 100)
        ).toFixed(2) as any,
      });
    }
  }, [formData.hourlyRate, onFormDataChange]);

  useEffect(() => {
    if (formData.endDateType === "specific_date") {
      onFormDataChange({
        ...formData,
        endDate: null,
      });
    }
  }, [formData.endDateType, onFormDataChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="no-scrollbar overflow-y-auto space-y-8 px-8">
      <h1 className="text-2xl font-medium">New contract</h1>

      <Input
        type="text"
        name="firstName"
        label="Client's first name"
        labelClassName="block mb-2! text-sm! font-medium!"
        value={formData.clientFirstName}
        onChange={handleInputChange}
      />

      <Input
        type="text"
        name="clientEmail"
        label="Client's email address"
        labelClassName="block mb-2! text-sm! font-medium!"
        value={formData.clientEmail}
        onChange={handleInputChange}
      />

      <Input
        type="text"
        name="name"
        label="Contract name"
        labelClassName="block mb-2! text-sm! font-medium!"
        value={formData.clientFirstName}
        onChange={handleInputChange}
      />

      <Textarea
        name="description"
        label="Description"
        labelClassName="block mb-2! text-sm! font-medium!"
        placeholder="Outline project deliverables to give more context"
        value={formData.description as any}
        onChange={(e) =>
          onFormDataChange({ ...formData, description: e.target.value as any })
        }
      />

      <ContractTypeRadioGroup
        value={formData.budgetType as any}
        onChange={(value) =>
          onFormDataChange({ ...formData, budgetType: value as any })
        }
      />

      <div className="h-[1px] w-full bg-slate-200"></div>

      {formData.budgetType === "hourly" && (
        <>
          <div className="pb-6 border-b border-slate-300">
            <div className="mt-6 mb-2 flex items-center gap-2">
              <span className="font-medium">Hourly rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                name="hourlyRate"
                labelClassName="block mb-2! text-sm! font-medium!"
                placeholder="0"
                classname="w-52!"
                value={formData.hourlyRate}
                onChange={handleInputChange}
              />
              <span className="text-sm">/ hr</span>
            </div>
          </div>

          <div className="pb-6 border-b border-slate-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm font-medium">
                <span>{SERVICE_FEE_PERCENT}% Worklanc service fee</span>
                <Link
                  href="#"
                  className="text-blue-600 underline cursor-pointer"
                >
                  Learn more
                </Link>
              </div>

              {formData.hourlyRate && formData.receivedHourlyRate && (
                <span className="text-sm font-medium">
                  $
                  {(formData.hourlyRate - formData.receivedHourlyRate).toFixed(
                    2
                  )}{" "}
                  / hr
                </span>
              )}
            </div>

            {formData.hourlyRate && (
              <div className="flex items-center gap-4 rounded-sm freelancer-plus-alert p-4 mt-6 text-white text-sm">
                <Tag className="size-5" />
                <p>
                  Keep the entire ${Number(formData.hourlyRate).toFixed(2)}, no
                  service fee, if you upgrade to{" "}
                  <Link
                    href="#"
                    className="font-medium underline cursor-pointer"
                  >
                    FL+
                  </Link>
                  .
                </p>
              </div>
            )}

            <div className="mt-6 mb-2 flex items-center gap-2">
              <span className="font-medium">You'll receive</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                </TooltipTrigger>

                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Depending on hours billed, amount shown may vary slightly
                    due to rounding.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                name="receivedHourlyRate"
                placeholder="0"
                classname="w-52!"
                disabled
                value={formData.receivedHourlyRate}
                onChange={handleInputChange}
              />
              <span className="text-sm">/ hr</span>
            </div>
          </div>

          <div className="pb-6 border-b border-slate-300">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium">Weekly limit</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                </TooltipTrigger>

                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    If you go over this weekly limit, your client will need to
                    manually approve the extra hours you worked.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <p className="text-sm text-slate-600 mb-2">
              Total number of hours you estimate working on this contract per
              week. You'll log hours worked each week manually.
            </p>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                name="weeklyLimit"
                classname="w-52!"
                value={formData.weeklyLimit}
                onChange={handleInputChange}
              />
              <span className="text-sm">hrs</span>
            </div>
          </div>

          <div className="">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-medium">End date</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                </TooltipTrigger>

                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    This is a suggested end date. We will email both parties
                    when the end date is reached but the contract will not be
                    officially ended until it is done by the client or
                    freelancer.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <RadioGroup
              name="endDateType"
              options={endDateOptions}
              value={formData.endDateType}
              onChange={(value) =>
                onFormDataChange({ ...formData, endDateType: value as any })
              }
            />

            {formData.endDateType === "specific_date" && (
              <DatePicker
                name="endDate"
                classname="w-52! mt-6!"
                placeholder="Select"
                value={formData.endDate}
                onChange={(value) =>
                  onFormDataChange({ ...formData, endDate: value as any })
                }
              />
            )}
          </div>
        </>
      )}
    </form>
  );
}
