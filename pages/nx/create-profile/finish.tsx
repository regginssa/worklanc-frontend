import { Button } from "@/components/atoms";
import { CreateProfilePageLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import Image from "next/image";
import UserPic1 from "@/public/assets/webps/avatars/resume-import.webp";
import UserPic2 from "@/public/assets/webps/avatars/man2.webp";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Finish() {
  const router = useRouter();

  return (
    <CreateProfilePageLayout
      seo={{
        title: "Your profile's ready",
        description:
          "Your profile is now live and ready to be viewed by clients. You can edit it anytime.",
        url: "/nx/create-profile/finish",
      }}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-medium">Your profile is ready!</h1>
          <h2 className="text-3xl font-medium mt-1">
            Now, you’ll need Connects to bid on jobs.
          </h2>
          <p className="text-sm mt-8">
            Connects are virtual tokens you’ll use to pursue jobs and start
            earning. Learn more
          </p>
        </div>

        <div className="bg-black rounded-3xl p-8 text-white flex items-center justify-between">
          <div className="space-y-8">
            <div>
              <h3 className="uppercase text-sm font-medium">Freelancer Plus</h3>
              <p className="text-2xl font-semibold mt-1">
                $9.99 <span className="line-through">$19.99</span> for your
                first month
              </p>
            </div>

            <ul className="space-y-2">
              <li className="flex items-center gap-4 text-sm">
                <Icon icon="mdi:check" className="w-3 h-3" />
                <p>100 Connects monthly (plus an extra 50 Connects today)</p>
              </li>
              <li className="flex items-center gap-4 text-sm">
                <Icon icon="mdi:check" className="w-3 h-3" />
                <p>Real-time, customizable job alerts</p>
              </li>
              <li className="flex items-center gap-4 text-sm">
                <Icon icon="mdi:check" className="w-3 h-3" />
                <p>0% service fee when you bring new clients</p>
              </li>
            </ul>

            <div>
              <Button
                type="primary"
                label="Upgrade"
                classname="text-sm! font-medium! rounded-full! py-2.5! px-5!"
                onClick={() => router.push("/nx/plans/membership/change-plan")}
              />
              <p className="text-sm mt-4 text-white/60">
                Limited time offer. $19.99 after your first month. Cancel
                anytime.
              </p>
            </div>
          </div>

          <div className="p-8 bg-green-600 w-1/3 rounded-3xl">
            <p className="text-2xl font-medium">
              With Freelancer Plus, members win 40% more contracts on average.
            </p>

            <div className="flex items-center relative mt-4 -space-x-3">
              <Image
                src={UserPic1}
                alt="User"
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-white"
              />
              <Image
                src={UserPic2}
                alt="User"
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-white"
              />
              <Image
                src={UserPic1}
                alt="User"
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-white"
              />
              <Image
                src={UserPic2}
                alt="User"
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-white"
              />
              <Image
                src={UserPic1}
                alt="User"
                width={60}
                height={60}
                className="rounded-full object-cover border-2 border-white"
              />
            </div>
          </div>
        </div>

        <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-medium">
              Or get a 100 Connects starter pack
            </h3>
            <p className="text-sm text-slate-600">
              Use to bid on jobs, or signal you’re open to work and boost your
              visibility with ads.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Button
              type="outline"
              label="Buy for $15"
              size="medium"
              classname="rounded-full! px-10!"
            />

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Icon icon="mdi:timer-check-outline" className="w-5 h-5" />
              <span>Get 50 Connects free for a limited time</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <p>Subscribe or buy later so you can bid on jobs.</p>
          <Link
            href="/nx/find-work"
            className="flex items-center gap-1 underline"
          >
            <span>Browse without bidding</span>{" "}
            <Icon
              icon="material-symbols-light:arrow-right-alt"
              className="w-6 h-6"
            />
          </Link>
        </div>
      </div>
    </CreateProfilePageLayout>
  );
}
