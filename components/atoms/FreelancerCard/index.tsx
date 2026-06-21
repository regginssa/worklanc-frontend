import { Icon } from "@iconify/react";
import { TFreelancer } from "@/types/components.types";
import { formatName } from "@/utils/user";
import Image from "next/image";
import Badge from "../Badge";

export interface IFreelancerCard {
  type: "CONSULTANT" | "VIEW_PROFILE";
  freelancer: TFreelancer;
}

const FreelancerCard: React.FC<IFreelancerCard> = ({ type, freelancer }) => {
  return (
    <div className="w-full rounded-xl shadow-lg hover:shadow-xl bg-white hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center gap-4 p-6 border-2 border-gray-200">
      {/* Avatar */}
      {freelancer.pic && (
        <div className="relative w-32 h-32">
          <Image
            src={freelancer.pic}
            alt={freelancer.name}
            className="rounded-full object-cover"
            fill
          />
        </div>
      )}

      {/* Name & Profession */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold">{formatName(freelancer.name)}</h1>
        <h2 className="text-base">{freelancer.profession}</h2>
      </div>

      {/* Badge & Billing Rate */}
      <div className="w-full flex flex-row items-center justify-center gap-6">
        <Badge badge={freelancer.badge} type="FREELANCER" />
        <span>
          ${freelancer.rate.amount}/
          {freelancer.rate.unit === "min"
            ? `${freelancer.rate.duration} ${freelancer.rate.unit}`
            : freelancer.rate.unit}
        </span>
      </div>

      {/* Ranking & Completed Jobs */}
      <div className="mt-2 flex items-center gap-2">
        <Icon icon="mynaui:star-solid" className="text-yellow-500 w-5 h-5" />
        <span className="text-gray-600">{freelancer.ranking}/5</span>
        <span className="text-gray-600">({freelancer.jobs} jobs)</span>
      </div>

      {/* About */}
      <div className="w-full flex items-center justify-between mt-2">
        <p className="line-clamp-3 text-sm">{freelancer.about}</p>
      </div>

      {/* Consultant time indicator */}
      <div className="flex items-center justify-center gap-2">
        <Icon icon="svg-spinners:clock" className="text-green-600 w-5 h-5" />
        <span className="text-green-600">Next consultation time: Now</span>
      </div>

      {/* Button */}
      <button className="w-full border-2 border-blue-600 rounded-lg text-blue-600 transition-all duration-300 ease-in-out py-2 font-semibold hover:bg-gray-200 cursor-pointer">
        Choose a time
      </button>
    </div>
  );
};

export default FreelancerCard;
