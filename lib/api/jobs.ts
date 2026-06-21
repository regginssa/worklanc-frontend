import { request } from "./client";
import type { Job, JobPatch } from "@/types/job";
import type { BrowseJobDetail, BrowseJobListItem } from "@/types/job-browse";

const JobsAPI = {
  browse: async (): Promise<{ jobs: BrowseJobListItem[] } | null> =>
    request("/jobs/browse", { method: "GET" }),

  browseOne: async (uid: string): Promise<{ job: BrowseJobDetail } | null> =>
    request(`/jobs/browse/${uid}`, { method: "GET" }),

  create: async () => request("/jobs", { method: "POST" }),

  list: async (): Promise<{ jobs: Job[] } | null> =>
    request("/jobs", { method: "GET" }),

  get: async (uid: string): Promise<{ job: Job } | null> =>
    request(`/jobs/${uid}`, { method: "GET" }),

  update: async (
    uid: string,
    patch: JobPatch,
  ): Promise<{ job: Job } | null> =>
    request(`/jobs/${uid}`, {
      method: "PATCH",
      body: JSON.stringify(patch),
    }),

  saveDraft: async (
    uid: string,
    patch: JobPatch = {},
  ): Promise<{ job: Job } | null> =>
    request(`/jobs/${uid}/save-draft`, {
      method: "POST",
      body: JSON.stringify(patch),
    }),

  publish: async (
    uid: string,
    patch: JobPatch = {},
  ): Promise<{
    job: Job;
    phoneVerificationRequired?: boolean;
  } | null> =>
    request(`/jobs/${uid}/publish`, {
      method: "POST",
      body: JSON.stringify(patch),
    }),

  activate: async (uid: string): Promise<{ job: Job } | null> =>
    request(`/jobs/${uid}/activate`, { method: "POST" }),

  remove: async (uid: string) =>
    request(`/jobs/${uid}`, { method: "DELETE" }),
};

export default JobsAPI;
