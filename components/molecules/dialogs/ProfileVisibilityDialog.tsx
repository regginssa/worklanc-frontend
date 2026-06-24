import { Button, RadioGroup } from "@/components/atoms";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";

const options = [
  {
    title: "Public",
    description:
      "Your profile is visible to the general public and will show up in search engine results",
    value: "public",
  },
  {
    title: "Worklanc Users Only",
    description: "Only logged in Upwork users will see your profile",
    value: "worklanc_users_only",
  },
  {
    title: "Private",
    description:
      "Your profile won't appear in any search results, not even on Upwork. To view your profile, users must have a direct link and be logged in.",
    value: "private",
  },
];

export default function ProfileVisibilityDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedOption, setSelectedOption] = useState<string>(
    options[0].value
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">
            Edit Profile Visibility
          </DialogTitle>
          <DialogDescription>
            Who do you want to see your profile? Simply select an option to
            control your visibility and searchability. Market your profile when
            and where you want.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-6">
          <RadioGroup
            options={options}
            value={selectedOption}
            onChange={setSelectedOption}
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium hover:underline">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Save"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
