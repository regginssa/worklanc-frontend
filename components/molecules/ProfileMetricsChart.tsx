import { useMemo, useState } from "react";
import { Dropdown, TabBar } from "@/components/atoms";
import MetricsLineChart from "./MetricsLineChart";
import {
  METRICS_RANGE_OPTIONS,
  METRICS_TABS,
  buildMetricsDatePoints,
  buildMetricsSeries,
  formatMetricsSummary,
  type MetricsRangeDays,
  type MetricsTabValue,
} from "@/lib/profile-metrics";

export default function ProfileMetricsChart() {
  const [rangeDays, setRangeDays] = useState<MetricsRangeDays>(7);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const activeTab = METRICS_TABS[selectedTabIndex].value as MetricsTabValue;

  const dates = useMemo(() => buildMetricsDatePoints(rangeDays), [rangeDays]);

  const series = useMemo(
    () => buildMetricsSeries(activeTab, rangeDays),
    [activeTab, rangeDays]
  );

  const summary = useMemo(
    () => formatMetricsSummary(activeTab, series),
    [activeTab, series]
  );

  return (
    <div className="space-y-6 rounded-3xl border border-slate-300 p-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Profile metrics</h3>
        <Dropdown
          name="metricsRange"
          options={[...METRICS_RANGE_OPTIONS]}
          value={rangeDays}
          onSelect={(value) => setRangeDays(Number(value) as MetricsRangeDays)}
          classname="w-40!"
        />
      </div>

      <TabBar
        tabs={[...METRICS_TABS]}
        selectedTabIndex={selectedTabIndex}
        onTab={setSelectedTabIndex}
        className="text-base! font-medium!"
      />

      <p className="text-2xl font-medium">{summary}</p>

      <MetricsLineChart dates={dates} series={series} rangeDays={rangeDays} />

      <ul className="space-y-2 pt-2">
        {series.map((line) => (
          <li key={line.key} className="flex items-center gap-2 text-sm">
            <span className={`size-4 rounded-full ${line.colorClass}`} />
            <span className="text-slate-700">{line.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
