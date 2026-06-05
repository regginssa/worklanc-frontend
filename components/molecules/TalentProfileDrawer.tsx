import { ArrowLeftIcon, ExternalLink, VerifiedIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import Link from "next/link";
import Image from "next/image";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { Button, IconButton, Pagination } from "../atoms";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import TopRatedPlusIcon from "@/public/assets/svgs/icons/badges/top_rated_plus.svg";
import { motion } from "motion/react";
import { Tabs } from "../common";
import { useState } from "react";
import VideoIntroImg from "@/public/assets/jpgs/video_intro.jpg";
import PlayIcon from "@/public/assets/svgs/icons/icons/play.svg";
import ClientFeedbackCard, {
  ClientFeedbackCardItem,
} from "../common/ClientFeedbackCard";

const tabs = [
  { label: "About", value: "about" },
  { label: "Client feedback", value: "client_feedback" },
  { label: "Work history", value: "work_history" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Employment history", value: "employment_history" },
  { label: "Skills", value: "skills" },
  { label: "Education", value: "education" },
];

const clientFeedbacks: ClientFeedbackCardItem[] = [
  {
    title: "Looking for a pro android developer",
    score: 4.8,
    date: new Date(),
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    tags: [
      { label: "Android", tooltip: "Android development" },
      { label: "React Native", tooltip: "React Native development" },
      { label: "Expo", tooltip: "Expo development" },
    ],
  },
  {
    title: "Looking for a pro ios developer",
    score: 4.8,
    date: new Date(),
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    fromUserName: "Rachel S",
  },
];

export default function TalentProfileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Drawer open={open} onClose={onClose} direction="right">
      <DrawerContent size="lg">
        <DrawerHeader>
          <div className="flex items-center justify-between w-full">
            <button
              className="hover:text-blue-600 cursor-pointer"
              onClick={onClose}
            >
              <ArrowLeftIcon className="size-6" />
            </button>
            <Link
              href="#"
              className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline text-sm font-medium"
            >
              View full profile
              <ExternalLink className="size-5" />
            </Link>
          </div>
        </DrawerHeader>

        <div className="flex min-w-0 items-start gap-6 p-6 no-scrollbar overflow-y-auto">
          {/* SUMMARIZE */}
          <div className="w-1/3 flex flex-col items-center gap-4">
            <div className="relative size-[140px]">
              <Image
                src={UserPic}
                alt="User"
                className="size-[140px] rounded-full object-contain"
              />
              <span className="size-5 rounded-full border-2 border-white bg-green-400 absolute top-2 left-2"></span>
              <IconButton
                variant="outline"
                icon="mdi:heart-outline"
                className="p-1! border! absolute top-2 right-2 bg-white"
                onClick={() => {}}
              />
              <div className="bg-white text-center absolute left-0 bottom-0 text-slate-600 text-xs right-0 py-2 flex items-center gap-2 justify-center">
                <Icon icon="mdi:lightning-bolt-outline" className="size-4" />
                <span className="whitespace-nowrap">Available Now</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <h1 className="text-3xl font-medium">Marco N.</h1>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icon
                    icon="si:verified-fill"
                    className="size-5 text-blue-600 cursor-pointer"
                  />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-sm p-2">
                    This freelancer's identity has been verified through a
                    government ID check and a visual verification.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <h2 className="text-sm text-slate-600 text-center">
              Build, Fix & Scale Mobile Apps | iOS, Android, Flutter, AI Expert
            </h2>

            <div className="flex items-center justify-center gap-4 text-sm font-medium">
              <span className="whitespace-nowrap">100%</span>
              <div className="flex items-center gap-2">
                <Image
                  src={TopRatedPlusIcon}
                  alt="Top rated plus"
                  width={24}
                  height={24}
                />
                <span className="whitespace-nowrap">Top Rated Plus</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="si:star-fill" className="size-5 text-yellow-600" />
                <span className="whitespace-nowrap text-slate-600">
                  4.3 (48)
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-800">
              <Icon icon="mdi:map-marker-outline" className="size-5" />
              <span>New York, USA – 7:14 am local time</span>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <span className="text-slate-800 text-sm cursor-pointer">
                  Avg. response: 8-12h
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm p-2">
                  Shows a typical response time range based on past replies to
                  client messages.
                </p>
              </TooltipContent>
            </Tooltip>

            <div className="flex items-center justify-between gap-4 w-full">
              <div className="space-y-1 text-center">
                <p className="text-2xl font-medium">$200K+</p>
                <h4 className="text-xs text-slate-600">Total earnings</h4>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-2xl font-medium">93</p>
                <h4 className="text-xs text-slate-600">Total jobs</h4>
              </div>
              <div className="space-y-1 text-center">
                <p className="text-2xl font-medium">7,420</p>
                <h4 className="text-xs text-slate-600">Total hours</h4>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="flex items-center justify-between gap-2 w-full">
                <Button
                  type="primary"
                  label="Hire"
                  classname="py-2! flex-1! rounded-full! font-medium! text-sm!"
                />
                <Button
                  type="outline"
                  label="Invite"
                  size="medium"
                  classname="py-2! flex-1! rounded-full! font-medium! text-sm! border!"
                />
                <IconButton
                  variant="outline"
                  icon="mdi:dots-horizontal"
                  className="border!"
                  onClick={() => {}}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full py-2 px-4 rounded-full border border-slate-400 text-slate-800 cursor-pointer hover:bg-slate-100 transition-colors duration-200 flex items-center justify-center gap-2 text-sm font-medium"
              >
                <Icon icon="flowbite:user-headset-outline" className="size-5" />
                <span>Book a consultation</span>
              </motion.button>
              <p className="text-center text-xs text-slate-600">
                $20 per 30 min Zoom meeting
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="min-w-0 flex-1 space-y-6">
            <Tabs tabs={tabs} selectedTabIndex={tabIndex} onTab={setTabIndex} />

            <section
              id="about"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-medium flex-1">About Marco N.</h2>

                <div className="flex items-center gap-4 w-1/2">
                  <div className="rounded-2xl bg-slate-100 space-y-1 p-2">
                    <p className="text-sm">$15.00/hr</p>
                    <p className="text-xs text-slate-600">Rate</p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 space-y-1 p-2">
                    <p className="text-sm">English</p>
                    <p className="text-xs text-slate-600">Language</p>
                  </div>

                  <div className="rounded-2xl bg-slate-100 space-y-1 p-2">
                    <p className="text-sm line-clamp-1">
                      OnGraph Technologies Private Limited
                    </p>
                    <p className="text-xs text-slate-600">Agency</p>
                  </div>
                </div>
              </div>

              <div className="w-[320px] h-[180px] overflow-hidden relative rounded-md">
                <Image
                  src={VideoIntroImg}
                  alt="Video introduction"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <button className="cursor-pointer">
                    <Image src={PlayIcon} alt="Play" className="size-12" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-600">
                I help startups and product teams build, fix, and scale mobile
                apps (iOS, Android, and Flutter), including apps with AI-powered
                features—ensuring stability, performance, and long-term
                reliability. With 7+ years of experience and 50+ apps delivered,
                I’ve worked on production apps used by real users where
                performance, stability, and user experience directly impact
                business outcomes. Clients usually come to me when: • Their app
                is crashing, slow, or unstable in production...{" "}
                <button className="cursor-pointer text-black underline">
                  Show more
                </button>
              </p>
            </section>

            <section
              id="client_feedback"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">
                Client feedback (23)
              </h2>

              <ul className="grid grid-cols-2 gap-6">
                {clientFeedbacks.slice(0, 2).map((cf) => (
                  <ClientFeedbackCard key={cf.title} {...cf} />
                ))}
              </ul>

              <div className="flex justify-end">
                <Pagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={() => {}}
                />
              </div>
            </section>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
