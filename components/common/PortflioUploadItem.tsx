import React, { useEffect, useMemo, useRef, useState } from "react";
import { IconButton } from "../atoms";
import { PortfolioAssetType } from "@/types";
import { PortflioVideoUploadDialog } from "../molecules";
import Image from "next/image";
import { Icon } from "@iconify/react";

export default function PortflioUploadItem() {
  const [asset, setAsset] = useState<File | null>(null);
  const [videoLink, setVideoLink] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("Add content");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUploadDialogOpen, setVideoUploadDialogOpen] = useState(false);
  const [errors, setErrors] = useState<{ size?: string } | null>(null);

  const previewUrl = useMemo(
    () => (asset ? URL.createObjectURL(asset) : null),
    [asset]
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
      setAsset(null);
      setErrors(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrors({ size: "File size is too large" });
    } else {
      setErrors(null);
    }

    setAsset(file);
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

  const renderAssetContent = (file: File) => {
    if (file.type.startsWith("image/") && previewUrl) {
      return (
        <div className="relative w-full h-full">
          <Image
            src={previewUrl}
            alt={file.name}
            width={400}
            height={300}
            unoptimized
            className="h-auto w-full object-cover rounded-3xl"
          />
          {errors?.size && (
            <div className="absolute traslate-y-1/2 w-[70%] mx-auto bg-white p-4 rounded-full">
              <Icon icon="mdi:information-outline" width={16} />
              <p className="text-xs text-red-500">{errors.size}</p>
            </div>
          )}
          <IconButton
            variant="secondary"
            icon="mdi:close"
            className="p-1! absolute top-4 right-4"
            onClick={() => setAsset(null)}
          />
        </div>
      );
    }

    if (file.type.startsWith("video/") && previewUrl) {
      return (
        <video src={previewUrl} controls className="h-auto w-full rounded-xl" />
      );
    }

    if (file.type.startsWith("audio/") && previewUrl) {
      return <audio src={previewUrl} controls className="w-full" />;
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
        {!asset ? (
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
                icon="ri:text"
                onClick={() => {}}
                onHover={() => handleHoverIconButtons("text")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="material-symbols-light:link"
                onClick={() => {}}
                onHover={() => handleHoverIconButtons("link")}
                onLeave={() => setDescription("Add content")}
              />
              <IconButton
                variant="secondary"
                icon="f7:doc"
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
          <div className="flex-1">{renderAssetContent(asset)}</div>
        )}

        <PortflioVideoUploadDialog
          open={videoUploadDialogOpen}
          onClose={() => setVideoUploadDialogOpen(false)}
          onAdd={(link: string) => {
            setVideoLink(link);
            setAsset(null);
            setVideoUploadDialogOpen(false);
          }}
          onUpload={() => {
            setVideoUploadDialogOpen(false);
            openFilePicker("video/*");
          }}
        />
      </div>

      {asset && (
        <div className="flex flex-col items-center gap-2">
          <IconButton
            variant="secondary"
            icon="mdi:arrow-up-bold"
            onClick={() => {}}
          />
          <IconButton
            variant="secondary"
            icon="mdi:arrow-down-bold"
            onClick={() => {}}
          />
          <IconButton
            variant="secondary"
            icon="mdi:trash-can-outline"
            onClick={() => {}}
          />
        </div>
      )}
    </div>
  );
}
