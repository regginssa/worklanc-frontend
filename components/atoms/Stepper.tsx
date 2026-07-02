import {
  Stepper as BaseStepper,
  StepperContent,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { Icon } from "@iconify/react";
import { LoaderCircleIcon } from "lucide-react";

const checkIndicator = <Icon icon="mdi:check" className="size-3.5" />;

export default function Stepper({
  steps,
  currentStep,
}: {
  steps: { title: string }[];
  currentStep: number;
}) {
  return (
    <BaseStepper
      className="w-full space-y-8"
      defaultValue={currentStep}
      indicators={{
        completed: checkIndicator,
        loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
      }}
    >
      <StepperNav>
        {steps.map((step, index) => (
          <StepperItem
            key={index}
            step={index + 1}
            disabled
            className="relative flex-1 items-start"
          >
            <StepperTrigger className="flex cursor-default flex-col gap-2.5 disabled:opacity-100">
              <StepperIndicator>{checkIndicator}</StepperIndicator>
              <StepperTitle>{step.title}</StepperTitle>
            </StepperTrigger>

            {steps.length > index + 1 && (
              <StepperSeparator className="group-data-[state=completed]/step:bg-primary absolute inset-x-0 top-3 left-[calc(50%+0.875rem)] m-0 group-data-[orientation=horizontal]/stepper-nav:w-[calc(100%-2rem+0.225rem)] group-data-[orientation=horizontal]/stepper-nav:flex-none" />
            )}
          </StepperItem>
        ))}
      </StepperNav>
    </BaseStepper>
  );
}
