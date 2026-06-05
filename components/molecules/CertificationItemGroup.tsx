import CertificationItem, {
  CertificationItemType,
} from "../common/CertificationItem";

export default function CertificationItemGroup({
  items,
}: {
  items: CertificationItemType[];
}) {
  return (
    <ul className="space-y-6">
      {items.map((item, index) => (
        <li
          key={item.name}
          className={`border-b border-slate-300 pb-6 ${
            index === items.length - 1 ? "border-b-0 pb-0" : ""
          }`}
        >
          <CertificationItem {...item} />
        </li>
      ))}
    </ul>
  );
}
