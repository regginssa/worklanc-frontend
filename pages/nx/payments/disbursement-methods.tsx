import { Button } from "@/components/atoms";
import { FreelancerSettingsLayout } from "@/components/layouts";
import TaxIcon from "@/public/assets/svgs/icons/other/tax.svg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

export default function DisbursementMethods() {
  return (
    <FreelancerSettingsLayout
      seo={{
        title: "Withdrawals - Worklanc",
        description: "Withdrawals - Worklanc",
        url: "/nx/payments/disbursement-methods",
      }}
    >
      <h2 className="text-3xl font-medium">Withdrawals</h2>

      <div className="bg-slate-50 rounded-3xl p-8 flex items-start gap-10">
        <div className="flex-1 space-y-8">
          <div className="space-y-4">
            <h3 className="text-3xl font-medium">
              Complete your tax profile to access funds in your account
            </h3>
            <p className="text-sm font-light">
              You need to validate your tax information to comply with local tax
              authorities before adding a withdrawal method.
            </p>
          </div>

          <Button
            type="primary"
            label="Tax information"
            icon="mdi:external-link"
            classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
            onClick={() => {}}
          />
        </div>

        <Image src={TaxIcon} alt="Tax icon" className="w-[200px] h-auto" />
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl border border-slate-300 space-y-2">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xl font-medium">Available balance</h4>
              <Icon icon="mdi:dollar" className="size-6" />
            </div>

            <p className="text-2xl font-medium text-blue-600">$0.00</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">+$0.00 pending</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icon
                    icon="mdi:information-outline"
                    className="size-4 cursor-pointer text-slate-600"
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Pending payments become available for you after they've
                    successfully passed through the security period.
                    <br />
                    <Link href="#" className="underline cursor-pointer">
                      Learn more
                    </Link>
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-yellow-50 flex items-start gap-2">
            <Icon icon="mdi:information" className="size-5 text-yellow-500" />
            <p className="flex-1 text-sm font-medium">
              To withdraw earnings, please update your{" "}
              <Link href="#" className="underline cursor-pointer">
                tax information
              </Link>
              . For more details, read our{" "}
              <Link href="#" className="underline cursor-pointer">
                FAQs
              </Link>
              .
            </p>
          </div>

          <Link
            href="#"
            className="block text-sm underline cursor-pointer hover:text-blue-600"
          >
            View my earnings
          </Link>
        </div>
        <div className="p-8 rounded-3xl border border-slate-300 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-medium">Withdrawal schedule</h4>
            <Icon icon="mdi:clock-arrow" className="size-5" />
          </div>

          <p className="text-sm text-slate-600 font-light">
            You haven't set up a schedule yet. You'll be able to set it up once
            you've added a withdrawal method.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl border border-slate-300 space-y-4">
        <h4 className="text-xl font-medium">Recent withdrawals</h4>
        <p className="text-sm text-slate-600 font-light">
          You haven't made any withdrawals yet.
        </p>
      </div>

      <div className="p-8 rounded-3xl border border-slate-300 space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-4">
            <h4 className="text-xl font-medium">Withdrawal methods</h4>
            <p className="text-sm text-slate-600 font-light">
              You haven't set up any withdrawal methods yet.
            </p>
          </div>
          <Button
            type="primary"
            label="Add a method"
            classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
            onClick={() => {}}
          />
        </div>
      </div>
    </FreelancerSettingsLayout>
  );
}
