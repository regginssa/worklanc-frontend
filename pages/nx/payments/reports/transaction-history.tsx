import { Button, CheckboxGroupDropdown, DatePicker } from "@/components/atoms";
import { FreelancerLayout } from "@/components/layouts";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import FolderIcon from "@/public/assets/svgs/icons/other/folder_open.svg";
import Image from "next/image";

const typeOptions = [
  { label: "All types", value: "all" },
  { label: "Hourly", value: "hourly" },
  { label: "Fixed-price", value: "fixed-price" },
];

const clientOptions = [
  { label: "All clients", value: "all" },
  { label: "Client 1", value: "client_1" },
  { label: "Client 2", value: "client_2" },
];

const contractOptions = [
  { label: "All contracts", value: "all" },
  { label: "Contract 2", value: "contract_2" },
];

const quickFilters = [
  { label: "Earnings", value: "earnings" },
  { label: "Withdrawals", value: "withdrawals" },
  { label: "Last year", value: "last_year" },
  { label: "This year", value: "this_year" },
];

export default function TransactionsPage() {
  const [filters, setFilters] = useState({
    dateRange: null,
    types: ["all"],
    clients: ["all"],
    contracts: ["all"],
    quickFilter: "earnings",
  });

  return (
    <FreelancerLayout
      seo={{
        title: "Transactions - Worklanc",
        description: "Transactions - Worklanc",
        url: "/nx/reports/transactions",
      }}
    >
      <h1 className="text-4xl font-semibold">Transactions</h1>

      <ul className="grid grid-cols-3 gap-8">
        <li className="border border-slate-300 rounded-3xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-light">Pending earnings</span>
              <Icon icon="mdi:timer-sand-empty" className="size-6" />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium">$100.00</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Icon
                    icon="mdi:information-outline"
                    className="size-4 cursor-pointer text-slate-600"
                  />
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="text-sm p-2">
                    Pending payments become available for you after they've
                    successfully passed through the security period.
                    <br />
                    <Link href="#" className="text-sm underline cursor-pointer">
                      Learn more
                    </Link>
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          <p className="text-slate-600 text-xs font-light">
            No pending transactions
          </p>
        </li>

        <li className="border border-slate-300 rounded-3xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-light">Withdrawal schedule</span>
              <Icon icon="mdi:clock-arrow" className="size-6" />
            </div>

            <p className="text-xs text-slate-600 font-light">
              You will be able to set up a withdrawal schedule once you've added
              a withdrawal method.
            </p>
          </div>

          <Link
            href="/nx/payments/disbursement-methods"
            target="_blank"
            className="text-xs underline cursor-pointer hover:text-blue-600"
          >
            Add withdrawal method
          </Link>
        </li>

        <li className="border border-slate-300 rounded-3xl p-4 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-light">Available balance</span>
              <Icon icon="mdi:dollar" className="size-6" />
            </div>

            <p className="text-2xl font-medium">$0.00</p>
          </div>

          <div className="flex">
            <Button
              type="primary"
              label="Withdrawals"
              classname="px-5! py-2.5! rounded-full! text-sm! font-medium!"
            />
          </div>
        </li>
      </ul>

      <div className="w-full h-[1px] bg-slate-300"></div>

      <div className="space-y-4">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-6">
            <DatePicker
              name="dateRange"
              label="Date range"
              placeholder="All time"
              labelClassName="mb-2! block!"
              value={filters.dateRange}
              onChange={(date) =>
                setFilters({ ...filters, dateRange: date as any })
              }
            />
            <CheckboxGroupDropdown
              name="types"
              label="Type"
              labelClassName="mb-2! block!"
              className="w-48!"
              options={typeOptions}
              values={filters.types}
              onChange={(types) => setFilters({ ...filters, types })}
            />
            <CheckboxGroupDropdown
              name="clients"
              label="Client"
              labelClassName="mb-2! block!"
              className="w-48!"
              options={clientOptions}
              values={filters.clients}
              onChange={(clients) => setFilters({ ...filters, clients })}
            />
            <CheckboxGroupDropdown
              name="contracts"
              label="Contract"
              labelClassName="mb-2! block!"
              className="w-48!"
              options={contractOptions}
              values={filters.contracts}
              onChange={(contracts) => setFilters({ ...filters, contracts })}
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 cursor-pointer"
          >
            <span>Select download</span>
            <ChevronDown className="size-4" />
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600 font-light">
            Quick filters:
          </span>
          <ul className="flex items-center gap-2 cursor-pointer">
            {quickFilters.map((filter) => (
              <li key={filter.value}>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="py-1.5 px-3 rounded-full text-sm font-light bg-slate-200 flex items-center gap-2 cursor-pointer"
                >
                  {filter.label}
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-full bg-slate-50 px-8 py-4 flex items-center text-sm font-light">
        <div className="pr-20 border-r border-slate-300">Filtered totals</div>
        <div className="pl-20 text-slate-600">
          Select a filter to get a breakdown of your earnings, fees, and taxes.
        </div>
      </div>

      <div className="py-20 flex flex-col items-center justify-center gap-6 rounded-3xl bg-slate-50">
        <Image
          src={FolderIcon}
          alt="No transactions found"
          className="w-[145px] h-[130px] object-contain"
        />
        <h4 className="text-2xl font-medium">No transactions yet.</h4>
      </div>
    </FreelancerLayout>
  );
}
