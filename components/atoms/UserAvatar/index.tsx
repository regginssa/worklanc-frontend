import Image from "next/image";
import { Icon } from "@iconify/react";
import { resolveMediaAssetUrl } from "@/lib/api/upload";

interface UserAvatarProps {
  avatarUrl?: string | null;
  alt?: string;
  size: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  alt = "User",
  size,
  className = "",
}: UserAvatarProps) {
  const src = resolveMediaAssetUrl(avatarUrl);

  if (!src) {
    return (
      <Icon
        icon="material-symbols-light:account-circle-outline"
        width={size}
        height={size}
        className={className}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={`rounded-full object-cover ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
