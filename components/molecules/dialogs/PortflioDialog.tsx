import {
  AutoCompleteSelector,
  Button,
  Input,
  Textarea,
} from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  createEmptyPortfolioForm,
  type PortfolioForm,
} from "@/types/talent-profile";
import { MOCK_SKILLS } from "@/static/data/mock-skills";
import { PortflioUploadItem } from "@/components/common";
import FolderIcon from "@/public/assets/svgs/icons/other/folder.svg";
import Image from "next/image";
import {
  createEmptyPortfolioUploadDraft,
  hasPortfolioUploadDraftContent,
  portfolioUploadDraftToFormInput,
  type PortfolioUploadDraft,
} from "@/utils/portfolioUploadDraft";
import {
  validatePortfolioForm,
  type PortfolioFormErrors,
} from "@/utils/validatePortfolioForm";
import { Icon } from "@iconify/react";

type PortfolioUploadSlot = {
  id: string;
  draft: PortfolioUploadDraft;
  isComplete: boolean;
};

function createUploadSlot(isComplete = false): PortfolioUploadSlot {
  return {
    id: crypto.randomUUID(),
    draft: createEmptyPortfolioUploadDraft(),
    isComplete,
  };
}

function slotsToAssets(slots: PortfolioUploadSlot[]) {
  return slots
    .filter((slot) => slot.isComplete)
    .map((slot) => portfolioUploadDraftToFormInput(slot.draft))
    .filter((asset): asset is NonNullable<typeof asset> => asset !== null);
}

export default function PortflioDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PortfolioForm>(createEmptyPortfolioForm);
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [uploadSlots, setUploadSlots] = useState<PortfolioUploadSlot[]>(() => [
    createUploadSlot(),
  ]);
  const [errors, setErrors] = useState<PortfolioFormErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (!open) {
      setForm(createEmptyPortfolioForm());
      setSearch("");
      setUploadSlots([createUploadSlot()]);
      setErrors({});
      setConfirmOpen(false);
    }
  }, [open]);

  const syncAssets = useCallback((slots: PortfolioUploadSlot[]) => {
    setForm((current) => ({ ...current, assets: slotsToAssets(slots) }));
  }, []);

  const handleDraftChange = (index: number, draft: PortfolioUploadDraft) => {
    setUploadSlots((slots) =>
      slots.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, draft } : slot
      )
    );
  };

  const handleSlotComplete = (index: number) => {
    setUploadSlots((slots) => {
      const next = slots.map((slot, slotIndex) =>
        slotIndex === index ? { ...slot, isComplete: true } : slot
      );

      if (index === slots.length - 1) {
        next.push(createUploadSlot());
      }

      syncAssets(next);
      if (errors.assets) {
        setErrors((prev) => ({ ...prev, assets: undefined }));
      }
      return next;
    });
  };

  const handleRemoveSlot = (index: number) => {
    setUploadSlots((slots) => {
      const next = slots.filter((_, slotIndex) => slotIndex !== index);
      const withActiveSlot =
        next.length > 0 && next[next.length - 1].isComplete
          ? [...next, createUploadSlot()]
          : next.length > 0
          ? next
          : [createUploadSlot()];

      syncAssets(withActiveSlot);
      if (errors.assets) {
        setErrors((prev) => ({ ...prev, assets: undefined }));
      }
      return withActiveSlot;
    });
  };

  const hasIncompleteUploads = uploadSlots.some(
    (slot) => hasPortfolioUploadDraftContent(slot.draft) && !slot.isComplete
  );

  const runValidation = () => {
    const assets = slotsToAssets(uploadSlots);
    const result = validatePortfolioForm(
      { ...form, assets },
      { hasIncompleteUploads }
    );
    setErrors(result.errors);

    if (!result.isValid) {
      requestAnimationFrame(() => {
        const firstInvalidField = formRef.current?.querySelector(
          "[data-invalid='true']"
        );
        firstInvalidField?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      });
    }

    return result.isValid;
  };

  const handleNextPreview = () => {
    if (!runValidation()) return;
    // Preview step will be wired when the preview screen is added.
  };

  const handleSaveDraft = () => {
    if (!runValidation()) {
      setConfirmOpen(false);
      return;
    }

    setForm((current) => ({ ...current, status: "draft" }));
    setConfirmOpen(false);
    onClose();
  };

  const handleMoveSlot = (index: number, direction: "up" | "down") => {
    setUploadSlots((slots) => {
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= slots.length) return slots;

      const targetSlot = slots[targetIndex];
      if (!hasPortfolioUploadDraftContent(targetSlot.draft)) return slots;

      const next = [...slots];
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];

      syncAssets(next);
      return next;
    });
  };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setConfirmOpen(true);
          }
        }}
      >
        <DialogContent className="top-0! left-0! flex h-full max-w-full! min-w-full translate-x-0! translate-y-0! flex-col items-stretch gap-0 rounded-none p-0">
          <DialogHeader className="shrink-0 px-16 py-10">
            <DialogTitle className="text-3xl font-medium">
              Add a new portfolio project
            </DialogTitle>
            <DialogDescription>
              All fields are required unless otherwise indicated.
            </DialogDescription>
          </DialogHeader>

          <form
            ref={formRef}
            className="flex-1 space-y-16 overflow-y-auto px-16 py-10"
          >
            <div data-invalid={errors.title ? "true" : undefined}>
              <Input
                type="text"
                name="title"
                label="Project title"
                placeholder="Enter a brief but descriptive title."
                labelClassName="text-sm! font-medium! mb-2! block!"
                required
                value={form.title}
                error={errors.title}
                onChange={(e) => {
                  setForm({ ...form, title: e.target.value });
                  if (errors.title) {
                    setErrors((prev) => ({ ...prev, title: undefined }));
                  }
                }}
              />
            </div>
            <div className="flex items-start gap-16">
              <div className="space-y-16 w-1/3">
                <div data-invalid={errors.role ? "true" : undefined}>
                  <Input
                    type="text"
                    name="role"
                    label="Your role (optional)"
                    labelClassName="text-sm! font-medium! mb-2! block!"
                    placeholder="e.g. Frontend Engineer or Marketing Analyst"
                    value={form.role}
                    subLabel="Max 100 characters"
                    error={errors.role}
                    onChange={(e) => {
                      setForm({ ...form, role: e.target.value });
                      if (errors.role) {
                        setErrors((prev) => ({ ...prev, role: undefined }));
                      }
                    }}
                  />
                </div>
                <div data-invalid={errors.description ? "true" : undefined}>
                  <Textarea
                    name="description"
                    label="Project description"
                    labelClassName="text-sm! font-medium! mb-2! block!"
                    placeholder="Briefly describe the project's goals, your solution and the impact you made here."
                    required
                    value={form.description}
                    subLabel="Max 600 characters"
                    error={errors.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                      if (errors.description) {
                        setErrors((prev) => ({
                          ...prev,
                          description: undefined,
                        }));
                      }
                    }}
                  />
                </div>
                <div data-invalid={errors.skills ? "true" : undefined}>
                  <AutoCompleteSelector
                    label="Skills and deliverables"
                    labelClassName="text-sm! font-medium! mb-2! block!"
                    subLabel="Max 5 skills"
                    placeholder="Enter skills here"
                    name="skills"
                    required
                    options={MOCK_SKILLS}
                    value={search}
                    error={errors.skills}
                    selectedValues={form.skills.map((skill) => ({
                      label: skill,
                      value: skill,
                    }))}
                    onChange={setSearch}
                    onSelect={(skill) => {
                      setForm({
                        ...form,
                        skills: [...form.skills, skill.value],
                      });
                      if (errors.skills) {
                        setErrors((prev) => ({ ...prev, skills: undefined }));
                      }
                    }}
                    onRemove={(skill) => {
                      setForm({
                        ...form,
                        skills: form.skills.filter((s) => s !== skill.value),
                      });
                      if (errors.skills) {
                        setErrors((prev) => ({ ...prev, skills: undefined }));
                      }
                    }}
                  />
                </div>
              </div>

              <div
                className="flex-1 space-y-8"
                data-invalid={errors.assets ? "true" : undefined}
              >
                <div>
                  <p className="mb-2 block text-sm font-medium">
                    Portfolio content
                    <span className=""> *</span>
                  </p>
                  {errors.assets && (
                    <div className="flex items-center gap-2 flex-1">
                      <Icon
                        icon="mdi:information-outline"
                        width={16}
                        className="text-red-500"
                      />
                      <p className="text-red-600 text-sm">{errors.assets}</p>
                    </div>
                  )}
                </div>
                {uploadSlots.map((slot, index) => (
                  <PortflioUploadItem
                    key={slot.id}
                    value={slot.draft}
                    readOnly={slot.isComplete}
                    onChange={(draft) => handleDraftChange(index, draft)}
                    onComplete={() => handleSlotComplete(index)}
                    onRemove={() => handleRemoveSlot(index)}
                    onMoveUp={() => handleMoveSlot(index, "up")}
                    onMoveDown={() => handleMoveSlot(index, "down")}
                  />
                ))}
              </div>
            </div>
          </form>

          <DialogFooter className="shrink-0 px-16 py-10">
            <DialogClose asChild>
              <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
                Cancel
              </button>
            </DialogClose>
            <Button
              type="primary"
              label="Next: Preview"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleNextPreview}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={confirmOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setConfirmOpen(false);
          }
        }}
      >
        <DialogContent className="flex min-w-3xl flex-col">
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center gap-8">
            <Image
              src={FolderIcon}
              alt="Folder"
              className="w-[145px] h-[130px]"
            />

            <div className="space-y-4 text-center">
              <h3 className="text-2xl font-medium">
                Save your project as a draft?
              </h3>
              <p className="text-sm text-slate-600">
                Save now so you can return later. You can’t recover this
                portfolio project if you exit.
              </p>
            </div>
          </div>

          <DialogFooter>
            <button
              className="py-2.5 px-5 cursor-pointer text-sm font-medium"
              onClick={() => {
                setConfirmOpen(false);
                onClose();
              }}
            >
              Close without saving
            </button>
            <Button
              type="primary"
              label="Save as draft and return later"
              classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
              onClick={handleSaveDraft}
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
