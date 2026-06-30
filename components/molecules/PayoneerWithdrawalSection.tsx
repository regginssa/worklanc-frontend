import type { SavedPayoneerWithdrawal } from "@/types/disbursement";
import { useState } from "react";
import { toast } from "sonner";
import PayoneerWithdrawalForm from "./PayoneerWithdrawalForm";
import SavedPayoneerWithdrawalList from "./SavedPayoneerWithdrawalList";

interface PayoneerWithdrawalSectionProps {
  account: SavedPayoneerWithdrawal | null;
  onConnect: (email: string) => void | Promise<void>;
  onDelete: () => void | Promise<void>;
  onSetDefault?: () => void | Promise<void>;
  showDefaultControl?: boolean;
}

export default function PayoneerWithdrawalSection({
  account,
  onConnect,
  onDelete,
  onSetDefault,
  showDefaultControl = true,
}: PayoneerWithdrawalSectionProps) {
  const [showAddForm, setShowAddForm] = useState(!account);
  const [deleting, setDeleting] = useState(false);

  const handleConnect = async (email: string) => {
    await onConnect(email);
    setShowAddForm(false);
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
          showDefaultControl={showDefaultControl}
        />
      )}

      {!account && showAddForm && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6">
          <PayoneerWithdrawalForm
            onSuccess={handleConnect}
            onCancel={undefined}
          />
        </div>
      )}
    </div>
  );
}
