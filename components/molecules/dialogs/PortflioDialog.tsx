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
import { useState } from "react";
import {
  createEmptyPortfolioForm,
  type PortfolioForm,
} from "@/types/talent-profile";
import { MOCK_SKILLS } from "@/static/data/mock-skills";
import { PortflioUploadItem } from "@/components/common";

export default function PortflioDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<PortfolioForm>(createEmptyPortfolioForm);
  const [search, setSearch] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="top-0! left-0! flex h-full max-w-full! min-w-full translate-x-0! translate-y-0! flex-col items-stretch gap-0 rounded-none p-0">
        <DialogHeader className="shrink-0 px-16 py-10">
          <DialogTitle className="text-3xl font-medium">
            Add a new portfolio project
          </DialogTitle>
          <DialogDescription>
            All fields are required unless otherwise indicated.
          </DialogDescription>
        </DialogHeader>

        <form className="flex-1 space-y-16 overflow-y-auto px-16 py-10">
          <Input
            type="text"
            name="title"
            label="Project title"
            placeholder="Enter a brief but descriptive title."
            labelClassName="text-sm! font-medium! mb-2! block!"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div className="flex items-start gap-16">
            <div className="space-y-16 w-1/3">
              <Input
                type="text"
                name="role"
                label="Your role (optional)"
                labelClassName="text-sm! font-medium! mb-2! block!"
                placeholder="e.g. Frontend Engineer or Marketing Analyst"
                value={form.role}
                subLabel="Max 100 characters"
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
              <Textarea
                name="description"
                label="Project description"
                labelClassName="text-sm! font-medium! mb-2! block!"
                placeholder="Briefly describe the project's goals, your solution and the impact you made here."
                required
                value={form.description}
                subLabel="Max 600 characters"
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <AutoCompleteSelector
                label="Skills and deliverables"
                labelClassName="text-sm! font-medium! mb-2! block!"
                subLabel="Max 15 skills"
                placeholder="Enter skills here"
                name="skills"
                required
                options={MOCK_SKILLS}
                value={search}
                selectedValues={form.skills.map((skill) => ({
                  label: skill,
                  value: skill,
                }))}
                onChange={setSearch}
                onSelect={(skill) =>
                  setForm({ ...form, skills: [...form.skills, skill.value] })
                }
                onRemove={(skill) =>
                  setForm({
                    ...form,
                    skills: form.skills.filter((s) => s !== skill.value),
                  })
                }
              />
            </div>

            <div className="space-y-8 flex-1">
              <PortflioUploadItem />
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
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
