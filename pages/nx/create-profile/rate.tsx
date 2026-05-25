import { Button, Input } from "@/components/atoms";
import { CreateProfileLayout } from "@/components/layouts/create-profile/CreateProfileLayout";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Rate() {
  const [formData, setFormData] = useState({
    rate: "",
    fee: "",
    estimated: "",
  });

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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
              onChange={handleInputChange}
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
              Fees vary and are shown before contract acceptance. $0.00 /hr per
              hour -$0.00/hr
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="fee"
              placeholder="$0.00"
              disabled={true}
              value={formData.fee}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
          classname="font-medium! text-sm! py-2.5! px-5! rounded-full!"
          onClick={() => router.push("/nx/create-profile/location")}
        />
      </div>
    </CreateProfileLayout>
  );
}
