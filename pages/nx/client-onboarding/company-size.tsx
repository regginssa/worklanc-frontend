import { Button, Input } from "@/components/atoms";
import { ClientOnboardingLayout } from "@/components/layouts";
import { useClientOnboarding } from "@/hooks/useClientOnboarding";
import type { ClientCompanySize } from "@/types/user";
import { isValidHttpUrl } from "@/utils/validateFreelancerProfileForms";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const sizes = [
  { label: "Just me", value: "just_me" },
  { label: "2 - 9", value: "2_9" },
  { label: "10 - 99", value: "10_99" },
  { label: "100 - 499", value: "100_499" },
  { label: "500 - 4999", value: "500_4999" },
  { label: "5000+", value: "5000_plus" },
] as const;

type CompanySizeErrors = {
  companyName?: string;
  companyWebsite?: string;
  companySize?: string;
};

export default function CompanySize() {
  const { account, saveStep, saving } = useClientOnboarding();
  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    companySize: "" as ClientCompanySize | "",
  });
  const [errors, setErrors] = useState<CompanySizeErrors>({});

  useEffect(() => {
    if (!account) return;
    setFormData({
      companyName: account.companyName || "",
      companyWebsite: account.companyWebsite || "",
      companySize: account.companySize || "",
    });
  }, [account]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...formData, [e.target.name]: e.target.value };
    setFormData(next);
    if (errors[e.target.name as keyof CompanySizeErrors]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const validate = () => {
    const nextErrors: CompanySizeErrors = {};

    if (!formData.companyName.trim()) {
      nextErrors.companyName = "Company name is required";
    }
    if (!formData.companyWebsite.trim()) {
      nextErrors.companyWebsite = "Website is required";
    } else if (!isValidHttpUrl(formData.companyWebsite.trim())) {
      nextErrors.companyWebsite = "Enter a valid website URL";
    }
    if (!formData.companySize) {
      nextErrors.companySize = "Company size is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validate()) return;
    await saveStep(
      {
        companyName: formData.companyName.trim(),
        companyWebsite: formData.companyWebsite.trim(),
        companySize: formData.companySize as ClientCompanySize,
      },
      "/nx/plans/client/business-plus/1mo-trial-net-new-1"
    );
  };

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
          value={formData.companyName}
          error={errors.companyName}
          required
          onChange={handleInputChange}
        />

        <Input
          type="url"
          name="companyWebsite"
          label="Website"
          labelClassName="mb-2! text-sm! font-medium!"
          value={formData.companyWebsite}
          error={errors.companyWebsite}
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
                className={`flex items-center gap-2 rounded-full border py-2 px-4 text-sm cursor-pointer transition-all duration-200 ${
                  formData.companySize === size.value
                    ? "border-blue-600 bg-blue-50 text-blue-700"
                    : "border-slate-300 hover:bg-slate-100"
                }`}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, companySize: size.value }));
                  if (errors.companySize) {
                    setErrors((prev) => ({ ...prev, companySize: undefined }));
                  }
                }}
              >
                <label className="cursor-pointer">{size.label}</label>
              </li>
            ))}
          </ul>
          {errors.companySize && (
            <div className="flex items-center gap-2 flex-1">
              <Icon
                icon="mdi:information-outline"
                width={16}
                className="text-red-500"
              />
              <p className="text-red-600 text-sm">{errors.companySize}</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          type="outline"
          label="Back"
          size="medium"
          classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
          onClick={() => window.history.back()}
        />
        <Button
          type="primary"
          label="Continue"
          classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          loading={saving}
          onClick={handleContinue}
        />
      </div>
    </ClientOnboardingLayout>
  );
}
