import { FreelancerLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import BannerBoostedIcon from "@/public/assets/svgs/icons/other/banner_boosted.svg";
import Image from "next/image";
import { Button, Input } from "@/components/atoms";
import { useState } from "react";
import TabBar, { TTabItem } from "@/components/atoms/TabBar";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const tabs: TTabItem[] = [
  { label: "Best matches", value: "best_matches" },
  { label: "Most recent", value: "most_recent" },
  { label: "US only", value: "us_only" },
  { label: "Saved jobs", value: "saved_jobs" },
  { label: "Invites", value: "invites" },
];

export default function FindWork() {
  const [search, setSearch] = useState("");

  return (
    <FreelancerLayout
      seo={{
        title: "Worklanc",
        description: "Find your best matches work",
        url: "/nx/find-work",
      }}
    >
      <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <Icon icon="lets-icons:lamp" className="w-6 h-6 text-blue-600" />
          <p className="text-sm font-medium">
            To do: Take the working style assessment. Clients trust and hire
            freelancers who highlight their working style on their profile.
          </p>
        </div>

        <button className="cursor-pointer">
          <Icon icon="mdi:close" className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-start gap-8">
        <div className="w-3/4 space-y-6">
          {/* Banner */}
          <div className="bg-zinc-900 p-8 rounded-3xl flex items-center justify-between relative gap-10 text-white">
            <div className="w-3/5">
              <h2 className="text-xl font-medium">
                Win work with a targeted boost
              </h2>
              <p className="text-3xl font-medium mt-2 mb-8">
                Boosting your profile increases your chance of getting hired by
                up to 2x.
              </p>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="bg-white px-4 py-2 rounded-full text-black text-sm font-medium"
              >
                Boost now
              </motion.button>
            </div>

            <Image
              src={BannerBoostedIcon}
              alt="Banner Boosted"
              width={223}
              height={184}
            />
          </div>

          {/* Search */}
          <div className="flex items-center gap-6">
            <Input
              type="text"
              placeholder="Search for jobs"
              name="search"
              classname="flex-1!"
              icon="mdi:search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Button
              type="outline"
              label="Filters"
              size="medium"
              icon="mdi:mixer-settings"
              classname="h-10! px-10! text-sm! font-medium! rounded-full!"
            />
          </div>

          <h1 className="text-xl font-medium">Jobs you might like</h1>

          <div className="space-y-2 pb-4">
            <TabBar
              selectedTabIndex={0}
              className="text-base! font-semibold!"
              tabs={tabs}
              onTab={() => {}}
            />

            <p className="text-sm text-slate-600 mt-4 px-4 font-medium">
              Browse jobs that match your experience to a client's hiring
              preferences. Ordered by most relevant.
            </p>
          </div>

          {/* Jobs */}
        </div>

        <div className="flex-1 space-y-6">
          <div className="p-6 rounded-3xl bg-slate-50 space-y-6">
            <div className="flex items-center gap-4">
              <Image
                src={UserPic}
                alt="User"
                className="w-16 h-16 rounded-full object-contain"
              />

              <div>
                <Link
                  href="#"
                  className="cursor-pointer underline text-xl font-medium"
                >
                  <h3>Marco N.</h3>
                </Link>

                <p className="text-sm mt-2 line-clamp-1">
                  Accounting & Consulting
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Link href="#" className="block text-sm underline cursor-pointer">
                Complete your profile
              </Link>
              <div className="flex items-center gap-4">
                <Progress value={70} />
                <span className="text-xs">70%</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <Icon icon="mdi:id-card-outline" className="w-5 h-5" />
              <h3 className="text-lg font-medium">Identity verification</h3>
            </div>

            <p className="text-sm text-slate-600">
              Increase your profile visibility in search results and win more
              work with an IDV Badge.
            </p>

            <Link href="#" className="cursor-pointer text-sm underline block">
              Get an IDV Badge
            </Link>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 space-y-6">
            <button className="cursor-pointer flex items-center w-full justify-between">
              <h3 className="text-lg font-medium">Promote with ads</h3>
              <Icon icon="mdi:chevron-up" className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <h4>Availability badge</h4>
                <p className="text-slate-600">Off</p>
              </div>

              <button className="cursor-pointer">
                <Icon
                  icon="mdi:pencil-outline"
                  className="w-5 h-5 text-slate-800"
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <h4>Boost your profile</h4>
                <p className="text-slate-600">Off</p>
              </div>

              <button className="cursor-pointer">
                <Icon
                  icon="mdi:pencil-outline"
                  className="w-5 h-5 text-slate-800"
                />
              </button>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 space-y-6">
            <button className="cursor-pointer flex items-center w-full justify-between">
              <h3 className="text-lg font-medium">Connects: 0</h3>
              <Icon icon="mdi:chevron-up" className="w-6 h-6" />
            </button>

            <div className="space-y-2">
              <Button
                type="outline"
                label="Buy Connects"
                size="medium"
                classname="w-full py-2! rounded-full! text-sm! font-medium!"
              />
              <Link href="#" className="underline text-sm cursor-pointer">
                View details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}
