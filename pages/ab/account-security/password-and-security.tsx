import { Button } from "@/components/atoms";
import {
  ClientSettingsLayout,
  FreelancerSettingsLayout,
} from "@/components/layouts";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export default function PasswordAndSecurity() {
  const [accountType, setAccountType] = useState<"freelancer" | "client">(
    "client"
  );

  if (accountType === "freelancer") {
    return (
      <FreelancerSettingsLayout
        seo={{
          title: "Password and security - Worklanc",
          description: "Password and security - Worklanc",
          url: "/ab/account-security/password-and-security",
        }}
      >
        <Content />
      </FreelancerSettingsLayout>
    );
  }

  return (
    <ClientSettingsLayout
      seo={{
        title: "Password and security - Worklanc",
        description: "Password and security - Worklanc",
        url: "/ab/account-security/password-and-security",
      }}
    >
      <Content />
    </ClientSettingsLayout>
  );
}

const Content = () => {
  return (
    <>
      <h2 className="text-3xl font-medium">Password and security</h2>
      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <h3 className="text-2xl font-medium">Log in</h3>
        <div className="space-y-2">
          <h4 className="text-lg font-medium">Worklanc password</h4>
          <div className="flex items-center gap-1">
            <p className="text-sm text-slate-600">
              You've set an Upwork password.
            </p>
            <button className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">
              Change password
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium">Log in with Google</h4>
            <p className="text-slate-600 text-sm">
              Not connected. You can choose to log in with Google.
            </p>
          </div>

          <Button
            type="outline"
            label="Connect"
            size="medium"
            classname="py-2! px-10! font-medium! text-sm! rounded-md!"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-medium">Log in with Apple</h4>
            <p className="text-slate-600 text-sm">
              Not connected. You can choose to log in with Apple.
            </p>
          </div>

          <Button
            type="outline"
            label="Connect"
            size="medium"
            classname="py-2! px-10! font-medium! text-sm! rounded-md!"
          />
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <h3 className="text-2xl font-medium">Two-step verification</h3>

        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-lg font-medium">Mobile app notifications</h5>
            <p className="text-slate-600 text-sm mt-1">
              Verify notifications with your Worklanc mobile app.
            </p>
          </div>

          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h5 className="text-lg font-medium">Authenticator app codes</h5>
            <p className="text-slate-600 text-sm mt-1">
              Verify one-time codes generated in your preferred third party
              authenticator app.
            </p>
          </div>

          <Switch />
        </div>

        <div className="">
          <h5 className="text-lg font-medium">Security question and answer</h5>
          <p className="text-slate-600 text-sm mt-1">
            Set up a question to answer when you can't use your mobile device
            for two-step verification.{" "}
            <button className="text-blue-600 hover:underline font-medium cursor-pointer">
              Set question and answer
            </button>
          </p>
        </div>
      </div>
    </>
  );
};
