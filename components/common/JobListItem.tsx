import CollapsableText from "./CollapsableText";
import { SkillsGroup } from "../molecules";
import { Icon } from "@iconify/react";
import { formatEarnedAmount } from "@/utils/math";

export default function JobListItem() {
  return (
    <li className="space-y-4 border-b border-slate-300 cursor-pointer hover:bg-slate-100 p-4 transition-colors duration-200 group">
      <div className="flex items-center gap-2 text-xs">
        <span>Posted yesterday</span>
        <span>•</span>
        <span>Proposals: 50+</span>
      </div>

      <h3 className="text-xl cursor-pointer hover:text-blue-600 hover:underline group-hover:text-blue-600">
        📷 No Skills Required – Take a Product Photo & Get Paid $20
      </h3>

      <p className="text-xs text-slate-600">
        Hourly: <strong className="font-medium">$15-$70</strong> - Entry level -
        Est. Time: Less than 1 month, 30+ hrs/week
      </p>

      <div className="flex items-center gap-2 text-slate-600 text-sm">
        <Icon icon="mdi:map-marker-outline" className="size-5" />
        <span>Only freelancers located in the United Kingdom may apply.</span>
      </div>

      <CollapsableText
        text="Summary We’re hiring beginners for simple remote to data entry work involving typing updates, checking short text for small errors, and oo lil processing keeping digital information organized. This is a beginner-friendly, short-term opportunity ideal for individuals based in USA, Italy, France, Germany, Eastern Europe, Australia, Malaysia, Mexico and East Asia who are looking to work from home with flexible hours. You’ll have"
        maxLength={400}
        textClassName="text-black"
      />

      <SkillsGroup skills={["Data Entry", "Typing", "Processing"]} />

      <ul className="flex items-center gap-10 text-sm text-slate-600">
        <li className="flex items-center gap-2">
          <Icon
            icon="mdi:timer-check-outline"
            className="size-5 text-blue-600"
          />
          <span>Reviewing Proposals</span>
        </li>

        <li className="flex items-center gap-2">
          <Icon
            icon="solar:verified-check-bold"
            className="size-5 text-blue-600"
          />
          <span>Payment verified</span>
        </li>

        <li className="flex items-center gap-2">
          <Icon icon="solar:star-bold" className="size-5 text-[#ff5900]" />
          <span>4.8</span>
        </li>

        <li className="flex items-center gap-1">
          <span className="font-medium">${formatEarnedAmount(20000)}</span>
          <span>spent</span>
        </li>

        <li className="flex items-center gap-2">
          <Icon icon="mdi:map-marker-outline" className="size-5" />
          <span>United Kingdom</span>
        </li>
      </ul>
    </li>
  );
}
