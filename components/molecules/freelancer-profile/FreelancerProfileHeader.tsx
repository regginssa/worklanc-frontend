import { IconButton } from "@/components/atoms";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface FreelancerProfileHeaderProps {
  name: string;
  avatar: string | StaticImageData;
  location: string;
  localTime?: string;
  isOnline?: boolean;
  identityVerified?: boolean;
  verifyIdentityHref?: string;
  onEditAvatar?: () => void;
  onShare?: () => void;
  children?: React.ReactNode;
}

export default function FreelancerProfileHeader({
  name,
  avatar,
  location,
  localTime,
  isOnline = false,
  identityVerified = false,
  verifyIdentityHref = "#",
  onEditAvatar,
  onShare,
  children,
}: FreelancerProfileHeaderProps) {
  return (
    <div className="p-8 border-b border-slate-300">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative h-[96px] w-[96px]">
            {isOnline && (
              <span className="absolute top-1 left-1 h-4 w-4 rounded-full border-2 border-white bg-green-600" />
            )}
            <Image
              src={avatar}
              alt={name}
              className="h-[96px] w-[96px] rounded-full object-contain"
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
                  <Link href={verifyIdentityHref} className="text-sm underline">
                    Verify your identity
                  </Link>
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
          </div>
        </div>

        {children}
      </div>

      {onShare && (
        <div className="flex justify-end">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className="flex cursor-pointer items-center gap-2 text-blue-600 transition-all duration-200 hover:text-blue-500"
            onClick={onShare}
          >
            <span className="text-sm font-medium">Share</span>
            <Icon icon="mdi:ios-share" className="h-5 w-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
