import Image from "next/image";
import { IconButton } from "@/components/atoms";
import PrizeIcon from "@/public/assets/svgs/icons/other/prize.svg";
import ProfileSectionActions from "./ProfileSectionActions";
import { Certification } from "@/types/user";
import PaperPencilIcon from "@/public/assets/svgs/icons/other/pencil_paper.svg";
import { formatMonthYear } from "@/utils/df";
import { motion } from "motion/react";
import { useState } from "react";

export type FreelancerProfileCertificationItem = Certification & {
  onEdit?: () => void;
  onRemove?: () => void;
  deleteLoading?: boolean;
};

export interface FreelancerProfileCertificationsProps {
  onAdd?: () => void;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  items: FreelancerProfileCertificationItem[];
  className?: string;
}

export default function FreelancerProfileCertifications({
  onAdd,
  emptyDescription = "Listing your certifications can help prove your specific knowledge or abilities. (+10%)",
  emptyActionLabel = "Add certification",
  onEmptyAction,
  items,
  className,
}: FreelancerProfileCertificationsProps) {
  const [expandedCertification, setExpandedCertification] = useState<
    number | null
  >(null);

  return (
    <div className={`rounded-3xl border border-slate-300 p-8 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-medium">Certifications</h3>
        <ProfileSectionActions onAdd={onAdd} />
      </div>

      {items.length > 0 ? (
        <ul className="">
          {items.map((certification, index) => (
            <li
              key={`${certification.name}-${certification.provider}-${index}`}
              className="flex items-start justify-between gap-6 py-6"
            >
              <div className="flex min-w-0 flex-1 items-start gap-10">
                <div className="relative size-20 shrink-0">
                  {certification.providerLogoUrl ? (
                    <img
                      src={certification.providerLogoUrl}
                      alt={`${certification.provider} logo`}
                      className="size-20 rounded-full object-contain"
                    />
                  ) : (
                    <Image
                      src={PaperPencilIcon}
                      alt="Paper pencil"
                      className="size-20 object-contain"
                      width={80}
                      height={80}
                    />
                  )}
                </div>

                <div className="min-w-0 flex-1 space-y-4">
                  <h4 className="text-lg font-medium">{certification.name}</h4>
                  <p className="text-sm text-slate-600">
                    Provider: {certification.provider}
                  </p>
                  <p className="text-sm text-slate-600">
                    Issued:{" "}
                    {formatMonthYear(new Date(certification.issuedDate))}
                  </p>
                  {certification.expirationDate && (
                    <p className="text-sm text-slate-600">
                      Expiration:{" "}
                      {formatMonthYear(new Date(certification.expirationDate))}
                    </p>
                  )}
                  {certification.description && (
                    <>
                      {expandedCertification === index ? (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer text-sm text-blue-600 hover:underline"
                          onClick={() => setExpandedCertification(null)}
                        >
                          Hide description
                        </motion.button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          className="cursor-pointer text-sm text-blue-600 hover:underline"
                          onClick={() => setExpandedCertification(index)}
                        >
                          Show description
                        </motion.button>
                      )}

                      {expandedCertification === index && (
                        <p className="text-sm text-slate-600">
                          {certification.description}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {(certification.onEdit || certification.onRemove) && (
                <div className="flex shrink-0 items-center gap-4">
                  {certification.onEdit && (
                    <IconButton
                      variant="outline"
                      icon="mdi:pencil-outline"
                      className="p-1!"
                      onClick={certification.onEdit}
                    />
                  )}
                  {certification.onRemove && (
                    <IconButton
                      variant="outline"
                      icon="mdi:trash-can-outline"
                      className="p-1!"
                      onClick={certification.onRemove}
                      loading={certification.deleteLoading}
                      disabled={certification.deleteLoading}
                    />
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center gap-6 py-10">
          <Image
            src={PrizeIcon}
            alt="Prize"
            className="h-[130px] w-[145px] object-contain"
          />
          <div className="text-center text-sm">
            <p>{emptyDescription}</p>
            {onEmptyAction && (
              <button
                type="button"
                className="mt-4 cursor-pointer font-medium text-blue-600 hover:underline"
                onClick={onEmptyAction}
              >
                {emptyActionLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
