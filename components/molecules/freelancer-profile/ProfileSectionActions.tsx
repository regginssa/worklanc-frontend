import { IconButton } from "@/components/atoms";

interface ProfileSectionActionsProps {
  onEdit?: () => void;
  onRemove?: () => void;
  onAdd?: () => void;
  className?: string;
}

export default function ProfileSectionActions({
  onEdit,
  onRemove,
  onAdd,
  className = "flex items-center gap-4",
}: ProfileSectionActionsProps) {
  if (!onEdit && !onRemove && !onAdd) return null;

  return (
    <div className={className}>
      {onAdd && (
        <IconButton
          variant="outline"
          icon="mdi:plus"
          className="p-1!"
          onClick={onAdd}
        />
      )}
      {onEdit && (
        <IconButton
          variant="outline"
          icon="mdi:pencil-outline"
          className="p-1!"
          onClick={onEdit}
        />
      )}
      {onRemove && (
        <IconButton
          variant="outline"
          icon="mdi:trash-can-outline"
          className="p-1!"
          onClick={onRemove}
        />
      )}
    </div>
  );
}
