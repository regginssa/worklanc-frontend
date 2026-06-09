import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image, { type StaticImageData } from "next/image";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { toast } from "sonner";

function getAbsoluteUrl(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  if (typeof window === "undefined") return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${window.location.origin}${path}`;
}

function openInNewTab(shareUrl: string) {
  const tab = window.open(shareUrl, "_blank", "noopener,noreferrer");
  tab?.focus();
}

export default function ShareProfileDialog({
  open,
  onClose,
  url,
  avatar,
  profileName,
  profileTitle = "",
}: {
  open: boolean;
  onClose: () => void;
  url: string;
  avatar: string | StaticImageData;
  profileName: string;
  profileTitle?: string;
}) {
  const absoluteUrl = getAbsoluteUrl(url);
  const shareText = `Check out ${profileName} — ${profileTitle} on Worklanc`;
  const encodedUrl = encodeURIComponent(absoluteUrl);
  const encodedText = encodeURIComponent(shareText);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      toast.success("Link copied to clipboard", { position: "top-center" });
    } catch {
      toast.error("Could not copy link", { position: "top-center" });
    }
  };

  const handleEmailShare = () => {
    const mailto = `mailto:?subject=${encodeURIComponent(
      `${profileName} on Worklanc`
    )}&body=${encodeURIComponent(`${shareText}\n\n${absoluteUrl}`)}`;
    openInNewTab(mailto);
  };

  const handleWhatsAppShare = () => {
    openInNewTab(
      `https://wa.me/?text=${encodeURIComponent(`${shareText} ${absoluteUrl}`)}`
    );
  };

  const handleFacebookShare = () => {
    openInNewTab(
      `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    );
  };

  const handleTwitterShare = () => {
    openInNewTab(
      `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
    );
  };

  const handleLinkedInShare = () => {
    openInNewTab(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
    );
  };

  const handleInstagramShare = async () => {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      toast.success(
        "Link copied. Paste it in an Instagram story link sticker, bio, or DM.",
        { position: "top-center", duration: 5000 }
      );
    } catch {
      toast.error("Could not copy link", { position: "top-center" });
    }
  };

  const handleTelegramShare = () => {
    openInNewTab(
      `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`
    );
  };

  const items = [
    { label: "Copy link", icon: "mdi:link", onClick: handleCopyLink },
    { label: "Email", icon: "mdi:email-outline", onClick: handleEmailShare },
    { label: "WhatsApp", icon: "mdi:whatsapp", onClick: handleWhatsAppShare },
    { label: "Facebook", icon: "mdi:facebook", onClick: handleFacebookShare },
    { label: "Twitter", icon: "mdi:twitter", onClick: handleTwitterShare },
    { label: "LinkedIn", icon: "mdi:linkedin", onClick: handleLinkedInShare },
    {
      label: "Instagram",
      icon: "mdi:instagram",
      onClick: handleInstagramShare,
    },
    { label: "Telegram", icon: "mdi:telegram", onClick: handleTelegramShare },
  ];

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
    >
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Share profile</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-6">
          <div className="flex items-center gap-6">
            <Image
              src={avatar}
              alt={profileName}
              width={56}
              height={56}
              unoptimized={typeof avatar === "string"}
              className="h-14 w-14 rounded-full object-cover"
            />

            <div>
              <h3 className="text-xl font-medium">{profileName}</h3>
              {profileTitle ? (
                <p className="mt-1 text-sm">{profileTitle}</p>
              ) : null}
            </div>
          </div>

          <ul className="grid grid-cols-4 gap-4">
            {items.map((item) => (
              <motion.li
                key={item.label}
                role="button"
                tabIndex={0}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center justify-center gap-2 py-6 text-slate-800 rounded-lg border border-slate-200 hover:border-slate-600 cursor-pointer hover:bg-slate-100 transition-all duration-200"
                onClick={item.onClick}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    item.onClick();
                  }
                }}
              >
                <Icon icon={item.icon} className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
