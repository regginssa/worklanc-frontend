import { useState } from "react";
import { IconButton } from "../atoms";

const DESCRIPTION_PREVIEW_LENGTH = 200;

export type EducationItemType = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startedAt: number | null;
  endAt?: number | null;
  description?: string;
  isCurrent?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function EducationItem({
  school,
  degree,
  fieldOfStudy,
  startedAt,
  endAt,
  description,
  isCurrent,
  onEdit,
  onDelete,
}: EducationItemType) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription =
    description?.length && description.length > DESCRIPTION_PREVIEW_LENGTH;
  const displayDescription =
    isExpanded || !isLongDescription
      ? description ?? ""
      : `${description?.slice(0, DESCRIPTION_PREVIEW_LENGTH).trimEnd()}...`;

  return (
    <div className="flex items-start justify-between">
      <div className="space-y-1">
        <h5 className="font-medium">{school}</h5>
        <p className="text-slate-600">
          {degree}, {fieldOfStudy}
        </p>
        <p className="text-slate-600">
          {startedAt} - {isCurrent ? "Present" : endAt}
        </p>
        {description && (
          <p className="text-slate-600 line-clamp-3 mt-2">
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
        )}
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
