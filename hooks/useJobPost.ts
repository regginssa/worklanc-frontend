import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import JobsAPI from "@/lib/api/jobs";
import type { Job, JobPatch, JobPostStep } from "@/types/job";
import { JOB_POST_STEPS } from "@/types/job";

const jobQueryKey = (uid?: string) => ["job", uid];

export const useJobPost = (jobUid?: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [saving, setSaving] = useState(false);

  const uid = jobUid || (router.query.job as string | undefined);

  const { data, isLoading, error } = useQuery({
    queryKey: jobQueryKey(uid),
    queryFn: () => (uid ? JobsAPI.get(uid) : Promise.resolve(null)),
    enabled: !!uid,
  });

  const job: Job | null = data?.job ?? null;

  const cacheJob = (updated?: Job) => {
    if (!updated) return;
    queryClient.setQueryData(jobQueryKey(updated.uid), { job: updated });
    queryClient.invalidateQueries({ queryKey: ["client-jobs"] });
  };

  const withJobParam = (path: string, targetUid?: string) => {
    const id = targetUid || uid;
    if (!id) return path;
    const separator = path.includes("?") ? "&" : "?";
    return `${path}${separator}job=${id}`;
  };

  const startNewJob = async () => {
    setSaving(true);
    try {
      const res = await JobsAPI.create();
      if (!res?.job) return null;
      cacheJob(res.job);
      await router.push(withJobParam("/nx/job-post/title", res.job.uid));
      return res.job;
    } finally {
      setSaving(false);
    }
  };

  const saveStep = async (
    patch: JobPatch,
    nextPath: JobPostStep,
    currentStep: JobPostStep,
  ) => {
    if (!uid) return null;
    setSaving(true);
    try {
      const res = await JobsAPI.update(uid, {
        ...patch,
        currentStep,
        direction: "next",
      });
      if (!res?.job) return null;
      cacheJob(res.job);
      await router.push(withJobParam(nextPath));
      return res.job;
    } finally {
      setSaving(false);
    }
  };

  const goBack = async (
    patch: JobPatch,
    prevPath: string,
    currentStep: JobPostStep,
  ) => {
    if (!uid) {
      await router.back();
      return null;
    }
    setSaving(true);
    try {
      const res = await JobsAPI.update(uid, {
        ...patch,
        currentStep,
        direction: "back",
      });
      if (res?.job) cacheJob(res.job);
      await router.push(withJobParam(prevPath));
      return res?.job ?? null;
    } finally {
      setSaving(false);
    }
  };

  const saveDraft = async (patch: JobPatch = {}) => {
    if (!uid) return null;
    setSaving(true);
    try {
      const res = await JobsAPI.saveDraft(uid, patch);
      if (res?.job) cacheJob(res.job);
      await router.push("/nx/client/dashboard");
      return res?.job ?? null;
    } finally {
      setSaving(false);
    }
  };

  const publish = async (patch: JobPatch = {}) => {
    if (!uid) return null;
    setSaving(true);
    try {
      const res = await JobsAPI.publish(uid, patch);
      if (res?.job) cacheJob(res.job);
      return res;
    } finally {
      setSaving(false);
    }
  };

  const resumePath = (targetJob: Job) =>
    withJobParam(targetJob.currentStep || "/nx/job-post/title", targetJob.uid);

  const getStepNumber = (step: JobPostStep) =>
    JOB_POST_STEPS.indexOf(step) + 1;

  return {
    uid,
    job,
    isLoading,
    error,
    saving,
    withJobParam,
    startNewJob,
    saveStep,
    goBack,
    saveDraft,
    publish,
    resumePath,
    getStepNumber,
  };
};

export const useClientJobs = () =>
  useQuery({
    queryKey: ["client-jobs"],
    queryFn: JobsAPI.list,
  });
