export const SERVICE_FEE_PERCENT = 5;
export const SERVICE_FEE_RATE = SERVICE_FEE_PERCENT / 100;

export type HourlyRateForm = {
  rate: string;
  fee: string;
  estimated: string;
};

/** Derive service fee (5%) and net rate from the client-facing hourly rate. */
export function buildHourlyRateForm(rate: string): HourlyRateForm {
  const trimmedRate = rate.trim();

  if (!trimmedRate) {
    return { rate: "", fee: "0.00", estimated: "0.00" };
  }

  const parsedRate = Number(trimmedRate);

  if (!Number.isFinite(parsedRate) || parsedRate < 0) {
    return { rate, fee: "0.00", estimated: "0.00" };
  }

  const fee = parsedRate * SERVICE_FEE_RATE;
  const estimated = parsedRate - fee;

  return {
    rate,
    fee: fee.toFixed(2),
    estimated: estimated.toFixed(2),
  };
}
