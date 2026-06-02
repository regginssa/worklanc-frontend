import Link from "next/link";
import Image, { type StaticImageData } from "next/image";

interface HireStepCardProps {
  href: string;
  label: string;
  title: string;
  description: string;
  icon: StaticImageData | string;
  iconAlt: string;
}

export default function HireStepCard({
  href,
  label,
  title,
  description,
  icon,
  iconAlt,
}: HireStepCardProps) {
  return (
    <Link
      href={href}
      className="border border-slate-300 cursor-pointer rounded-3xl p-6 flex items-start justify-between gap-6"
    >
      <div className="space-y-4">
        <p className="text-sm font-light">{label}</p>
        <h4 className="text-xl font-medium underline">{title}</h4>
        <p className="text-sm font-light">{description}</p>
      </div>

      <Image src={icon} alt={iconAlt} className="w-12 h-12" />
    </Link>
  );
}
