import { TalentBadge } from "@/types/user";
import Image from "next/image";

export type TalentDiscoverItemType = {
  name: string;
  title: string;
  avatar: string;
  badge: TalentBadge;
  earnedAmount: number;
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
    <div className="border border-slate-300 rounded-3xl p-4">
      <div className="flex items-center gap-2">
        <div className="size-[60px] relative">
          <Image
            src={avatar}
            alt="User"
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
          <span className="size-4 border-2 border-white rounded-full absolute top-0 left-0"></span>
        </div>
      </div>
    </div>
  );
}
