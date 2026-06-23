import { JobBudgetType } from "@/types/job";

export default function ContractTypeRadioGroup({
  value,
  onChange,
}: {
  value: JobBudgetType | null;
  onChange: (value: JobBudgetType) => void;
}) {
  return (
    <ul className="grid grid-cols-2 rounded-full border border-slate-400">
      <li
        className={`flex items-center justify-center p-4 font-medium cursor-pointer transition-colors duration-200 rounded-full ${
          value === "hourly" ? "bg-zinc-900 text-white" : ""
        }`}
        onClick={() => onChange("hourly")}
      >
        <span>Hourly</span>
      </li>

      <li
        className={`flex items-center justify-center p-4 font-medium cursor-pointer transition-colors duration-200 rounded-full ${
          value === "fixed" ? "bg-zinc-900 text-white" : ""
        }`}
        onClick={() => onChange("fixed")}
      >
        <span>Fixed price</span>
      </li>
    </ul>
  );
}
