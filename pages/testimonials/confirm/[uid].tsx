import { Button, SEO, Textarea } from "@/components/atoms";
import { Header } from "@/components/organisms";
import TestimonialAPI, {
  type PublicTestimonialRequest,
} from "@/lib/api/testimonial";
import TestimonialIcon from "@/public/assets/svgs/icons/other/testinimal.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PageState =
  | "loading"
  | "not_found"
  | "pending"
  | "confirmed"
  | "declined"
  | "already_responded";

export default function TestimonialConfirmPage() {
  const router = useRouter();
  const uid = router.isReady ? (router.query.uid as string | undefined) : undefined;

  const [pageState, setPageState] = useState<PageState>("loading");
  const [testimonial, setTestimonial] =
    useState<PublicTestimonialRequest | null>(null);
  const [testimonialText, setTestimonialText] = useState("");
  const [textError, setTextError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    if (!router.isReady || !uid) return;

    let cancelled = false;

    TestimonialAPI.getRequest(uid).then((result) => {
      if (cancelled) return;

      if (!result.ok || !result.data?.testimonial) {
        setPageState("not_found");
        return;
      }

      const item = result.data.testimonial;
      setTestimonial(item);

      if (item.status === "confirmed") {
        setPageState("confirmed");
      } else if (item.status === "declined") {
        setPageState("declined");
      } else {
        setPageState("pending");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [router.isReady, uid]);

  const talentName = testimonial
    ? `${testimonial.talentFirstName} ${testimonial.talentLastName}`.trim()
    : "";

  const handleConfirm = async () => {
    if (!uid) return;

    const trimmed = testimonialText.trim();
    if (!trimmed) {
      setTextError("Please share a testimonial before confirming");
      return;
    }

    setTextError("");
    setActionError("");
    setSubmitting(true);

    try {
      const result = await TestimonialAPI.respond(uid, {
        action: "confirm",
        testimonialText: trimmed,
      });

      if (result.ok && result.data?.status === "confirmed") {
        setPageState("confirmed");
        setTestimonial((current) =>
          current
            ? {
                ...current,
                status: "confirmed",
                testimonialText: result.data?.testimonialText ?? trimmed,
              }
            : current
        );
        return;
      }

      if (result.status === 409) {
        setPageState("already_responded");
        return;
      }

      setActionError(
        result.data?.message || "Unable to submit your testimonial right now"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDecline = async () => {
    if (!uid) return;

    setActionError("");
    setSubmitting(true);

    try {
      const result = await TestimonialAPI.respond(uid, { action: "decline" });

      if (result.ok && result.data?.status === "declined") {
        setPageState("declined");
        setTestimonial((current) =>
          current ? { ...current, status: "declined" } : current
        );
        return;
      }

      if (result.status === 409) {
        setPageState("already_responded");
        return;
      }

      setActionError(
        result.data?.message || "Unable to decline this request right now"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="intro" />
      <SEO
        title="Confirm testimonial"
        description="Respond to a WorkLanc testimonial request"
        url={`/testimonials/confirm/${uid ?? ""}`}
      />

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 py-12">
        {pageState === "loading" && (
          <p className="text-center text-sm text-slate-600">Loading...</p>
        )}

        {pageState === "not_found" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Image
              src={TestimonialIcon}
              alt="Testimonial"
              className="h-[130px] w-[145px] object-contain"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-medium">Request not found</h1>
              <p className="text-sm text-slate-600">
                This testimonial link is invalid or has expired.
              </p>
            </div>
          </div>
        )}

        {pageState === "pending" && testimonial && (
          <div className="space-y-8">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-medium">
                Share a testimonial for {talentName}
              </h1>
              {testimonial.talentTitle && (
                <p className="text-sm text-slate-600">{testimonial.talentTitle}</p>
              )}
              <p className="text-sm text-slate-600">
                Hi {testimonial.clientFirstName}, {talentName} asked you to share
                feedback about your work together.
              </p>
            </div>

            {testimonial.requestMessage && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <p className="mb-2 font-medium text-slate-900">
                  Message from {talentName}
                </p>
                <p>{testimonial.requestMessage}</p>
              </div>
            )}

            <Textarea
              name="testimonialText"
              label="Your testimonial"
              placeholder="Share your experience working together..."
              rows={6}
              value={testimonialText}
              onChange={(e) => {
                setTestimonialText(e.target.value);
                if (textError) setTextError("");
              }}
              error={textError}
            />

            {actionError && (
              <p className="text-sm text-red-600">{actionError}</p>
            )}

            <div className="flex flex-wrap items-center justify-end gap-3">
              <Button
                type="outline"
                label="Decline request"
                classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
                disabled={submitting}
                onClick={handleDecline}
              />
              <Button
                type="primary"
                label="Confirm testimonial"
                classname="rounded-full! px-5! py-2.5! text-sm! font-medium!"
                loading={submitting}
                onClick={handleConfirm}
              />
            </div>
          </div>
        )}

        {(pageState === "confirmed" || pageState === "already_responded") && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Image
              src={TestimonialIcon}
              alt="Testimonial"
              className="h-[130px] w-[145px] object-contain"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-medium">Thank you</h1>
              <p className="text-sm text-slate-600">
                {pageState === "already_responded"
                  ? "This testimonial request has already been responded to."
                  : `Your testimonial for ${talentName} has been confirmed and will appear on their profile.`}
              </p>
              {testimonial?.testimonialText && (
                <p className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-sm text-slate-700">
                  {testimonial.testimonialText}
                </p>
              )}
            </div>
            {testimonial?.talentProfileUid && (
              <Link
                href={`/freelancers/${testimonial.talentProfileUid}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                View {talentName}&apos;s profile
              </Link>
            )}
          </div>
        )}

        {pageState === "declined" && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Image
              src={TestimonialIcon}
              alt="Testimonial"
              className="h-[130px] w-[145px] object-contain"
            />
            <div className="space-y-2">
              <h1 className="text-3xl font-medium">Request declined</h1>
              <p className="text-sm text-slate-600">
                You declined the testimonial request from {talentName}.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
