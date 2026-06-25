import { Button, Checkbox } from "@/components/atoms";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SafeIcon from "@/public/assets/svgs/icons/other/safe.svg";
import Image from "next/image";
import Link from "next/link";

export default function StaySafeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col p-0! overflow-hidden!">
        <div className="flex items-stretch">
          <div className="w-2/5 bg-blue-600 flex items-center justify-center">
            <Image src={SafeIcon} alt="Safe" className="w-[235px] h-[210px]" />
          </div>

          <div className="flex-1 space-y-4 p-10">
            <h2 className="text-2xl font-medium">
              Stay safe on Worklanc by following the rules
            </h2>
            <p className="text-sm font-light">
              Do not share personal contact information or external links before
              signing a contract. Once a contract is in place, limit information
              sharing to only what is necessary. Payments must always be
              completed on Worklanc. Violations of these rules will result in
              permanent account suspension.
            </p>

            <Link
              href="#"
              className="text-sm underline font-light hover:text-blue-600 cursor-pointer block"
            >
              Learn more
            </Link>

            <div className="flex items-start gap-2">
              <Checkbox className="size-5!" />
              <p className="text-sm font-light">
                I understand that I agreed to keep payments and pre-contract
                chats on Worklanc per the{" "}
                <Link
                  href="#"
                  className="underline hover:text-blue-600 cursor-pointer"
                >
                  User Agreement
                </Link>
                .
              </p>
            </div>

            <div className="flex justify-end mt-10">
              <Button
                type="primary"
                label="Confirm"
                classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
