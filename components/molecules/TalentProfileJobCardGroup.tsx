import { format } from "date-fns";
import { Pagination, RatingScore } from "../atoms";
import { IconLabel } from "../common";
import { formatNumberWithCommas } from "@/utils/math";
import { useState } from "react";
import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../ui/dialog";

export type TalentProfileJobCardGroupItem = {
  title: string;
  description: string;
  skills?: string[];
  startDate: Date;
  endDate?: Date;
  isCurrent?: boolean;
  status: "completed" | "in_progress";
  totalAmount: number;
  hourlyRate?: number;
  type: "hourly" | "fixed";
  duration?: number;
  review?: number;
};

export default function TalentProfileJobCardGroup({
  items,
}: {
  items: TalentProfileJobCardGroupItem[];
}) {
  const [item, setItem] = useState<TalentProfileJobCardGroupItem | null>(null);
  const [open, setOpen] = useState(false);

  const handleItemClick = (item: TalentProfileJobCardGroupItem) => {
    setItem(item);
    setOpen(true);
  };

  return (
    <div className="space-y-4">
      <ul className="">
        {items.map((item) => (
          <li
            key={item.title}
            className="space-y-4 cursor-pointer hover:bg-slate-100 transition-all duration-200 p-4 border-b border-slate-200"
            onClick={() => handleItemClick(item)}
          >
            <div className="flex items-center justify-between gap-6">
              <h3 className="text-xl font-medium line-clamp-1 flex-1">
                {item.title}
              </h3>
              {item.review && item.status === "completed" && (
                <RatingScore score={item.review} className="text-slate-600" />
              )}
            </div>

            {item.skills && item.status === "in_progress" && (
              <ul className="flex flex-wrap items-center gap-2">
                {item.skills.slice(0, 4).map((skill) => (
                  <li
                    key={skill}
                    className="text-sm bg-slate-100 text-slate-600 rounded-md px-2 py-1"
                  >
                    {skill}
                  </li>
                ))}
                {item.skills.length > 4 && (
                  <li className="text-sm bg-slate-100 text-slate-600 rounded-md px-2 py-1">
                    +{item.skills.length - 4}
                  </li>
                )}
              </ul>
            )}

            <div className="flex items-center gap-6">
              <IconLabel
                icon="streamline:bag-dollar"
                label={`$${item.totalAmount.toFixed(2)}`}
              />
              {item.type === "fixed" && (
                <IconLabel
                  icon="streamline-ultimate:tag-dollar"
                  label="Fixed"
                />
              )}
              {item.type === "hourly" && item.hourlyRate && (
                <IconLabel
                  icon="streamline-ultimate:tag-dollar"
                  label={`$${item.hourlyRate.toFixed(2)}/hr`}
                />
              )}
              {item.duration && (
                <IconLabel
                  icon="lets-icons:clock"
                  label={`${formatNumberWithCommas(item.duration)} hours`}
                />
              )}
              <IconLabel
                icon="mdi-light:calendar"
                label={`${format(item.startDate, "MMM d, yyyy")} - ${
                  item.endDate ? format(item.endDate, "MMM d, yyyy") : "Present"
                }`}
              />
            </div>

            <p className="text-sm">Job description: {item.description}</p>

            <button
              className="text-sm cursor-pointer underline"
              onClick={() => handleItemClick(item)}
            >
              View details
            </button>
          </li>
        ))}
      </ul>

      <div className="flex justify-end">
        <Pagination totalPages={10} currentPage={1} onPageChange={() => {}} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex min-w-3xl flex-col">
          <DialogHeader className="shrink-0 p-4">
            <DialogTitle className="text-3xl">{item?.title}</DialogTitle>
          </DialogHeader>

          <div className="px-4 pb-4 no-scrollbar max-h-[60vh] overflow-y-auto">
            <div className="flex items-start gap-6 border-b border-slate-300 pb-6">
              <div className="w-3/5">
                <p className="text-sm">{`${
                  item?.startDate
                    ? format(item?.startDate, "MMM d, yyyy")
                    : "N/A"
                } - ${
                  item?.endDate
                    ? format(item?.endDate, "MMM d, yyyy")
                    : "Present"
                }`}</p>

                <div className="space-y-6 mt-20">
                  <h4 className="text-xl font-medium">Client's review</h4>
                  {item?.status === "completed" && (
                    <RatingScore
                      score={item?.review || 0}
                      className="text-base! font-light!"
                      starClassName="size-5!"
                    />
                  )}
                  {item?.status === "in_progress" && (
                    <p className="text-sm text-slate-600">Job in progress</p>
                  )}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <p className="text-sm">
                  <strong className="font-medium">
                    ${item?.totalAmount.toFixed(2)}
                  </strong>{" "}
                  earned
                </p>
                {item?.type === "hourly" && item.hourlyRate && (
                  <p className="">
                    <strong className="font-medium">
                      ${item?.hourlyRate.toFixed(2)}
                    </strong>
                    /hr
                  </p>
                )}
                <p className="text-sm">
                  {item?.type === "fixed" ? (
                    "Fixed price"
                  ) : (
                    <>
                      <strong className="font-medium">
                        {formatNumberWithCommas(item?.duration || 0)}
                      </strong>{" "}
                      hours
                    </>
                  )}
                </p>
              </div>
            </div>

            {item?.status === "completed" && (
              <div className="py-6 border-b border-slate-300 space-y-6">
                <h4 className="text-xl font-medium">
                  Freelancer's review to the client
                </h4>
                <RatingScore
                  score={item?.review || 0}
                  className="text-base! font-light!"
                  starClassName="size-5!"
                />
              </div>
            )}

            <div className="py-6 space-y-6">
              <h4 className="text-xl font-medium">Job description</h4>
              <p className="text-sm">{item?.description}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
