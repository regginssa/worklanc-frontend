"use client";

import { Icon } from "@iconify/react";
import { Trash } from "lucide-react";
import { Reorder, useDragControls } from "motion/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type HightlightListItemType = {
  id: number;
  title: string;
  skills: string[];
  image: string;
};

export default function HightlightListItem({
  value,
  title,
  skills,
  image,
  isGrid = false,
  onDelete,
  onView,
}: HightlightListItemType & {
  value: HightlightListItemType;
  isGrid?: boolean;
  onDelete: (id: number) => void;
  onView?: (id: number) => void;
}) {
  const controls = useDragControls();

  return (
    <Reorder.Item
      value={value}
      as="li"
      dragListener={false}
      dragControls={controls}
      layout
      transition={{ layout: { duration: 0.2, ease: "easeInOut" } }}
      whileDrag={{
        scale: 1.01,
        zIndex: 10,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
      }}
      className="relative p-6 bg-slate-50 rounded-xl flex items-center justify-between list-none"
    >
      <div className="flex items-center gap-4 min-w-0">
        <button
          type="button"
          className="cursor-grab touch-none active:cursor-grabbing shrink-0"
          onPointerDown={(event) => controls.start(event)}
          aria-label="Drag to reorder"
        >
          <Icon icon="mingcute:dots-fill" className="size-6" />
        </button>

        <div className="flex items-center gap-2 min-w-0">
          <div className="relative w-[65px] h-[65px] rounded-lg border border-slate-300 bg-white overflow-hidden flex items-center justify-center shrink-0">
            <Image
              src={image}
              alt={title}
              width={55}
              height={45}
              className="object-contain"
            />
          </div>

          <div className="space-y-2 min-w-0">
            <p className="text-xs text-slate-600">Portfolio</p>
            <h3 className="text-sm line-clamp-1">{title}</h3>
            <p className="text-xs line-clamp-1">Skills: {skills.join(", ")}</p>
          </div>
        </div>
      </div>

      {isGrid ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="cursor-pointer shrink-0">
              <Icon icon="mdi:dots-horizontal" className="size-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onView?.(value.id)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(value.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          type="button"
          className="cursor-pointer shrink-0"
          onClick={() => onDelete(value.id)}
        >
          <Trash className="size-5" />
        </button>
      )}
    </Reorder.Item>
  );
}
