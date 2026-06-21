import { ProfileKind } from "@/types";
import { formatDate } from "date-fns";
import Link from "next/link";

export type JobInProgressItemType = {
  title: string;
  link: string;
  talentType: ProfileKind;
  talentFirstName: string;
  talentLastName: string;
  fromDate: Date;
  toDate?: Date;
  budgetType: "fixed" | "hourly";
};

export default function JobInProgressItem({
  title,
  link,
  talentType,
  talentFirstName,
  talentLastName,
  fromDate,
  toDate,
  budgetType,
}: JobInProgressItemType) {
  return (
    <li className="flex items-center justify-between text-sm gap-6">
      <div className="space-y-1 flex-1">
        <Link
          href={link}
          className="underline cursor-pointer hover:text-blue-600 line-clamp-1"
        >
          {title}
        </Link>

        <p>
          {talentType === "individual" ? "Freelancer" : "Agency"}{" "}
          {talentFirstName} {talentLastName.slice(0, 1)}.
        </p>
      </div>
      <div className="space-y-1">
        <p>
          {formatDate(fromDate, "MMM, yyyy")} -{" "}
          {toDate ? formatDate(toDate, "MMM, yyyy") : "Present"}
        </p>
        <p>{budgetType === "fixed" ? "Fixed-price" : "Hourly-price"}</p>
      </div>
    </li>
  );
}
