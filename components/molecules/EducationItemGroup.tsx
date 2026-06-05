import EducationItem, { EducationItemType } from "../common/EducationItem";

export default function EducationItemGroup({
  items,
}: {
  items: EducationItemType[];
}) {
  return (
    <ul className="space-y-6">
      {items.map((item, index) => (
        <li
          key={item.school}
          className={`border-b border-slate-300 pb-6 ${
            index === items.length - 1 ? "border-b-0 pb-0" : ""
          }`}
        >
          <EducationItem {...item} />
        </li>
      ))}
    </ul>
  );
}
