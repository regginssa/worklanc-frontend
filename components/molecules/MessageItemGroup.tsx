import { MessageItem, MessageItemType } from "../common";

export default function MessageItemGroup({
  items,
}: {
  items: MessageItemType[];
}) {
  return (
    <ul className="space-y-4">
      {items.map((item, index) => (
        <MessageItem key={index} {...item} />
      ))}
    </ul>
  );
}
