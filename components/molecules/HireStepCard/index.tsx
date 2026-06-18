import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { CircleCheck } from "lucide-react";

interface HireStepCardProps {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: StaticImageData | string;
  iconAlt: string;
  completed: boolean;
}

export default function HireStepCard({
  href,
  label,
  title,
  description,
  icon,
  iconAlt,
  completed = false,
}: HireStepCardProps) {
  return (
    <Link
      href={href}
      aria-disabled={completed}
      tabIndex={completed ? -1 : undefined}
      onClick={completed ? (e) => e.preventDefault() : undefined}
      className={`rounded-3xl p-6 flex items-start justify-between gap-6 ${
        completed
          ? "bg-slate-100 text-slate-600 cursor-not-allowed"
          : "cursor-pointer border border-slate-300"
      }`}
    >
      <div className="space-y-4">
        <p className="text-sm font-light">{label}</p>
        {!completed && (
          <h4 className="text-xl font-medium underline">{title}</h4>
        )}
        {completed && (
          <div className="flex items-center gap-2">
            <CircleCheck className="w-6 h-6 text-green-600" />
            <h4 className="text-xl font-medium">{title}</h4>
          </div>
        )}
        {!completed && <p className="text-sm font-light">{description}</p>}
      </div>

      <Image src={icon} alt={iconAlt} className="w-12 h-12" />
    </Link>
  );
}
