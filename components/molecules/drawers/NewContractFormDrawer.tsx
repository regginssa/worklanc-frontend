import { Button } from "@/components/atoms";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { ArrowLeftIcon } from "lucide-react";
import NewContractForm from "../NewContractForm";
import NewContractMilestoneForm from "../NewContractMilestoneForm";
import { useEffect, useState } from "react";

export default function NewContractFormDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"new" | "milestone" | "review">("new");
  const [newContractFormData, setNewContractFormData] = useState<any>({
    clientFirstName: null,
    clientEmail: null,
    description: null,
    budgetType: "fixed",
    hourlyRate: null,
    receivedHourlyRate: null,
  });

  useEffect(() => {
    if (open) {
      setStep("new");
      setNewContractFormData({
        clientFirstName: null,
        clientEmail: null,
        description: null,
        budgetType: "fixed",
        hourlyRate: null,
        receivedHourlyRate: null,
      });
    }
  }, [open]);

  const handleBack = () => {
    if (step === "review" && newContractFormData.budgetType === "fixed") {
      setStep("milestone");
    } else {
      setStep("new");
    }
  };

  const handleNext = () => {
    if (step === "new") {
      if (newContractFormData.budgetType === "fixed") {
        setStep("milestone");
      } else {
        setStep("review");
      }
    }
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

        {step === "new" && (
          <NewContractForm
            formData={newContractFormData}
            onFormDataChange={setNewContractFormData}
          />
        )}
        {step === "milestone" && <NewContractMilestoneForm />}

        <DrawerFooter>
          <div className="flex w-full justify-end gap-4">
            {step !== "new" && (
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="text-sm! font-medium! px-8! py-3! rounded-md!"
                onClick={handleBack}
              />
            )}
            <Button
              type="primary"
              isSubmit
              label="Next"
              classname="text-sm! font-medium! px-8! py-3! rounded-md!"
              onClick={handleNext}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
