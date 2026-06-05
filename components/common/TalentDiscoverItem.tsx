import { TalentBadge } from "@/types/user";
import Image from "next/image";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { formatEarnedAmount } from "@/utils/math";
import { BadgeIcons, BadgeTitles } from "./TalentBadges";

export type TalentDiscoverItemType = {
  name: string;
  title: string;
  avatar: string;
  badge?: TalentBadge;
  earnedAmount?: number;
  hourlyRate: number;
  isJobSuccess?: boolean;
  isOnline?: boolean;
};

export default function TalentDiscoverItem({
  name,
  title,
  avatar,
  badge,
  earnedAmount,
  hourlyRate,
  isJobSuccess,
  isOnline,
}: TalentDiscoverItemType) {
  return (
    <div className="border border-slate-300 rounded-3xl p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="size-[60px] relative">
          <Image
            src={avatar}
            alt="User"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <span
            className={`size-4 border-2 border-white rounded-full absolute top-0 left-0 ${
              isOnline ? "bg-green-500" : "bg-slate-400"
            }`}
          ></span>
        </div>

        <div className="space-y-2 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-blue-600 flex-1">{name}</h3>
            <motion.button whileTap={{ scale: 0.95 }}>
              <Icon icon="mdi:heart-outline" className="size-5" />
            </motion.button>
          </div>
          <h4 className="line-clamp-1 text-sm">{title}</h4>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span>${hourlyRate.toFixed(2)}/hr</span>
        <span>
          {earnedAmount ? `$${formatEarnedAmount(earnedAmount)} earned` : ""}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span>{isJobSuccess ? "Job success" : ""}</span>
        {badge && (
          <div className="flex items-center gap-1">
            <Image src={BadgeIcons[badge]} alt={badge} width={20} height={20} />
            <span>{BadgeTitles[badge]}</span>
          </div>
        )}
      </div>
    </div>
  );
}
