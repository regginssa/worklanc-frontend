import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  RadioGroup,
} from "@/components/atoms";
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
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleQuestionMark } from "lucide-react";
import { IconLabel } from "@/components/common";

const budgetRadios = [
  { title: "Total", value: "total" },
  { title: "Daily", value: "daily" },
];

export default function BoostYourProfileDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Boost your profile</DialogTitle>
          <DialogDescription>
            With a boost, you can bid Connects to jump to the top of search
            results. We only charge if a client clicks on your profile or views
            your video.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8 px-4 pb-6 no-scrollbar max-h-[60vh] overflow-y-auto">
          <div className="p-6 rounded-3xl border border-slate-300 flex items-start gap-4">
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-medium">Video (Optional)</h4>
                <p className="text-sm font-light">
                  Add a 60-second video to introduce yourself and potentially
                  boost your profile visibility.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    type="outline"
                    label="Record"
                    size="medium"
                    icon="iconoir:video-camera"
                    classname="font-medium! text-sm! py-2.5! px-5! rounded-full! border!"
                  />
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-slate-400 hover:border-slate-500 hover:bg-slate-100 transition-colors duration-200 cursor-pointer"
                  >
                    <Icon icon="mdi:tray-upload" className="size-5" />
                    Upload
                  </motion.button>
                </div>
                <p className="text-xs font-light">
                  Supported divats: MP4 (100 MB max)
                </p>
              </div>

              <p className="text-xs font-light">
                Your profile won't be boosted until we approve your video.{" "}
                <Link href="#" className="underline cursor-pointer">
                  Learn more
                </Link>
              </p>
            </div>
            <div className="relative size-[200px] rounded-full overflow-hidden flex flex-col items-center justify-center">
              <Image
                src={UserPic}
                alt="User"
                className="size-[200px] object-contain"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <button className="p-2 rounded-full bg-black/50 hover:bg-black/70 transition-all duration-200 cursor-pointer">
                  <Icon icon="mdi:play" className="size-10 text-white z-40" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-medium">Audience</h4>
            <div className="flex items-center gap-6">
              <Dropdown
                name="category"
                label="Category"
                placeholder="Select a category"
                labelClassName="font-light! block! mb-2!"
                classname="w-52!"
                options={[]}
                value={""}
                onSelect={() => {}}
              />
              <Dropdown
                name="specialty"
                label="Specialty"
                placeholder="Select a specialty"
                labelClassName="font-light! block! mb-2!"
                classname="w-52!"
                disabled
                options={[]}
                value={""}
                onSelect={() => {}}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-medium">Budget</h4>
            <div className="flex items-end gap-10">
              <div className="flex items-center gap-6">
                <div className="space-y-2 w-52">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-light">Bid per click</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleQuestionMark className="size-4 cursor-pointer" />
                      </TooltipTrigger>

                      <TooltipContent side="top">
                        <p className="text-sm p-2">
                          Bids help you reach the top of search results, and
                          higher bids increase your chances.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    type="number"
                    name="bidPerClick"
                    placeholder="Number of Connects"
                    value={null}
                    onChange={() => {}}
                  />
                </div>

                <div className="space-y-2 w-52">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-light">Limit</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <CircleQuestionMark className="size-4 cursor-pointer" />
                      </TooltipTrigger>

                      <TooltipContent side="top">
                        <p className="text-sm p-2">
                          Set a daily or total limit of your Connects. We won’t
                          charge once you reach your limit.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>

                  <Input
                    type="number"
                    name="bidPerClick"
                    placeholder="Number of Connects"
                    value={null}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <RadioGroup
                direction="horizontal"
                options={budgetRadios}
                value={"total"}
                onChange={() => {}}
              />
            </div>
            <p className="text-sm text-slate-600">
              You have 0 Connects left.{" "}
              <Link
                href="#"
                className="text-black underline cursor-pointer hover:text-blue-600"
              >
                Buy more Connects
              </Link>
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xl font-medium">Schedule</h4>
            <DatePicker
              name="endDate"
              label="End date (optional)"
              placeholder="Select a date"
              labelClassName="font-light! block! mb-2!"
              classname="w-52!"
              value={null}
              onChange={() => {}}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 rounded-3xl bg-slate-50 space-y-4">
              <h4 className="text-xl font-medium">Summary</h4>
              <ul className="space-y-4 text-sm font-light">
                <li className="flex items-center justify-between">
                  <span className="text-slate-600">Bid per click</span>
                  <span>-</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-slate-600">Limit</span>
                  <span>-</span>
                </li>
                <li className="w-full bg-black h-[1px]"></li>
                <li className="flex items-center justify-between">
                  <span>You'll receive up to</span>
                  <span>-</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="w-full">
                <h4 className="text-xl font-medium">Preview</h4>
              </div>

              <div className="p-4 rounded-3xl border border-slate-300 w-full flex items-center gap-4">
                <Image
                  src={UserPic}
                  alt="User"
                  className="size-16 rounded-full object-cover"
                />

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-medium">Macro N.</h4>
                    <IconLabel
                      icon="mdi:lightning-bolt-outline"
                      label="Boosted"
                      iconClassName="text-blue-600"
                      labelClassName="text-slate-600! text-xs! font-light!"
                      className="gap-0!"
                    />
                  </div>
                  <p className="text-sm font-light">Accounting & Consulting</p>
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
            label="Boost now"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
