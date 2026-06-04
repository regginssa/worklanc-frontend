import { Button, Input } from "@/components/atoms";
import { ClientOnboardingLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import { useState } from "react";

const sizes = [
  { label: "Just me", value: "just_me" },
  { label: "2 - 9", value: "2_9" },
  { label: "10 - 99", value: "10_99" },
  { label: "100 - 499", value: "100_499" },
  { label: "500 - 4999", value: "500_4999" },
  { label: "5000+", value: "5000_plus" },
];

export default function CompanySize() {
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    size: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <ClientOnboardingLayout
      seo={{
        title: "Create an Account - Worklanc",
        description: "Create a client account - Worklanc",
        url: "/nx/client-onboarding/company-size",
      }}
    >
      <div className="space-y-8 w-1/2">
        <h1 className="text-4xl font-medium">Welcome to Worklanc!</h1>
        <p className="text-sm">
          Tell us about your business and you'll be on your way to connect with
          talent.
        </p>

        <Input
          type="text"
          name="companyName"
          label="Company Name"
          labelClassName="mb-2! text-sm! font-medium!"
          value={formData.name}
          required
          onChange={handleInputChange}
        />

        <Input
          type="url"
          name="url"
          label="Website"
          labelClassName="mb-2! text-sm! font-medium!"
          value={formData.url}
          required
          onChange={handleInputChange}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            How many people are in your organization?
          </label>
          <ul className="flex items-center flex-wrap gap-2">
            {sizes.map((size) => (
              <li
                key={size.value}
                className="flex items-center gap-2 text-sm border border-slate-300 rounded-full py-2 px-4 cursor-pointer hover:bg-slate-100 transition-all duration-200"
              >
                <label htmlFor={size.value}>{size.label}</label>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          type="primary"
          label="Continue"
          classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          onClick={() =>
            router.push("/nx/plans/client/business-plus/1mo-trial-net-new-1")
          }
        />
      </div>
    </ClientOnboardingLayout>
  );
}
