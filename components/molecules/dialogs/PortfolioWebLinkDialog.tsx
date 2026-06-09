import { Button, Input } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getPortfolioWebLinkSiteName,
  isValidPortfolioWebLinkUrl,
} from "@/utils/portfolioLink";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINK_DEBOUNCE_MS = 400;

export default function PortfolioWebLinkDialog({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd?: (link: string) => void;
}) {
  const [link, setLink] = useState("");
  const [debouncedLink, setDebouncedLink] = useState("");
  const [validatedLink, setValidatedLink] = useState<string | null>(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    if (!open) {
      setLink("");
      setDebouncedLink("");
      setValidatedLink(null);
      setLinkLoading(false);
      setLinkError("");
    }
  }, [open]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedLink(link.trim());
    }, LINK_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [link]);

  useEffect(() => {
    if (!debouncedLink) {
      setValidatedLink(null);
      setLinkLoading(false);
      setLinkError("");
      return;
    }

    setLinkLoading(true);
    setLinkError("");
    setValidatedLink(null);

    if (!isValidPortfolioWebLinkUrl(debouncedLink)) {
      setLinkLoading(false);
      setLinkError(
        "Enter a valid URL starting with https:// (e.g. https://example.com)"
      );
      return;
    }

    setValidatedLink(debouncedLink);
    setLinkLoading(false);
  }, [debouncedLink]);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add a web link</DialogTitle>
          <DialogDescription>
            Only one link can be added at a time.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          <div className="space-y-6 pb-6">
            <Input
              type="url"
              name="link"
              label="Paste a web link to an article or website"
              labelClassName="text-sm! font-medium! mb-2! block!"
              placeholder="Article or website link"
              loading={linkLoading}
              error={linkError}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            {validatedLink && !linkLoading && (
              <div className="flex items-start justify-between rounded-lg bg-slate-100 p-4">
                <div className="flex-1 text-sm space-y-4">
                  <Link
                    href={validatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer underline"
                  >
                    {validatedLink}
                  </Link>

                  <h4 className="mt-1 text-slate-600">
                    {getPortfolioWebLinkSiteName(validatedLink)}
                  </h4>
                </div>
                <ExternalLink className="size-5 text-slate-600" />
              </div>
            )}
          </div>

          <Link
            href="#"
            className="mt-4 flex cursor-pointer items-center gap-2 hover:underline"
          >
            <ExternalLink className="size-4" />
            <p>Does your link meet Worklanc's guidelines?</p>
          </Link>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="cursor-pointer px-5 py-2.5 text-sm font-medium">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Add"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            disabled={!validatedLink || linkLoading}
            onClick={() => {
              if (!validatedLink) return;
              onAdd?.(validatedLink);
              onClose();
            }}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
