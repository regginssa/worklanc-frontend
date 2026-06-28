import Link from "next/link";

export interface FreelancerProfileConnectsProps {
  count: number;
  detailsHref?: string;
  buyHref?: string;
}

export default function FreelancerProfileConnects({
  count,
  detailsHref = "#",
  buyHref = "/nx/plans/connects/buy",
}: FreelancerProfileConnectsProps) {
  return (
    <div className="space-y-4 rounded-2xl bg-slate-100 p-6">
      <h3 className="text-xl font-medium">Connects: {count}</h3>
      <div className="flex items-center justify-between text-sm">
        <Link href={detailsHref} className="hover:underline">
          View details
        </Link>
        <div className="h-3 w-px bg-black" />
        <Link href={buyHref} className="hover:underline">
          Buy connects
        </Link>
      </div>
    </div>
  );
}
