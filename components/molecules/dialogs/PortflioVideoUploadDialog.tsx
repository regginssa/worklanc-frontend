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
import { toPortfolioVideoEmbedUrl } from "@/utils/videoEmbed";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const LINK_DEBOUNCE_MS = 400;

export default function PortflioVideoUploadDialog({
  open,
  onClose,
  onAdd,
  onUpload,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  onUpload: () => void;
  loading?: boolean;
}) {
  const [link, setLink] = useState("");
  const [debouncedLink, setDebouncedLink] = useState("");
  const [previewEmbedUrl, setPreviewEmbedUrl] = useState<string | null>(null);
  const [linkLoading, setLinkLoading] = useState(false);
  const [linkError, setLinkError] = useState("");

  useEffect(() => {
    if (!open) {
      setLink("");
      setDebouncedLink("");
      setPreviewEmbedUrl(null);
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
      setPreviewEmbedUrl(null);
      setLinkLoading(false);
      setLinkError("");
      return;
    }

    setLinkLoading(true);
    setLinkError("");
    setPreviewEmbedUrl(null);

    const embedUrl = toPortfolioVideoEmbedUrl(debouncedLink);
    if (!embedUrl) {
      setLinkLoading(false);
      setLinkError("Enter a valid YouTube or Vimeo video URL");
      return;
    }

    setPreviewEmbedUrl(embedUrl);
  }, [debouncedLink]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add video link</DialogTitle>
          <DialogDescription>
            Link to a video or upload a video. Only one option can be used at a
            time.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          <div className="space-y-6 border-b border-slate-300 py-6">
            <Input
              type="url"
              name="link"
              label="Paste a link to your YouTube or Vimeo video"
              labelClassName="text-sm! font-medium! mb-2! block!"
              placeholder="Youtube or Vimeo video link"
              loading={linkLoading}
              error={linkError}
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />

            {previewEmbedUrl && (
              <div className="aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  src={previewEmbedUrl}
                  title="Video preview"
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setLinkLoading(false)}
                />
              </div>
            )}
          </div>

          <div className="space-y-2 py-6">
            <label className="block text-sm font-medium">
              Upload your video
            </label>
            <p className="text-sm text-slate-600">
              Up to 100 MB. Maximum 2 videos.
            </p>
            <Button
              type="outline"
              label="Upload video"
              size="medium"
              icon="mdi:upload"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium! border!"
              onClick={onUpload}
            />
          </div>

          <Link
            href="#"
            className="mt-4 flex cursor-pointer items-center gap-2 hover:underline"
          >
            <ExternalLink className="size-4" />
            <p>Does your video meet Worklanc's guidelines?</p>
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
            loading={loading}
            disabled={!previewEmbedUrl || linkLoading}
            onClick={onAdd}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
