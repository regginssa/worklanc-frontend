import { formatEarnedAmount } from "@/utils/math";
import { differenceInWeeks, formatDate } from "date-fns";
import Link from "next/link";
import { Icon } from "@iconify/react";

export type InviteProposalListItemType = {
  receivedDate: Date;
  project: {
    uid: string;
    title: string;
  };
  client: {
    totalSpent: number;
    totalHires: number;
    paymentVerified: boolean;
  };
};

export default function InviteProposalListItem({
  receivedDate,
  project,
  client,
}: InviteProposalListItemType) {
  const weeksAgo = differenceInWeeks(new Date(), receivedDate);

  return (
    <li className="flex items-center justify-between gap-8">
      <div className="space-y-1">
        <p className="text-sm">
          Received {formatDate(receivedDate, "MMM d, yyyy")}
        </p>
        <p className="text-xs text-slate-600">
          {weeksAgo === 1 ? "1 week ago" : `${weeksAgo} weeks ago`}
        </p>
      </div>

      <h3 className="line-clamp-1">
        <Link
          href={`/nx/proposals/interview/${project.uid}`}
          className="cursor-pointer underline hover:text-blue-600"
        >
          {project.title}
        </Link>
      </h3>

      <div className="space-y-1">
        <p className="text-sm font-medium">About the client</p>
        <div className="flex items-center gap-4 text-sm text-slate-600">
          <span>
            <strong>{formatEarnedAmount(client.totalSpent)}</strong> spent
          </span>
          <span>{client.totalHires} hires</span>
          <div className="flex items-center gap-1">
            <Icon
              icon="solar:verified-check-bold"
              className={`size-4 ${
                client.paymentVerified ? "text-blue-600" : "text-slate-400"
              }`}
            />
            <span>
              {client.paymentVerified
                ? "Payment verified"
                : "Payment not verified"}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
