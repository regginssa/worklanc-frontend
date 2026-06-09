import { Input } from "@/components/atoms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  createEmptyPortfolioForm,
  type PortfolioForm,
} from "@/types/talent-profile";

export default function PortflioDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PortfolioForm>(createEmptyPortfolioForm);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-full h-full">
        <DialogHeader className="shrink-0 py-4 px-16">
          <DialogTitle className="text-3xl font-medium">
            Add a new portfolio project
          </DialogTitle>
          <DialogDescription>
            All fields are required unless otherwise indicated.
          </DialogDescription>
        </DialogHeader>

        <form className="py-10 px-16 space-y-16">
          <Input
            type="text"
            name="title"
            label="Project title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
