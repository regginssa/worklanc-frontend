import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import LaptopScanningFaceIcon from "@/public/assets/svgs/icons/other/laptop_scanning_face.svg";

interface ConsultationBannerProps {
  label?: string;
  title?: string;
  actionLabel?: string;
  actionHref?: string;
  onClose?: () => void;
}

export default function ConsultationBanner({
  label = "Guided tour",
  title = "Book a consultation with an expert to review your project’s budget, timeline, and scope one-on-one.",
  actionLabel = "Learn more",
  actionHref = "#",
  onClose,
}: ConsultationBannerProps) {
  return (
    <div className="h-full text-white flex flex-col justify-between rounded-3xl bg-zinc-800 space-y-4 p-6">
      <div className="space-y-4 w-full">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light">{label}</span>
          <button className="cursor-pointer" onClick={onClose}>
            <Icon icon="mdi:close" className="size-6" />
          </button>
        </div>

        <h4 className="text-2xl font-medium">{title}</h4>
      </div>

      <div className="flex items-end justify-between gap-6">
        <Link
          href={actionHref}
          className="py-2.5 px-4 rounded-full bg-white text-zinc-800 font-medium text-sm"
        >
          {actionLabel}
        </Link>
        <Image
          src={LaptopScanningFaceIcon}
          alt="Laptop scanning face"
          className="w-[97px] h-[87px]"
        />
      </div>
    </div>
  );
}
