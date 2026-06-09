import { useRef, useState } from "react";
import { IconButton } from "../atoms";
import { PortfolioAssetType } from "@/types";
import { PortflioVideoUploadDialog } from "../molecules";

export default function PortflioUploadItem() {
  const [asset, setAsset] = useState<File | null>(null);
  const [description, setDescription] = useState<string>("Add content");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [videoUploadDialogOpen, setVideoUploadDialogOpen] = useState(false);

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

  return (
    <div className="border-2 border-dashed border-blue-600 rounded-3xl w-full">
      <input type="file" hidden ref={fileInputRef} />
      {!asset ? (
        <div className="flex flex-col items-center justify-center py-20 gap-6">
          <div className="flex items-center gap-8">
            <IconButton
              variant="secondary"
              icon="mdi-light:image"
              onClick={() => fileInputRef.current?.click()}
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
              onClick={() => {}}
              onHover={() => handleHoverIconButtons("pdf")}
              onLeave={() => setDescription("Add content")}
            />
            <IconButton
              variant="secondary"
              icon="lets-icons:music-light"
              onClick={() => {}}
              onHover={() => handleHoverIconButtons("audio")}
              onLeave={() => setDescription("Add content")}
            />
          </div>
          <p className="text-sm font-light">{description}</p>
        </div>
      ) : (
        <div></div>
      )}

      <PortflioVideoUploadDialog
        open={videoUploadDialogOpen}
        onClose={() => setVideoUploadDialogOpen(false)}
        onAdd={() => setVideoUploadDialogOpen(false)}
        onUpload={() => {
          setVideoUploadDialogOpen(false);
          fileInputRef.current?.click();
        }}
      />
    </div>
  );
}
