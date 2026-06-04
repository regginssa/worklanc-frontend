import { AutoComplete } from "@/components/common";
import { ClientLayout } from "@/components/layouts";
import { useState } from "react";
import { motion } from "motion/react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button, Input } from "@/components/atoms";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { TalentFilter } from "@/components/organisms";

export default function SearchTalent() {
  const [open, setOpen] = useState(false);
  const [searchFormData, setSearchFormData] = useState({
    keyword: "",
    allOfTheseWords: "",
    anyOfTheseWords: "",
    noneOfTheseWords: "",
    theExactPhrase: "",
  });
  const [loadings, setLoadings] = useState({
    keyword: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchFormData({ ...searchFormData, [e.target.name]: e.target.value });
  };

  return (
    <ClientLayout
      seo={{
        title: "Search Freelance Talent on Worklanc",
        description: "Search talent - Worklanc",
        url: "/nx/search/talent",
      }}
    >
      <div className="flex items-center gap-2 w-1/2">
        <AutoComplete
          name="keyword"
          icon="lucide:search"
          placeholder="Search"
          roundedFull
          classname="flex-1"
          value={searchFormData.keyword}
          loading={loadings.keyword}
          onChange={(value) =>
            setSearchFormData({ ...searchFormData, keyword: value })
          }
        />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="text-blue-600 cursor-pointer py-2 px-5 text-sm font-medium"
          onClick={() => setOpen(true)}
        >
          Advanced search
        </motion.button>
      </div>

      <div className="flex items-start gap-10">
        <TalentFilter />

        <div className="flex-1"></div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">Advanced search</DialogTitle>
          </DialogHeader>

          <form className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto space-y-6">
            <Input
              type="text"
              name="allOfTheseWords"
              label="All of these words"
              labelClassName="text-sm block mb-2"
              value={searchFormData.allOfTheseWords}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="anyOfTheseWords"
              label="Any of these words"
              labelClassName="text-sm block mb-2"
              value={searchFormData.anyOfTheseWords}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="noneOfTheseWords"
              label="None of these words"
              labelClassName="text-sm block mb-2"
              value={searchFormData.noneOfTheseWords}
              onChange={handleInputChange}
            />

            <Input
              type="text"
              name="theExactPhrase"
              label="The exact phrase"
              labelClassName="text-sm block mb-2"
              value={searchFormData.theExactPhrase}
              onChange={handleInputChange}
            />
          </form>

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
    </ClientLayout>
  );
}
