import { FreelancerSettingsLayout } from "@/components/layouts";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { Button } from "@/components/atoms";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/reui/stepper";
import { CheckIcon, LoaderCircleIcon, ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";

const steps = [
  {
    title: "Show us a government-issued photo ID",
    description:
      "We'll check that the country where your ID is from matches the country in your profile.",
  },
  {
    title: "Appear on camera",
    description:
      "To show us it's really you, take an automatic selfie or join a video chat.",
  },
  {
    title: "Submit for identity review",
    description:
      "If we can't instantly verify you, we'll start a manual review process.",
  },
];

export default function IdentityVerification() {
  const router = useRouter();
  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Identity Verification - Worklanc",
        description: "Identity Verification - Worklanc",
        url: "/ab/identity-verification",
      }}
    >
      <h2 className="text-3xl font-medium">Identity Verification</h2>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-medium">
            Stand out to clients. Build trust. Get hired faster.
          </h3>

          <p className="text-sm text-slate-600">
            An Identity Verification Badge can help increase your visibility
            with clients in search results and build trust with them. Learn more
            about the{" "}
            <Link href="#" className="text-blue-600 underline cursor-pointer">
              benefits of an IDV Badge.
            </Link>
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <p className="text-slate-600">Your status</p>
          <div className="flex items-center gap-2">
            <Icon
              icon="solar:verified-check-bold-duotone"
              className="w-6 h-6 text-slate-400"
            />
            <span className="">Unverified</span>
          </div>

          <div>
            <p>An identity verification costs 35 Connects. You have 0.</p>
            <p className="text-slate-600 text-xs">
              Learn more about{" "}
              <Link
                href="#"
                className="text-blue-600 underline cursor-pointer text-sm"
              >
                Connects
              </Link>
              .
            </p>
          </div>
        </div>

        <Button
          type="primary"
          label="Buy connects to get IDV Badge"
          classname="py-2.5! px-10! font-medium! text-sm! rounded-md!"
          onClick={() => router.push("/nx/plans/connects/buy")}
        />

        <div className="bg-slate-300 h-[1px] w-full"></div>

        <h3 className="text-2xl font-medium">How it works</h3>

        <Stepper
          className="gap-10"
          defaultValue={0}
          orientation="vertical"
          indicators={{
            completed: <CheckIcon className="size-3.5" />,
            loading: <LoaderCircleIcon className="size-3.5 animate-spin" />,
          }}
        >
          <StepperNav>
            {steps.map((step, index) => (
              <StepperItem
                key={index}
                step={index + 1}
                className="relative items-start not-last:flex-1"
              >
                <StepperTrigger className="items-start gap-2.5 pb-10 last:pb-0">
                  <StepperIndicator className="data-[state=completed]:bg-success data-[state=completed]:text-white">
                    {index + 1}
                  </StepperIndicator>
                  <div className="-mt-1 text-left">
                    <StepperTitle className="text-lg text-slate-600">
                      {step.title}
                    </StepperTitle>
                    <StepperDescription className="text-base text-slate-600">
                      {step.description}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                {index < steps.length - 1 && (
                  <StepperSeparator className="group-data-[state=completed]/step:bg-success absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)]" />
                )}
              </StepperItem>
            ))}
          </StepperNav>
        </Stepper>

        <p className="text-sm text-slate-600">
          Once you pass ID verification, your IDV Badge will be active for 3
          years. We'll remind you when it's time to renew. Have questions?{" "}
          <Link href="#" className="text-blue-600 underline cursor-pointer">
            Learn about identity verification.
          </Link>
        </p>

        <div className="flex items-start gap-2">
          <ShieldCheck className="w-5 h-5 text-slate-800" />
          <span className="text-sm text-slate-600">
            We encrypt your data and will securely share it with our ID
            verification partner.{" "}
            <Link href="#" className="text-blue-600 underline cursor-pointer">
              Privacy Policy
            </Link>
          </span>
        </div>
      </div>
    </FreelancerSettingsLayout>
  );
}
