export const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "";

export const paypalEnvironment =
  process.env.NEXT_PUBLIC_PAYPAL_ENVIRONMENT === "production"
    ? ("production" as const)
    : ("sandbox" as const);
