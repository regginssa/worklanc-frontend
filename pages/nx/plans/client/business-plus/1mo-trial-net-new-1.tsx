import { Button, Checkbox } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import PeopleImage from "@/public/assets/webps/people/people.webp";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useClientOnboarding } from "@/hooks/useClientOnboarding";

const VERIFY_PHONE_PATH = "/nx/client-onboarding/verify-phone";

export default function OneMonthTrialNetNew1() {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const { saveStep, goBack, isLoading } = useClientOnboarding();

  const handleContinueBasic = async () => {
    await saveStep({ membershipTier: "basic" }, VERIFY_PHONE_PATH, "basic");
  };

  const handleStartTrial = async () => {
    if (!checked) return;
    setOpen(false);
    await saveStep({ membershipTier: "plus" }, VERIFY_PHONE_PATH, "trial");
  };

  return (
    <ClientLayout
      seo={{
        title: "Business Plus - New 1 Month Trial",
        description: "Business Plus - New 1 Month Trial",
        url: "/nx/plans/client/business-plus/1mo-trial-net-new-1",
      }}
    >
      <div className="flex items-stretch gap-0 flex-1 h-full">
        <div className="w-3/5 min-h-[32rem] flex flex-col shadow-xl bg-white rounded-3xl overflow-hidden">
          <main className="flex-1 mt-8 w-[80%] mx-auto">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <p className="uppercase text-sm">
                  Designed for businesses like yours
                </p>
                <h1 className="text-3xl font-medium">
                  Business Plus makes hiring easier from day one
                </h1>
                <p className="text-xl font-medium">Try it for 30 days on us</p>
              </div>

              <ul className="">
                <li className="py-6 border-b border-slate-300 text-sm">
                  Get all of the standard features, plus:
                </li>

                <li className="py-6 border-b border-slate-300 space-y-1">
                  <h3 className="text-lg font-medium">
                    A faster path to top talent
                  </h3>
                  <p className="text-sm text-slate-900">
                    Get instant access to pre-vetted freelancers, across 125+
                    categories and 10,000 in-demand skills.
                  </p>
                </li>

                <li className="py-6 border-b border-slate-300 space-y-1">
                  <h3 className="text-lg font-medium">
                    Curated matches, delivered for you
                  </h3>
                  <p className="text-sm text-slate-900">
                    Uma, our AI recruiter, invites top-matching freelancers and
                    delivers a shortlist tailored to your job.
                  </p>
                </li>

                <li className="py-6 space-y-1">
                  <h3 className="text-lg font-medium">
                    Built for teams to hire together
                  </h3>
                  <p className="text-sm text-slate-900">
                    Give teammates the right access to collaborate on hiring and
                    manage ongoing work.
                  </p>
                </li>
              </ul>

              <div className="flex items-center gap-4">
                <Button
                  type="outline"
                  label="Back"
                  size="medium"
                  classname="rounded-full! px-4! py-2.5! text-sm! font-medium!"
                  loading={isLoading("back")}
                  onClick={() => goBack("/nx/client-onboarding/company-size", "back")}
                />

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 font-medium py-2.5 text-sm px-4 cursor-pointer disabled:opacity-50"
                  disabled={isLoading("basic")}
                  onClick={handleContinueBasic}
                >
                  {isLoading("basic") ? "Loading…" : "Continue with Basic"}
                </motion.button>

                <Button
                  type="primary"
                  label="Start Business Plus trial"
                  classname="py-2.5! px-4! font-medium! text-sm! rounded-full!"
                  onClick={() => setOpen(true)}
                />
              </div>
            </div>
          </main>

          <footer className="w-[80%] mx-auto py-6">
            <p className="text-xs">
              During this period, the applicable Business Plus fee is 3% if
              paying by ACH, or 5% if paying by any other method, applies to all
              service contracts and transactions subject to the client service
              fee. After the 30-day trial ends, the Business Plus fee increases
              to 8% if paying by ACH, or 10% if paying by any other method,
              unless canceled. We'll send a reminder before the trial ends.
              Cancel anytime. Learn more about Worklanc plans.
            </p>
          </footer>
        </div>
        <div className="flex-1 min-h-[32rem] flex flex-col items-center justify-center rounded-3xl overflow-hidden">
          <Image
            src={PeopleImage}
            alt="People"
            className="w-full h-[626px] object-cover object-left"
          />
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-2xl">
              Start 30-day Business Plus trial
            </DialogTitle>
            <DialogDescription>
              After 30 days, your plan will continue at the standard Business
              Plus rate unless your change or cancel. We’ll send a reminder
              before the trial ends.
            </DialogDescription>
          </DialogHeader>

          <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto flex items-start gap-4">
            <Checkbox checked={checked} onCheck={() => setChecked(!checked)} />

            <div>
              <p className="text-sm">
                By checking the box, you authorize Worklanc to charge your
                primary or selected billing method the applicable Business Plus
                Promotional Fee during the 30-day promotional period: 3% if
                paying by ACH, or 5% if paying by any other method, on all
                service contracts and transactions subject to the client service
                fee.
              </p>
              <p className="text-xs text-slate-600 mt-1">
                By checking the box, you authorize Worklanc to charge your
                primary or selected billing method the applicable Business Plus
                Promotional Fee during the 30-day promotional period: 3% if
                paying by ACH, or 5% if paying by any other method, on all
                service contracts and transactions subject to the client service
                fee. After your 30-day promotional period ends, the standard
                Business Plus Fee of 8% if paying by ACH or 10% if paying by any
                other method, will apply automatically, and your plan will renew
                on a 30-day cycle at that fee rate. You may cancel or change
                your plan at any time before or after the promotional period
                ends. Our standard Fees Terms apply.
              </p>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="py-2.5 px-5 font-medium text-sm cursor-pointer"
              >
                Close
              </motion.button>
            </DialogClose>

            <Button
              type="primary"
              label="Start Business Plus trial"
              classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
              disabled={!checked}
              loading={isLoading("trial")}
              onClick={handleStartTrial}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
}
