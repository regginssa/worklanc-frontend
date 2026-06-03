import { Button, Checkbox, Dropdown, Input } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import { useState } from "react";

interface ReEnterPasswordDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ReEnterPasswordDialog({
  open,
  onClose,
}: ReEnterPasswordDialogProps) {
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Re-enter password</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-6">
          <div className="space-y-2 text-sm">
            <h3>Email</h3>
            <p className="text-slate-600">d...m@charlieunicornai.eu</p>
            <Link
              href="/ab/account-security/logout"
              className="text-blue-600 underline cursor-pointer"
            >
              Not you?
            </Link>
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              label="Password"
              labelClassName="text-base!"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link
              href="/ab/account-security/reset-password?login=cf8814214123"
              className="text-blue-600 text-sm underline cursor-pointer"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Continue"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
