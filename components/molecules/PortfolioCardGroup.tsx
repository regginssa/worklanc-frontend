import { Pagination } from "../atoms";
import PorfolioCard, { PorfolioCardItem } from "../common/PorfolioCard";

export default function PortfolioCardGroup({
  items,
}: {
  items: PorfolioCardItem[];
}) {
  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-3 gap-6">
        {items.map((item) => (
          <li key={item.title}>
            <PorfolioCard {...item} />
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <Pagination totalPages={10} currentPage={1} onPageChange={() => {}} />
      </div>
    </div>
  );
}
