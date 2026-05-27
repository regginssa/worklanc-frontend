import {
  Button,
  Checkbox,
  Input,
  SearchCombobox,
  Textarea,
} from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DateDropdown from "../DateDropdown";
import { motion } from "motion/react";
import { countries } from "country-data-list";

export default function WorkHistoryDialog({
  open,
  onClose,
  onSave,
  formData,
  onChangeFormData,
}: {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  formData: any;
  onChangeFormData: (data: any) => void;
}) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add Work Experience</DialogTitle>
        </DialogHeader>

        <form className="space-y-6 p-4 no-scrollbar max-h-[60vh] overflow-y-auto">
          <Input
            type="text"
            name="title"
            label="Title"
            placeholder="Ex: Software Engineer"
            labelClassName="text-sm font-medium"
            required
            value={formData?.title}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="company"
            label="Company"
            placeholder="Ex: Microsoft"
            labelClassName="text-sm font-medium"
            required
            value={formData?.company}
            onChange={handleInputChange}
          />

          <div className="">
            <label className="text-sm font-medium">Location</label>
            <div className="flex items-center gap-6 mt-1">
              <div className="flex-1">
                <Input
                  type="text"
                  name="city"
                  placeholder="Ex: London"
                  labelClassName="text-sm font-medium"
                  required
                  value={formData?.location?.city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onChangeFormData({
                      ...formData,
                      location: {
                        ...formData.location,
                        city: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="flex-1">
                <SearchCombobox
                  name="country"
                  placeholder="Country"
                  options={countries.all.map((c) => c.name)}
                  defaultOption={formData?.location?.country}
                  onSelect={(v: string) =>
                    onChangeFormData({
                      ...formData,
                      location: { ...formData.location, country: v },
                    })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData?.isCurrent}
              onCheck={(v: boolean) =>
                onChangeFormData({ ...formData, isCurrent: v })
              }
              className="w-5! h-5!"
            />
            <label className="text-sm">
              I am currently working in this role
            </label>
          </div>

          <div className="flex items-center gap-6">
            <DateDropdown
              label="Start Date"
              name="startedAt"
              required
              value={formData?.startedAt}
              onChange={(v: Date) =>
                onChangeFormData({ ...formData, startedAt: v })
              }
              classname="flex-1"
            />
            <DateDropdown
              label="End Date"
              name="endAt"
              required
              value={formData?.endAt}
              onChange={(v: Date) =>
                onChangeFormData({ ...formData, endAt: v })
              }
              classname="flex-1"
              disabled={formData?.isCurrent}
            />
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
