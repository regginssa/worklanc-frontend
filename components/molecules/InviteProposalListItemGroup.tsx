import { InviteProposalListItem, InviteProposalListItemType } from "../common";

export default function InviteProposalListItemGroup({
  items,
}: {
  items: InviteProposalListItemType[];
}) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <InviteProposalListItem key={item.project.uid} {...item} />
      ))}
    </ul>
  );
}
