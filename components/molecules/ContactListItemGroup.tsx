import { ContactListItem, ContactListItemType } from "../common";
import { cn } from "@/lib/utils";

export default function ContactListItemGroup({
  items,
  className,
}: {
  items: ContactListItemType[];
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1", className)}>      {items.map((item, index) => (
        <ContactListItem key={index} {...item} />
      ))}
    </ul>
  );
}
