import {
  METRICS_Y_TICKS,
  shouldShowXLabel,
  valueToChartY,
  type MetricsDatePoint,
  type MetricsRangeDays,
  type MetricsSeries,
} from "@/lib/profile-metrics";

type MetricsLineChartProps = {
  dates: MetricsDatePoint[];
  series: MetricsSeries[];
  rangeDays: MetricsRangeDays;
};

const CHART_WIDTH = 640;
const CHART_HEIGHT = 220;
const PADDING = { top: 12, right: 12, bottom: 36, left: 36 };

export default function MetricsLineChart({
  dates,
  series,
  rangeDays,
}: MetricsLineChartProps) {
  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const pointCount = dates.length;

  const xForIndex = (index: number) => {
    if (pointCount <= 1) return PADDING.left + innerWidth / 2;
    return PADDING.left + (index / (pointCount - 1)) * innerWidth;
  };

  const buildPath = (values: number[]) =>
    values
      .map((value, index) => {
        const x = xForIndex(index);
        const y = PADDING.top + valueToChartY(value, innerHeight);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
        className="h-[220px] w-full min-w-[320px]"
        role="img"
        aria-label="Profile metrics line chart"
      >
        {METRICS_Y_TICKS.map((tick) => {
          const y = PADDING.top + valueToChartY(tick, innerHeight);
          return (
            <g key={tick}>
              <line
                x1={PADDING.left}
                y1={y}
                x2={CHART_WIDTH - PADDING.right}
                y2={y}
                className="stroke-slate-200"
                strokeWidth={1}
              />
              <text
                x={PADDING.left - 10}
                y={y + 4}
                textAnchor="end"
                className="fill-slate-500 text-[11px]"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {dates.map((point, index) => {
          if (!shouldShowXLabel(index, dates.length, rangeDays)) return null;
          const x = xForIndex(index);
          return (
            <text
              key={point.label + index}
              x={x}
              y={CHART_HEIGHT - 10}
              textAnchor="middle"
              className="fill-slate-500 text-[11px]"
            >
              {point.label}
            </text>
          );
        })}

        {series.map((line) => (
          <path
            key={line.key}
            d={buildPath(line.values)}
            fill="none"
            stroke={line.strokeColor}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}

        {series.map((line) =>
          line.values.map((value, index) => {
            const x = xForIndex(index);
            const y = PADDING.top + valueToChartY(value, innerHeight);
            return (
              <circle
                key={`${line.key}-${index}`}
                cx={x}
                cy={y}
                r={3}
                fill={line.strokeColor}
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
