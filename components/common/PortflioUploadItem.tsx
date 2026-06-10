import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconButton } from "../atoms";
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

export default function PortflioUploadItem() {
  const [file, setFile] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [webLink, setWebLink] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("Add content");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUploadDialogOpen, setVideoUploadDialogOpen] = useState(false);
  const [webLinkDialogOpen, setWebLinkDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{ size?: string } | null>(null);

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setFile(null);
      setErrors(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors({ size: "File size is too large" });
    } else {
      setErrors(null);
    }

    setFile(file);
  };

  const openFilePicker = (accept: string) => {
    const input = fileInputRef.current;
    if (!input) return;

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
    setFile(null);
    setVideoLink(null);
    setWebLink(null);
    setErrors(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
      <IconButton
        variant="secondary"
        icon="mdi:close"
        className="absolute top-4 right-4 z-10 p-1!"
        onClick={clearPreview}
      />
    </>
  );

  const renderPreview = () => {
    if (videoLink) {
      const embedUrl = toPortfolioVideoEmbedUrl(videoLink);
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

    if (webLink) {
      return (
        <div className="flex items-start justify-between rounded-lg bg-slate-100 p-4">
          <div className="flex-1 text-sm space-y-4">
            <Link
              href={webLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer underline"
            >
              {webLink}
            </Link>

            <h4 className="mt-1 text-slate-600">
              {getPortfolioWebLinkSiteName(webLink)}
            </h4>
          </div>
          <ExternalLink className="size-5 text-slate-600" />
        </div>
      );
    }

    if (!file || !previewUrl) return null;

    if (file.type.startsWith("image/")) {
      return (
        <div className="relative w-full">
          <div className={previewFrameClass}>
            <Image
              src={previewUrl}
              alt={file.name}
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          {renderPreviewActions()}
        </div>
      );
    }

    if (file.type.startsWith("video/")) {
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

    if (file.type.startsWith("audio/")) {
      return (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">{file.name}</h4>
          <audio src={previewUrl} controls className="w-full" />
        </div>
      );
    }

    if (file.type.startsWith("application/pdf") && previewUrl) {
      return (
        <div className="max-w-4xl mx-auto w-full p-4">
          <PortfolioPdfPreviewGate file={file} previewUrl={previewUrl} />
        </div>
      );
    }

    return <p className="p-6 text-sm text-slate-600">{file.name}</p>;
  };

  return (
    <div className="flex-1 flex items-center gap-4">
      <div className="border-2 border-dashed border-blue-600 rounded-3xl w-full">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        {!file && !videoLink && !webLink ? (
          <div className="flex flex-col items-center justify-center py-20 gap-6">
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
                onClick={() => setVideoUploadDialogOpen(true)}
                onHover={() => handleHoverIconButtons("video")}
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

      {(file || videoLink || webLink) && (
        <div className="flex flex-col items-center gap-2">
          <IconButton
            variant="outline"
            icon="mdi:arrow-up"
            className="p-1!"
            onClick={() => {}}
          />
          <IconButton
            variant="outline"
            icon="mdi:arrow-down"
            className="p-1!"
            onClick={() => {}}
          />
          <IconButton
            variant="primary"
            icon="mdi:trash-can-outline"
            className="p-1!"
            onClick={clearPreview}
          />
        </div>
      )}

      <PortflioVideoUploadDialog
        open={videoUploadDialogOpen}
        onClose={() => setVideoUploadDialogOpen(false)}
        onAdd={(link: string) => {
          setVideoLink(link);
          setFile(null);
          setVideoUploadDialogOpen(false);
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
          setFile(null);
          setVideoLink(null);
          setWebLink(link);
          setWebLinkDialogOpen(false);
        }}
      />
    </div>
  );
}
