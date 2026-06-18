export function maskEmail(email: string): string {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return email;

  const visible = localPart.slice(0, 1);
  const hiddenLength = Math.max(localPart.length - 1, 6);
  return `${visible}${"*".repeat(hiddenLength)}@${domain}`;
}
