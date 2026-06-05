import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { RatingScore } from "../atoms";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Icon } from "@iconify/react";

export type ClientFeedbackCardItem = {
  title: string;
  score: number;
  date: Date;
  description: string;
  tags?: { label: string; tooltip: string }[];
  fromUserName?: string;
};

export default function ClientFeedbackCard({
  title,
  score,
  date,
  description,
  tags,
  fromUserName,
}: ClientFeedbackCardItem) {
  return (
    <div className="rounded-3xl border border-slate-300 p-4 space-y-4">
      <h1 className="text-sm">{title}</h1>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-600 text-sm">
          <Calendar className="size-5" />
          <span>{format(date, "PPP")}</span>
        </div>

        <RatingScore score={score} />
      </div>
      <p className="text-sm text-slate-800">
        <i>"{description}"</i>{" "}
        <button className="cursor-pointer">View more</button>
      </p>

      {tags && (
        <ul className="flex flex-wrap items-center gap-2">
          {tags.slice(0, 2).map((tag) => (
            <Tooltip>
              <TooltipTrigger asChild>
                <li
                  key={tag.label}
                  className="py-0.5 px-2 rounded-md bg-slate-200 text-sm cursor-pointer"
                >
                  {tag.label}
                </li>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-sm p-2">{tag.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ))}
          {tags.length > 2 && (
            <li className="py-0.5 px-2 rounded-md bg-slate-200 text-sm cursor-pointer">
              +{tags.length - 2}
            </li>
          )}
        </ul>
      )}

      {fromUserName && (
        <div className="flex items-center gap-2 text-sm text-slate-800">
          <Icon icon="mdi:account-circle-outline" className="size-4" />
          <span>{fromUserName}.</span>
        </div>
      )}
    </div>
  );
}
