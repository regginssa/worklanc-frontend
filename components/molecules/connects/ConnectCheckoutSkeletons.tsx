export function ConnectCheckoutPageSkeleton() {
  return (
    <div className="space-y-8" aria-hidden="true">
      <div className="space-y-4">
        <div className="h-10 w-72 rounded-lg bg-slate-200 animate-pulse" />
        <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
      </div>

      <div className="flex border border-slate-300 rounded-3xl overflow-hidden">
        <div className="flex-1 p-8 space-y-6">
          <div className="h-8 w-80 rounded-lg bg-slate-200 animate-pulse" />
          <div className="space-y-4">
            <div className="h-5 w-48 rounded bg-slate-200 animate-pulse" />
            <div className="h-24 w-full rounded-2xl bg-slate-200 animate-pulse" />
          </div>
        </div>

        <div className="w-1/3 space-y-6 p-8 border-l border-slate-300">
          <div className="flex items-center gap-4">
            <div className="size-[60px] rounded-full bg-slate-200 animate-pulse" />
            <div className="h-8 w-48 rounded-lg bg-slate-200 animate-pulse" />
          </div>
          <div className="h-10 w-full rounded-full bg-slate-200 animate-pulse" />
          <div className="h-px w-full bg-slate-200" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex justify-between gap-4">
                <div className="h-4 w-24 rounded bg-slate-200 animate-pulse" />
                <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
              </div>
            ))}
          </div>
          <div className="h-10 w-full rounded-full bg-slate-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ConnectBuyPageSkeleton() {
  return (
    <div
      className="rounded-3xl border border-slate-300 p-8 space-y-8"
      aria-hidden="true"
    >
      <div className="h-9 w-48 rounded-lg bg-slate-200 animate-pulse" />
      <div className="h-10 w-1/3 rounded-lg bg-slate-200 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-40 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-20 rounded bg-slate-200 animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 w-56 rounded bg-slate-200 animate-pulse" />
        <div className="h-4 w-16 rounded bg-slate-200 animate-pulse" />
      </div>
      <div className="h-10 w-1/3 rounded-lg bg-slate-200 animate-pulse" />
      <div className="flex justify-end gap-4">
        <div className="h-10 w-20 rounded-full bg-slate-200 animate-pulse" />
        <div className="h-10 w-36 rounded-full bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}
