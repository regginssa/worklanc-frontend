import { Button, DatePicker, Dropdown } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import CheckBoxGroup from "../CheckBoxGroup";

const userTypeOptions = [
  { label: "All", value: "all" },
  { label: "Company Member", value: "company_member" },
  { label: "Worklanc Representative", value: "worklanc_representative" },
];

const roleOptions = [
  { label: "Messenger", value: "messenger" },
  { label: "Recruiter", value: "recruiter" },
  { label: "Hiring Manager", value: "hiring_manager" },
  { label: "Finance Admin", value: "finance_admin" },
  { label: "Account Admin", value: "account_admin" },
  { label: "API Key Manager", value: "api_key_manager" },
];

interface MembersFilterDialogProps {
  open: boolean;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
}

export default function MembersFilterDialog({
  open,
  onClose,
  onReset,
  onApply,
}: MembersFilterDialogProps) {
  const [formData, setFormData] = useState({
    userType: "",
    fromDateAdded: null,
    toDateAdded: null,
    roles: [],
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Filter by</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-4">
          <Dropdown
            name="userType"
            label="User Type"
            options={userTypeOptions}
            value={formData.userType}
            onSelect={(value) => setFormData({ ...formData, userType: value })}
            classname="w-1/2!"
          />

          <div className="flex items-center gap-8">
            <DatePicker
              name="fromDateAdded"
              label="From Date Added"
              classname="w-1/2!"
              value={formData.fromDateAdded}
              onChange={(date) =>
                setFormData({ ...formData, fromDateAdded: date as any })
              }
            />

            <DatePicker
              name="toDateAdded"
              label="To Date Added"
              classname="w-1/2!"
              value={formData.toDateAdded}
              onChange={(date) =>
                setFormData({ ...formData, toDateAdded: date as any })
              }
            />
          </div>

          <div className="space-y-2">
            <h3 className="">Roles</h3>
            <CheckBoxGroup
              options={roleOptions}
              value={formData.roles}
              onChange={(value) =>
                setFormData({ ...formData, roles: value as any })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium text-blue-600">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="outline"
            label="Reset"
            size="medium"
            classname="py-2.5! px-5! text-sm! font-medium!"
            onClick={onReset}
          />
          <Button
            type="primary"
            label="Apply filters"
            classname="py-2.5! px-5! text-sm! font-medium!"
            onClick={onApply}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
