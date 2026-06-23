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
import NewContractReview from "../NewContractReview";
import { createEmptyMilestone, Milestone } from "@/types/milestone";
import NewContractEmailPreview from "../NewContractEmailPreview";

export default function NewContractFormDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<
    "new" | "milestone" | "review" | "email-preview"
  >("new");
  const [newContractFormData, setNewContractFormData] = useState<any>({
    clientFirstName: null,
    clientEmail: null,
    description: null,
    budgetType: "fixed",
    hourlyRate: null,
    receivedHourlyRate: null,
  });
  const [milestones, setMilestones] = useState<Milestone[]>([
    createEmptyMilestone(),
  ]);

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
      setMilestones([createEmptyMilestone()]);
    }
  }, [open]);

  const handleMilestoneChange = (
    index: number,
    updates: Partial<Milestone>
  ) => {
    setMilestones((previousMilestones) =>
      previousMilestones.map((milestone, milestoneIndex) =>
        milestoneIndex === index ? { ...milestone, ...updates } : milestone
      )
    );
  };

  const handleAddMilestone = () => {
    setMilestones((previousMilestones) => [
      ...previousMilestones,
      createEmptyMilestone(),
    ]);
  };

  const handleBack = () => {
    if (step === "review" && newContractFormData.budgetType === "fixed") {
      setStep("milestone");
    } else if (step === "milestone") {
      setStep("new");
    } else if (step === "review") {
      if (newContractFormData.budgetType === "fixed") {
        setStep("milestone");
      } else {
        setStep("new");
      }
    } else if (step === "email-preview") {
      setStep("review");
    } else {
      setStep("new");
    }
  };

  const handleNext = () => {
    if (step === "new" && newContractFormData.budgetType === "fixed") {
      setStep("milestone");
    } else if (step === "review") {
      setStep("email-preview");
    } else {
      setStep("review");
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
        {step === "milestone" && (
          <NewContractMilestoneForm
            milestones={milestones}
            onMilestoneChange={handleMilestoneChange}
            onAddMilestone={handleAddMilestone}
          />
        )}
        {step === "review" && (
          <NewContractReview
            name={newContractFormData.name}
            description={newContractFormData.description}
            hourlyRate={newContractFormData.hourlyRate}
            weeklyLimit={newContractFormData.weeklyLimit}
            endDate={newContractFormData.endDate}
            clientEmail={newContractFormData.clientEmail}
            milestones={milestones}
            budgetType={newContractFormData.budgetType}
            totalAmount={milestones.reduce(
              (sum, milestone) => sum + milestone.amount,
              0
            )}
          />
        )}
        {step === "email-preview" && (
          <NewContractEmailPreview
            name={newContractFormData.name}
            amount={milestones.reduce(
              (sum, milestone) => sum + milestone.amount,
              0
            )}
            milestones={milestones}
            budgetType={newContractFormData.budgetType}
            weeklyLimit={newContractFormData.weeklyLimit}
          />
        )}

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
              label={step === "email-preview" ? "Send Contract" : "Next"}
              classname="text-sm! font-medium! px-8! py-3! rounded-md!"
              onClick={handleNext}
            />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
