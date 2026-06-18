import { Checkbox, Dropdown } from "@/components/atoms";
import TabBar, { TTabItem } from "@/components/atoms/TabBar";
import {
  ClientSettingsLayout,
  FreelancerSettingsLayout,
} from "@/components/layouts";
import CheckBoxGroup from "@/components/molecules/CheckBoxGroup";
import { useNotificationSettings } from "@/hooks/useNotificationSettings";
import { useAppSelector } from "@/store/hooks";
import {
  communicationsFromWorklancOptions,
  contactsOptions,
  contractEmailOptions,
  freelancerAndAgencyProposalsOptions,
  groupsAndInvitationsOptions,
  membershipOptions,
  miscellaneousOptions,
  notificationOptions,
  projectRecommendationsForOurTopTalentOptions,
  recruitingEmailOptions,
  recruitingOptions,
  timeOptions,
} from "@/types/notification-settings";
import { maskEmail } from "@/utils/maskEmail";
import { useState } from "react";

export default function NotificationSettings() {
  const { user } = useAppSelector((state) => state.user);
  const accountType =
    user?.accounts.some((account) => account.type === "client") &&
    !user?.accounts.some((account) => account.type === "talent")
      ? "client"
      : user?.accounts.some((account) => account.type === "talent")
        ? "freelancer"
        : "client";

  if (accountType === "freelancer") {
    return (
      <FreelancerSettingsLayout
        seo={{
          title: "Notification settings - Worklanc",
          description: "Notification settings - Worklanc",
          url: "/ab/notification-settings",
        }}
      >
        <Content />
      </FreelancerSettingsLayout>
    );
  }
  return (
    <ClientSettingsLayout
      seo={{
        title: "Notification settings - Worklanc",
        description: "Notification settings - Worklanc",
        url: "/ab/notification-settings",
      }}
    >
      <Content />
    </ClientSettingsLayout>
  );
}

const Content = () => {
  const { user } = useAppSelector((state) => state.user);
  const { settings, loading, updateSetting } = useNotificationSettings();

  const tabs: TTabItem[] = [
    { label: "Messages", value: "messages" },
    { label: "Email updates", value: "email_updates" },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const maskedEmail = maskEmail(user?.email ?? "");

  if (loading) {
    return (
      <>
        <h2 className="text-3xl font-medium">Notification settings</h2>
        <p className="text-sm text-slate-600 mt-4">Loading settings…</p>
      </>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-medium">Notification settings</h2>

      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTab={setSelectedTabIndex}
      />

      {tabs[selectedTabIndex].value === "messages" ? (
        <div className="space-y-8">
          <div className="space-y-6 border-b border-slate-300 pb-8">
            <h3 className="text-2xl font-medium">Desktop</h3>

            <div className="flex items-center gap-8">
              <Dropdown
                label="Show notifications for:"
                name="desktopShowNotifications"
                labelClassName="mb-2!"
                classname="w-1/2!"
                options={notificationOptions}
                value={settings.desktopShowNotifications}
                onSelect={(value) =>
                  updateSetting("desktopShowNotifications", value)
                }
              />

              <div className="flex items-center gap-2 mt-6">
                <Checkbox
                  checked={settings.desktopPlaySound}
                  onCheck={(checked) =>
                    updateSetting("desktopPlaySound", checked)
                  }
                />
                <p className="">Also play a sound</p>
              </div>
            </div>

            <Dropdown
              label="Increment message counter for:"
              name="desktopMessageCounter"
              labelClassName="mb-2!"
              classname="w-1/2!"
              options={notificationOptions.slice(0, 2)}
              value={settings.desktopMessageCounter}
              onSelect={(value) =>
                updateSetting("desktopMessageCounter", value)
              }
            />
          </div>

          <div className="space-y-6 border-b border-slate-300 pb-8">
            <h3 className="text-2xl font-medium">Mobile</h3>

            <Dropdown
              label="Show notifications for:"
              name="mobileShowNotifications"
              labelClassName="mb-2!"
              classname="w-1/2!"
              options={notificationOptions}
              value={settings.mobileShowNotifications}
              onSelect={(value) =>
                updateSetting("mobileShowNotifications", value)
              }
            />

            <Dropdown
              label="Increment message counter for:"
              name="mobileMessageCounter"
              labelClassName="mb-2!"
              classname="w-1/2!"
              options={notificationOptions.slice(0, 2)}
              value={settings.mobileMessageCounter}
              onSelect={(value) =>
                updateSetting("mobileMessageCounter", value)
              }
            />
          </div>

          <div className="space-y-6 pb-8">
            <div>
              <h3 className="text-2xl font-medium">Email</h3>
              <p className="text-slate-600 text-sm">
                (Sending to {maskedEmail})
              </p>
            </div>

            <div className="">
              <label className="text-sm font-medium block mb-2">
                Send an email with unread activity for:
              </label>
              <div className="flex items-center gap-8">
                <Dropdown
                  name="emailUnreadActivity"
                  labelClassName="mb-2!"
                  classname="w-1/2!"
                  options={notificationOptions}
                  value={settings.emailUnreadActivity}
                  onSelect={(value) =>
                    updateSetting("emailUnreadActivity", value)
                  }
                />

                <Dropdown
                  name="emailUnreadActivityInterval"
                  labelClassName="mb-2!"
                  classname="w-1/2!"
                  options={timeOptions}
                  value={settings.emailUnreadActivityInterval}
                  onSelect={(value) =>
                    updateSetting("emailUnreadActivityInterval", value)
                  }
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <Checkbox
                checked={settings.emailOnlyWhenOfflineOrIdle}
                onCheck={(checked) =>
                  updateSetting("emailOnlyWhenOfflineOrIdle", checked)
                }
              />
              <p className="">Only send when offline or idle</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-sm text-slate-600">
            Send email updates to {maskedEmail} for the following:
          </p>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Recruiting</h3>

            <Dropdown
              name="recruitingEmailScope"
              label="Receive recruiting emails for:"
              labelClassName="mb-2!"
              options={recruitingEmailOptions}
              value={settings.recruitingEmailScope}
              classname="w-1/2!"
              onSelect={(value) => updateSetting("recruitingEmailScope", value)}
            />

            <CheckBoxGroup
              options={recruitingOptions}
              value={settings.recruiting}
              onChange={(value) => updateSetting("recruiting", value)}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">
              Freelancer and agency proposals
            </h3>

            <CheckBoxGroup
              options={freelancerAndAgencyProposalsOptions}
              value={settings.freelancerAndAgencyProposals}
              onChange={(value) =>
                updateSetting("freelancerAndAgencyProposals", value)
              }
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Contracts</h3>

            <Dropdown
              name="contractsEmailScope"
              label="Receive contract emails for:"
              labelClassName="mb-2!"
              options={contractEmailOptions}
              value={settings.contractsEmailScope}
              classname="w-1/2!"
              onSelect={(value) => updateSetting("contractsEmailScope", value)}
            />

            <CheckBoxGroup
              options={contactsOptions}
              value={settings.contracts}
              onChange={(value) => updateSetting("contracts", value)}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Groups and invitations</h3>

            <CheckBoxGroup
              options={groupsAndInvitationsOptions}
              value={settings.groupsAndInvitations}
              onChange={(value) =>
                updateSetting("groupsAndInvitations", value)
              }
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Membership</h3>

            <CheckBoxGroup
              options={membershipOptions}
              value={settings.membership}
              onChange={(value) => updateSetting("membership", value)}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Miscellaneous</h3>

            <CheckBoxGroup
              options={miscellaneousOptions}
              value={settings.miscellaneous}
              onChange={(value) => updateSetting("miscellaneous", value)}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">
              Project recommendations for our Top Talent
            </h3>

            <CheckBoxGroup
              options={projectRecommendationsForOurTopTalentOptions}
              value={settings.projectRecommendationsForTopTalent}
              onChange={(value) =>
                updateSetting("projectRecommendationsForTopTalent", value)
              }
            />
          </div>

          <div className="space-y-6 pb-8">
            <h3 className="text-xl font-medium">
              Communications from Worklanc
            </h3>

            <CheckBoxGroup
              options={communicationsFromWorklancOptions}
              value={settings.communicationsFromWorklanc}
              onChange={(value) =>
                updateSetting("communicationsFromWorklanc", value)
              }
            />
          </div>
        </div>
      )}
    </>
  );
};
