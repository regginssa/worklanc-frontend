import {
  Button,
  DatePicker,
  Input,
  RadioGroup,
  Textarea,
} from "@/components/atoms";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { ArrowLeftIcon, CircleQuestionMark } from "lucide-react";
import { useState } from "react";
import { ContractTypeRadioGroup } from "@/components/common";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const endDateOptions = [
  { title: "Undefined", value: null },
  { title: "Specific date", value: "specific_date" },
];

export default function NewContractFormDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState({
    clientFirstName: null,
    clientEmail: null,
    description: null,
    type: null,
    hourlyRate: null,
    receivedHourlyRate: null,
    weeklyLimit: null,
    endDateType: null,
    endDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent size="lg">
        <DrawerHeader>
          <div className="flex items-center justify-between w-full p-2">
            <button
              type="button"
              className="hover:text-blue-600 cursor-pointer"
              onClick={onClose}
            >
              <ArrowLeftIcon className="size-6" />
            </button>
          </div>
        </DrawerHeader>

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
            name="firstName"
            label="Client's first name"
            labelClassName="block mb-2! text-sm! font-medium!"
            value={formData.clientFirstName}
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
              setFormData({ ...formData, description: e.target.value as any })
            }
          />

          <ContractTypeRadioGroup
            value={formData.type}
            onChange={(value) =>
              setFormData({ ...formData, type: value as any })
            }
          />

          <div className="h-[1px] w-full bg-slate-200"></div>

          {formData.type === "hourly" && (
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
                <div className="flex items-center gap-1 text-sm font-medium">
                  <span>5% Worklanc service fee</span>
                  <Link
                    href="#"
                    className="text-blue-600 underline cursor-pointer"
                  >
                    Learn more
                  </Link>
                </div>

                <div className="mt-6 mb-2 flex items-center gap-2">
                  <span className="font-medium">You'll receive</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <CircleQuestionMark className="size-4 text-blue-600 cursor-pointer" />
                    </TooltipTrigger>

                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        Depending on hours billed, amount shown may vary
                        slightly due to rounding.
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
                        If you go over this weekly limit, your client will need
                        to manually approve the extra hours you worked.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <p className="text-sm text-slate-600 mb-2">
                  Total number of hours you estimate working on this contract
                  per week. You'll log hours worked each week manually.
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
                        when the end date is reached but the contract will not
                        be officially ended until it is done by the client or
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
                    setFormData({ ...formData, endDateType: value as any })
                  }
                />

                <DatePicker
                  name="endDate"
                  classname="w-52! mt-6!"
                  placeholder="Select"
                  value={formData.endDate}
                  onChange={(value) =>
                    setFormData({ ...formData, endDate: value as any })
                  }
                />
              </div>
            </>
          )}
        </form>

        <DrawerFooter>
          <div className="flex w-full justify-end">
            <Button
              type="primary"
              label="Next"
              classname="text-sm! font-medium! px-8! py-3! rounded-md!"
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
