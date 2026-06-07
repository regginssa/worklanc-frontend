import { useState } from "react";
import { IconButton } from "../atoms";
import { formatMonthYear } from "@/utils/df";

const DESCRIPTION_PREVIEW_LENGTH = 200;

export type EmploymentHistoryItemType = {
  company: string;
  title: string;
  startedAt: Date;
  endAt: Date;
  isCurrent: boolean;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function EmploymentHistoryItem({
  company,
  title,
  startedAt,
  endAt,
  isCurrent,
  description,
  onEdit,
  onDelete,
}: EmploymentHistoryItemType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = description.length > DESCRIPTION_PREVIEW_LENGTH;
  const displayDescription =
    isExpanded || !isLongDescription
      ? description
      : `${description.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`;

  return (
    <div className="flex items-start justify-between">
      <div>
        <h5 className="text-lg font-medium line-clamp-1">
          {company} | {title}
        </h5>
        <p className="text-sm text-slate-600 mt-2">
          {formatMonthYear(startedAt)} -{" "}
          {isCurrent ? "Present" : formatMonthYear(endAt)}
        </p>
        <p className="text-sm text-slate-800 mt-4">
          {displayDescription}{" "}
          {isLongDescription && !isExpanded && (
            <button
              type="button"
              className="cursor-pointer underline text-black"
              onClick={() => setIsExpanded(true)}
            >
              Show more
            </button>
          )}
          {isLongDescription && isExpanded && (
            <button
              type="button"
              className="cursor-pointer underline text-black"
              onClick={() => setIsExpanded(false)}
            >
              Show less
            </button>
          )}
        </p>
      </div>
      {(onEdit || onDelete) && (
        <div className="flex items-center gap-4">
          {onEdit && (
            <IconButton
              variant="outline"
              icon="mdi:pencil-outline"
              className="p-1!"
              onClick={onEdit}
            />
          )}
          {onDelete && (
            <IconButton
              variant="outline"
              icon="mdi:trash-can-outline"
              className="p-1!"
              onClick={onDelete}
            />
          )}
        </div>
      )}
    </div>
  );
}
