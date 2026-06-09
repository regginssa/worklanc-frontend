import { IconButton, JobSuccessScore } from "@/components/atoms";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import ShareProfileDialog from "../dialogs/ShareProfileDialog";
import { useState } from "react";
import { BadgeIcons, BadgeTitles, IconLabel } from "@/components/common";
import { TalentBadge } from "@/types/user";

export interface FreelancerProfileHeaderProps {
  name: string;
  avatar: string | StaticImageData;
  location: string;
  localTime?: string;
  isOnline?: boolean;
  identityVerified?: boolean;
  verifyIdentityHref?: string;
  isAvailableNow?: boolean;
  jobSuccessScore: number;
  badge: TalentBadge;
  className?: string;
  onEditAvatar?: () => void;
  isSharable?: boolean;
  profileTitle?: string;
  shareUrl?: string;
  children?: React.ReactNode;
}

export default function FreelancerProfileHeader({
  name,
  avatar,
  location,
  localTime,
  isOnline = false,
  identityVerified = false,
  verifyIdentityHref,
  isAvailableNow,
  jobSuccessScore,
  badge,
  className,
  onEditAvatar,
  isSharable,
  profileTitle,
  shareUrl,
  children,
}: FreelancerProfileHeaderProps) {
  const [shareOpen, setShareOpen] = useState(false);

  return (
    <div className={`p-8 border-b border-slate-300 ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-[96px] w-[96px]">
            {isOnline && (
              <span className="absolute top-1 left-1 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
            )}
            <Image
              src={avatar}
              alt={name}
              width={96}
              height={96}
              unoptimized={typeof avatar === "string"}
              className="h-[96px] w-[96px] rounded-full object-cover"
            />
            {onEditAvatar && (
              <IconButton
                variant="outline"
                icon="mdi:pencil-outline"
                className="absolute right-0 bottom-0 bg-white! p-1!"
                onClick={onEditAvatar}
              />
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-medium">{name}</h1>
              {!identityVerified && (
                <div className="flex items-center gap-2">
                  <Icon
                    icon="solar:verified-check-bold-duotone"
                    className="h-6 w-6 text-slate-400"
                  />
                  {verifyIdentityHref && (
                    <Link
                      href={verifyIdentityHref}
                      className="text-sm underline"
                    >
                      Verify your identity
                    </Link>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Icon
                icon="mdi:map-marker-outline"
                className="h-5 w-5 text-slate-400"
              />
              <span className="text-sm text-slate-600">
                {location}
                {localTime ? ` – ${localTime}` : ""}
              </span>
            </div>

            {isAvailableNow && (
              <IconLabel icon="si:lightning-line" label="Available Now" />
            )}
            {(jobSuccessScore > 0 || badge !== "NONE") && (
              <div className="flex items-center gap-4">
                {badge !== "NONE" && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={BadgeIcons[badge]}
                      alt={badge}
                      width={32}
                      height={32}
                    />
                    <span className="font-medium uppercase text-sm">
                      {BadgeTitles[badge]}
                    </span>
                  </div>
                )}
                {jobSuccessScore > 0 && (
                  <div className="flex items-center gap-2">
                    <JobSuccessScore value={jobSuccessScore} />
                    <span className="text-sm font-medium">
                      {jobSuccessScore}% Job Success
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {children}
      </div>

      {isSharable && (
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="flex cursor-pointer items-center gap-2 text-blue-600 transition-all duration-200 hover:text-blue-500"
            onClick={() => setShareOpen(true)}
          >
            <span className="text-sm font-medium">Share</span>
            <Icon icon="mdi:ios-share" className="h-5 w-5" />
          </motion.button>
        </div>
      )}

      <ShareProfileDialog
        url={shareUrl ?? ""}
        avatar={avatar}
        profileName={name}
        profileTitle={profileTitle}
        open={shareOpen}
        onClose={() => setShareOpen(false)}
      />
    </div>
  );
}
