import type { TestimonialStatus } from "@/types/user";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export type PublicTestimonialRequest = {
  uid: string;
  status: TestimonialStatus;
  clientFirstName: string;
  clientLastName: string;
  clientTitle: string | null;
  projectType: string | null;
  requestMessage: string | null;
  testimonialText: string | null;
  talentFirstName: string;
  talentLastName: string;
  talentTitle: string | null;
  talentProfileUid: string;
};

type PublicApiResult<T> = {
  ok: boolean;
  status: number;
  data: T | null;
};

async function publicRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<PublicApiResult<T>> {
  const res = await fetch(`${BASE_URL}/api${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = (await res.json().catch(() => null)) as T | null;

  return {
    ok: res.ok,
    status: res.status,
    data,
  };
}

const TestimonialAPI = {
  getRequest: async (uid: string) =>
    publicRequest<{ testimonial: PublicTestimonialRequest }>(
      `/talent/testimonials/${uid}`,
      { method: "GET" }
    ),

  respond: async (
    uid: string,
    body: { action: "confirm" | "decline"; testimonialText?: string }
  ) =>
    publicRequest<{
      status: TestimonialStatus;
      testimonialText: string | null;
      message?: string;
    }>(`/talent/testimonials/${uid}/respond`, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};

export default TestimonialAPI;
