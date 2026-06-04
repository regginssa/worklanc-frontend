import {
  Button,
  DatePicker,
  Dropdown,
  Input,
  RadioGroup,
} from "@/components/atoms";
import { WmLayout } from "@/components/layouts";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import CheckBoxGroup from "@/components/molecules/CheckBoxGroup";
import PencilPaperIcon from "@/public/assets/svgs/icons/other/pencil_paper.svg";
import Image from "next/image";
import Link from "next/link";

const sortByOptions = [
  { label: "Start date", value: "start_date" },
  { label: "End date", value: "end_date" },
  { label: "Freelancer name", value: "freelancer_name" },
  { label: "Team", value: "team" },
  { label: "Contract name", value: "contract_name" },
];

const sortOrderOptions = [
  { label: "Ascending", value: "asc" },
  { label: "Descending", value: "desc" },
];

const typeOptions = [
  { title: "All", value: "all" },
  { title: "Fixed-price", value: "fixed-price" },
  { title: "Hourly", value: "hourly" },
];

const statusOptions = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Ended", value: "ended" },
  { label: "Paused", value: "paused" },
];

const milestoneStatusOptions = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Awaiting funding", value: "awaiting_funding" },
  { label: "Payment requested", value: "payment_requested" },
];

const refundStatusOptions = [
  { label: "All", value: "all" },
  { label: "Requested", value: "requested" },
  { label: "Approved", value: "approved" },
  { label: "Not approved", value: "not_approved" },
];

export default function Contracts() {
  const [openFilters, setOpenFilters] = useState(false);
  const [filtersFormData, setFiltersFormData] = useState({
    keyword: "",
    sortBy: "start_date",
    sortOrder: "desc",
    type: "all",
    status: ["all"],
    milestoneStatus: ["all"],
    refundStatus: ["all"],
    startDate: null,
    endDate: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltersFormData({ ...filtersFormData, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (name: string, value: any) => {
    setFiltersFormData({ ...filtersFormData, [name]: value });
  };

  return (
    <WmLayout
      seo={{
        title: "All contracts - Worklanc",
        description: "View all contracts",
        url: "/nx/wm/client/contracts",
        keywords: "all contracts, contracts, worklanc",
      }}
    >
      <div
        className={`space-y-6 border-b pb-6 transition-colors duration-200 ${
          openFilters ? "border-black" : "border-slate-300"
        }`}
      >
        <h1 className="text-4xl font-medium">All contracts</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 w-1/3">
            <Input
              type="text"
              name="search"
              placeholder="Search by contract, freelancer or agency name"
              icon="mingcute:search-line"
              classname="w-full!"
              value={filtersFormData.keyword}
              onChange={handleInputChange}
            />

            <button
              className="text-blue-600 text-sm font-medium flex items-center gap-2 cursor-pointer hover:underline"
              onClick={() => setOpenFilters(!openFilters)}
            >
              <Icon
                icon="mi:filter"
                className={`size-5 ${
                  openFilters ? "text-blue-600" : "text-slate-700"
                }`}
              />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex items-center gap-4 w-1/2">
            <label className="text-sm whitespace-nowrap">Sort by</label>
            <Dropdown
              name="sortBy"
              options={sortByOptions}
              value={filtersFormData.sortBy}
              onSelect={(value) => handleDropdownChange("sortBy", value)}
            />
            <Dropdown
              name="sortOrder"
              options={sortOrderOptions}
              value={filtersFormData.sortOrder}
              onSelect={(value) => handleDropdownChange("sortOrder", value)}
            />
            <span className="text-sm text-slate-600 whitespace-nowrap">
              0 total
            </span>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {openFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-10 pb-6 border-t border-black">
                <div className="flex items-start gap-20">
                  <div className="space-y-2">
                    <p className="text-sm">Contract type</p>
                    <RadioGroup
                      options={typeOptions}
                      value={filtersFormData.type}
                      onChange={(value) => handleDropdownChange("type", value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Contract status</p>
                    <CheckBoxGroup
                      options={statusOptions}
                      value={filtersFormData.status}
                      onChange={(value) =>
                        handleDropdownChange("status", value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Milestone status</p>
                    <CheckBoxGroup
                      options={milestoneStatusOptions}
                      value={filtersFormData.milestoneStatus}
                      onChange={(value) =>
                        handleDropdownChange("milestoneStatus", value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm">Refund status</p>
                      <p className="mt-1 text-xs text-slate-600">
                        From project funds
                      </p>
                    </div>
                    <CheckBoxGroup
                      options={refundStatusOptions}
                      value={filtersFormData.refundStatus}
                      onChange={(value) =>
                        handleDropdownChange("refundStatus", value)
                      }
                    />
                  </div>
                  <div className="space-y-10 flex-1">
                    <DatePicker
                      name="startDate"
                      label="Contract start dates"
                      placeholder="All start dates"
                      labelClassName="mb-2"
                      value={filtersFormData.startDate}
                      onChange={(date) =>
                        setFiltersFormData({
                          ...filtersFormData,
                          startDate: date as any,
                        })
                      }
                    />

                    <DatePicker
                      name="endDate"
                      label="Contract end dates"
                      placeholder="All end dates"
                      labelClassName="mb-2"
                      value={filtersFormData.endDate}
                      onChange={(date) =>
                        setFiltersFormData({
                          ...filtersFormData,
                          endDate: date as any,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <Button
                    type="primary"
                    label="Apply filters"
                    classname="py-2! px-5! rounded-full! text-sm! font-medium!"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="py-20 flex flex-col items-center justify-center gap-6 bg-slate-50 rounded-3xl">
        <Image
          src={PencilPaperIcon}
          alt="No contracts found"
          className="w-[145px] h-[130px]"
        />
        <h4 className="text-xl font-medium">
          You don’t have any contracts yet.
        </h4>
        <div className="text-sm text-center">
          <p>
            Your pending and active contracts will be available here when you
            start hiring talent.
          </p>
          <p>
            <Link href="#" className="underline cursor-pointer">
              Post a job
            </Link>{" "}
            or{" "}
            <Link href="#" className="underline cursor-pointer">
              check out who’s applied
            </Link>{" "}
            to your existing job posts.
          </p>
        </div>
      </div>
    </WmLayout>
  );
}
