"use client";

import type { SavedPayoneerWithdrawal } from "@/types/disbursement";
import { useState } from "react";
import { toast } from "sonner";
import PayoneerWithdrawalForm from "./PayoneerWithdrawalForm";
import SavedPayoneerWithdrawalList from "./SavedPayoneerWithdrawalList";

interface PayoneerWithdrawalSectionProps {
  account: SavedPayoneerWithdrawal | null;
  onRegister: (
    email: string,
  ) => Promise<{ registrationLink: string } | null | void>;
  onDelete: () => void | Promise<void>;
  onRefresh?: () => void | Promise<void>;
  onSetDefault?: () => void | Promise<void>;
  showDefaultControl?: boolean;
}

export default function PayoneerWithdrawalSection({
  account,
  onRegister,
  onDelete,
  onRefresh,
  onSetDefault,
  showDefaultControl = true,
}: PayoneerWithdrawalSectionProps) {
  const [showAddForm, setShowAddForm] = useState(!account);
  const [deleting, setDeleting] = useState(false);

  const handleRegister = async (email: string) => {
    const result = await onRegister(email);
    if (result?.registrationLink) {
      setShowAddForm(false);
      toast.success("Continue setup on Payoneer in the new tab.");
    }
    return result ?? null;
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete();
      toast.success("Payoneer account removed.");
      setShowAddForm(true);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {account && (
        <SavedPayoneerWithdrawalList
          account={account}
          onDelete={handleDelete}
          deleting={deleting}
          onSetDefault={onSetDefault}
          onRefresh={onRefresh}
          showDefaultControl={showDefaultControl}
        />
      )}

      {!account && showAddForm && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <PayoneerWithdrawalForm onRegister={handleRegister} />
        </div>
      )}
    </div>
  );
}
