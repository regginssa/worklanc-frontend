import { Button, DatePicker, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function CertificationDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    provider: "",
    issueDate: null,
    expirationDate: null,
    description: "",
    credentialId: "",
    credentialUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add certification</DialogTitle>
        </DialogHeader>

        <form className="px-4 pb-4 no-scrollbar max-h-[60vh] space-y-6 overflow-y-auto">
          <Input
            type="text"
            name="name"
            label="Certification name"
            placeholder="Ex: Certified Scrum Master (CSM)"
            labelClassName="text-sm font-medium"
            required
            value={formData.name}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="name"
            label="Provider"
            placeholder="Ex: Scrum Alliance"
            labelClassName="text-sm font-medium"
            required
            value={formData.provider}
            onChange={handleInputChange}
          />

          <div className="flex items-center gap-6">
            <DatePicker
              label="Issue date"
              labelClassName="text-sm font-medium"
              name="issueDate"
              classname="flex-1"
              value={formData.issueDate ? new Date(formData.issueDate) : null}
              onChange={(date: Date) =>
                setFormData({
                  ...formData,
                  issueDate: date as any,
                })
              }
            />
            <DatePicker
              label="Expiration date (Optional)"
              labelClassName="text-sm font-medium"
              name="expirationDate"
              classname="flex-1"
              value={
                formData.expirationDate
                  ? new Date(formData.expirationDate)
                  : null
              }
              onChange={(date: Date) =>
                setFormData({
                  ...formData,
                  expirationDate: date as any,
                })
              }
            />
          </div>

          <Textarea
            label="Description"
            subLabel="4000 characters left"
            name="description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />

          <Input
            type="text"
            name="credentialId"
            label="Certification ID (Optional)"
            labelClassName="text-sm font-medium"
            value={formData.credentialId}
            onChange={handleInputChange}
          />

          <Input
            type="url"
            name="credentialUrl"
            label="Certification URL (Optional)"
            labelClassName="text-sm font-medium"
            value={formData.credentialUrl}
            onChange={handleInputChange}
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Add certification"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            disabled
            onClick={onAdd}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
