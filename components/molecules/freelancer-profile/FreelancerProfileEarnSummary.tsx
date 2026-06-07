import { formatEarnedAmount } from "@/utils/math";

export default function FreelancerProfileEarnSummary({
  earnedAmount,
  jobs,
  hours,
}: {
  earnedAmount: number;
  jobs: number;
  hours: number;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-6">
      <div className="flex-1 space-y-2">
        <p className="text-xl font-medium">
          ${formatEarnedAmount(earnedAmount)}
        </p>
        <h3 className="text-xs text-slate-600 whitespace-nowrap">
          Total earnings
        </h3>
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-xl font-medium">{jobs}</p>
        <h3 className="text-xs text-slate-600 whitespace-nowrap">Total jobs</h3>
      </div>

      <div className="flex-1 space-y-2">
        <p className="text-xl font-medium">{hours}</p>
        <h3 className="text-xs text-slate-600 whitespace-nowrap">
          Total hours
        </h3>
      </div>
    </div>
  );
}
