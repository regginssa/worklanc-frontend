import { Checkbox, Dropdown } from "@/components/atoms";
import TabBar, { TTabItem } from "@/components/atoms/TabBar";
import {
  ClientSettingsLayout,
  FreelancerSettingsLayout,
} from "@/components/layouts";
import CheckBoxGroup from "@/components/molecules/CheckBoxGroup";
import { useState } from "react";

export default function NotificationSettings() {
  const [accountType, setAccountType] = useState<"freelancer" | "client">(
    "client"
  );
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
  const tabs: TTabItem[] = [
    { label: "Messages", value: "messages" },
    { label: "Email updates", value: "email_updates" },
  ];
  const notificationOptions = [
    { label: "All activity", value: "all" },
    { label: "Important activity only", value: "important" },
    { label: "Nothing", value: "nothing" },
  ];
  const timeOptions = [
    { label: "Immediate", value: "immediate" },
    { label: "Every 15 minutes", value: "15_minutes" },
    { label: "Once an hour", value: "1_hour" },
    { label: "Once a day", value: "1_day" },
  ];

  const recruitingEmailOptions = [
    { label: "Only jobs I posted", value: "only_jobs_i_posted" },
    { label: "Jobs my team and I posted", value: "jobs_my_team_and_i_posted" },
  ];

  const recruitingOptions = [
    { label: "A proposal is received", value: "proposal_received" },
    {
      label: "An interview is accepted or offer terms are modified",
      value: "interview_accepted_or_offer_terms_modified",
    },
    {
      label: "An interview or offer is declined or withdrawn",
      value: "interview_or_offer_declined_or_withdrawn",
    },
    {
      label: "An offer is accepted",
      value: "offer_accepted",
    },
    {
      label: "A job posting will expire soon",
      value: "job_posting_will_expire_soon",
    },
    {
      label: "No interviews have been initiated",
      value: "no_interviews_have_been_initiated",
    },
  ];

  const freelancerAndAgencyProposalsOptions = [
    { label: "An interview is initiated", value: "an_interview_is_initiated" },
    {
      label: "An offer or interview invitation is received",
      value: "an_offer_or_interview_invitation_is_received",
    },
    {
      label: "A proposal is rejected",
      value: "a_proposal_is_rejected",
    },
    {
      label: "A job I applied to has been cancelled or closed",
      value: "a_job_i_applied_to_has_been_cancelled_or_closed",
    },
    {
      label: "A proposal is withdrawn",
      value: "a_proposal_is_withdrawn",
    },
  ];

  const contractEmailOptions = [
    {
      label: "Only freelancers I have hire",
      value: "only_freelancers_i_have_hired",
    },
    {
      label: "Freelancers my team and I have hire",
      value: "freelancers_my_team_and_i_have_hire",
    },
  ];

  const contactsOptions = [
    {
      label: "A hire is made or a contract begins",
      value: "a_hire_is_made_or_a_contract_begins",
    },
    {
      label: "Time logging begins",
      value: "time_logging_begins",
    },
    {
      label: "Contract terms are modified",
      value: "contract_terms_are_modified",
    },
    {
      label: "A contract ends",
      value: "a_contract_ends",
    },
    {
      label: "A timelog is ready for review",
      value: "a_timelog_is_ready_for_review",
    },
    {
      label: "Feedback changes are made",
      value: "feedback_changes_are_made",
    },
    {
      label: "Daily snapshot of time recorded by your freelancers",
      value: "daily_snapshot_of_time_recorded_by_your_freelancers",
    },
    {
      label: "Weekly billing digest",
      value: "weekly_billing_digest",
    },
    {
      label: "Other contract related messages",
      value: "other_contract_related_messages",
    },
  ];

  const groupsAndInvitationsOptions = [
    {
      label: "Group membership events occur",
      value: "group_membership_events_occur",
    },
    {
      label: "Someone forwards me a freelancer's profile",
      value: "someone_forwards_me_a_freelancers_profile",
    },
    {
      label: "Someone sends me an invitation",
      value: "someone_sends_me_an_invitation",
    },
    {
      label: "Team access is revoked",
      value: "team_access_is_revoked",
    },
  ];

  const membershipOptions = [
    {
      label: "Subscription related event occur",
      value: "subscription_related_event_occur",
    },
  ];

  const miscellaneousOptions = [
    {
      label: "Worklanc has a tip to help me start",
      value: "worklanc_has_a_tip_to_help_me_start",
    },
    {
      label: "Notify me of Worklanc events happening in my local area",
      value: "notify_me_of_worklanc_events_happening_in_my_local_area",
    },
    {
      label: "I have purchased or received connects",
      value: "i_have_purchased_or_received_connects",
    },
  ];

  const projectRecommendationsForOurTopTalentOptions = [
    {
      label: "Send recommendations if I qualify as top Worklanc talent",
      value: "send_recommendations_if_i_qualify_as_top_worklanc_talent",
    },
  ];

  const communicationsFromWorklancOptions = [
    {
      label:
        "Send me genuinely useful emails every now and then to help me get the most out of Worklanc",
      value:
        "send_me_genuinely_useful_emails_every_now_and_then_to_help_me_get_the_most_out_of_worklanc",
    },
  ];

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);

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
                name="notifications"
                labelClassName="mb-2!"
                classname="w-1/2!"
                options={notificationOptions}
                value="all"
                onSelect={() => {}}
              />

              <div className="flex items-center gap-2 mt-6">
                <Checkbox />
                <p className="">Also play a sound</p>
              </div>
            </div>

            <Dropdown
              label="Increment message counter for:"
              name="messageCounter"
              labelClassName="mb-2!"
              classname="w-1/2!"
              options={notificationOptions.slice(0, 2)}
              value="all"
              onSelect={() => {}}
            />
          </div>

          <div className="space-y-6 border-b border-slate-300 pb-8">
            <h3 className="text-2xl font-medium">Mobile</h3>

            <Dropdown
              label="Show notifications for:"
              name="notifications"
              labelClassName="mb-2!"
              classname="w-1/2!"
              options={notificationOptions}
              value="all"
              onSelect={() => {}}
            />

            <Dropdown
              label="Increment message counter for:"
              name="messageCounter"
              labelClassName="mb-2!"
              classname="w-1/2!"
              options={notificationOptions.slice(0, 2)}
              value="all"
              onSelect={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8">
            <div>
              <h3 className="text-2xl font-medium">Email</h3>
              <p className="text-slate-600 text-sm">
                (Sending to n******co@gmail.com)
              </p>
            </div>

            <div className="">
              <label className="text-sm font-medium block mb-2">
                Send an email with unread activity for:
              </label>
              <div className="flex items-center gap-8">
                <Dropdown
                  name="notifications"
                  labelClassName="mb-2!"
                  classname="w-1/2!"
                  options={notificationOptions}
                  value="all"
                  onSelect={() => {}}
                />

                <Dropdown
                  name="timeInterval"
                  labelClassName="mb-2!"
                  classname="w-1/2!"
                  options={timeOptions}
                  value="immediate"
                  onSelect={() => {}}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6">
              <Checkbox />
              <p className="">Only send when offline or idle</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <p className="text-sm text-slate-600">
            Send email updates to n******co@gmail.com for the following:
          </p>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Recruiting</h3>

            <Dropdown
              name="recruiting"
              label="Receive recruiting emails for:"
              labelClassName="mb-2!"
              options={recruitingEmailOptions}
              value="only_jobs_i_posted"
              classname="w-1/2!"
              onSelect={() => {}}
            />

            <CheckBoxGroup
              options={recruitingOptions}
              value={recruitingOptions.map((option) => option.value)}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">
              Freelancer and agency proposals
            </h3>

            <CheckBoxGroup
              options={freelancerAndAgencyProposalsOptions}
              value={freelancerAndAgencyProposalsOptions.map(
                (option) => option.value
              )}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Contracts</h3>

            <Dropdown
              name="contracts"
              label="Receive contract emails for:"
              labelClassName="mb-2!"
              options={contractEmailOptions}
              value="only_freelancers_i_have_hired"
              classname="w-1/2!"
              onSelect={() => {}}
            />

            <CheckBoxGroup
              options={contactsOptions}
              value={contactsOptions.map((option) => option.value)}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Groups and invitations</h3>

            <CheckBoxGroup
              options={groupsAndInvitationsOptions}
              value={groupsAndInvitationsOptions.map((option) => option.value)}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Membership</h3>

            <CheckBoxGroup
              options={membershipOptions}
              value={membershipOptions.map((option) => option.value)}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">Miscellaneous</h3>

            <CheckBoxGroup
              options={miscellaneousOptions}
              value={miscellaneousOptions.map((option) => option.value)}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8 border-b border-slate-300">
            <h3 className="text-xl font-medium">
              Project recommendations for our Top Talent
            </h3>

            <CheckBoxGroup
              options={projectRecommendationsForOurTopTalentOptions}
              value={projectRecommendationsForOurTopTalentOptions.map(
                (option) => option.value
              )}
              onChange={() => {}}
            />
          </div>

          <div className="space-y-6 pb-8">
            <h3 className="text-xl font-medium">
              Communications from Worklanc
            </h3>

            <CheckBoxGroup
              options={communicationsFromWorklancOptions}
              value={communicationsFromWorklancOptions.map(
                (option) => option.value
              )}
              onChange={() => {}}
            />
          </div>
        </div>
      )}
    </>
  );
};
