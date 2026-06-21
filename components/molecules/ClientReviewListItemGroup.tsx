"use client";

import { ClientReviewListItem, ClientReviewListItemType } from "../common";
import { useState } from "react";

const INITIAL_VISIBLE_COUNT = 10;
const LOAD_MORE_COUNT = 5;

export default function ClientReviewListItemGroup({
  items,
  initialVisibleCount = INITIAL_VISIBLE_COUNT,
  loadMoreCount = LOAD_MORE_COUNT,
}: {
  items: ClientReviewListItemType[];
  initialVisibleCount?: number;
  loadMoreCount?: number;
}) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);

  const visibleItems = items.slice(0, visibleCount);
  const remainingCount = items.length - visibleCount;

  return (
    <ul className="space-y-8">
      {visibleItems.map((item, index) => (
        <ClientReviewListItem key={index} {...item} />
      ))}
      {remainingCount > 0 && (
        <li>
          <button
            type="button"
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + loadMoreCount, items.length)
              )
            }
            className="text-sm font-medium underline cursor-pointer"
          >
            View more ({remainingCount})
          </button>
        </li>
      )}
    </ul>
  );
}
