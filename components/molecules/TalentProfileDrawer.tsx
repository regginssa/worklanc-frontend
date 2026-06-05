import { ArrowLeftIcon, ExternalLink, VerifiedIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader } from "../ui/drawer";
import Link from "next/link";
import Image from "next/image";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { Button, IconButton, Pagination, TabBar } from "../atoms";
import { Icon } from "@iconify/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import TopRatedPlusIcon from "@/public/assets/svgs/icons/badges/top_rated_plus.svg";
import { motion } from "motion/react";
import { Tabs } from "../common";
import { useCallback, useEffect, useRef, useState } from "react";
import VideoIntroImg from "@/public/assets/jpgs/video_intro.jpg";
import PlayIcon from "@/public/assets/svgs/icons/icons/play.svg";
import AIIcon from "@/public/assets/svgs/icons/other/ai.svg";
import ClientFeedbackCard, {
  ClientFeedbackCardItem,
} from "../common/ClientFeedbackCard";
import TalentProfileJobCardGroup, {
  TalentProfileJobCardGroupItem,
} from "./TalentProfileJobCardGroup";
import TargetArrowIcon from "@/public/assets/svgs/icons/other/target_arrow.svg";
import SkillsGroup from "./SkillsGroup";
import PortfolioCardGroup from "./PortfolioCardGroup";
import { PorfolioCardItem } from "../common/PorfolioCard";
import EmploymentHistoryItemGroup from "./EmploymentHistoryItemGroup";
import { EmploymentHistoryItemType } from "../common/EmploymentHistoryItem";
import CertificationItemGroup from "./CertificationItemGroup";
import { CertificationItemType } from "../common/CertificationItem";
import EducationItemGroup from "./EducationItemGroup";
import { EducationItemType } from "../common/EducationItem";

const tabs = [
  { label: "About", value: "about" },
  { label: "Client feedback", value: "client_feedback" },
  { label: "Work history", value: "work_history" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Employment history", value: "employment_history" },
  { label: "Skills", value: "skills" },
  { label: "Certifications", value: "certifications" },
  { label: "Education", value: "education" },
];

const workHistoryTabs = [
  { label: "Search related (10)", value: "search_related" },
  { label: "Completed (91)", value: "completed" },
  { label: "In progress (2)", value: "in_progress" },
];

const jobHistory: TalentProfileJobCardGroupItem[] = [
  {
    title: "Looking for a pro android developer",
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    skills: ["Android", "React Native", "Expo"],
    startDate: new Date(),
    endDate: new Date(),
    totalAmount: 1000,
    hourlyRate: 100,
    duration: 10,
    type: "hourly",
    status: "completed",
    review: 4.8,
  },
  {
    title: "Looking for a pro ios developer",
    description:
      "I'm looking for a pro ios developer to help me build my app. I need someone who is experienced in ios development and has a good understanding of the ios platform.",
    skills: ["iOS", "Swift", "Objective-C"],
    startDate: new Date(),
    endDate: new Date(),
    totalAmount: 1000,
    type: "fixed",
    status: "completed",
    review: 4.8,
  },
  {
    title: "Looking for a pro android developer",
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    skills: ["Android", "React Native", "Expo"],
    startDate: new Date(),
    endDate: new Date(),
    totalAmount: 1000,
    type: "fixed",
    status: "in_progress",
  },
  {
    title: "Looking for a pro android developer",
    description:
      "I'm looking for a pro android developer to help me build my app. I need someone who is experienced in android development and has a good understanding of the android platform.",
    skills: ["Android", "React Native", "Expo"],
    startDate: new Date(),
    isCurrent: true,
    type: "hourly",
    status: "in_progress",
    review: 4.8,
    hourlyRate: 100,
    totalAmount: 1000,
    duration: 345,
  },
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

const portfolioItems: PorfolioCardItem[] = [
  {
    title: "Swisscheese - Multi-chain Tokenized Stocks & ETFs",
    img: "https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/d18be1d84a0a5776866e3e1f9a6a65c7?response-content-disposition=inline%3B%20filename%3D%22image_large%22%3B%20filename%2A%3Dutf-8%27%27image_large&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD7YomIcwKePuezo0AcPp91yQs8uCHoi9gFWDk0%2BKAd7QIgaGh7SVO3LkEdJENaASP%2BSXkOvD71rgRH3RWtbWcVyxUqkgUIcBAAGgw3Mzk5MzkxNzM4MTkiDHMxNOFePj%2BYn7NulirvBM1YG8ym58LfF%2BID8e%2BevJvxFWSV1NLVmxrn%2FPTTQV7w%2BG2l1isNSnSSYiRTibvF9NSr0hmixA3LqpC4nw52YU3O6%2FVvI10OVGcXfE2BLk5mAVvzplVN1xaCjmr0Oa1Sx73g7TJSfN%2FNAqWbG2mHNkwo8f05wcC8y6iimV6V1fAXkX4r1GrtoRvBqAqgwBo8uJHCadExBtor2TyjZ9l2PDOFOT1%2FFiUq2esfRKoJDEFaZiYs5gyHGYjjiyB4%2BVvff2MF76V4WymD5V7ATiCFbW0prge5AQgLe1v3co%2BKSoqOLKbDx4I3ZcUu9W0B9f6ca6jYf%2F%2F9GP%2BiOP5R6OjRz%2BhSm%2BS5lPJrNp15vaUc%2FESuFS13RXx3sGhH4vMYPF4tuaBooAJNqZmfMDG94C5tNdSN2LNVMhVBm5sApF65EwESPH%2F%2BySVxm14cOePddWN%2FWf3aiaxQLfm%2BBs%2BR%2FC3vAOahdrindXlOgvUMweB3t%2FQWlsQJQcqavj%2B7xJwfZQf5trUF%2BEk4FmBOISFKrNVuUg4C%2Fm1fITci%2B1yAtQcwDNTVz5ojzbyL2%2B%2FF6f4Z9bUp7q1nJUGfHMKhdlJsDPQNt2X19hehWr42ErzqFe1SBv9g8NBkXAjP09bR7kMGAfEKZjG7rO9aU6eToKFWWeqM8x%2BslTpuO50E17dUi%2FOlew0uI7tIF0ciwKk8cP9ePzi0sFr7imJAg0eaNfxF4%2F%2FEXeWryVrJtv8rCmzr9SwRg9%2FuDjg30ffnjHinp1oFFS32Pqa64B%2FYpiMiXl6P0eYKW3InPQvEHQ3Lquf2qz%2BT4H%2BYMQFEI0Uc7VcrSqFEabEdMLS8i9EGOpkBQFoQHaFtEf3CrNCVEq2KqaOVJYuf2w5ihOqYwvHo7UXlGKLDvMvULikA7Xwd90Y7dyMKZUik2JM2z1lvBSCPsULtuVWKkXGE6sAu%2FpYShCY7C9Syct%2FY7zbn2S%2BwbDorpsuEqH%2F%2FBKHFQTmZg85Vu0DMWqI%2F4YwJMRXJnvCyCRHAXT41%2FMqc3DlkpM8JG6mm%2FzgbW9f98MiW&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260605T144453Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5WV4OHJE6%2F20260605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=50749771db787d89b9e8b85115fa3bbf79563c74c5508be6f88cc367184fb0a5",
    skills: ["Android", "React Native", "Expo"],
  },
  {
    title: "Reflection - Multi-chain Tokenized Stocks & ETFs",
    img: "https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/7b242e436f119ebef78a5aed596f5875?response-content-disposition=inline%3B%20filename%3D%22image_large%22%3B%20filename%2A%3Dutf-8%27%27image_large&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDrOm2irFTNMt%2BeJ7Hg%2BEZ0HQQ2loGLBZeFDWFZ6lc%2FSQIgFznJeGO3eKJHpKOo4Q4KmASmnrIvQzWw6C6tTB7KqxcqkgUIcBAAGgw3Mzk5MzkxNzM4MTkiDCOWwpB28vNLAxaNTyrvBJ%2F53nL3QEYEFEFP7VfUvHJbXNrace0w%2FUXaMITq4vWD6A7XAFbj%2BQBe1QlazHyJYt%2Fo%2Bl%2Bv%2F4Gb6LEu1FrQbCBn%2BDvNaJYYMyAoaPRLU2JaCdmMvI4%2BBycrooNTRLaO0B9%2BikM7IACVZuthulx%2BVqtbgprbgQKg6vxercC74qL5gxjeGrnYcBQOJM%2BO0vFAjVUnp%2BQ3LkuEKqyPaG8R3b22tzqmC3wuc3ddVgytuEGVgFyXK1Ghnkn43soW5%2FVEW6GEzmHSOrd6fV8RyemR711Q%2Bhm4cBOq8u35h5EDcFPNYD2ZUmKK%2FJs9rCaYi6%2FB0hVXPS2s0XhjaWkJAsbKH2lxjy2oUYJ6CT9ZZJvFPQayfh0k2kln5a1%2Ff%2FdulfYrNHqPnIFLpYPtqgnmuairn4%2Bin2Rye1zojVHWWYqgxXdLZtLXXaaVwnXqdii7aOIyBSmAN2Gcij280g3DYxjLFZURKKEKEK%2B95V3ai1fPifWorXdtq%2FW5bz7Yh0sLxGEWBS64mcdE5DAW7lo2OvPYv1NbkRgJJZPR3pQW%2FMjVzGzoW0FBauATaVYVrZ1LQaTzBLg1PSWyHfhzwdhM6nsuyeqbhfFKHat9Phulemgj6hJLntdusUWF7%2FkeZqZIarjKO2uDnUspnWaQ4KpjhMTfDD4Fx2gxfoZHlwURXtECAmY0Qo4Po81RFRSHxZ6z504y4mIXnXYX3wcpROUw%2BXYBUFolny2B1luVK2PnaWMJdbVRwKDuUN69AYQ7lCXid5bFQAOvPGFU4TXTSBVYshTDKO%2BgusvhPtjmz8EAyVdagCiIZn6DrTQud0Ecq%2B%2FrMGqvMNi4i9EGOpkBIatcbrTwG8jhmrIESd5pp1nltyrUrVhDWaJApmSGAHbv9DxOr4W2tbOh7Q2tfHrryPzD2rH7MsTAOL%2B2AYvlgOM7FpkJARptV41gxBeu7H1dDkWd%2BIo2z%2FgSgzCqtPA9XYt0X0EaBTogwwb3vT6NzDBRSiuUfdvzjL1aSygGdy5na9kCyzxwSuzGC%2BGHfdNFwwmsHWqEHEu6&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260605T145242Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW52DX4R5UG%2F20260605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=a019ac9f8bc938a9ae07a239615912bca7d81875e6aa2548352fe7a82abc7f01",
    skills: ["Android", "React Native", "Expo"],
  },
  {
    title: "Bitcoin Bite",
    img: "https://upwork-usw2-prod-agora-file-storage.s3.us-west-2.amazonaws.com/profile/portfolio/thumbnail/4cb927a50a789ce54ee4d8ad690a9d1b?response-content-disposition=inline%3B%20filename%3D%22image_large%22%3B%20filename%2A%3Dutf-8%27%27image_large&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDVeCqOzWTyrQO0wno6olbDlVFfmj0HoegKdR3qdYaBEgIhAPt3aZMu6g7MaVzk9XMhcjHkpH7Tek42YESUOVu2hSWEKpIFCG8QABoMNzM5OTM5MTczODE5Igxkg6CViOgjYRpVl08q7wSvpW9e%2Btj32SdznAH80cHvuRBOdcF6N3MH99PnUVRClRlml1RDXY%2F1XzXLZ5yjFRZMqouyddn%2F66sBhcz7vdRmF56EqiZ%2FSTulsfCKsMgTSBSMCbzqudSc8zCsGemtHuLI3GB7DjRHvB%2FgE1sf1E0e8HGGuX0hVRC3zi%2Bog6VktoUCSr%2FOFNJqDJWLWokppcYNZblkRcjSbwm7Tq1mkPtSP24yjxZ2ha2Z6I2uhDqkED1P0ubNM8ulp53wPiBpJn19RlMEAPYoytH91v7apuWlj8eXIKSamq2aMuyelx1ESmnIR33FPKxgd0Incm6XUYPGFKz6VwCzUf739KKHDvD8oQDN2fA7v1Jdt8NWcaMNUXkluYycbiAtNRYwI2w1kOzT20LsR25kKhZdmx2wI7sENuqJn1mpXOp8BXAAEVXlu2W8fd%2FWQf5g0rcuPTddroSJ6nSdBV3KOm9SxL5epSTnxsO63ETyebo8H80BBLPTesDDJfyGJ6Ffq5x%2BHRtpFhpXWTFqfVDe52fHtkX5ebG06g8r2xJq20JGSVPgz3gbxzPQ%2Fj0iI5Px3axnTcZTNpaFLbT2FAWsvyvfa4FPHrVXi%2FlaSliF5JivDf%2FBFwli4yNnzzijoCFzGmBJmxmufk7mt2YWJDyh97u7FLMWX8abqx6xJCJMSzCEwSr7ncP1WEN%2BWaIY7oRqt2GmfWa2GVRHEfqw96%2FXDTXWDQCZYNLQoOK5cAv2lmbsIx10fhRNCgxUVQuELUVH4FpDk17rZRco5fewcTH5PJnVNpMxYy0ITSOqGJhMMmIqXl%2FCjTKpdx5AAlef91RF16SlHOBQFzDrr4vRBjqYAdVWO4F%2BMVPIS7%2FSMfNRSFO4bUOOkOfa9t%2F0Vg66zeVCbcj7zDnNtkE5SAshzb35zen3UDgHXnsnXQSwxoG8wuk8ysLAuivulyMahFVDfGMoqmtJPZgbYkzZPuGsgOmpjzk3rKlk%2FdeLHD3WfbY9fnOh%2B6jjNpFNfrR8bUX8B255naoSoDnV3L9go2y8QibEsrbrziuQN4mG&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20260605T145550Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1799&X-Amz-Credential=ASIA2YR6PYW5W36FAYSP%2F20260605%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=8cc1f124a0c0858c728ccfb8679d8866aa44c716d546dfb30e08cef90e1bfe40",
    skills: ["Android", "React Native", "Expo"],
  },
];

const employmentHistory: EmploymentHistoryItemType[] = [
  {
    company: "OnGraph Technologies Private Limited",
    title: "Mobile Application Developer",
    startedAt: new Date(),
    endAt: new Date(),
    isCurrent: true,
    description:
      "Designed and implemented a new accounting system for the company",
  },
  {
    company: "OnGraph Technologies Private Limited",
    title: "Mobile Application Developer",
    startedAt: new Date(),
    endAt: new Date(),
    isCurrent: true,
    description:
      "Designed and implemented a new accounting system for the company",
  },
];

const certifications: CertificationItemType[] = [
  {
    name: "Back-End Development",
    provider: "Worklanc",
    skills: ["Python", "Node.js", "RESTful APIs", "SQL", "NoSQL"],
    logo: "https://assets.static-upwork.com/images/certification/logos/high/python-back-end-development.png",
  },
  {
    name: "Front-End Development",
    provider: "React.org",
    skills: ["React", "JavaScript", "HTML", "CSS", "React Router"],
    logo: "https://assets.static-upwork.com/images/certification/logos/high/python-back-end-development.png",
  },
];

const STICKY_TABS_OFFSET = 56;
const TAB_CLICK_SCROLL_LOCK_MS = 600;

const educationHistory: EducationItemType[] = [
  {
    school: "University of London",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startedAt: 2020,
    endAt: 2024,
  },
  {
    school: "University of London",
    degree: "Bachelor of Science",
    fieldOfStudy: "Computer Science",
    startedAt: 2020,
    endAt: 2024,
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
  const [workHistoryTabIndex, setWorkHistoryTabIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isTabClickScrollRef = useRef(false);
  const selectedWorkHistoryTab = workHistoryTabs[workHistoryTabIndex].value;
  const filteredJobHistory =
    selectedWorkHistoryTab === "search_related"
      ? jobHistory
      : jobHistory.filter((job) => job.status === selectedWorkHistoryTab);

  const getActiveTabIndex = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return 0;

    const activationLine =
      container.getBoundingClientRect().top + STICKY_TABS_OFFSET;

    let activeIndex = 0;
    tabs.forEach((tab, index) => {
      const section = container.querySelector<HTMLElement>(`#${tab.value}`);
      if (!section) return;

      if (section.getBoundingClientRect().top <= activationLine + 4) {
        activeIndex = index;
      }
    });

    return activeIndex;
  }, []);

  const handleTabChange = useCallback((index: number) => {
    isTabClickScrollRef.current = true;
    setTabIndex(index);
  }, []);

  useEffect(() => {
    if (!open || !isTabClickScrollRef.current) return;

    const sectionId = tabs[tabIndex]?.value;
    const container = scrollContainerRef.current;
    if (!sectionId || !container) return;

    const section = container.querySelector<HTMLElement>(`#${sectionId}`);
    if (!section) return;

    const containerTop = container.getBoundingClientRect().top;
    const sectionTop = section.getBoundingClientRect().top;

    container.scrollTo({
      top:
        container.scrollTop + (sectionTop - containerTop) - STICKY_TABS_OFFSET,
      behavior: "smooth",
    });

    const timeout = window.setTimeout(() => {
      isTabClickScrollRef.current = false;
    }, TAB_CLICK_SCROLL_LOCK_MS);

    return () => window.clearTimeout(timeout);
  }, [tabIndex, open]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !open) return;

    let ticking = false;

    const onScroll = () => {
      if (isTabClickScrollRef.current) return;
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const nextIndex = getActiveTabIndex();
        setTabIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
        ticking = false;
      });
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [open, getActiveTabIndex]);

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

        <div
          ref={scrollContainerRef}
          className="flex min-w-0 items-start gap-6 p-6 no-scrollbar overflow-y-auto"
        >
          {/* SUMMARIZE */}
          <div className="w-1/3 flex flex-col items-center gap-4 sticky top-0">
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
            <Tabs
              tabs={tabs}
              selectedTabIndex={tabIndex}
              onTab={handleTabChange}
              className="sticky -top-6 z-10 bg-white"
            />

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

            <section
              id="work_history"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">
                Work history on Worklanc
              </h2>

              <div className="p-6 border border-slate-300 rounded-3xl space-y-6">
                <div className="flex items-center gap-2">
                  <Image
                    src={TargetArrowIcon}
                    alt="Target arrow"
                    className="size-8"
                  />
                  <h3 className="text-xl font-medium">
                    Skills that match your search
                  </h3>
                </div>

                <SkillsGroup
                  skills={tabs.map((tab) => tab.label)}
                  matchedSkills={tabs.map((tab) => tab.label)}
                />
              </div>

              <div className="p-4 rounded-3xl bg-slate-50 space-y-6">
                <div className="flex items-center gap-2">
                  <Image src={AIIcon} alt="AI" className="size-8" />
                  <h3 className="text-xl font-medium">Summary</h3>
                </div>

                <p className="text-sm text-slate-600">
                  A top-performing mobile application developer specializing in
                  both iOS and Android platforms. Has developed over 50
                  applications including a subscription-based food delivery
                  system [1] and a fintech app utilizing serverless architecture
                  [2]. Notable for end-to-end solutions such as loyalty programs
                  for retail [3]and high-quality app development for dynamic
                  user interfaces across various se…{" "}
                  <button className="text-black underline cursor-pointer">
                    Show more
                  </button>
                </p>

                <p className="text-xs text-slate-600">
                  Generated by CHRLE, Worklanc's Charlie Unicorn AI, from
                  completed jobs
                </p>

                <div className="space-y-2">
                  <p className="text-lg font-medium">Skills used</p>
                  <ul className="flex flex-wrap items-center gap-2">
                    {tabs.slice(0, 4).map((skill) => (
                      <li
                        key={skill.value}
                        className="py-0.5 px-2 rounded-md bg-slate-200 text-sm cursor-pointer"
                      >
                        {skill.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="">
                <TabBar
                  tabs={workHistoryTabs}
                  selectedTabIndex={workHistoryTabIndex}
                  onTab={setWorkHistoryTabIndex}
                />
                <TalentProfileJobCardGroup items={filteredJobHistory} />
              </div>
            </section>

            <section
              id="portfolio"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">Portfolio (8)</h2>

              <PortfolioCardGroup items={portfolioItems} />
            </section>

            <section
              id="employment_history"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">
                Employment history
              </h2>

              <EmploymentHistoryItemGroup items={employmentHistory} />

              <Button
                type="outline"
                label="View full profile"
                size="medium"
                classname="py-2! px-8! font-medium! text-sm! border! rounded-full!"
                icon="mdi:external-link"
                onClick={() => {}}
              />
            </section>

            <section
              id="skills"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">Skills</h2>

              <SkillsGroup
                skills={tabs.map((tab) => tab.label)}
                matchedSkills={tabs.map((tab) => tab.label)}
                max={tabs.length}
              />
            </section>

            <section
              id="certifications"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">Certifications</h2>

              <CertificationItemGroup items={certifications} />
              <Button
                type="outline"
                label="View full profile"
                size="medium"
                classname="py-2! px-8! font-medium! text-sm! border! rounded-full!"
                icon="mdi:external-link"
                onClick={() => {}}
              />
            </section>

            <section
              id="education"
              className="border border-slate-300 rounded-3xl p-6 space-y-6"
            >
              <h2 className="text-2xl font-medium flex-1">Education</h2>

              <EducationItemGroup items={educationHistory} />
              <Button
                type="outline"
                label="View full profile"
                size="medium"
                classname="py-2! px-8! font-medium! text-sm! border! rounded-full!"
                icon="mdi:external-link"
                onClick={() => {}}
              />
            </section>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
