import { OrgManagementLayout } from "@/components/layouts";
import { SecurityQuestionDialog } from "@/components/molecules";
import { useState } from "react";

export default function Members() {
  const [openSecurityQuestionDialog, setOpenSecurityQuestionDialog] =
    useState(true);

  return (
    <OrgManagementLayout
      seo={{
        title: "Members - Worklanc",
        description: "Members - Worklanc",
        url: "/nx/org-management/members",
      }}
      title="Members"
    >
      <SecurityQuestionDialog
        open={openSecurityQuestionDialog}
        onClose={() => setOpenSecurityQuestionDialog(false)}
      />
    </OrgManagementLayout>
  );
}
