import { Progress } from "@/components/ui/progress";

export function PortfolioPdfProgress({
  fileName,
  progress = 12,
}: {
  fileName: string;
  progress?: number;
}) {
  return (
    <>
      <p className="truncate text-xs font-medium text-slate-800">{fileName}</p>
      <Progress value={progress} className="h-2" />
    </>
  );
}

export default function PortfolioPdfLoading({
  fileName,
  progress = 12,
}: {
  fileName: string;
  progress?: number;
}) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-[266px] w-[200px] flex-col justify-center gap-3 rounded-lg border border-slate-300 bg-white p-4">
        <PortfolioPdfProgress fileName={fileName} progress={progress} />
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-light">{fileName}</h4>
        <p className="text-sm text-slate-600">Loading pages…</p>
      </div>
    </div>
  );
}
