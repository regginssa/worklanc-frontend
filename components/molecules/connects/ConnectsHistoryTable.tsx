import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatCentsToUsd,
  type ConnectPurchaseHistoryItem,
} from "@/types/connect";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

const SKELETON_ROWS = 6;
const TABLE_COLUMNS = [
  "Date",
  "Connects",
  "Amount",
  "Payment",
  "Expires",
  "Order ID",
] as const;

function formatTransactionDate(item: ConnectPurchaseHistoryItem) {
  const value = item.completedAt ?? item.createdAt;
  return format(new Date(value), "MMM d, yyyy h:mm a");
}

function formatPaymentMethod(item: ConnectPurchaseHistoryItem) {
  switch (item.paymentMethod) {
    case "card":
      return "Credit card";
    case "paypal":
      return "PayPal";
    case "crypto":
      return item.cryptoToken
        ? `Crypto (${item.cryptoToken.toUpperCase()})`
        : "Crypto";
    default:
      return "—";
  }
}

function formatAmountPaid(item: ConnectPurchaseHistoryItem) {
  if (
    item.paymentMethod === "crypto" &&
    item.cryptoAmount &&
    item.cryptoToken
  ) {
    const amount = Number(item.cryptoAmount);
    const formattedAmount = Number.isFinite(amount)
      ? amount.toLocaleString("en-US", { maximumFractionDigits: 6 })
      : item.cryptoAmount;
    return `${formattedAmount} ${item.cryptoToken.toUpperCase()}`;
  }

  return formatCentsToUsd(item.totalCents);
}

async function copyReference(uid: string) {
  try {
    await navigator.clipboard.writeText(uid);
    toast.success("Reference copied to clipboard");
  } catch {
    toast.error("Could not copy reference");
  }
}

function SkeletonCell({ className }: { className?: string }) {
  return (
    <div className={cn("h-4 rounded bg-slate-200 animate-pulse", className)} />
  );
}

export function ConnectsHistoryTableSkeleton() {
  return (
    <Table className="border-0">
      <TableHeader className="border-0 bg-transparent">
        <TableRow className="border-b border-slate-200 hover:bg-transparent">
          {TABLE_COLUMNS.map((label) => (
            <TableHead
              key={label}
              className={cn(
                "border-0 border-b border-slate-200 px-0 pb-3 text-xs font-medium uppercase tracking-wide text-slate-500",
                label === "Order ID" && "text-right"
              )}
            >
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-0">
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <TableRow
            key={index}
            className="border-b border-slate-100 hover:bg-transparent"
          >
            <TableCell className="border-0 px-0 py-4">
              <SkeletonCell className="w-36" />
            </TableCell>
            <TableCell className="border-0 px-0 py-4">
              <SkeletonCell className="w-14" />
            </TableCell>
            <TableCell className="border-0 px-0 py-4">
              <SkeletonCell className="w-20" />
            </TableCell>
            <TableCell className="border-0 px-0 py-4">
              <SkeletonCell className="w-24" />
            </TableCell>
            <TableCell className="border-0 px-0 py-4">
              <SkeletonCell className="w-24" />
            </TableCell>
            <TableCell className="border-0 px-0 py-4">
              <SkeletonCell className="w-28" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

type ConnectsHistoryTableProps = {
  transactions: ConnectPurchaseHistoryItem[];
};

export default function ConnectsHistoryTable({
  transactions,
}: ConnectsHistoryTableProps) {
  return (
    <Table className="border-0">
      <TableHeader className="border-0 bg-transparent">
        <TableRow className="border-b border-slate-200 hover:bg-transparent">
          {TABLE_COLUMNS.map((label) => (
            <TableHead
              key={label}
              className={cn(
                "border-0 border-b border-slate-200 px-0 pb-3 text-xs font-medium uppercase tracking-wide text-slate-500",
                label === "Order ID" && "text-right"
              )}
            >
              {label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="border-0">
        {transactions.map((item) => (
          <TableRow
            key={item.uid}
            className="border-b border-slate-100 hover:bg-slate-50/60"
          >
            <TableCell className="border-0 px-0 py-4 text-sm text-slate-900">
              {formatTransactionDate(item)}
            </TableCell>
            <TableCell className="border-0 px-0 py-4 text-sm font-medium text-emerald-600">
              +{item.connectAmount.toLocaleString()}
            </TableCell>
            <TableCell className="border-0 px-0 py-4 text-sm text-slate-700">
              {formatAmountPaid(item)}
              {item.discountCents > 0 && (
                <span className="mt-0.5 block text-xs text-slate-500">
                  Promo {item.promoCode}
                </span>
              )}
            </TableCell>
            <TableCell className="border-0 px-0 py-4 text-sm text-slate-700">
              {formatPaymentMethod(item)}
            </TableCell>
            <TableCell className="border-0 px-0 py-4 text-sm text-slate-600">
              {item.connectsExpireAt
                ? format(new Date(item.connectsExpireAt), "MMM d, yyyy")
                : "—"}
            </TableCell>
            <TableCell className="border-0 px-0 py-4 text-right">
              <div className="inline-flex items-center gap-1.5">
                <span className="font-mono text-xs text-slate-500">
                  {item.uid.slice(0, 8)}
                </span>
                <button
                  type="button"
                  onClick={() => copyReference(item.uid)}
                  className="inline-flex size-6 cursor-pointer items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Copy reference"
                  title="Copy reference"
                >
                  <Icon icon="mdi:content-copy" className="size-3.5" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
