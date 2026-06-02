import Image, { type StaticImageData } from "next/image";

interface ResourceCardProps {
  title: string;
  description: string;
  icon: StaticImageData | string;
}

export default function ResourceCard({
  title,
  description,
  icon,
}: ResourceCardProps) {
  return (
    <div className="border border-slate-300 rounded-3xl p-6 gap-6 flex items-center justify-between">
      <div>
        <h4 className="text-sm text-slate-600">{title}</h4>
        <p className="text-xl font-medium mt-2">{description}</p>
      </div>
      <Image src={icon} alt={title} className="w-[100px] h-[90px]" />
    </div>
  );
}
