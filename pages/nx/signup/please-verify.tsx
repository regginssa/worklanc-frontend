import { Button, Input } from "@/components/atoms";
import { OnboardingLayout } from "@/components/layouts/auth/OnboardingLayout";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/router";

const PleaseVerify = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  return (
    <OnboardingLayout
      seo={{
        title: "Please verify your email",
        description: "",
        url: "/nx/signup/please-verify",
      }}
      showFooter
    >
      <Icon icon="material-symbols-light:mail-shield-outline" width={120} />
      <div className="flex flex-col items-center justify-center mt-8 gap-8">
        <h3 className="text-lg">Verify your email to continue</h3>
        <div className="text-sm text-slate-600 text-center">
          <p>We just sent an email to the address: owner@charlieunicornai.eu</p>
          <p>
            Please check your email and select the link provided to verify your
            address
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Button
            type="primary"
            label="Send again"
            classname="font-semibold! rounded-full! text-sm!"
            onClick={() => router.push("/nx/create-profile")}
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
                      We'll send the email from "WorkLanc", so you can quickly
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
                  onChange={(e: any) => setEmail(e.target.value)}
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
