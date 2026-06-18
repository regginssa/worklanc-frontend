import { Button, IconButton, UserAvatar } from "@/components/atoms";
import { ClientSettingsLayout } from "@/components/layouts";
import { useAppSelector } from "@/store/hooks";
import type { ClientCompanySize } from "@/types/user";
import { formatTimezone } from "@/utils/date";
import { maskEmail } from "@/utils/maskEmail";
import { maskName } from "@/utils/maskName";
import { Icon } from "@iconify/react";
import { countries } from "country-data-list";
import Link from "next/link";
import { motion } from "motion/react";

const COMPANY_SIZE_LABELS: Record<ClientCompanySize, string> = {
  just_me: "Just me",
  "2_9": "2 - 9",
  "10_99": "10 - 99",
  "100_499": "100 - 499",
  "500_4999": "500 - 4999",
  "5000_plus": "5000+",
};

function formatMembershipTier(tier?: "basic" | "plus") {
  return tier === "plus" ? "Business Plus" : "Basic";
}

function formatUserAddress(user: {
  streetAddress: string | null;
  aptSuite: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  countryCode: string;
}) {
  const countryName = user.countryCode
    ? countries.all.find((c) => c.alpha2 === user.countryCode)?.name
    : undefined;

  const cityState = [user.city, user.state].filter(Boolean).join(", ");
  const cityStateZip = [cityState, user.zipCode].filter(Boolean).join(" ");

  return [user.streetAddress, user.aptSuite, cityStateZip, countryName]
    .filter(Boolean)
    .join(", ");
}

export default function Info() {
  const { user, status } = useAppSelector((state) => state.user);
  const account = user?.accounts.find((item) => item.type === "client") ?? null;

  const fullName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "";
  const shortName = user
    ? `${user.firstName}${user.lastName ? ` ${user.lastName[0]}` : ""}`
    : "";
  const maskedName = fullName ? maskName(fullName) : "";
  const maskedEmail = user?.email ? maskEmail(user.email) : "";
  const membershipLabel = formatMembershipTier(account?.membershipTier);
  const companySizeLabel = account?.companySize
    ? COMPANY_SIZE_LABELS[account.companySize]
    : "";
  const timezoneLabel = user?.timezone ? formatTimezone(user.timezone) : "";
  const addressLabel = user ? formatUserAddress(user) : "";
  const isClientAccount = account?.type === "client";

  if (status === "idle" || status === "loading") {
    return (
      <ClientSettingsLayout
        seo={{
          title: "Account Settings - My Info - Worklane",
          description: "Manage your account settings and preferences",
          url: "https://worklane.com/account/settings/info",
        }}
      >
        <h2 className="text-3xl font-medium">My Info</h2>
        <p className="text-sm text-slate-600 mt-4">Loading account info…</p>
      </ClientSettingsLayout>
    );
  }

  return (
    <ClientSettingsLayout
      seo={{
        title: "Account Settings - My Info - Worklane",
        description: "Manage your account settings and preferences",
        url: "https://worklane.com/account/settings/info",
      }}
    >
      <div>
        <h2 className="text-3xl font-medium">My Info</h2>
        {isClientAccount && (
          <p className="text-sm mt-2">This is a client account</p>
        )}
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Account</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-start gap-16">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
            <UserAvatar
              avatarUrl={user?.avatarUrl}
              alt={fullName}
              size={24}
              className={`${
                user?.avatarUrl ? "size-24 rounded-full" : "size-6"
              }`}
            />
          </div>

          <div className="space-y-4">
            {maskedName && (
              <h4 className="text-lg font-medium">{maskedName}</h4>
            )}

            <div className="space-y-1 text-sm">
              <p className="text-slate-600">{membershipLabel}</p>
              {shortName && <h4>{shortName}</h4>}
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Email</p>
              {maskedEmail && <h4>{maskedEmail}</h4>}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Company details</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-start gap-16">
          <div className="w-24 h-24 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
            <Icon icon="mdi:building" className="size-6 text-slate-600" />
          </div>

          <div className="space-y-4">
            <div className="space-y-1 text-sm">
              {account?.companyName && (
                <h4 className="font-medium text-base">{account.companyName}</h4>
              )}
              {account?.companyWebsite && (
                <Link
                  href={account.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline cursor-pointer"
                >
                  {account.companyWebsite}
                </Link>
              )}
            </div>

            {companySizeLabel && (
              <div className="space-y-1 text-sm">
                <p className="text-slate-600">Size</p>
                <h4>{companySizeLabel}</h4>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Company contacts</h3>
          <IconButton
            variant="outline"
            icon="mdi:pencil-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="space-y-4">
          {maskedName && (
            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Owner</p>
              <h4>{maskedName}</h4>
            </div>
          )}

          {user?.phone && (
            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Phone</p>
              <h4>{user.phone}</h4>
            </div>
          )}

          {timezoneLabel && (
            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Time Zone</p>
              <h4>{timezoneLabel}</h4>
            </div>
          )}

          {addressLabel && (
            <div className="space-y-1 text-sm">
              <p className="text-slate-600">Address</p>
              <h4>{addressLabel}</h4>
            </div>
          )}
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        {isClientAccount && <p className="text-sm">This is a client account</p>}
        <div className="flex items-center gap-2">
          <Button
            type="primary"
            label="Create New Account"
            classname="py-2! px-5! rounded-full! text-sm! font-medium!"
          />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 py-2 px-5 text-sm font-medium cursor-pointer hover:underline"
          >
            Close account
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 py-2 px-5 text-sm font-medium cursor-pointer hover:underline"
          >
            Transfer ownership
          </motion.button>
        </div>
      </div>

      <div className="border border-slate-300 rounded-3xl p-8 space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-medium">AI preference</h3>
          <p className="text-sm text-slate-600">
            Choose how your Worklanc data is used for AI training and
            improvement.{" "}
            <Link href="#" className="text-black underline cursor-pointer">
              Learn more
            </Link>
          </p>
        </div>

        <Button
          type="outline"
          label="Set preference"
          size="medium"
          classname="py-2! px-5! rounded-full! text-sm! font-medium!"
        />
      </div>
    </ClientSettingsLayout>
  );
}
