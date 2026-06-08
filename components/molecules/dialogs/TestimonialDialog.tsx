import { Button, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import TestimonialIcon from "@/public/assets/svgs/icons/other/testinimal.svg";
import Image from "next/image";
import { Icon } from "@iconify/react";
import {
  validateTestimonialForm,
  type TestimonialFormErrors,
} from "@/utils/validateFreelancerProfileForms";

export default function TestimonialDialog({
  open,
  onClose,
  onRequest,
  loading = false,
}: {
  open: boolean;
  onClose: () => void;
  onRequest: () => void;
  loading?: boolean;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedinUrl: "",
    title: "",
    projectType: "",
    message: "",
  });
  const [errors, setErrors] = useState<TestimonialFormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof TestimonialFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleRequest = () => {
    const result = validateTestimonialForm(formData);
    setErrors(result.errors);
    if (!result.isValid) return;
    onRequest();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-4xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">
            Request a client testimonial
          </DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] flex items-stretch gap-6 overflow-y-auto">
          <form className="space-y-6 w-2/3">
            <p className="text-sm text-slate-600">
              Add your client’s contact details. Don’t worry—we’ll only display
              their first name and last initial.
            </p>

            <div className="flex items-center gap-6">
              <Input
                type="text"
                label="First name"
                name="firstName"
                classname="flex-1"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
              />
              <Input
                type="text"
                label="Last name"
                name="lastName"
                classname="flex-1"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
              />
            </div>

            <div className="flex items-center gap-6">
              <Input
                type="email"
                label="Business email"
                name="email"
                classname="flex-1"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
              />
              <Input
                type="url"
                label="Client's LinkedIn profile"
                name="linkedinUrl"
                placeholder="https://"
                classname="flex-1"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                error={errors.linkedinUrl}
              />
            </div>

            <div className="flex items-center gap-6">
              <Input
                type="text"
                label="Client's title Optional"
                name="title"
                placeholder="Ex: Director of Marketing"
                classname="flex-1"
                value={formData.title}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                label="Project type Optional"
                name="projectType"
                placeholder="Marketing Brand Reference"
                classname="flex-1"
                value={formData.projectType}
                onChange={handleInputChange}
              />
            </div>

            <Textarea
              name="message"
              label="Message"
              placeholder="Enter message"
              subLabel="800 characters left"
              rows={4}
              value={formData.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFormData({ ...formData, message: e.target.value });
                if (errors.message) {
                  setErrors((prev) => ({ ...prev, message: undefined }));
                }
              }}
              error={errors.message}
            />

            <Button
              type="primary"
              label="Request testimonial"
              classname="py-2.5! px-5! text-sm! font-medium!"
              loading={loading}
              onClick={handleRequest}
            />
          </form>

          <div className="flex-1 bg-slate-100 rounded-xl space-y-6 flex flex-col items-center justify-center p-4">
            <Image
              src={TestimonialIcon}
              alt="Testimonial"
              width={145}
              height={130}
            />
            <h5 className="text-xl font-medium">
              Strengthen your profile with client testimonials
            </h5>

            <ul className="space-y-6">
              <li className="flex items-start gap-2">
                <Icon icon="mdi:check" className="w-5 h-5 text-blue-600" />
                <span className="text-sm">
                  Showcase your skills and successes from clients outside of
                  Worklanc
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Icon icon="mdi:check" className="w-5 h-5 text-blue-600" />
                <span className="text-sm">
                  Your clients will get an email with instructions for
                  submitting your success story
                </span>
              </li>

              <li className="flex items-start gap-2">
                <Icon icon="mdi:check" className="w-5 h-5 text-blue-600" />
                <span className="text-sm">
                  The testimonial will display on your profile once it's
                  verified by Worklanc.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
