function maskWord(word: string): string {
  if (!word) return "";
  const visible = word.slice(0, 1);
  const hiddenLength = Math.max(word.length - 1, 3);
  return `${visible}${"*".repeat(hiddenLength)}`;
}

export function maskName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map(maskWord)
    .join(" ");
}
