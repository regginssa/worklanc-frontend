import { Icon } from "@iconify/react";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import Image from "next/image";
import TopRatedPlusIcon from "@/public/assets/svgs/icons/badges/top_rated_plus.svg";
import Link from "next/link";
import { Button, IconButton, JobSuccessScore, Pagination } from "../atoms";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useRef, useState } from "react";
import AIIcon from "@/public/assets/svgs/icons/other/ai.svg";
import CompanyLogo from "@/public/assets/jpgs/logos/ongraph.jpg";
import TalentProfileDrawer from "./drawers/TalentProfileDrawer";
import SkillsGroup from "./SkillsGroup";

const skills = [
  "Java",
  "Kotlin",
  "JavaScript",
  "TypeScript",
  "React.js",
  "Next.js",
  "Node.js",
  "Python",
  "Django",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
];

const insights = [
  { title: "Developed a dating app for Android and iOS platforms" },
  { title: "Built a social media platform for iOS and Android platforms" },
];

export default function TalentPreviewCardGroup() {
  const listRef = useRef<HTMLLIElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div className="min-w-0 w-full flex-1 space-y-8">
      <ul className="">
        {Array.from({ length: 10 }).map((_, index) => (
          <li
            ref={listRef}
            key={index}
            className="min-w-0 p-6 hover:bg-slate-100 transition-colors duration-200 border-b border-slate-300 space-y-4 group cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 gap-4">
                <div className="size-16 relative">
                  <Image
                    src={UserPic}
                    alt="User"
                    className="w-16 h-16 rounded-full object-contain"
                  />

                  <span className="absolute size-[14px] bg-green-400 border-2 border-white rounded-full top-0 left-0"></span>
                  <Image
                    src={TopRatedPlusIcon}
                    alt="Top rated plus"
                    className="w-6 h-6 absolute bottom-0 right-0"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <h1 className="text-sm font-medium">
                      <Link href="#" className="hover:underline cursor-pointer">
                        Marco N.
                      </Link>
                    </h1>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="py-0.5 px-2 rounded-xs bg-white flex items-center gap-1 text-slate-600 text-sm font-medium">
                          <Icon
                            icon="mdi:lightning-bolt-outline"
                            className="size-4"
                          />
                          <span>Boosted</span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p className="text-sm p-2">
                          This freelancer paid more to get noticed
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <h2 className="text-lg font-medium line-clamp-1">
                    Build, Fix & Scale Mobile Apps | iOS, Android, Flutter, AI
                    Expert
                  </h2>
                  <h3 className="text-xs text-slate-600">United States</h3>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <IconButton
                  variant="outline"
                  icon="mdi:heart-outline"
                  className="border!"
                  onClick={() => {}}
                />
                <Button
                  type="primary"
                  label="Invite to job"
                  classname="h-[42px]! px-5! font-medium! text-sm! rounded-full!"
                />
              </div>
            </div>

            <div className="flex items-center gap-10 text-sm text-slate-600 font-medium">
              <span>$50/hr</span>
              <div className="flex items-center gap-2">
                <JobSuccessScore value={100} />
                <span>100% Job Success</span>
              </div>
              <span>$200K+ Earned</span>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 py-0.5 px-2 rounded-xs bg-white">
                    <Icon
                      icon="mdi:lightning-bolt-outline"
                      className="size-4"
                    />
                    <span>Available Now</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Availability Badge freelancers are over 2X more likely to
                    accept your invite within the first hour.
                  </p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1 py-0.5 px-2 rounded-xs bg-white">
                    <Icon icon="pepicons-pencil:camera" className="size-4" />
                    <span>Offers consultations</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Instantly book a consultation with a freelancer to get
                    advice on your project.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <SkillsGroup skills={skills} max={6} />

            <p className="text-sm font-medium">
              Marco N. has worked{" "}
              <Link
                href="#"
                className="text-blue-600 cursor-pointer hover:underline"
              >
                15 jobs related to your search
              </Link>
            </p>

            <div className="p-4 rounded-3xl bg-slate-100 group-hover:bg-white transition-colors duration-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-600 text-sm">
                  <Image src={AIIcon} alt="AI" className="size-4" />
                  <span>Insights about Marco</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Icon
                        icon="mdi:question-mark-circle-outline"
                        className="size-4"
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p className="text-sm p-2">
                        Generated by AI from their Worklanc experience and
                        client feedback
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center gap-4 text-slate-600">
                  <span className="text-xs font-light">Insight feedback</span>
                  <button className="cursor-pointer">
                    <Icon icon="mdi:like-outline" className="size-5" />
                  </button>
                  <button className="cursor-pointer">
                    <Icon icon="mdi:dislike-outline" className="size-5" />
                  </button>
                </div>
              </div>

              <ul className="list-disc list-inside text-sm space-y-2">
                {insights.map((insight) => (
                  <li
                    key={insight.title}
                    className="cursor-pointer hover:text-blue-600"
                  >
                    {insight.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-1/2 p-4 rounded-3xl border border-slate-300 flex items-center gap-6 justify-between">
              <div className="flex items-center gap-2">
                <Image
                  src={CompanyLogo}
                  alt="Company"
                  className="size-10 rounded-md"
                />
                <div>
                  <p className="text-sm font-light">Associated with</p>
                  <Link
                    href="#"
                    className="text-blue-600 text-sm cursor-pointer hover:underline"
                  >
                    OpenGraph Technologies Private Limited
                  </Link>
                </div>
              </div>

              <div className="text-sm font-light">
                <p>$10M+</p>
                <p>earned</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-center">
        <Pagination totalPages={10} currentPage={1} onPageChange={() => {}} />
      </div>

      <TalentProfileDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
