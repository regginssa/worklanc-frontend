import Image from "next/image";
import { SkillsGroup } from "../molecules";

export type CertificationItemType = {
  name: string;
  provider: string;
  skills: string[];
  logo: string;
};

export default function CertificationItem({
  name,
  provider,
  skills,
  logo,
}: CertificationItemType) {
  return (
    <div className="flex items-start gap-10">
      <Image src={logo} alt={name} className="" width={80} height={80} />

      <div className="space-y-4">
        <h5 className="text-lg font-medium line-clamp-1">{name}</h5>
        <SkillsGroup skills={skills} max={4} />
        <p className="text-sm text-slate-800">Provider: {provider}</p>
      </div>
    </div>
  );
}
