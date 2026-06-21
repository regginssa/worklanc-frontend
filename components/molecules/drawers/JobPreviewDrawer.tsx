"use client";

import { Drawer, DrawerContent, DrawerHeader } from "@/components/ui/drawer";
import { ArrowLeftIcon, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import JobsAPI from "@/lib/api/jobs";
import JobBrowseDetailPanels from "../JobBrowseDetailPanels";
import { getJobPublicUrl } from "@/utils/jobBrowseDisplay";

export default function JobPreviewDrawer({
  uid,
  open,
  onClose,
}: {
  uid: string | null;
  open: boolean;
  onClose: () => void;
}) {
  const { data, isLoading } = useQuery({
    queryKey: ["browse-job", uid],
    queryFn: () => (uid ? JobsAPI.browseOne(uid) : Promise.resolve(null)),
    enabled: open && Boolean(uid),
  });

  const job = data?.job ?? null;

  return (
    <Drawer open={open} onOpenChange={onClose} direction="right">
      <DrawerContent size="lg">
        <DrawerHeader>
          <div className="flex items-center justify-between w-full p-2">
            <button
              type="button"
              className="hover:text-blue-600 cursor-pointer"
              onClick={onClose}
            >
              <ArrowLeftIcon className="size-6" />
            </button>
            {uid && (
              <Link
                href={getJobPublicUrl(uid)}
                target="_blank"
                className="flex items-center gap-2 text-blue-600 cursor-pointer hover:underline text-sm font-medium"
              >
                Open job in a new window
                <ExternalLink className="size-5" />
              </Link>
            )}
          </div>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto">
          {isLoading && (
            <p className="p-8 text-sm text-slate-600">Loading job...</p>
          )}
          {!isLoading && job && <JobBrowseDetailPanels job={job} />}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
