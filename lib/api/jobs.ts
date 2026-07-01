import { request } from "./client";
import type { Job, JobPatch } from "@/types/job";
import type {
  BrowseJobDetail,
  BrowseJobListItem,
  BrowseJobsParams,
} from "@/types/job-browse";

const buildBrowseQuery = (params: BrowseJobsParams = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      if (value.length === 0) return;
      search.set(key, value.join(","));
      return;
    }
    if (String(value).trim().length === 0) return;
    search.set(key, String(value));
  });
  const query = search.toString();
  return query ? `?${query}` : "";
};

const JobsAPI = {
  browse: async (
    params: BrowseJobsParams = {},
  ): Promise<{ jobs: BrowseJobListItem[] } | null> =>
    request(`/jobs/browse${buildBrowseQuery(params)}`, { method: "GET" }),

  browseOne: async (uid: string): Promise<{ job: BrowseJobDetail } | null> =>
    request(`/jobs/browse/${uid}`, { method: "GET" }),

  markBrowseRead: async (
    uid: string,
  ): Promise<{ success: boolean; isRead: boolean } | null> =>
    request(`/jobs/browse/${uid}/read`, { method: "POST" }, { silent: true }),

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

  listSavedSearches: async (): Promise<
    { searches: { id: number; name: string; params: BrowseJobsParams }[] } | null
  > => request("/job-saved-searches", { method: "GET" }),

  saveSearch: async (payload: {
    name: string;
    params: BrowseJobsParams;
  }): Promise<{
    search: { id: number; name: string; params: BrowseJobsParams };
  } | null> =>
    request("/job-saved-searches", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

export default JobsAPI;
