import { Button, Checkbox, Input } from "@/components/atoms";
import { ProjectDashboardOnboardingLayout } from "@/components/layouts";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AlertIcon from "@/public/assets/svgs/icons/other/alert.svg";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";

export default function Review() {
  const [formData, setFormData] = useState<any>({
    maxProjects: 3,
    termsOfService: false,
    privacyNotice: false,
  });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [submittingOpen, setSubmittingOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setConfirmOpen(true);
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
            <div className="space-y-4">
              <div className="space-y-2">
                <h5 className="text-xl font-medium">
                  Maximum number of simultaneous projects
                </h5>
                <p className="text-base text-slate-800">
                  How many projects can you handle at one time and still deliver
                  great results?
                </p>
              </div>

              <Input
                type="number"
                name="maxProjects"
                classname="w-40!"
                value={formData.maxProjects}
                onChange={(e) =>
                  setFormData({ ...formData, maxProjects: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <h5 className="text-xl font-medium">Copyright Notice</h5>
              <p className="text-base text-slate-800">
                By submitting your project, you declare that you either own or
                have rights to the material posted and that posting these
                materials does not infringe on any third party's rights. You
                also acknowledge that you understand your project will be
                reviewed and evaluated by Upwork to ensure it meets Upwork's
                requirements.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="text-xl font-medium">Terms of Service</h5>
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={formData.termsOfService}
                  onCheck={(val: boolean) =>
                    setFormData({ ...formData, termsOfService: val })
                  }
                />
                <span className="text-base flex-1">
                  I understand and agree to the{" "}
                  <Link
                    href="#"
                    className="text-blue-600 cursor-pointer underline"
                  >
                    Worklanc Terms of Service
                  </Link>
                  , including the{" "}
                  <Link
                    href="#"
                    className="text-blue-600 cursor-pointer underline"
                  >
                    User Agreement
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-blue-600 cursor-pointer underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xl font-medium">Privacy Notice</h5>
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={formData.privacyNotice}
                  onCheck={(val: boolean) =>
                    setFormData({ ...formData, privacyNotice: val })
                  }
                />
                <span className="text-base flex-1">
                  By submitting this project and activating it, I understand
                  that it will appear in Worklanc search results visible to the
                  general public and will show up in search engine results, even
                  if my profile visibility is set to Private or Worklanc Users
                  Only.
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="outline"
                label="Back"
                size="medium"
                classname="rounded-md! text-sm! font-medium! py-2.5! px-5!"
              />

              <div className="flex items-center gap-8">
                <Button
                  type="primary"
                  label="Save Project"
                  classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                />
                <Button
                  type="primary"
                  isSubmit
                  label="Submit for Review"
                  classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
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

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="flex min-w-3xl flex-col p-0! overflow-hidden!">
          <div className="flex items-stretch">
            <div className="w-2/5 bg-blue-800 flex flex-col items-center justify-center">
              <Image
                src={AlertIcon}
                alt="Alert"
                className="w-[145px] h-[130px]"
              />
            </div>
            <div className="flex-1 flex flex-col items-start justify-center px-10 pt-20 pb-10">
              <h1 className="text-2xl">
                Before you send your project for review
              </h1>
              <p className="text-base">
                Please ensure your project doesn't contain:
                <br />
                <br />
                Watermarked images Personally identifiable information in your
                description or images References to projects on other websites
                or platforms
              </p>

              <div className="flex items-center gap-2 justify-end mt-20 w-full">
                <button
                  className="cursor-pointer text-sm font-medium text-blue-600 hover:underline px-5 py-2.5"
                  onClick={() => setConfirmOpen(false)}
                >
                  Edit My Project
                </button>
                <Button
                  type="primary"
                  label="Send to Review"
                  classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={submittingOpen} onOpenChange={setSubmittingOpen}>
        <DialogContent className="flex min-w-3xl flex-col p-0! overflow-hidden!">
          <div className="flex flex-col items-center justify-center gap-8">
            <div></div>
            <h3 className="text-2xl">
              Congrats! You've successfully submitted your project!
            </h3>
            <p className="text-base">
              We'll let you know when your project has been approved
            </p>

            <Progress />
          </div>
        </DialogContent>
      </Dialog>
    </ProjectDashboardOnboardingLayout>
  );
}
