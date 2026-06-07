"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { formatNumberWithCommas } from "@/utils/math";
import { JobSuccessScore } from "../atoms";
import CollapsableText from "./CollapsableText";
import { TalentBadge } from "@/types/user";
import { BadgeIcons, BadgeTitles } from "./TalentBadges";

const menuItems = [
  { label: "Hire", icon: "hugeicons:new-job", action: "hire" as const },
  {
    label: "Invite to job",
    icon: "mingcute:invite-line",
    action: "invite" as const,
  },
  {
    label: "Add a note",
    icon: "hugeicons:note-edit",
    action: "addNote" as const,
  },
];

export type RecentlyViewedTalentCardItem = {
  name: string;
  avatar: string;
  title: string;
  description: string;
  hourlyRate: number;
  totalEarnedAmount: number;
  jobSuccessScore: number;
  portfolioImgs: string[];
  badge: TalentBadge;
  onHire?: () => void;
  onInvite?: () => void;
  onAddNote?: () => void;
  onViewProfile?: () => void;
};

export default function RecentlyViewedTalentCard({
  name,
  avatar,
  title,
  description,
  hourlyRate,
  totalEarnedAmount,
  jobSuccessScore,
  portfolioImgs,
  badge,
  onHire,
  onInvite,
  onAddNote,
  onViewProfile,
}: RecentlyViewedTalentCardItem) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const menuActions = {
    hire: onHire,
    invite: onInvite,
    addNote: onAddNote,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="space-y-6" onClick={onViewProfile}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={avatar}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <p className="text-sm">{title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" className="cursor-pointer hover:text-blue-600">
            <Icon icon="mdi:heart-outline" className="size-5" />
          </button>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className="cursor-pointer text-blue-600 hover:text-black"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <Icon icon="mdi:dots-horizontal" className="size-5" />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  role="menu"
                  className="absolute top-full right-0 z-50 mt-2 min-w-[12rem] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <ul className="py-1">
                    {menuItems.map((item) => (
                      <li key={item.label} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          className="flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-slate-800 transition-colors duration-150 hover:bg-slate-100"
                          onClick={() => {
                            setMenuOpen(false);
                            menuActions[item.action]?.();
                          }}
                        >
                          <Icon icon={item.icon} className="size-5 shrink-0" />
                          <span>{item.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-6">
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>
              <strong className="font-medium">${hourlyRate.toFixed(2)}</strong>
              /hr
            </span>
            {badge && (
              <div className="flex items-center gap-2">
                <Image
                  src={BadgeIcons[badge]}
                  alt={badge}
                  width={20}
                  height={20}
                />
                <span className="uppercase">{BadgeTitles[badge]}</span>
              </div>
            )}
            {totalEarnedAmount > 0 && (
              <span>
                <strong className="font-medium">
                  ${formatNumberWithCommas(totalEarnedAmount)}
                </strong>{" "}
                earned
              </span>
            )}

            {jobSuccessScore > 0 && (
              <div className="flex items-center gap-2">
                <JobSuccessScore value={jobSuccessScore} />
                <span>{jobSuccessScore}% Job Success</span>
              </div>
            )}
          </div>

          <CollapsableText text={description} />
        </div>

        <Carousel className="h-24 w-32">
          <CarouselContent>
            {portfolioImgs.map((img) => (
              <CarouselItem key={img}>
                <div className="relative h-24 w-32 overflow-hidden rounded-3xl p-0">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </div>
    </div>
  );
}
