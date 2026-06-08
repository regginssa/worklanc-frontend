import { Icon } from "@iconify/react";
import Link from "next/link";
import ProfileSectionActions from "./ProfileSectionActions";

export type FreelancerProfileVerification = {
  label: string;
  value: string;
  verified?: boolean;
  verifyHref?: string;
  onAdd?: () => void;
};

export type FreelancerProfileMilitaryVeteranServed = {
  countryCode: string;
  onEdit?: () => void;
  onRemove?: () => void;
  deleteLoading?: boolean;
};

export interface FreelancerProfileVerificationsProps {
  items: FreelancerProfileVerification[];
  militaryVeteranServed?: FreelancerProfileMilitaryVeteranServed;
}

export default function FreelancerProfileVerifications({
  items,
  militaryVeteranServed,
}: FreelancerProfileVerificationsProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Verifications</h3>
      <ul className="space-y-2 text-sm">
        {items.map((item) => (
          <li
            key={item.label}
            className={
              item.onAdd
                ? "flex items-center justify-between"
                : "flex items-center gap-2"
            }
          >
            <span className="font-medium">{item.label}</span>
            {item.onAdd ? (
              <ProfileSectionActions onAdd={item.onAdd} />
            ) : (
              <div className="flex items-center gap-2">
                <span>{item.value}</span>
                <Icon
                  icon={
                    item.verified
                      ? "solar:verified-check-bold"
                      : "solar:verified-check-bold-duotone"
                  }
                  className={`h-5 w-5 ${
                    item.verified ? "text-blue-600" : "text-slate-400"
                  }`}
                />
                {!item.verified && item.verifyHref && (
                  <Link href={item.verifyHref} className="text-sm underline">
                    Verify your identity
                  </Link>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {militaryVeteranServed && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Icon
              icon={`flagpack:${militaryVeteranServed.countryCode.toLowerCase()}`}
              className="h-5 w-5 rounded-sm"
              aria-label={`${militaryVeteranServed.countryCode} flag`}
            />
            <div className="flex flex-col gap-1">
              <span className="font-medium">Military Veteran</span>
              <span className="">Self-reported</span>
            </div>
          </div>
          {(militaryVeteranServed.onEdit || militaryVeteranServed.onRemove) && (
            <ProfileSectionActions
              onEdit={militaryVeteranServed.onEdit}
              onRemove={militaryVeteranServed.onRemove}
              loadingRemove={militaryVeteranServed.deleteLoading}
            />
          )}
        </div>
      )}
    </div>
  );
}
