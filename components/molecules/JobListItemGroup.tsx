import { JobListItem } from "../common";

export default function JobListItemGroup() {
  return (
    <>
      <ul>
        {Array.from({ length: 10 }).map((_, index) => (
          <JobListItem key={index} />
        ))}
      </ul>
    </>
  );
}
