import { Button, Dropdown, Input, Textarea } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Education } from "@/types/user";
import { motion } from "motion/react";

export default function EducationDialog({
  open,
  onClose,
  onSave,
  formData,
  onChangeFormData,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: Education;
  onChangeFormData: (data: Education) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">
            {formData?.school !== "" || !!formData?.school
              ? "Edit Education History"
              : "Add Education History"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-6 p-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          <Input
            type="text"
            name="school"
            label="School"
            placeholder="Ex: University of London"
            labelClassName="text-sm font-medium"
            required
            value={formData?.school}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="degree"
            label="Degree"
            placeholder="Ex: Bachelors"
            labelClassName="text-sm font-medium"
            required
            value={formData?.degree}
            onChange={handleInputChange}
          />

          <Input
            type="text"
            name="fieldOfStudy"
            label="Field of Study"
            placeholder="Ex: Computer Science"
            labelClassName="text-sm font-medium"
            required
            value={formData?.fieldOfStudy}
            onChange={handleInputChange}
          />

          <div>
            <label className="text-sm font-medium">Dates Attended</label>
            <div className="flex items-center gap-6 mt-1">
              <Dropdown
                placeholder="From"
                name="startedAt"
                options={Array.from({ length: 20 }, (_, i) => i + 2005).map(
                  (year) => ({
                    label: year.toString(),
                    value: year.toString(),
                  })
                )}
                value={formData?.startedAt?.toString() || ""}
                onSelect={(v: string) =>
                  onChangeFormData({ ...formData, startedAt: Number(v) })
                }
              />

              <Dropdown
                placeholder="To (or expected graduation year)"
                name="endAt"
                options={Array.from({ length: 20 }, (_, i) => i + 2005).map(
                  (year) => ({
                    label: year.toString(),
                    value: year.toString(),
                  })
                )}
                value={formData?.endAt?.toString() || ""}
                onSelect={(v: string) =>
                  onChangeFormData({ ...formData, endAt: Number(v) })
                }
              />
            </div>
          </div>

          <Textarea
            name="description"
            label="Description"
            labelClassName="text-sm font-medium"
            value={formData?.description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              onChangeFormData({ ...formData, description: e.target.value })
            }
          />
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="py-2 px-4 rounded-full text-sm text-slate-600 font-medium cursor-pointer"
            >
              Cancel
            </motion.button>
          </DialogClose>
          <Button
            type="primary"
            label="Save"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
            onClick={onSave}
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
