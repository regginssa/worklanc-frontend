import { TSEO } from "@/types/components.types";
import FreelancerLayout from ".";
import { Stepper } from "@/components/atoms";

interface ProjectDashboardOnboardingLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  currentStep: number;
}

export default function ProjectDashboardOnboardingLayout({
  children,
  seo,
  currentStep,
}: ProjectDashboardOnboardingLayoutProps) {
  return (
    <FreelancerLayout seo={seo}>
      <Stepper
        steps={[
          { title: "Overview" },
          { title: "Pricing" },
          { title: "Gallery" },
          { title: "Requirements" },
          { title: "Description" },
          { title: "Review" },
        ]}
        currentStep={currentStep}
      />
      <div className="h-4"></div>
      {children}
    </FreelancerLayout>
  );
}
