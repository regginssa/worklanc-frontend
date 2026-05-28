interface CircleProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  trackClassName?: string;
  progressClassName?: string;
  showLabel?: boolean;
  label?: React.ReactNode;
  rounded?: boolean;
}

export default function CircleProgress({
  value,
  size = 64,
  strokeWidth = 6,
  className = "",
  trackClassName = "text-slate-200",
  progressClassName = "text-blue-600",
  showLabel = true,
  label,
  rounded = true,
}: CircleProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (clampedValue / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className={trackClassName}
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap={rounded ? "round" : "butt"}
          className={`${progressClassName} transition-[stroke-dashoffset] duration-500 ease-out`}
        />
      </svg>

      {showLabel && (
        <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
          {label ?? `${Math.round(clampedValue)}%`}
        </span>
      )}
    </div>
  );
}
