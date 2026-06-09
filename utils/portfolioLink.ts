export function getPortfolioWebLinkSiteName(url: string): string | null {
  try {
    return new URL(url.trim()).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

/** Portfolio web link: https URL with a valid domain (e.g. example.com). */
export function isValidPortfolioWebLinkUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());

    if (parsed.protocol !== "https:") {
      return false;
    }

    const host = parsed.hostname.replace(/^www\./, "");
    if (!host || !host.includes(".")) {
      return false;
    }

    const tld = host.split(".").pop() ?? "";
    return tld.length >= 2 && /^[a-z0-9-]+$/i.test(tld);
  } catch {
    return false;
  }
}
