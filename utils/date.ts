export function getMonthName(monthIndex: number): string {
  if (monthIndex < 0 || monthIndex > 11) {
    throw new Error("Month index must be between 0 and 11");
  }

  const date = new Date(2000, monthIndex);
  return date.toLocaleString("default", { month: "long" });
}

// Turns an IANA timezone (e.g. "America/Adak") into "(GMT-9:00) Hawaii-Aleutian Time"
export const formatTimezone = (timezone: string): string => {
  const now = new Date();

  const longName =
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "long",
    })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value ?? timezone;

  const gmtOffset =
    new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "longOffset",
    })
      .formatToParts(now)
      .find((part) => part.type === "timeZoneName")?.value ?? "GMT";

  // "GMT-05:00" -> "GMT-5:00"
  const pretty = gmtOffset.replace(/GMT([+-])0?(\d+):(\d+)/, "GMT$1$2:$3");

  return `(${pretty}) ${longName}`;
};
