import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ArrowLeftIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function JobPreviewDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent size="lg">
        <DrawerHeader>
          <div className="flex items-center justify-between w-full p-2">
            <button
              className="hover:text-blue-600 cursor-pointer"
              onClick={onClose}
            >
              <ArrowLeftIcon className="size-6" />
            </button>
            <Link
              href="#"
              target="_blank"
              className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline text-sm font-medium"
            >
              Open job in a new window
              <ExternalLink className="size-5" />
            </Link>
          </div>
        </DrawerHeader>

        <div className="flex items-start no-scrollbar overflow-y-auto">
          <div className="w-3/4 border-r border-slate-300">
            <div className="p-8 border-b border-slate-300 space-y-8">
              <h1 className="text-xl font-medium">
                📷 No Skills Required – Take a Product Photo & Get Paid $20
              </h1>

              <div className="flex items-center gap-8 text-sm text-slate-600">
                <span>Posted 15 hours ago</span>
                <div className="flex items-center gap-2">
                  <Icon icon="mdi:map-marker-outline" className="size-5" />
                  <span>Worldwide</span>
                </div>
              </div>
            </div>

            <div className="p-8 border-b border-slate-300">
              <p className="text-sm">
                Summary
                <br />I need an accountability coach who can help me lock in
                with my habits, cut out food addiction, track my macros, and get
                the correct sleep. The ideal candidate will have experience in
                accountability coaching, particularly in areas like habit
                formation and nutrition. The role involves providing guidance
                and support to help me achieve my health and wellness goals.
              </p>
            </div>

            <div className="p-8 border-b border-slate-300 grid grid-cols-3 gap-8">
              <div className="flex items-start gap-2">
                <Icon icon="mdi:clock-outline" className="size-5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Less than 30 hrs/week</h3>
                  <p className="text-xs text-slate-800">Hourly</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon="mdi:calendar-outline" className="size-5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">1 to 3 months</h3>
                  <p className="text-xs text-slate-800">Duration</p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon="stash:user-cog-light" className="size-5" />
                <div className="space-y-1 flex-1">
                  <h3 className="text-sm font-medium">Intermediate</h3>
                  <p className="text-xs text-slate-800">
                    I am looking for a mix of experience and value
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Icon icon="mdi:timer-check-outline" className="size-5" />
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">$10.00 - $25.00</h3>
                  <p className="text-xs text-slate-800">Hourly</p>
                </div>
              </div>
            </div>

            <div className="p-8 border-b border-slate-300">
              <p className="text-sm">
                <strong className="font-medium">Project Type:</strong> Ongoing
                project
              </p>
            </div>
          </div>

          <div className="flex-1"></div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
