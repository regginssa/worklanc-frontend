import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const SIZE = 40;
const STROKE_WIDTH = 2;

interface JobSuccessScoreProps {
  value: number;
  className?: string;
}

export default function JobSuccessScore({
  value,
  className,
}: JobSuccessScoreProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (SIZE - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = SIZE / 2;
  const targetOffset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={cn(
        "relative inline-flex size-10 items-center justify-center",
        className
      )}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
        aria-hidden
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          className="text-slate-400"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeDasharray={circumference}
          strokeLinecap="round"
          className="text-blue-600"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: targetOffset }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </svg>

      <Icon icon="mdi:crown" className="absolute size-5 text-blue-600" />
    </div>
  );
}
