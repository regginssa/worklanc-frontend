import { JobInProgressItem, JobInProgressItemType } from "../common";

export default function JobInProgressItemGroup({
  items,
}: {
  items: JobInProgressItemType[];
}) {
  return (
    <>
      <ul className="space-y-8">
        {items.map((item, index) => (
          <JobInProgressItem key={index} {...item} />
        ))}
      </ul>
    </>
  );
}
