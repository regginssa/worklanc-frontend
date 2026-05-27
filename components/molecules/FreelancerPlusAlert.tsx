import { Icon } from "@iconify/react";
import Link from "next/link";

export default function FreelancerPlusAlert() {
  return (
    <>
      <Link
        href="#"
        className="freelancer-plus-alert p-4 flex items-start gap-10 rounded-lg shadow-lg text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-[length:200%_100%] hover:border hover:border-black hover:shadow-xl"
      >
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <Icon icon="solar:star-outline" className="w-4 h-4" />
            <span className="uppercase">Freelancer Plus Offer</span>
          </div>

          <p className="mt-4">
            Get Freelancer Plus for 50% off one month and keep your profile
            visible during breaks. Limited time only.
          </p>
        </div>
        <Icon icon="mdi:arrow-right" className="w-10 h-10" />
      </Link>
      <style jsx>{`
        .freelancer-plus-alert {
          animation: gradient-slide 5s linear infinite;
        }

        @keyframes gradient-slide {
          0% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </>
  );
}
