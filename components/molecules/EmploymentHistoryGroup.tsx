import EmploymentHistoryItem, {
  EmploymentHistoryItemType,
} from "../common/EmploymentHistoryItem";

export default function EmploymentHistoryGroup({
  items,
}: {
  items: EmploymentHistoryItemType[];
}) {
  return (
    <ul className="space-y-6">
      {items.map((item) => (
        <li key={item.company}>
          <EmploymentHistoryItem {...item} />
        </li>
      ))}
    </ul>
  );
}
