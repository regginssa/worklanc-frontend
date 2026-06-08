import { getAuthToken } from "./auth";
import { uploadRequest } from "./client";

export type UploadPurpose = "avatar" | "portfolio" | "asset";

export type UploadedMedia = {
  /** Opaque token — store this in the database (e.g. photoUrl). */
  encryptedUrl: string;
  /** API path to display the asset: /api/upload/asset/:token */
  url: string;
  mimeType: string;
  fileName: string;
  size: number;
  purpose: UploadPurpose;
};

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const normalizeEncryptedToken = (storedUrl: string) =>
  storedUrl.startsWith("/api/upload/asset/")
    ? storedUrl.replace("/api/upload/asset/", "")
    : storedUrl;

const UploadAPI = {
  upload: async (
    file: File,
    purpose: UploadPurpose = "asset",
  ): Promise<UploadedMedia | null> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", purpose);
    return await uploadRequest("/upload", formData);
  },

  /** Delete a stored asset by its encrypted token. Fails silently if already gone. */
  delete: async (encryptedUrl: string): Promise<boolean> => {
    const token = normalizeEncryptedToken(encryptedUrl);
    if (!token) return false;

    const authToken = getAuthToken();
    const res = await fetch(
      `${BASE_URL}/api/upload/${encodeURIComponent(token)}`,
      {
        method: "DELETE",
        headers: {
          ...(authToken ? { Authorization: authToken } : {}),
        },
      },
    );

    return res.ok;
  },
};

/** Turn a stored encryptedUrl into a browser-ready image/file URL. */
export function getMediaAssetUrl(encryptedUrl: string): string {
  const base = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ?? "";
  return `${base}/api/upload/asset/${encryptedUrl}`;
}

/** Accept either an encrypted token or a full /api/upload/asset/... path. */
export function resolveMediaAssetUrl(
  storedUrl: string | null | undefined,
): string | null {
  if (!storedUrl) return null;
  if (storedUrl.startsWith("/api/upload/asset/")) {
    return getMediaAssetUrl(storedUrl.replace("/api/upload/asset/", ""));
  }
  return getMediaAssetUrl(storedUrl);
}

export default UploadAPI;
