import { Button, Dropdown, Input } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import Link from "next/link";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { ArrowRight, Star } from "lucide-react";
import { useState } from "react";
import { addYears, formatDate } from "date-fns";

const CONNECT_OPTIONS = [
  { label: "100 for $15", value: 100 },
  { label: "200 for $25", value: 200 },
  { label: "300 for $35", value: 300 },
  { label: "400 for $45", value: 400 },
  { label: "500 for $55", value: 500 },
];

export default function Buy() {
  const [formData, setFormData] = useState({
    connectAmount: 100,
    promoCode: "",
  });
  const router = useRouter();

  return (
    <FreelancerLayout
      seo={{
        title: "Buy Connects - Worklanc",
        description: "Buy Connects - Worklanc",
        url: "nx/plans/connects/buy",
      }}
    >
      <div className="rounded-3xl border border-slate-300 p-8 space-y-8">
        <div className="flex items-start justify-between">
          <div className="space-y-8">
            <h1 className="text-3xl font-medium">Buy Connects</h1>
            <div className="text-sm">
              <p>Your available Connects</p>
              <p className="mt-2 text-slate-600">0</p>
            </div>
          </div>

          <div className="max-w-md cursor-pointer freelancer-plus-alert text-white rounded-lg shadow-lg p-4 gap-3 flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <Star className="size-4" />
                <span className="uppercase text-xs">
                  Get 50% off one month of freelancer plus
                </span>
              </div>

              <p className="text-sm">
                100 Connects included monthly. Plus members win 40% more
                contracts on average. Limited time offer.
              </p>
            </div>

            <Link href="#">
              <ArrowRight className="size-6" />
            </Link>
          </div>
        </div>

        <Dropdown
          label="Select the amount to buy"
          labelClassName="mb-2"
          name="amount"
          options={CONNECT_OPTIONS}
          value={formData.connectAmount}
          classname="w-1/3!"
          onSelect={(value) =>
            setFormData({ ...formData, connectAmount: value })
          }
        />

        <div className="text-sm">
          <p>Your account will be charged</p>
          <p className="mt-2 text-slate-600">$15.00</p>
        </div>

        <div className="text-sm">
          <p>Your new Connects balance will be</p>
          <p className="mt-2 text-slate-600">100</p>
        </div>

        <div className="text-sm">
          <p>These Connects will expire on</p>
          <p className="mt-2 text-slate-600">
            {formatDate(addYears(new Date(), 1), "MMM d, yyyy")}
          </p>
        </div>

        <div className="flex items-end gap-6">
          <Input
            type="text"
            label="Promo code"
            name="promoCode"
            placeholder="Enter code"
            classname="w-1/3!"
            labelClassName="text-sm! mb-2! font-medium!"
            value={formData.promoCode}
            onChange={(e: any) =>
              setFormData({ ...formData, promoCode: e.target.value })
            }
          />

          <Button
            type="outline"
            label="Apply"
            size="medium"
            classname="py-0! h-10! px-5! rounded-full! text-sm! font-medium!"
          />
        </div>

        <div className="flex items-center gap-2 text-sm">
          <p className="text-slate-600">
            This bundle of Connects will expire 1 year from today. Unused
            Connects rollover to the next month.
          </p>
          <Link href="#" className="underline text-slate-900">
            Learn more
          </Link>
        </div>

        <p className="text-sm text-slate-600">
          You're authorizing Worklanc to charge your account. If you have
          sufficient funds, we will withdraw from your account balance. If not,
          the full amount will be charged to your primary billing method.{" "}
          <Link href="#" className="underline text-slate-900">
            Learn more
          </Link>
        </p>

        <div className="flex items-center justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 cursor-pointer text-sm font-medium py-2.5! px-5!"
          >
            Cancel
          </motion.button>

          <Button
            type="primary"
            label="Buy Connects"
            classname="py-2.5! px-5! font-medium! text-sm! rounded-full!"
            onClick={() => router.push("/nx/plans/connects/buy")}
          />
        </div>
      </div>
    </FreelancerLayout>
  );
}
