import { useState } from "react";
import { Dropdown, Pagination } from "../atoms";
import {
  RecentlyViewedTalentCard,
  RecentlyViewedTalentCardItem,
} from "../common";

export default function RecentlyViewedTalentCardGroup({
  items,
}: {
  items: RecentlyViewedTalentCardItem[];
}) {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const viewOptions = [
    { label: "10 at a time", value: 10 },
    { label: "25 at a time", value: 25 },
    { label: "50 at a time", value: 50 },
  ];

  return (
    <div className="space-y-10">
      <ul>
        {items.map((item, index) => (
          <li
            key={item.name}
            className={`py-6 cursor-pointer border-b border-slate-300 ${
              index === 0 ? "border-t" : ""
            }`}
          >
            <RecentlyViewedTalentCard {...item} />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm" htmlFor="view">
            View
          </label>
          <Dropdown
            name="view"
            options={viewOptions}
            value={pageSize}
            onSelect={setPageSize}
          />
        </div>

        <Pagination
          currentPage={page}
          totalPages={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
