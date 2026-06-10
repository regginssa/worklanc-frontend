import type {
  PortfolioAssetFormInput,
  PortfolioTextFormat,
} from "@/types/talent-profile";

export type PortfolioUploadDraft = {
  file: File | null;
  videoLink: string | null;
  webLink: string | null;
  textMode: boolean;
  textFormat: PortfolioTextFormat;
  textHeading: string;
  textContent: string;
};

export function createEmptyPortfolioUploadDraft(): PortfolioUploadDraft {
  return {
    file: null,
    videoLink: null,
    webLink: null,
    textMode: false,
    textFormat: "plain",
    textHeading: "",
    textContent: "",
  };
}

export function isPortfolioUploadDraftComplete(
  draft: PortfolioUploadDraft
): boolean {
  if (draft.videoLink?.trim()) return true;
  if (draft.webLink?.trim()) return true;
  if (draft.file) return true;
  if (draft.textMode) {
    if (draft.textFormat === "plain") {
      return (
        draft.textHeading.trim().length > 0 &&
        draft.textContent.trim().length > 0
      );
    }
    return draft.textContent.trim().length > 0;
  }
  return false;
}

function getFileAssetType(
  file: File
): "image" | "pdf" | "video" | "audio" | null {
  if (file.type.startsWith("image/")) return "image";
  if (file.type.startsWith("video/")) return "video";
  if (file.type.startsWith("audio/")) return "audio";
  if (file.type === "application/pdf") return "pdf";
  return null;
}

export function portfolioUploadDraftToFormInput(
  draft: PortfolioUploadDraft
): PortfolioAssetFormInput | null {
  if (draft.webLink?.trim()) {
    return {
      assetType: "link",
      linkUrl: draft.webLink.trim(),
      linkTitle: "",
    };
  }

  if (draft.videoLink?.trim()) {
    return {
      assetType: "video",
      fileUrl: draft.videoLink.trim(),
      fileName: "Video link",
      mimeType: "video/embed",
    };
  }

  if (draft.file) {
    const assetType = getFileAssetType(draft.file);
    if (!assetType) return null;

    return {
      assetType,
      fileUrl: URL.createObjectURL(draft.file),
      fileName: draft.file.name,
      mimeType: draft.file.type,
    };
  }

  if (draft.textMode && isPortfolioUploadDraftComplete(draft)) {
    return {
      assetType: "text",
      textFormat: draft.textFormat,
      textHeading:
        draft.textFormat === "plain" ? draft.textHeading.trim() : "",
      textContent: draft.textContent.trim(),
    };
  }

  return null;
}

export function hasPortfolioUploadDraftContent(
  draft: PortfolioUploadDraft
): boolean {
  return (
    Boolean(draft.file) ||
    Boolean(draft.videoLink?.trim()) ||
    Boolean(draft.webLink?.trim()) ||
    draft.textMode
  );
}
