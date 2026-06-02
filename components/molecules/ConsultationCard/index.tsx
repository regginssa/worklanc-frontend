import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import TopRatedIcon from "@/public/assets/svgs/icons/badges/top_rated.svg";

interface ConsultationCardProps {
  name?: string;
  country?: string;
  jobSuccess?: string;
  jobs?: string;
  rate?: string;
  headline?: string;
  description?: string;
  price?: string;
}

export default function ConsultationCard({
  name = "John D.",
  country = "United States",
  jobSuccess = "100%",
  jobs = "20",
  rate = "$50/hr",
  headline = "Senior Flutter | React Native Expert",
  description = "I have 10 years of experience in mobile app development and have worked on projects for startups and enterprises. Collaborated with teams to deliver high-quality software solutions on time and within budget.",
  price = "$60 per 30 minutes Zoom meeting",
}: ConsultationCardProps) {
  return (
    <div className="border border-slate-300 rounded-3xl p-6 space-y-4 h-full flex flex-col justify-between">
      <div className="space-y-4 w-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative size-12">
              <Image
                src={UserPic}
                alt="User"
                className="rounded-full object-cover w-12 h-12"
              />
              <Image
                src={TopRatedIcon}
                alt="Top rated"
                className="absolute -top-1.5 -left-1.5 size-6"
              />
            </div>

            <div>
              <h5 className="text-xl">{name}</h5>
              <p className="text-sm font-light">{country}</p>
            </div>
          </div>

          <motion.button whileTap={{ scale: 0.95 }} className="cursor-pointer">
            <Icon
              icon="mdi:cards-heart-outline"
              className="size-6 text-blue-600"
            />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="gap-1 flex flex-col items-center justify-center">
            <h5 className="text-sm font-light">{jobSuccess}</h5>
            <p className="text-xs font-light">Job Success</p>
          </div>

          <div className="gap-1 flex flex-col items-center justify-center">
            <h5 className="text-sm font-light">{jobs}</h5>
            <p className="text-xs font-light">Jobs</p>
          </div>

          <div className="gap-1 flex flex-col items-center justify-center">
            <h5 className="text-sm font-light">{rate}</h5>
            <p className="text-xs font-light">Rate</p>
          </div>
        </div>

        <h5 className="text-sm font-light">{headline}</h5>

        <p className="text-sm font-light line-clamp-3">{description}</p>
      </div>

      <div className="flex items-center gap-1 text-sm text-blue-600">
        <Icon icon="pepicons-pencil:camera" className="size-6" />
        <span>{price}</span>
      </div>

      <Link
        href="#"
        className="py-2.5 w-full flex items-center justify-center font-medium text-sm rounded-full cursor-pointer hover:bg-slate-100 border border-slate-400 transition-colors duration-200"
      >
        Book a consultation
      </Link>
    </div>
  );
}
