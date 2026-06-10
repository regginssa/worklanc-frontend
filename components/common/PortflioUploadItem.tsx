import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, IconButton, TabBar } from "../atoms";
import { PortfolioAssetType } from "@/types";
import {
  PortflioVideoUploadDialog,
  PortfolioWebLinkDialog,
} from "../molecules";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { toPortfolioVideoEmbedUrl } from "@/utils/videoEmbed";
import Link from "next/link";
import { getPortfolioWebLinkSiteName } from "@/utils/portfolioLink";
import { ExternalLink } from "lucide-react";
import PortfolioPdfPreviewGate from "./PortfolioPdfPreviewGate";
import {
  createEmptyPortfolioUploadDraft,
  hasPortfolioUploadDraftContent,
  isPortfolioUploadDraftComplete,
  type PortfolioUploadDraft,
} from "@/utils/portfolioUploadDraft";

const textTaps = [
  { label: "Plain text", value: "plain_text" },
  { label: "Markdown", value: "markdown" },
];

export type PortflioUploadItemProps = {
  value: PortfolioUploadDraft;
  onChange: (draft: PortfolioUploadDraft) => void;
  onComplete?: () => void;
  readOnly?: boolean;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
};

export default function PortflioUploadItem({
  value,
  onChange,
  onComplete,
  readOnly = false,
  onRemove,
  onMoveUp,
  onMoveDown,
}: PortflioUploadItemProps) {
  const [description, setDescription] = useState<string>("Add content");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUploadDialogOpen, setVideoUploadDialogOpen] = useState(false);
  const [webLinkDialogOpen, setWebLinkDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{ size?: string } | null>(null);

  const selectedTextTabIndex = value.textFormat === "markdown" ? 1 : 0;

  const previewUrl = useMemo(
    () => (value.file ? URL.createObjectURL(value.file) : null),
    [value.file]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const updateDraft = (patch: Partial<PortfolioUploadDraft>) => {
    onChange({ ...value, ...patch });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      updateDraft({ file: null });
      setErrors(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors({ size: "File size is too large" });
      updateDraft({ file: null });
      return;
    }

    setErrors(null);
    onChange({
      ...createEmptyPortfolioUploadDraft(),
      file,
    });
    onComplete?.();
  };

  const openFilePicker = (accept: string) => {
    const input = fileInputRef.current;
    if (!input || readOnly) return;

    input.accept = accept;
    input.value = "";
    input.click();
  };

  const handleHoverIconButtons = (type: PortfolioAssetType) => {
    switch (type) {
      case "image":
        setDescription("Upload images (up to 10 MB)");
        break;
      case "video":
        setDescription(
          "Link a video (YouTube or Vimeo) or upload (up to 10 MB)"
        );
        break;
      case "text":
        setDescription("Add a text block");
        break;
      case "link":
        setDescription("Add a web link (articles or websites)");
        break;
      case "pdf":
        setDescription("Add PDF files (up to 10 MB, max 5 files)");
        break;
      case "audio":
        setDescription("Add audio files (up to 10 MB)");
        break;
    }
  };

  const previewFrameClass =
    "relative aspect-[4/3] w-full overflow-hidden rounded-3xl";

  const clearPreview = () => {
    if (readOnly) {
      onRemove?.();
      return;
    }

    onChange(createEmptyPortfolioUploadDraft());
    setErrors(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddTextBlock = () => {
    if (!isPortfolioUploadDraftComplete(value)) return;
    onComplete?.();
  };

  const renderPreviewActions = () => (
    <>
      {errors?.size && (
        <div className="absolute left-1/2 top-1/2 z-10 flex w-[70%] -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full bg-red-50 p-4">
          <Icon
            icon="mdi:information-outline"
            className="text-red-500"
            width={16}
          />
          <p className="text-xs text-red-500 font-medium">{errors.size}</p>
        </div>
      )}
      {!readOnly && (
        <IconButton
          variant="secondary"
          icon="mdi:close"
          className="absolute top-4 right-4 z-10 p-1!"
          onClick={clearPreview}
        />
      )}
    </>
  );

  const renderPreview = () => {
    if (value.videoLink) {
      const embedUrl = toPortfolioVideoEmbedUrl(value.videoLink);
      if (!embedUrl) return null;

      return (
        <div className="relative w-full">
          <div className={previewFrameClass}>
            <iframe
              src={embedUrl}
              title="Video preview"
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {renderPreviewActions()}
        </div>
      );
    }

    if (value.textMode) {
      return (
        <div className="space-y-4 rounded-3xl bg-slate-100 p-4">
          <TabBar
            tabs={textTaps}
            selectedTabIndex={selectedTextTabIndex}
            onTab={(idx: number) => {
              if (readOnly) return;
              updateDraft({
                textFormat: idx === 1 ? "markdown" : "plain",
              });
            }}
          />

          <div className="px-6">
            {selectedTextTabIndex === 0 ? (
              <div className="space-y-4">
                <input
                  type="text"
                  name="heading"
                  placeholder="Heading"
                  value={value.textHeading}
                  readOnly={readOnly}
                  onChange={(e) => updateDraft({ textHeading: e.target.value })}
                  className="w-full border-none text-2xl outline-none placeholder:text-slate-600"
                />
                <textarea
                  name="content"
                  placeholder="Enter your text"
                  value={value.textContent}
                  readOnly={readOnly}
                  onChange={(e) => updateDraft({ textContent: e.target.value })}
                  className="no-scrollbar max-h-[200px] min-h-[200px] w-full resize-none overflow-y-auto border-none outline-none placeholder:text-slate-600"
                />
              </div>
            ) : (
              <div>
                <textarea
                  name="content"
                  placeholder="Enter your text (With Markdown, you can use special characters to format headings, code, quotes, and more)"
                  value={value.textContent}
                  readOnly={readOnly}
                  spellCheck={false}
                  onChange={(e) => updateDraft({ textContent: e.target.value })}
                  className="no-scrollbar max-h-[200px] min-h-[200px] w-full resize-none overflow-y-auto border-none font-mono text-sm leading-6 outline-none placeholder:text-slate-500"
                />
              </div>
            )}
          </div>

          {!readOnly && (
            <div className="flex justify-end px-6">
              <Button
                type="primary"
                label="Add text block"
                size="medium"
                classname="rounded-full! px-5! py-2! text-sm! font-medium!"
                disabled={!isPortfolioUploadDraftComplete(value)}
                onClick={handleAddTextBlock}
              />
            </div>
          )}
        </div>
      );
    }

    if (value.webLink) {
      return (
        <div className="flex items-start justify-between rounded-lg bg-slate-100 p-4">
          <div className="flex-1 space-y-4 text-sm">
            <Link
              href={value.webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer underline"
            >
              {value.webLink}
            </Link>

            <h4 className="mt-1 text-slate-600">
              {getPortfolioWebLinkSiteName(value.webLink)}
            </h4>
          </div>
          <ExternalLink className="size-5 text-slate-600" />
        </div>
      );
    }

    if (!value.file || !previewUrl) return null;

    if (value.file.type.startsWith("image/")) {
      return (
        <div className="relative w-full">
          <div className={previewFrameClass}>
            <Image
              src={previewUrl}
              alt={value.file.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          {renderPreviewActions()}
        </div>
      );
    }

    if (value.file.type.startsWith("video/")) {
      return (
        <div className="relative w-full">
          <div className={previewFrameClass}>
            <video
              src={previewUrl}
              controls
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          {renderPreviewActions()}
        </div>
      );
    }

    if (value.file.type.startsWith("audio/")) {
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{value.file.name}</h4>
          <audio src={previewUrl} controls className="w-full" />
        </div>
      );
    }

    if (value.file.type.startsWith("application/pdf") && previewUrl) {
      return (
        <div className="mx-auto w-full max-w-4xl p-4">
          <PortfolioPdfPreviewGate file={value.file} previewUrl={previewUrl} />
        </div>
      );
    }

    return <p className="p-6 text-sm text-slate-600">{value.file.name}</p>;
  };

  const hasContent = hasPortfolioUploadDraftContent(value);

  return (
    <div className="flex flex-1 items-center gap-4">
      <div className="w-full rounded-3xl border-2 border-dashed border-blue-600">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {!hasContent ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20">
            <div className="flex items-center gap-8">
              <IconButton
                variant="secondary"
                icon="mdi-light:image"
                onClick={() => openFilePicker("image/*")}
                onHover={() => handleHoverIconButtons("image")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="pepicons-pencil:camera"
                onClick={() => setVideoUploadDialogOpen(true)}
                onHover={() => handleHoverIconButtons("video")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="uil:text"
                className="text-slate-600!"
                onClick={() =>
                  onChange({
                    ...createEmptyPortfolioUploadDraft(),
                    textMode: true,
                  })
                }
                onHover={() => handleHoverIconButtons("text")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="material-symbols-light:link"
                onClick={() => setWebLinkDialogOpen(true)}
                onHover={() => handleHoverIconButtons("link")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="f7:doc"
                className="text-slate-600!"
                onClick={() => openFilePicker("application/pdf")}
                onHover={() => handleHoverIconButtons("pdf")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="lets-icons:music-light"
                onClick={() => openFilePicker("audio/*")}
                onHover={() => handleHoverIconButtons("audio")}
                onLeave={() => setDescription("Add content")}
              />
            </div>
            <p className="text-sm font-light">{description}</p>
          </div>
        ) : (
          <div className="flex-1 p-4">{renderPreview()}</div>
        )}
      </div>

      {hasContent && (
        <div className="flex flex-col items-center gap-2">
          <IconButton
            variant="outline"
            icon="mdi:arrow-up"
            className="p-1!"
            onClick={() => {
              onMoveUp?.();
            }}
          />
          <IconButton
            variant="outline"
            icon="mdi:arrow-down"
            className="p-1!"
            onClick={() => {
              onMoveDown?.();
            }}
          />
          <IconButton
            variant="primary"
            icon="mdi:trash-can-outline"
            className="p-1!"
            onClick={clearPreview}
          />
        </div>
      )}

      {!readOnly && (
        <>
          <PortflioVideoUploadDialog
            open={videoUploadDialogOpen}
            onClose={() => setVideoUploadDialogOpen(false)}
            onAdd={(link: string) => {
              onChange({
                ...createEmptyPortfolioUploadDraft(),
                videoLink: link,
              });
              setVideoUploadDialogOpen(false);
              onComplete?.();
            }}
            onUpload={() => {
              setVideoUploadDialogOpen(false);
              openFilePicker("video/*");
            }}
          />
          <PortfolioWebLinkDialog
            open={webLinkDialogOpen}
            onClose={() => setWebLinkDialogOpen(false)}
            onAdd={(link: string) => {
              onChange({
                ...createEmptyPortfolioUploadDraft(),
                webLink: link,
              });
              setWebLinkDialogOpen(false);
              onComplete?.();
            }}
          />
        </>
      )}
    </div>
  );
}
