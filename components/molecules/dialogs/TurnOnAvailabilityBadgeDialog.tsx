import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { Button, IconButton, Input } from "@/components/atoms";

export default function TurnOnAvailabilityBadgeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-4xl flex-col no-scrollbar max-h-[60vh] overflow-y-auto">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">
            Turn on availability badge
          </DialogTitle>
          <DialogDescription>
            Make it easy for clients to see you're open for work by turning on
            the Availability Badge. This label helps you stand out wherever your
            profile is shown. Freelancers who use the badge may receive up to
            70% more invites.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 grid grid-cols-2 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-medium">Maximum budget</h4>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CircleQuestionMark className="size-5" />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Set a total limit of your Connects. We won’t charge once you
                    reach your limit.{" "}
                    <Link href="#" className="underline cursor-pointer">
                      More info
                    </Link>
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>

            <p className="text-sm font-light text-slate-600">
              Current price: 14 Connects per week
            </p>

            <div className="flex items-center gap-4">
              <IconButton
                variant="outline"
                icon="mdi:minus"
                className="p-1!"
                disabled
                onClick={() => {}}
              />
              <Input
                type="number"
                name="connects"
                classname="w-36!"
                value={14}
                onChange={() => {}}
              />
              <IconButton
                variant="outline"
                icon="mdi:plus"
                className="p-1!"
                onClick={() => {}}
              />
              <span className="text-sm font-light text-slate-600">
                Connects per week
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Icon
                icon="material-symbols-light:info-outline-rounded"
                className="text-red-700 size-8"
              />
              <span className="text-sm font-light">You have 0 Connects.</span>
              <Link
                href="#"
                className="text-blue-600 text-sm font-medium cursor-pointer hover:underline"
              >
                Buy more Connects
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-medium">Preview</h3>
            <div className="p-4 border border-slate-300 rounded-3xl flex items-start gap-4">
              <Image
                src={UserPic}
                alt="User"
                className="size-[60px] rounded-full object-cover"
              />

              <div className="space-y-2">
                <h4 className="text-xl font-medium">Marco N.</h4>
                <p className="text-sm font-light">Software Engineer</p>
                <div className="flex items-ceter gap-1 text-slate-600 mt-4">
                  <Icon icon="mdi:lightning-bolt-outline" className="size-4" />
                  <span className="text-sm font-medium">Available Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium hover:underline">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Turn on"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
