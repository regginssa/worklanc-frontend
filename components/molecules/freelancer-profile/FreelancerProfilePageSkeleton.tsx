function SkeletonBar({ className }: { className?: string }) {
  return (
    <span
      className={`inline-block rounded bg-slate-200 animate-pulse ${
        className ?? ""
      }`}
    />
  );
}

function SidebarSectionSkeleton({
  labelWidth = "w-36",
  lines = 2,
}: {
  labelWidth?: string;
  lines?: number;
}) {
  return (
    <div className="space-y-4">
      <SkeletonBar className={`h-6 ${labelWidth}`} />
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, index) => (
          <SkeletonBar
            key={index}
            className={`h-4 ${index === lines - 1 ? "w-3/5" : "w-full"}`}
          />
        ))}
      </div>
    </div>
  );
}

function BottomSectionSkeleton({
  titleWidth = "w-48",
  bordered = true,
}: {
  titleWidth?: string;
  bordered?: boolean;
}) {
  return (
    <div
      className={`space-y-6 p-8 ${bordered ? "rounded-3xl border border-slate-300" : ""}`}
    >
      <SkeletonBar className={`h-8 ${titleWidth}`} />
      <div className="space-y-3">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-5/6" />
        <SkeletonBar className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export default function FreelancerProfilePageSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="rounded-3xl border border-slate-300">
        <div className="border-b border-slate-300 p-8">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-4">
              <SkeletonBar className="size-24 shrink-0 rounded-full" />
              <div className="space-y-4">
                <SkeletonBar className="h-8 w-56" />
                <SkeletonBar className="h-4 w-44" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <SkeletonBar className="h-10 w-36 rounded-full" />
              <SkeletonBar className="h-10 w-36 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex items-start">
          <div className="w-1/3 space-y-8 p-8">
            <SidebarSectionSkeleton labelWidth="w-40" lines={2} />
            <SidebarSectionSkeleton labelWidth="w-24" lines={1} />
            <SidebarSectionSkeleton labelWidth="w-44" lines={2} />
            <SidebarSectionSkeleton labelWidth="w-36" lines={3} />
            <SidebarSectionSkeleton labelWidth="w-28" lines={2} />
            <SidebarSectionSkeleton labelWidth="w-32" lines={3} />
            <SidebarSectionSkeleton labelWidth="w-24" lines={2} />
          </div>

          <div className="flex-1">
            <div className="space-y-14 border-b border-slate-300 p-8">
              <div className="flex items-center justify-between gap-6">
                <SkeletonBar className="h-8 w-2/3" />
                <SkeletonBar className="h-6 w-24" />
              </div>
              <div className="space-y-3">
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-full" />
                <SkeletonBar className="h-4 w-5/6" />
                <SkeletonBar className="h-4 w-4/6" />
              </div>
            </div>

            <div className="space-y-6 border-b border-slate-300 p-8">
              <SkeletonBar className="h-8 w-32" />
              <div className="flex gap-3">
                <SkeletonBar className="h-9 w-24 rounded-full" />
                <SkeletonBar className="h-9 w-20 rounded-full" />
              </div>
              <SkeletonBar className="h-28 w-full rounded-xl" />
            </div>

            <div className="space-y-6 border-b border-slate-300 p-8">
              <SkeletonBar className="h-8 w-40" />
              <SkeletonBar className="h-4 w-24" />
            </div>

            <div className="space-y-6 border-b border-slate-300 p-8">
              <SkeletonBar className="h-8 w-24" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }, (_, index) => (
                  <SkeletonBar
                    key={index}
                    className="h-8 w-20 rounded-full"
                  />
                ))}
              </div>
            </div>

            <div className="p-8">
              <SkeletonBar className="h-8 w-44" />
            </div>
          </div>
        </div>
      </div>

      <BottomSectionSkeleton titleWidth="w-40" />
      <BottomSectionSkeleton titleWidth="w-44" />
      <BottomSectionSkeleton titleWidth="w-56" />
      <BottomSectionSkeleton titleWidth="w-52" />
    </div>
  );
}
