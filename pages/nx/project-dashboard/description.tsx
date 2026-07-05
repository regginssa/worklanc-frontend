import { Button } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { Check, Plus } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/router";

export default function Description() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("/nx/project-dashboard/pricing");
  };

  return (
    <ProjectDashboardOnboardingLayout
      seo={{
        title: "Project Catalog - Worklanc",
        description: "Project Catalog - Worklanc",
        url: "/nx/project-dashboard/pricing",
      }}
      currentStep={5}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Project description</h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="solar:eye-linear"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <h5 className="text-2xl font-medium">
              Tell the client what you need to get started
            </h5>

            <div className="flex items-center justify-between">
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
              />

              <div className="flex items-center gap-8">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  className="py-2.5 text-sm font-medium text-blue-600 cursor-pointer"
                >
                  Save & Exit
                </motion.button>
                <Button
                  type="primary"
                  isSubmit
                  label="Save & Continue"
                  classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                  onClick={() => router.push("/nx/project-dashboard/pricing")}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="flex-1 pl-10 space-y-10">
          <h2 className="text-2xl font-semibold">Project details</h2>

          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Add more details about your offering and why clients should work
                with you.
              </span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Show potential clients the steps you take to complete your
                project.
              </span>
            </li>

            <li className="flex items-start gap-2 text-slate-800 font-light">
              <Check className="size-6" />
              <span className="flex-1 text-base">
                Address common client questions to save the back and forth.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}
