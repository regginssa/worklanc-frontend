import { Button, PhoneInput } from "@/components/atoms";
import { ClientOnboardingLayout } from "@/components/layouts";
import { useClientOnboarding } from "@/hooks/useClientOnboarding";
import AuthAPI from "@/lib/api/auth";
import { useState } from "react";
import PhoneIcon from "@/public/assets/svgs/icons/other/phone_sms.svg";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setUser } from "@/store/slices/userSlice";

export default function VerifyPhone() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { complete, goBack, isLoading } = useClientOnboarding();
  const [phoneNumber, setPhoneNumber] = useState<any>(user?.phone || null);
  const [error, setError] = useState<string | null>(null);

  const handleSendCode = async () => {
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }

    const me = await AuthAPI.updateMe({
      phone: String(phoneNumber),
      phoneVerified: true,
    });
    if (me?.user) {
      dispatch(setUser(me.user));
    }

    await complete({}, "/nx/job-post/instant/welcome", "send");
  };

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
        error={error || undefined}
        onChange={(value) => {
          setPhoneNumber(value);
          if (error) setError(null);
        }}
      />
      <p className="text-sm text-slate-600 text-center">
        Messaging rates may apply. We'll use this number for verification
        purposes only — we won't share it or use it for marketing.
      </p>

      <div className="flex w-full items-center justify-between">
        <Button
          type="outline"
          label="Back"
          size="medium"
          classname="rounded-full! px-5! py-2! text-sm! font-medium!"
          loading={isLoading("back")}
          onClick={() =>
            goBack("/nx/plans/client/business-plus/1mo-trial-net-new-1", "back")
          }
        />
        <Button
          type="primary"
          label="Send code"
          classname="py-2! px-5! rounded-full! text-sm! font-medium!"
          loading={isLoading("send")}
          onClick={handleSendCode}
        />
      </div>
    </ClientOnboardingLayout>
  );
}
