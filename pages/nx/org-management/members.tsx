import {
  Button,
  Dropdown,
  Input,
  SearchableDropdown,
} from "@/components/atoms";
import { OrgManagementLayout } from "@/components/layouts";
import {
  MembersFilterDialog,
  ReEnterPasswordDialog,
  SecurityQuestionDialog,
} from "@/components/molecules";
import { useState } from "react";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import UserPlusIcon from "@/public/assets/svgs/icons/other/user_plus.svg";
import Image from "next/image";
import { useRouter } from "next/router";

const teamOptions = [
  { label: "All teams", value: "all_teams" },
  { label: "Team 1", value: "team_1" },
  { label: "Team 2", value: "team_2" },
  { label: "Team 3", value: "team_3" },
];

const sortOptions = [
  { label: "Most recent", value: "most_recent" },
  { label: "Least recent", value: "least_recent" },
  { label: "Z to A", value: "z_a" },
  { label: "A to Z", value: "a_z" },
];

export default function Members() {
  const [openSecurityQuestionDialog, setOpenSecurityQuestionDialog] =
    useState(false);
  const [openReEnterPasswordDialog, setOpenReEnterPasswordDialog] =
    useState(false);
  const [openMembersFilterDialog, setOpenMembersFilterDialog] = useState(false);
  const [searchFormData, setSearchFormData] = useState({
    keyword: "",
    team: "all_teams",
    sort: "most_recent",
  });
  const router = useRouter();

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
          label="Invite Members"
          classname="py-2.5! px-5! text-sm! font-medium!"
          onClick={() => router.push("/nx/org-management/invitations/create")}
        />
      </div>

      <div className="flex items-center gap-4">
        <Input
          type="text"
          name="keyword"
          label="Search by name or email"
          placeholder="Search by name or email"
          labelClassName="text-base! font-light!"
          icon="mdi:search"
          classname="flex-1"
          value={searchFormData.keyword}
          onChange={(e) =>
            setSearchFormData({ ...searchFormData, keyword: e.target.value })
          }
        />
        <SearchableDropdown
          name="team"
          label="Team"
          labelClassName="text-base! block mb-1 font-light!"
          className="flex-1!"
          options={teamOptions}
          value={searchFormData.team}
          onChange={(value) =>
            setSearchFormData({ ...searchFormData, team: value })
          }
        />
        <Dropdown
          name="sort"
          label="Sorted by"
          labelClassName="text-base! font-light!"
          classname="w-[200px]!"
          options={sortOptions}
          value={searchFormData.sort}
          onSelect={(value) =>
            setSearchFormData({ ...searchFormData, sort: value })
          }
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2.5 cursor-pointer mt-5 text-blue-600 flex items-center gap-2"
          onClick={() => setOpenMembersFilterDialog(true)}
        >
          <Icon icon="mage:filter" className="size-6" />
          <span className="font-medium">Filters</span>
        </motion.button>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 py-10">
        <Image
          src={UserPlusIcon}
          alt="user-plus"
          className="w-[145px] h-[130px]"
        />

        <p className="text-lg text-slate-600 font-medium">
          You have no team members yet
        </p>
        <p className="text-sm text-slate-600 font-medium">
          Get started by inviting someone to join you.
        </p>
      </div>

      <SecurityQuestionDialog
        open={openSecurityQuestionDialog}
        onClose={() => setOpenSecurityQuestionDialog(false)}
      />
      <ReEnterPasswordDialog
        open={openReEnterPasswordDialog}
        onClose={() => setOpenReEnterPasswordDialog(false)}
      />
      <MembersFilterDialog
        open={openMembersFilterDialog}
        onClose={() => setOpenMembersFilterDialog(false)}
        onReset={() => {}}
        onApply={() => {}}
      />
    </OrgManagementLayout>
  );
}
