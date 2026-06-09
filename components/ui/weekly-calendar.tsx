import * as React from "react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const WEEKDAY_LABELS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
] as const;
const WEEK_STARTS_ON = 1;

export type WeekRange = {
  start: Date;
  end: Date;
};

function getWeeksForMonth(month: Date): Date[] {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const calendarStart = startOfWeek(monthStart, {
    weekStartsOn: WEEK_STARTS_ON,
  });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: WEEK_STARTS_ON });

  const weeks: Date[] = [];
  let cursor = calendarStart;

  while (cursor <= calendarEnd) {
    weeks.push(cursor);
    cursor = addDays(cursor, 7);
  }

  return weeks;
}

function getWeekRange(weekStart: Date): WeekRange {
  return {
    start: weekStart,
    end: addDays(weekStart, 6),
  };
}

function isSameWeek(a: Date | null | undefined, b: Date | null | undefined) {
  if (!a || !b) return false;
  return isSameDay(
    startOfWeek(a, { weekStartsOn: WEEK_STARTS_ON }),
    startOfWeek(b, { weekStartsOn: WEEK_STARTS_ON })
  );
}

function formatWeekTotal(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export interface WeeklyCalendarProps {
  className?: string;
  month?: Date;
  defaultMonth?: Date;
  selected?: WeekRange | null;
  onSelect?: (week: WeekRange) => void;
  getWeekTotal?: (weekStart: Date) => number;
}

export function WeeklyCalendar({
  className,
  month: monthProp,
  defaultMonth = new Date(),
  selected,
  onSelect,
  getWeekTotal = () => 0,
}: WeeklyCalendarProps) {
  const [month, setMonth] = React.useState(monthProp ?? defaultMonth);
  const [hoveredWeekStart, setHoveredWeekStart] = React.useState<Date | null>(
    null
  );

  React.useEffect(() => {
    if (monthProp) setMonth(monthProp);
  }, [monthProp]);

  const weeks = React.useMemo(() => getWeeksForMonth(month), [month]);

  return (
    <div
      data-slot="weekly-calendar"
      className={cn(
        "rounded-xl bg-background p-4 [--cell-size:3rem]",
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={() => setMonth((current) => subMonths(current, 1))}
          aria-label="Previous month"
        >
          <ChevronLeftIcon className="size-4" />
        </Button>

        <p className="text-base font-medium">{format(month, "MMMM yyyy")}</p>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-9"
          onClick={() => setMonth((current) => addMonths(current, 1))}
          aria-label="Next month"
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>

      <div className="min-w-[44rem]">
        <div className="flex w-full border-b border-slate-200 pb-2">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="flex-1 text-center text-sm font-medium text-slate-600"
            >
              {label}
            </div>
          ))}
          <div className="w-24 shrink-0 text-center text-sm font-medium text-slate-600">
            Total
          </div>
        </div>

        <div className="mt-1 space-y-0.5">
          {weeks.map((weekStart) => {
            const weekDays = eachDayOfInterval({
              start: weekStart,
              end: addDays(weekStart, 6),
            });
            const weekRange = getWeekRange(weekStart);
            const isSelected = isSameWeek(selected?.start, weekStart);
            const isHovered =
              isSameWeek(hoveredWeekStart, weekStart) && !isSelected;

            return (
              <button
                key={weekStart.toISOString()}
                type="button"
                onClick={() => onSelect?.(weekRange)}
                onMouseEnter={() => setHoveredWeekStart(weekStart)}
                onMouseLeave={() => setHoveredWeekStart(null)}
                className={cn(
                  "flex w-full cursor-pointer rounded-lg border-0 bg-transparent p-0 text-left transition-colors",
                  isSelected && "bg-slate-100",
                  isHovered && "bg-slate-200"
                )}
              >
                {weekDays.map((day, dayIndex) => {
                  const isWeekEndpoint =
                    isSelected && (dayIndex === 0 || dayIndex === 6);

                  return (
                    <div
                      key={day.toISOString()}
                      className="flex min-h-(--cell-size) flex-1 items-center justify-center"
                    >
                      <span
                        className={cn(
                          "flex size-8 items-center justify-center text-base font-normal",
                          isWeekEndpoint
                            ? "rounded-full bg-zinc-900 text-white"
                            : isSameMonth(day, month)
                            ? "text-slate-900"
                            : "text-slate-400"
                        )}
                      >
                        {format(day, "d")}
                      </span>
                    </div>
                  );
                })}

                <div className="flex min-h-(--cell-size) w-24 shrink-0 items-center justify-center">
                  <span className="text-sm font-medium text-slate-800">
                    {formatWeekTotal(getWeekTotal(weekStart))}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
