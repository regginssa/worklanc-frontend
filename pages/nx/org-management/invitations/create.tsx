import { Button, Input } from "@/components/atoms";
import { ClientLayout } from "@/components/layouts";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useRouter } from "next/router";
import { useState } from "react";

const roles = ["Messenger", "Recruiter", "Hiring Manager"];
const permissions = [
  "Chat and access any company room",
  "View company address book",
  "Invite, shortlist, and interview freelancers",
  "Post jobs and review proposals",
  "Send and review offers, create contracts, and reports",
];

export default function CreateInvitation() {
  const [emails, setEmails] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  return (
    <ClientLayout
      seo={{
        title: "Invite teammate - Worklanc",
        description: "Invite teammate - Worklanc",
        url: "/nx/org-management/invitations/create",
      }}
    >
      <div className="">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer text-sm text-blue-600 hover:underline font-medium flex items-center gap-2"
          onClick={() => router.back()}
        >
          <Icon icon="mdi:chevron-left" className="w-5 h-5" />
          <span>Back</span>
        </motion.button>
      </div>

      <h1 className="text-4xl font-medium">Invite teammate</h1>

      <div className="space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium">Add emails</p>
          <p className="text-sm font-medium text-slate-600">
            You can invite multiple members to this team at once by adding their
            emails.
          </p>
          <Input
            type="email"
            name="emails"
            placeholder="Emails, separated by commas"
            icon="mdi:email-outline"
            value={emails}
            onChange={(e) => setEmails(e.target.value)}
          />
        </div>

        <div className="border-2 p-4 border-blue-300 rounded-md space-y-8 max-h-[200px] overflow-hidden">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-medium">Assign role</h1>
                <div className="flex items-center justify-center text-white text-xs py-1 px-3 freelancer-plus-alert rounded-full">
                  Unlock Business Plus
                </div>
              </div>

              <p className="text-sm font-medium text-slate-600 mt-2">
                Select relevant predefined role. Each role comes with
                permissions that will apply to all teammates on this invite.
              </p>
            </div>

            <Button
              type="outline"
              label="Upgrade"
              size="medium"
              classname="py-2! px-6! text-sm! font-medium! rounded-md!"
              onClick={() =>
                router.push(
                  "/nx/plans/client/change-plan?returnUrl=eyJzdWNjZXNzIjoiL254L29yZy1tYW5hZ2VtZW50L3NldHRpbmdzIn0%3D"
                )
              }
            />
          </div>

          <ul className="grid grid-cols-3 gap-6 relative overflow-hidden">
            {roles.map((ro, index) => (
              <motion.li
                key={index}
                whileTap={{ scale: 0.95 }}
                onClick={() => setRole(ro)}
                className={`border rounded-md cursor-pointer ${
                  role === ro
                    ? "border-black"
                    : "border-slate-300 hover:bg-slate-50 transition-colors duration-200"
                } p-4`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">{ro}</h3>
                  <div
                    className={`w-5 h-5 overflow-hidden flex items-center border justify-center transition-all duration-200 group-hover:bg-slate-100 rounded-full ${
                      role === ro ? "border-black" : "border-slate-300"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 bg-zinc-800 rounded-full transition-all duration-200 ${
                        role === ro ? "scale-100" : "scale-0"
                      }`}
                    ></div>
                  </div>
                </div>
                <p className="text-slate-600">
                  Can chat and access any company room
                </p>
                <p className="text-sm text-slate-600">
                  Can chat and access any company room
                </p>
                <p className="text-sm text-slate-600">
                  Can chat and access any company room
                </p>
              </motion.li>
            ))}

            <div className="h-full bg-gradient-to-t from-white to-transparent absolute inset-0 z-10"></div>
          </ul>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">
            Teammate(s) will have these permissions:
          </h3>

          <ul className="space-y-2 text-slate-600">
            {permissions.map((permission, index) => (
              <li key={index} className="flex items-center gap-2">
                <Icon icon="mdi:check" className="size-5" />
                <span>{permission}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="primary"
            label="Send invite"
            classname="py-2! px-5! text-sm! font-medium! rounded-md!"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="text-blue-600 cursor-pointer text-sm font-medium py-2 px-5 hover:underline"
            onClick={() => router.back()}
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </ClientLayout>
  );
}
