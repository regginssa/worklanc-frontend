import { Button, Input } from "@/components/atoms";
import { OnboardingLayout } from "@/components/layouts/auth/OnboardingLayout";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/store/hooks";
import { getOnboardingDestination } from "@/utils/onboardingRedirect";
import { getVerifiedUserDestination } from "@/utils/user";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import VerifyEmailIcon from "@/public/assets/svgs/icons/other/verify_email.svg";

const PleaseVerify = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { user, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (status === "idle" || status === "loading") return;

    if (!user) {
      router.replace("/nx/login");
      return;
    }

    const destination = getVerifiedUserDestination(user);
    if (destination) {
      router.replace(destination);
    }
  }, [user, status, router]);

  if (status === "idle" || status === "loading" || !user) {
    return null;
  }

  if (getVerifiedUserDestination(user)) {
    return null;
  }

  const onboardingPath =
    getOnboardingDestination(user) ?? "/nx/client-onboarding/company-size";

  return (
    <OnboardingLayout
      seo={{
        title: "Please verify your email",
        description: "",
        url: "/nx/signup/please-verify",
      }}
      showFooter
    >
      <Image
        src={VerifyEmailIcon}
        alt="Verify email"
        className="w-[145px] h-[130px]"
      />
      <div className="flex flex-col items-center justify-center mt-8 gap-8">
        <h3 className="text-lg">Verify your email to continue</h3>
        <div className="text-sm text-slate-600 text-center">
          <p>
            We just sent an email to the address:{" "}
            <strong className="font-medium">{user.email}</strong>
          </p>
          <p>
            Please check your email and select the link provided to verify your
            address
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            label="Continue"
            classname="font-semibold! rounded-full! text-sm!"
            onClick={() => router.push(onboardingPath)}
          />
        </div>

        <Dialog>
          <DialogTrigger className="text-sm underline cursor-pointer">
            Didn't receive email?
          </DialogTrigger>
          <DialogContent className="min-w-xl">
            <DialogHeader className="p-2">
              <DialogTitle className="text-xl">
                Didn't receive email?
              </DialogTitle>
              <DialogDescription className="">
                Here are some tips to help you find it.
              </DialogDescription>
            </DialogHeader>

            <div className="px-6 py-4 space-y-6">
              <ul className="list-decimal text-sm space-y-4">
                <li>Resend the email</li>
                <li>
                  <div>
                    <p>Search for the email</p>
                    <p className="text-slate-700 mt-1">
                      We'll send the email from "Worklanc", so you can quickly
                      search for it. If it isn't in your inbox, check your
                      folders. If a spam filter or email rule moved the email,
                      it might be in Spam, Junk, Trash, Deleted Items, or
                      Archive folder.
                    </p>
                  </div>
                </li>
                <li>
                  <div>
                    <p>How do I confirm my email?</p>
                    <p className="text-slate-700 mt-1">
                      If you aren't able to click the link, copy the full URL
                      from email and paste it into a new web browser window.
                    </p>
                  </div>
                </li>
                <li>Change your email</li>
              </ul>

              <div className="flex items-center gap-4">
                <Input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  classname="w-2/3"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <Button
                  type="outline"
                  size="medium"
                  label="Update and reset"
                  classname="text-sm! rounded-full! h-10! whitespace-nowrap"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </OnboardingLayout>
  );
};

export default PleaseVerify;
