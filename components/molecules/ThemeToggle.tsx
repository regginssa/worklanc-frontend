import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const THEME_OPTIONS = [
  { value: "system", label: "Auto", icon: "mdi:theme-light-dark" },
  { value: "light", label: "Light", icon: "mdi:white-balance-sunny" },
  { value: "dark", label: "Dark", icon: "mdi:moon-waning-crescent" },
] as const;

type ThemeValue = (typeof THEME_OPTIONS)[number]["value"];

export default function ThemeToggle({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div
        className={`rounded-lg bg-slate-100 dark:bg-muted ${
          compact ? "h-9 w-full" : "h-10 w-full"
        }`}
      />
    );
  }

  const activeTheme = (theme ?? "system") as ThemeValue;

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-border dark:bg-muted">
        {THEME_OPTIONS.map((option) => {
          const isActive = activeTheme === option.value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isActive}
              title={option.label}
              onClick={() => setTheme(option.value)}
              className={`flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-200 cursor-pointer ${
                isActive
                  ? "bg-white text-slate-900 shadow-sm dark:bg-card dark:text-foreground"
                  : "text-slate-600 hover:text-slate-900 dark:text-muted-foreground dark:hover:text-foreground"
              }`}
            >
              <Icon icon={option.icon} className="size-4 shrink-0" />
              <span className={compact ? "sr-only" : ""}>{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
