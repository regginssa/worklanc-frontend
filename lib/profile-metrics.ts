import { format, subDays } from "date-fns";

export type MetricsRangeDays = 7 | 30;

export type MetricsTabValue =
  | "profile_views"
  | "invites"
  | "impressions_clicks";

export type MetricsSeries = {
  key: string;
  label: string;
  colorClass: string;
  strokeColor: string;
  values: number[];
};

export type MetricsDatePoint = {
  date: Date;
  label: string;
};

const Y_MAX = 6;

export const METRICS_Y_TICKS = [0, 3, 6] as const;

export const METRICS_RANGE_OPTIONS = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
] as const;

export const METRICS_TABS = [
  { label: "Profile views", value: "profile_views" },
  { label: "Invites", value: "invites" },
  { label: "Impressions and clicks", value: "impressions_clicks" },
] as const;

export const buildMetricsDatePoints = (
  rangeDays: MetricsRangeDays
): MetricsDatePoint[] => {
  const today = new Date();
  return Array.from({ length: rangeDays }, (_, index) => {
    const date = subDays(today, rangeDays - 1 - index);
    return {
      date,
      label: format(date, rangeDays === 7 ? "MMM d" : "M/d"),
    };
  });
};

const emptySeries = (length: number) => Array.from({ length }, () => 0);

export const buildMetricsSeries = (
  tab: MetricsTabValue,
  rangeDays: MetricsRangeDays
): MetricsSeries[] => {
  const length = rangeDays;

  if (tab === "impressions_clicks") {
    return [
      {
        key: "impressions",
        label: "Impressions",
        colorClass: "bg-blue-400",
        strokeColor: "#60a5fa",
        values: emptySeries(length),
      },
      {
        key: "clicks",
        label: "Clicks",
        colorClass: "bg-blue-600",
        strokeColor: "#2563eb",
        values: emptySeries(length),
      },
    ];
  }

  return [
    {
      key: "badge_off",
      label: "Available now badge is off",
      colorClass: "bg-blue-400",
      strokeColor: "#60a5fa",
      values: emptySeries(length),
    },
    {
      key: "badge_on",
      label: "Available now badge is on",
      colorClass: "bg-blue-600",
      strokeColor: "#2563eb",
      values: emptySeries(length),
    },
  ];
};

export const sumSeriesValues = (values: number[]) =>
  values.reduce((total, value) => total + value, 0);

export const formatMetricsSummary = (
  tab: MetricsTabValue,
  series: MetricsSeries[]
) => {
  if (tab === "profile_views") {
    const total = series.reduce(
      (sum, line) => sum + sumSeriesValues(line.values),
      0
    );
    return `${total} profile view${total === 1 ? "" : "s"}`;
  }

  if (tab === "invites") {
    const total = series.reduce(
      (sum, line) => sum + sumSeriesValues(line.values),
      0
    );
    return `${total} invite${total === 1 ? "" : "s"}`;
  }

  const impressions = sumSeriesValues(series[0]?.values ?? []);
  const clicks = sumSeriesValues(series[1]?.values ?? []);
  return `${impressions} impression${
    impressions === 1 ? "" : "s"
  } and ${clicks} click${clicks === 1 ? "" : "s"}`;
};

export const valueToChartY = (value: number, innerHeight: number) =>
  innerHeight - (Math.min(value, Y_MAX) / Y_MAX) * innerHeight;

export const shouldShowXLabel = (
  index: number,
  total: number,
  rangeDays: MetricsRangeDays
) => {
  if (rangeDays === 7) return true;
  if (index === 0 || index === total - 1) return true;
  return index % 5 === 0;
};
