import { FreelancerLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import BannerBoostedIcon from "@/public/assets/svgs/icons/other/banner_boosted.svg";
import Image from "next/image";
import { Button, Input, UserAvatar } from "@/components/atoms";
import { useState, type ReactNode } from "react";
import TabBar, { TTabItem } from "@/components/atoms/TabBar";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import TalentAPI from "@/lib/api/talent";

const tabs: TTabItem[] = [
  { label: "Best matches", value: "best_matches" },
  { label: "Most recent", value: "most_recent" },
  { label: "US only", value: "us_only" },
  { label: "Saved jobs", value: "saved_jobs" },
  { label: "Invites", value: "invites" },
];

function EditButton() {
  return (
    <button className="cursor-pointer">
      <Icon icon="mdi:pencil-outline" className="w-5 h-5 text-slate-800" />
    </button>
  );
}

function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: ReactNode;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer flex items-center w-full justify-between"
      >
        {typeof title === "string" ? (
          <h3 className="text-lg font-medium">{title}</h3>
        ) : (
          title
        )}
        <Icon
          icon="mdi:chevron-up"
          className={`w-6 h-6 transition-transform duration-200 ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function FindWork() {
  const [openAssesmentAlert, setOpenAssesmentAlert] = useState(true);
  const [search, setSearch] = useState("");
  const { user } = useAppSelector((state: RootState) => state.user);

  const { data: talentProfileData } = useQuery({
    queryKey: ["talent-profile"],
    queryFn: TalentAPI.getProfile,
    enabled: Boolean(user),
  });

  const profile = talentProfileData?.profile ?? null;
  const profileTitle = profile?.title?.trim() || "Add your professional title";
  const profileHref = profile?.uid ? `/freelancers/${profile.uid}` : "#";

  const promoteItems = [
    { title: "Availability badge", value: "Off" },
    { title: "Boost your profile", value: "Off" },
  ];

  const preferenceItems: { label: string; content: ReactNode }[] = [
    {
      label: "Hours per week",
      content: <span className="text-slate-800">More than 30 hrs/week</span>,
    },
    {
      label: "Profile Visibility",
      content: <span className="text-slate-800">Public</span>,
    },
    {
      label: "Job Preference",
      content: <span className="text-slate-800">No preference set</span>,
    },
    {
      label: "My Categories",
      content: (
        <>
          <Link href="#" className="cursor-pointer underline text-slate-800">
            Personal & Professional Coaching
          </Link>
          <Link href="#" className="cursor-pointer underline text-slate-800">
            Accounting & Bookkeeping
          </Link>
        </>
      ),
    },
  ];

  return (
    <FreelancerLayout
      seo={{
        title: "Worklanc",
        description: "Find your best matches work",
        url: "/nx/find-work",
      }}
    >
      {openAssesmentAlert && (
        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-4 -mt-8">
          <div className="flex items-center gap-2">
            <Icon icon="lets-icons:lamp" className="w-6 h-6 text-blue-600" />
            <p className="text-sm font-medium">
              To do:{" "}
              <Link href="#" className="cursor-pointer underline">
                Take the working style assessment
              </Link>
              . Clients trust and hire freelancers who highlight their working
              style on their profile.
            </p>
          </div>

          <button
            className="cursor-pointer"
            onClick={() => setOpenAssesmentAlert(false)}
          >
            <Icon icon="mdi:close" className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="flex items-start gap-8 -mt-2">
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
              <UserAvatar
                avatarUrl={user?.avatarUrl ?? ""}
                alt={user?.firstName ?? "User"}
                size={64}
                className="rounded-full object-contain"
              />

              <div>
                <Link
                  href={profileHref}
                  className="cursor-pointer underline text-xl font-medium"
                >
                  <h3>
                    {user?.firstName ?? "User"}{" "}
                    {user?.lastName?.slice(0, 1) ?? ""}.
                  </h3>
                </Link>

                <p className="text-sm mt-2 line-clamp-2">{profileTitle}</p>
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

          <div className="p-6 rounded-3xl bg-slate-50">
            <CollapsibleSection title="Promote with ads">
              <div className="space-y-6 pt-6">
                {promoteItems.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-center justify-between"
                  >
                    <div className="text-sm">
                      <h4>{item.title}</h4>
                      <p className="text-slate-600">{item.value}</p>
                    </div>
                    <EditButton />
                  </div>
                ))}
              </div>
            </CollapsibleSection>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50">
            <CollapsibleSection title="Connects: 0">
              <div className="space-y-2 pt-6">
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
            </CollapsibleSection>
          </div>

          <div className="px-6 rounded-3xl bg-slate-50">
            <div className="py-4 border-b border-slate-300">
              <CollapsibleSection title="Preferences">
                <div className="space-y-8 pt-8">
                  {preferenceItems.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-start justify-between"
                    >
                      <div className="flex flex-col gap-2 text-sm">
                        <span className="font-medium">{item.label}</span>
                        {item.content}
                      </div>
                      <EditButton />
                    </div>
                  ))}
                </div>
              </CollapsibleSection>
            </div>

            <div className="py-4">
              <CollapsibleSection title="Proposals">
                <div className="space-y-4 pt-4">
                  <Link
                    href="#"
                    className="cursor-pointer underline text-sm block"
                  >
                    My Proposals
                  </Link>
                  <p className="text-sm">
                    Looking for work? Browse jobs and get started on a proposal.
                  </p>
                </div>
              </CollapsibleSection>
            </div>
          </div>
        </div>
      </div>
    </FreelancerLayout>
  );
}
