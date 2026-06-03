import { Button, Input } from "@/components/atoms";
import { OrgManagementLayout } from "@/components/layouts";
import {
  ReEnterPasswordDialog,
  SecurityQuestionDialog,
} from "@/components/molecules";
import { useState } from "react";

export default function Members() {
  const [openSecurityQuestionDialog, setOpenSecurityQuestionDialog] =
    useState(false);
  const [openReEnterPasswordDialog, setOpenReEnterPasswordDialog] =
    useState(false);
  const [searchFormData, setSearchFormData] = useState({
    keyword: "",
  });

  return (
    <OrgManagementLayout
      seo={{
        title: "Members - Worklanc",
        description: "Members - Worklanc",
        url: "/nx/org-management/members",
      }}
    >
      <div className="flex items-center justify-between px-4">
        <h1 className="text-2xl font-medium">Members</h1>
        <Button
          type="primary"
          label="Invite members"
          classname="py-2.5! px-5! text-sm! font-medium!"
        />
      </div>

      <div className="flex items-center gap-4">
        <Input
          type="text"
          name="keyword"
          label="Search by name or email"
          labelClassName="text-base! font-medium!"
          icon="mdi:search"
          classname="flex-1"
          value={searchFormData.keyword}
          onChange={(e) =>
            setSearchFormData({ ...searchFormData, keyword: e.target.value })
          }
        />
      </div>
      <SecurityQuestionDialog
        open={openSecurityQuestionDialog}
        onClose={() => setOpenSecurityQuestionDialog(false)}
      />
      <ReEnterPasswordDialog
        open={openReEnterPasswordDialog}
        onClose={() => setOpenReEnterPasswordDialog(false)}
      />
    </OrgManagementLayout>
  );
}
