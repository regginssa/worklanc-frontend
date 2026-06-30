"use client";

import type { WithdrawalSchedule } from "@/types/disbursement";
import { getWithdrawalScheduleLabel } from "@/types/disbursement";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/atoms";
import { toast } from "sonner";

const SCHEDULE_OPTIONS: {
  value: WithdrawalSchedule;
  label: string;
  description: string;
}[] = [
  {
    value: "manual",
    label: "Manual",
    description: "Withdraw available balance whenever you choose.",
  },
  {
    value: "weekly",
    label: "Weekly",
    description:
      "Automatic transfer every Wednesday when balance is available.",
  },
  {
    value: "monthly",
    label: "Monthly",
    description: "Automatic transfer on the 1st of each month.",
  },
];

interface WithdrawalScheduleSectionProps {
  schedule: WithdrawalSchedule | null;
  onSave: (schedule: WithdrawalSchedule) => void | Promise<void>;
  disabled?: boolean;
}

export default function WithdrawalScheduleSection({
  schedule,
  onSave,
  disabled = false,
}: WithdrawalScheduleSectionProps) {
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<WithdrawalSchedule>(
    schedule ?? "manual"
  );
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(selected);
      toast.success("Withdrawal schedule updated.");
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  if (!editing && schedule) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-800">
          {getWithdrawalScheduleLabel(schedule)}
        </p>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          className="text-sm underline cursor-pointer"
          onClick={() => setEditing(true)}
          disabled={disabled}
        >
          Change schedule
        </motion.button>
      </div>
    );
  }

  if (!editing && !schedule) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-slate-600 font-light">
          Choose how often Worklanc sends your available balance to your default
          withdrawal method.
        </p>
        <Button
          type="primary"
          label="Set up schedule"
          classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
          disabled={disabled}
          onClick={() => setEditing(true)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ul className="space-y-3">
        {SCHEDULE_OPTIONS.map((option) => (
          <li key={option.value}>
            <button
              type="button"
              className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                selected === option.value
                  ? "border-black bg-slate-50"
                  : "border-slate-200 bg-white hover:bg-slate-50"
              }`}
              onClick={() => setSelected(option.value)}
            >
              <div className="flex items-start gap-3">
                <ScheduleRadio checked={selected === option.value} />
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    {option.label}
                  </p>
                  <p className="text-xs text-slate-600 mt-1">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3">
        <Button
          type="primary"
          label="Save schedule"
          classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
          loading={saving}
          onClick={handleSave}
        />
        {schedule && (
          <Button
            type="secondary"
            label="Cancel"
            classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
            disabled={saving}
            onClick={() => {
              setSelected(schedule);
              setEditing(false);
            }}
          />
        )}
      </div>
    </div>
  );
}

function ScheduleRadio({ checked }: { checked: boolean }) {
  return (
    <div
      className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 relative overflow-hidden ${
        checked ? "border-black bg-white" : "border-slate-400 bg-slate-50"
      }`}
    >
      <div
        className={`absolute inset-1 rounded-full transition-all duration-300 ease-out ${
          checked ? "scale(1) bg-black" : "scale(0) bg-transparent"
        }`}
      />
    </div>
  );
}
