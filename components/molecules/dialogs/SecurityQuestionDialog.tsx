import { Button, Checkbox, Dropdown, Input } from "@/components/atoms";
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

interface SecurityQuestionDialogProps {
  open: boolean;
  onClose: () => void;
}

const securityQuestions = [
  "Your mother's maiden name",
  "Your first pet's name",
  "The name of your elementary school",
  "Your elementary school mascot",
  "Your best friend's nickname",
  "Your favorite sports team",
  "Your favorite writer",
  "Your favorite actor",
  "Your favorite singer",
  "Your favorite song",
  "The name of the street you grew up on",
  "Make and model of your first car",
  "The city where you first met your spouse",
  "Other...",
];

export default function SecurityQuestionDialog({
  open,
  onClose,
}: SecurityQuestionDialogProps) {
  const [formData, setFormData] = useState<{
    question: string;
    answer: string;
    understand: boolean;
    keepLogin: boolean;
  }>({
    question: securityQuestions[0],
    answer: "",
    understand: false,
    keepLogin: false,
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-3xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Security question</DialogTitle>
          <DialogDescription>
            You’ll be prompted to answer your security question when we need to
            verify your identity, so be sure to choose a question only you know
            the answer to.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-6">
          <Dropdown
            label="Question"
            name="question"
            labelClassName="text-base! font-light!"
            options={securityQuestions.map((question) => ({
              label: question,
              value: question,
            }))}
            value={formData.question}
            onSelect={(value) => setFormData({ ...formData, question: value })}
          />

          <Input
            type="text"
            label="Answer"
            labelClassName="text-base!"
            name="answer"
            value={formData.answer}
            onChange={(e) =>
              setFormData({ ...formData, answer: e.target.value })
            }
          />

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.understand}
                onCheck={(value) =>
                  setFormData({ ...formData, understand: value })
                }
              />
              <p className="text-sm">
                I understand my account will be locked if I am unable to answer
                this question
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={formData.keepLogin}
                onCheck={(value) =>
                  setFormData({ ...formData, keepLogin: value })
                }
              />
              <p className="text-sm">Keep me logged in on this device</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium">
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
