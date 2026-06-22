import { FreelancerLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { ChevronRight } from "lucide-react";
import PaperPlanesIcon from "@/public/assets/svgs/icons/other/paper_planes.svg";
import Image from "next/image";
import { Button } from "@/components/atoms";
import Link from "next/link";
import PayIcon from "@/public/assets/svgs/icons/other/pay.svg";
import SecurePaymentIcon from "@/public/assets/svgs/icons/other/secure_payment.svg";
import FeedbackIcon from "@/public/assets/svgs/icons/other/feedback.svg";
import HeadsetIcon from "@/public/assets/svgs/icons/other/headset.svg";
import CardsLockIcon from "@/public/assets/svgs/icons/other/cards_lock.svg";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export default function ContractsPage() {
  const [fundOpen, setFundOpen] = useState(false);

  return (
    <FreelancerLayout
      seo={{
        title: "Worklanc",
        description: "Contracts management",
        url: "/ab/flservices/contracts",
      }}
    >
      <div className="freelancer-plus-alert p-4 flex items-center justify-between text-white rounded-md">
        <div className="flex items-center gap-4">
          <Icon icon="fa-regular:paper-plane" className="size-5" />
          <p className="text-sm">
            Pay 0% in service fees on Direct Contracts when you join Freelancer
            Plus.
          </p>
        </div>

        <button className="text-sm underline cursor-pointer flex items-center gap-2">
          Upgrade membership
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="border border-slate-300 rounded-md py-10 px-4 flex flex-col items-center justify-center gap-10">
        <div className="space-y-10">
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src={PaperPlanesIcon}
              alt="Paper planes"
              className="w-[145px] h-[130px]"
            />

            <h1 className="text-4xl font-medium text-blue-800">
              Direct Contracts
            </h1>
            <p className="font-medium">
              Securely create contracts and quickly collect payment for
              non-Worklanc projects.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button
              type="outline"
              label="Share profile"
              size="medium"
              icon="mdi:share-variant-outline"
              classname="h-10! rounded-md! text-sm! font-medium!"
            />
            <Button
              type="primary"
              label="Create a contract"
              classname="h-10! rounded-md! text-sm! font-medium!"
            />
          </div>
        </div>

        <div className="space-y-10 w-full flex flex-col items-center justify-center">
          <h2 className="text-3xl font-medium">How it works</h2>

          <div className="grid grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-semibold">1</span>
                <span className="size-2 bg-red-600 mb-1"></span>
              </div>

              <p className="font-medium">
                Create and send a contract to your non-Worklanc client.
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-semibold">2</span>
                <span className="size-2 bg-green-600 mb-1"></span>
              </div>

              <p className="font-medium">
                Your client creates an account to accept the contract and then{" "}
                <button
                  className="cursor-pointer text-blue-600 underline inline-block"
                  onClick={() => setFundOpen(true)}
                >
                  funds the project
                </button>
                .
              </p>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex items-end gap-1">
                <span className="text-3xl font-semibold">3</span>
                <span className="size-2 bg-blue-600 mb-1"></span>
              </div>

              <p className="font-medium">
                You'll get paid when you complete the work.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-10">
          <h2 className="text-3xl font-medium">Why use Direct Contracts?</h2>
          <div className="grid grid-cols-2 gap-10 max-w-5xl">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src={PayIcon} alt="Pay" className="w-[120px] h-[95px]" />
              <div className="text-center text-lg font-medium">
                <h3>5% service fee</h3>
                <p>
                  *waived for{" "}
                  <Link
                    href="#"
                    className="text-blue-600 cursor-pointer underline"
                  >
                    Freelancer Plus subscribers
                  </Link>
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={SecurePaymentIcon}
                alt="Secure Payment"
                className="w-[120px] h-[95px]"
              />
              <div className="text-center text-lg font-medium">
                <h3>Get paid securely</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={FeedbackIcon}
                alt="Feedback"
                className="w-[120px] h-[95px]"
              />
              <div className="text-center text-lg font-medium">
                <h3>Client feedback counts toward your Job Success Score</h3>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                src={HeadsetIcon}
                alt="Headset"
                className="w-[120px] h-[95px]"
              />
              <div className="text-center text-lg font-medium">
                <h3>Dispute assistance</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-300 h-[1px] w-full"></div>

        <div className="flex flex-col items-center justify-center gap-10">
          <h2 className="text-3xl font-medium">Try Direct Contracts</h2>

          <Button
            type="primary"
            label="Create a contract"
            classname="rounded-md! text-sm! font-medium!"
          />
        </div>
      </div>

      <Dialog open={fundOpen} onOpenChange={setFundOpen}>
        <DialogContent className="min-w-3xl">
          <div className="p-10 flex flex-col items-center justify-center gap-10">
            <Image
              src={CardsLockIcon}
              alt="Cards Lock"
              className="w-[145px] h-[130px]"
            />
            <h2 className="text-3xl font-medium">How project funds work</h2>
            <p className="font-medium text-center">
              When your client funds a Direct Contract, the money is paid into a
              secure holding place until the project is completed.
              <br />
              <br />
              When you finish the project, you request payment from your client
              and once approved, the funds are paid into your account. If they
              don't take action within 14 days, the funds will be released to
              you.
            </p>

            <Button
              type="primary"
              label="Got it!"
              classname="px-5! py-2.5! rounded-md! text-sm! font-medium!"
              onClick={() => setFundOpen(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </FreelancerLayout>
  );
}
