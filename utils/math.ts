export function formatNumberWithCommas(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatNumber(num: number): string {
  const rounded = Math.round(num * 100) / 100;
  const str = rounded.toString();

  if (/^\d$/.test(str)) {
    return str + ".0";
  }

  return str;
}

export function formatEarnedAmount(amount: number): string {
  if (amount < 1000) {
    return String(amount);
  }

  return `${Math.floor(amount / 1000)}K+`;
}
