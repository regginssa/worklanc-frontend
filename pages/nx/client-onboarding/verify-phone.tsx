import { Button, PhoneInput } from "@/components/atoms";
import { ClientOnboardingLayout } from "@/components/layouts";
import { useState } from "react";
import PhoneIcon from "@/public/assets/svgs/icons/other/phone_sms.svg";
import Image from "next/image";

export default function VerifyPhone() {
  const [phoneNumber, setPhoneNumber] = useState<any>(null);

  return (
    <ClientOnboardingLayout
      centered
      seo={{
        title: "Verify your phone - Worklanc",
        description: "Verify your phone - Worklanc",
        url: "/nx/client-onboarding/verify-phone",
      }}
    >
      <Image src={PhoneIcon} alt="Phone" className="w-[145px] h-[130px]" />
      <h1 className="text-xl font-medium text-center">
        Please verify your phone number
      </h1>
      <p className="text-sm text-slate-600 text-center">
        We'll text you a code to verify your number.
      </p>
      <PhoneInput
        defaultCountry="US"
        value={phoneNumber}
        onChange={(value) => setPhoneNumber(value)}
      />
      <p className="text-sm text-slate-600 text-center">
        Messaging rates may apply. We'll use this number for verification
        purposes only — we won't share it or use it for marketing.
      </p>

      <Button
        type="primary"
        label="Send code"
        classname="py-2! px-5! rounded-full! text-sm! font-medium!"
      />
    </ClientOnboardingLayout>
  );
}
