import { Button } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Review() {
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
      currentStep={6}
    >
      <div className="flex items-start">
        <div className="w-3/4 pr-10 space-y-10 border-r border-slate-400">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-semibold">Finalize</h1>
            <Button
              type="outline"
              label="Preview project"
              size="medium"
              icon="solar:eye-linear"
              classname="rounded-md! text-sm! font-medium! py-2.5! px-6!"
            />
          </div>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="rounded-md! text-sm! font-medium! py-2.5! px-5!"
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
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Your project visibility</h2>
            <p className="text-base">
              When you have reached your project maximum, your project will
              automatically be hidden from other clients. As soon as you
              complete an open project, your project will once again be viewable
              by clients.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Download the mobile app</h2>
            <p className="text-base">
              Don't forget to{" "}
              <Link href="#" className="cursor-pointer underline text-blue-600">
                download the mobile app
              </Link>{" "}
              and turn on notifications so you know when a client purchases your
              project so you can get ready to start working!
            </p>
          </div>
        </div>
      </div>
    </ProjectDashboardOnboardingLayout>
  );
}
