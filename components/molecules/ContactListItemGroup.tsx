import { ContactListItem, ContactListItemType } from "../common";

export default function ContactListItemGroup({
  items,
}: {
  items: ContactListItemType[];
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <ContactListItem key={index} {...item} />
      ))}
    </ul>
  );
}
