import { Icon } from "@iconify/react";

export default function IconLabel({
  icon,
  label,
  className,
  iconClassName,
  labelClassName,
}: {
  icon: string;
  label: string;
  className?: string;
  iconClassName?: string;
  labelClassName?: string;
}) {
  return (
    <div className={`flex items-center gap-2 text-slate-600 ${className}`}>
      <Icon icon={icon} className={`size-5 ${iconClassName}`} />
      <span className={`text-sm whitespace-nowrap ${labelClassName}`}>
        {label}
      </span>
    </div>
  );
}
