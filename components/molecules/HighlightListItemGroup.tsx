"use client";

import { cn } from "@/lib/utils";
import { HightlightListItem, HightlightListItemType } from "../common";
import { Reorder } from "motion/react";

export default function HighlightListItemGroup({
  items,
  onDelete,
  onReorder,
  isGrid = false,
  onView,
}: {
  items: HightlightListItemType[];
  onDelete: (id: number) => void;
  onReorder: (items: HightlightListItemType[]) => void;
  isGrid?: boolean;
  onView?: (id: number) => void;
}) {
  return (
    <Reorder.Group
      axis="y"
      as="ul"
      values={items}
      onReorder={onReorder}
      className={cn(isGrid ? "grid grid-cols-2 gap-4" : "flex flex-col gap-4")}
    >
      {items.map((item) => (
        <HightlightListItem
          key={item.id}
          value={item}
          {...item}
          isGrid={isGrid}
          onDelete={onDelete}
          onView={onView}
        />
      ))}
    </Reorder.Group>
  );
}
