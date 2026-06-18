export type NotificationLevel = "all" | "important" | "nothing";
export type MessageCounterLevel = "all" | "important";
export type EmailInterval =
  | "immediate"
  | "15_minutes"
  | "1_hour"
  | "1_day";
export type RecruitingEmailScope =
  | "only_jobs_i_posted"
  | "jobs_my_team_and_i_posted";
export type ContractEmailScope =
  | "only_freelancers_i_have_hired"
  | "freelancers_my_team_and_i_have_hire";

export interface NotificationSettings {
  desktopShowNotifications: NotificationLevel;
  desktopPlaySound: boolean;
  desktopMessageCounter: MessageCounterLevel;
  mobileShowNotifications: NotificationLevel;
  mobileMessageCounter: MessageCounterLevel;
  emailUnreadActivity: NotificationLevel;
  emailUnreadActivityInterval: EmailInterval;
  emailOnlyWhenOfflineOrIdle: boolean;
  recruitingEmailScope: RecruitingEmailScope;
  recruiting: string[];
  freelancerAndAgencyProposals: string[];
  contractsEmailScope: ContractEmailScope;
  contracts: string[];
  groupsAndInvitations: string[];
  membership: string[];
  miscellaneous: string[];
  projectRecommendationsForTopTalent: string[];
  communicationsFromWorklanc: string[];
}

export const notificationOptions = [
  { label: "All activity", value: "all" as const },
  { label: "Important activity only", value: "important" as const },
  { label: "Nothing", value: "nothing" as const },
];

export const timeOptions = [
  { label: "Immediate", value: "immediate" as const },
  { label: "Every 15 minutes", value: "15_minutes" as const },
  { label: "Once an hour", value: "1_hour" as const },
  { label: "Once a day", value: "1_day" as const },
];

export const recruitingEmailOptions = [
  { label: "Only jobs I posted", value: "only_jobs_i_posted" as const },
  {
    label: "Jobs my team and I posted",
    value: "jobs_my_team_and_i_posted" as const,
  },
];

export const recruitingOptions = [
  { label: "A proposal is received", value: "proposal_received" },
  {
    label: "An interview is accepted or offer terms are modified",
    value: "interview_accepted_or_offer_terms_modified",
  },
  {
    label: "An interview or offer is declined or withdrawn",
    value: "interview_or_offer_declined_or_withdrawn",
  },
  { label: "An offer is accepted", value: "offer_accepted" },
  {
    label: "A job posting will expire soon",
    value: "job_posting_will_expire_soon",
  },
  {
    label: "No interviews have been initiated",
    value: "no_interviews_have_been_initiated",
  },
];

export const freelancerAndAgencyProposalsOptions = [
  {
    label: "An interview is initiated",
    value: "an_interview_is_initiated",
  },
  {
    label: "An offer or interview invitation is received",
    value: "an_offer_or_interview_invitation_is_received",
  },
  { label: "A proposal is rejected", value: "a_proposal_is_rejected" },
  {
    label: "A job I applied to has been cancelled or closed",
    value: "a_job_i_applied_to_has_been_cancelled_or_closed",
  },
  { label: "A proposal is withdrawn", value: "a_proposal_is_withdrawn" },
];

export const contractEmailOptions = [
  {
    label: "Only freelancers I have hire",
    value: "only_freelancers_i_have_hired",
  },
  {
    label: "Freelancers my team and I have hire",
    value: "freelancers_my_team_and_i_have_hire",
  },
];

export const contactsOptions = [
  {
    label: "A hire is made or a contract begins",
    value: "a_hire_is_made_or_a_contract_begins",
  },
  { label: "Time logging begins", value: "time_logging_begins" },
  {
    label: "Contract terms are modified",
    value: "contract_terms_are_modified",
  },
  { label: "A contract ends", value: "a_contract_ends" },
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
  { label: "Weekly billing digest", value: "weekly_billing_digest" },
  {
    label: "Other contract related messages",
    value: "other_contract_related_messages",
  },
];

export const groupsAndInvitationsOptions = [
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
  { label: "Team access is revoked", value: "team_access_is_revoked" },
];

export const membershipOptions = [
  {
    label: "Subscription related event occur",
    value: "subscription_related_event_occur",
  },
];

export const miscellaneousOptions = [
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

export const projectRecommendationsForOurTopTalentOptions = [
  {
    label: "Send recommendations if I qualify as top Worklanc talent",
    value: "send_recommendations_if_i_qualify_as_top_worklanc_talent",
  },
];

export const communicationsFromWorklancOptions = [
  {
    label:
      "Send me genuinely useful emails every now and then to help me get the most out of Worklanc",
    value:
      "send_me_genuinely_useful_emails_every_now_and_then_to_help_me_get_the_most_out_of_worklanc",
  },
];

export const defaultNotificationSettings = (): NotificationSettings => ({
  desktopShowNotifications: "all",
  desktopPlaySound: false,
  desktopMessageCounter: "all",
  mobileShowNotifications: "all",
  mobileMessageCounter: "all",
  emailUnreadActivity: "all",
  emailUnreadActivityInterval: "immediate",
  emailOnlyWhenOfflineOrIdle: false,
  recruitingEmailScope: "only_jobs_i_posted",
  recruiting: recruitingOptions.map((option) => option.value),
  freelancerAndAgencyProposals: freelancerAndAgencyProposalsOptions.map(
    (option) => option.value,
  ),
  contractsEmailScope: "only_freelancers_i_have_hired",
  contracts: contactsOptions.map((option) => option.value),
  groupsAndInvitations: groupsAndInvitationsOptions.map(
    (option) => option.value,
  ),
  membership: membershipOptions.map((option) => option.value),
  miscellaneous: miscellaneousOptions.map((option) => option.value),
  projectRecommendationsForTopTalent:
    projectRecommendationsForOurTopTalentOptions.map((option) => option.value),
  communicationsFromWorklanc: communicationsFromWorklancOptions.map(
    (option) => option.value,
  ),
});
