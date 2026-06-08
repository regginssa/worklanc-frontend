import { Button, Input } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useOnboarding } from "@/hooks/useOnboarding";
import {
  buildHourlyRateForm,
  SERVICE_FEE_PERCENT,
} from "@/utils/rate";

export default function Rate() {
  const [formData, setFormData] = useState(() => buildHourlyRateForm(""));

  const router = useRouter();
  const { profile, saveStep, saving } = useOnboarding();
  const seeded = useRef(false);

  useEffect(() => {
    if (!profile || seeded.current) return;
    seeded.current = true;
    if (profile.hourlyRate != null) {
      setFormData(buildHourlyRateForm(String(profile.hourlyRate)));
    }
  }, [profile]);

  const handleRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(buildHourlyRateForm(e.target.value));
  };

  const handleNext = () =>
    saveStep(
      { hourlyRate: formData.rate ? Number(formData.rate) : null },
      "/nx/create-profile/location"
    );
  return (
    <CreateProfileLayout
      title="Now, let’s set your hourly rate."
      description="Clients will see this rate on your profile and in search results once you publish your profile. You can adjust your rate every time you submit a proposal."
      currentStep={9}
      totalSteps={10}
      seo={{
        title: "Now, let’s set your hourly rate.",
        description:
          "Clients will see this rate on your profile and in search results once you publish your profile. You can adjust your rate every time you submit a proposal.",
        url: "/nx/create-profile/rate",
      }}
    >
      <ul className="">
        <li className="pb-6 flex items-center justify-between border-b border-slate-200">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium">Hourly rate</h3>
            <p className="text-sm text-slate-900">
              Total amount the client will see.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="rate"
              placeholder="$0.00"
              value={formData.rate}
              onChange={handleRateChange}
            />
            <span className="text-sm text-slate-600">/ hr</span>
          </div>
        </li>

        <li className="py-6 flex items-center justify-between border-b border-slate-200">
          <div className="">
            <h3 className="text-2xl font-medium mb-4">Service fee</h3>
            <p className="text-sm text-slate-900">
              This helps us run the platform and provide services like payment
              protection and customer support.
            </p>
            <p className="text-sm text-slate-900">
              {SERVICE_FEE_PERCENT}% service fee — ${formData.fee}/hr
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="fee"
              placeholder="$0.00"
              disabled={true}
              value={formData.fee}
              onChange={() => {}}
            />
            <span className="text-sm text-slate-600">/ hr</span>
          </div>
        </li>

        <li className="py-6 flex items-center justify-between border-b border-slate-200">
          <div className="">
            <h3 className="text-2xl font-medium mb-4">You'll get</h3>
            <p className="text-sm text-slate-900">
              The estimated amount you'll receive after service fees
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="estimated"
              placeholder="$0.00"
              disabled={true}
              value={formData.estimated}
              onChange={() => {}}
            />
            <span className="text-sm text-slate-600">/ hr</span>
          </div>
        </li>
      </ul>

      <div className="mt-20 flex items-center justify-between font-medium">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full text-sm border border-slate-400"
          onClick={() => router.back()}
        >
          Back
        </motion.button>

        <Button
          type="primary"
          label="Next, add your photo and location"
          loading={saving}
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={handleNext}
        />
      </div>
    </CreateProfileLayout>
  );
}
