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
      {items.map((item, index) => (
        <li
          key={item.company}
          className={`border-b border-slate-300 pb-6 ${
            index === items.length - 1 ? "border-b-0 pb-0" : ""
          }`}
        >
          <EmploymentHistoryItem {...item} />
        </li>
      ))}
    </ul>
  );
}
