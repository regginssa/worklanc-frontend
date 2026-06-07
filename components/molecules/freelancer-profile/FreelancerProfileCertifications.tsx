import Image from "next/image";
import PrizeIcon from "@/public/assets/svgs/icons/other/prize.svg";
import ProfileSectionActions from "./ProfileSectionActions";
import { Certification } from "@/types/user";
import PaperPencilIcon from "@/public/assets/svgs/icons/other/pencil_paper.svg";
import { formatMonthYear } from "@/utils/df";
import { motion } from "motion/react";
import { useState } from "react";

export interface FreelancerProfileCertificationsProps {
  onAdd?: () => void;
  emptyDescription?: string;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  certifications: Certification[];
  className?: string;
}

export default function FreelancerProfileCertifications({
  onAdd,
  emptyDescription = "Listing your certifications can help prove your specific knowledge or abilities. (+10%)",
  emptyActionLabel = "Add certification",
  onEmptyAction,
  certifications,
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

      {certifications.length > 0 ? (
        <ul className="">
          {certifications.map((certification, index) => (
            <li
              key={certification.name}
              className="flex items-start gap-10 py-6"
            >
              <div className="size-20 relative">
                {certification.providerLogoUrl ? (
                  <Image
                    src={certification.providerLogoUrl}
                    alt={certification.provider}
                    width={80}
                    height={80}
                    className="rounded-full object-contain"
                    fill
                  />
                ) : (
                  <Image
                    src={PaperPencilIcon}
                    alt="Paper pencil"
                    className="size-20 object-contain"
                    fill
                  />
                )}
              </div>

              <div className="space-y-4 flex-1">
                <h4 className="text-lg font-medium">{certification.name}</h4>
                <p className="text-sm text-slate-600">
                  Provider: {certification.provider}
                </p>
                <p className="text-sm text-slate-600">
                  Issued: {formatMonthYear(new Date(certification.issuedDate))}
                </p>
                {certification.expirationDate && (
                  <p className="text-sm text-slate-600">
                    Expiration:{" "}
                    {formatMonthYear(new Date(certification.expirationDate))}
                  </p>
                )}
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
              </div>
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
