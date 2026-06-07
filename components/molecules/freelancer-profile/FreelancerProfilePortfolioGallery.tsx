import { cn } from "@/lib/utils";
import { PorfolioCardItem } from "@/components/common/PorfolioCard";
import PortfolioCardGroup from "../PortfolioCardGroup";
import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfilePortfolioGalleryProps {
  id?: string;
  className?: string;
  title?: string;
  items: PorfolioCardItem[];
  onAdd?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
  children?: React.ReactNode;
}

export default function FreelancerProfilePortfolioGallery({
  id = "portfolio",
  className,
  title,
  items,
  onAdd,
  onEdit,
  onRemove,
  children,
}: FreelancerProfilePortfolioGalleryProps) {
  const resolvedTitle =
    title ?? (items.length > 0 ? `Portfolio (${items.length})` : "Portfolio");

  return (
    <section
      id={id}
      className={cn(
        "space-y-6 rounded-3xl border border-slate-300 p-6",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h2 className="flex-1 text-2xl font-medium">{resolvedTitle}</h2>
        <ProfileSectionActions onAdd={onAdd} onEdit={onEdit} onRemove={onRemove} />
      </div>

      {children ?? <PortfolioCardGroup items={items} />}
    </section>
  );
}
