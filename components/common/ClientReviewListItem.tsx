import { ProfileKind } from "@/types";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { formatDate } from "date-fns";

export type ClientReviewListItemType = {
  title: string;
  link: string;
  talentType: ProfileKind;
  talentFirstName: string;
  talentLastName: string;
  hourlyRate?: number;
  fromDate: Date;
  toDate?: Date;
  budgetType: "fixed" | "hourly";
  talentReview: {
    rating: number;
    review: string;
  };
  clientReview: {
    rating: number;
    review: string;
  };
  hours?: number;
  billedAmount?: number;
};

export default function ClientReviewListItem({
  title,
  link,
  talentType,
  talentFirstName,
  talentLastName,
  hourlyRate,
  fromDate,
  toDate,
  budgetType,
  talentReview,
  clientReview,
  hours,
  billedAmount,
}: ClientReviewListItemType) {
  return (
    <li className="flex items-start justify-between gap-6 text-sm">
      <div className="space-y-2 flex-1">
        <Link
          href={link}
          className="underline cursor-pointer hover:text-blue-600 line-clamp-1"
        >
          {title}
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <Icon
                  key={index}
                  icon="mynaui:star-solid"
                  className="size-5 text-[#ff5900]"
                />
              ))}
            </div>
            <span className="text-base font-medium">
              {talentReview.rating.toFixed(1)}
            </span>
          </div>
          <p className="line-clamp-1">{talentReview.review}</p>
        </div>

        <div className="space-y-1">
          <p>
            To {talentType === "individual" ? "Freelancer" : "Agency"}{" "}
            <Link
              href="#"
              className="underline cursor-pointer hover:text-blue-600"
            >
              {talentFirstName} {talentLastName.slice(0, 1)}.
            </Link>
          </p>
          <div className="flex items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Icon
                    key={index}
                    icon="mynaui:star-solid"
                    className="size-4 text-[#ff5900]"
                  />
                ))}
              </div>
              <span className="text-base font-medium">
                {clientReview.rating.toFixed(1)}
              </span>
            </div>
            <p className="line-clamp-1">{clientReview.review}</p>
          </div>
        </div>
      </div>
      <div className="space-y-1">
        <p>
          {formatDate(fromDate, "MMM, yyyy")} -{" "}
          {toDate ? formatDate(toDate, "MMM, yyyy") : "Present"}
        </p>
        {budgetType === "hourly" && hours && hourlyRate && (
          <p>
            {hours} hours @ ${hourlyRate}/hr
          </p>
        )}
        {billedAmount && <p>${billedAmount.toFixed(2)}</p>}
        {budgetType === "fixed" && <p>Fixed-price</p>}
      </div>
    </li>
  );
}
