import { toYouTubeEmbedUrl } from "@/utils/youtube";

export function extractVimeoVideoId(url: string): string | null {
  try {
    const parsed = new URL(url.trim());
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "vimeo.com") {
      const parts = parsed.pathname.split("/").filter(Boolean);
      if (parts[0] === "video" && parts[1]) return parts[1];
      if (/^\d+$/.test(parts[0] ?? "")) return parts[0];
    }

    if (host === "player.vimeo.com" && parsed.pathname.startsWith("/video/")) {
      return parsed.pathname.split("/")[2] || null;
    }

    return null;
  } catch {
    return null;
  }
}

export function toVimeoEmbedUrl(url: string): string | null {
  const videoId = extractVimeoVideoId(url);
  return videoId ? `https://player.vimeo.com/video/${videoId}` : null;
}

export function toPortfolioVideoEmbedUrl(url: string): string | null {
  return toYouTubeEmbedUrl(url) ?? toVimeoEmbedUrl(url);
}

export function isValidPortfolioVideoUrl(url: string): boolean {
  return toPortfolioVideoEmbedUrl(url) !== null;
}
