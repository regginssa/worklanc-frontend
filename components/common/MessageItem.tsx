import { formatDate } from "date-fns";
import Image from "next/image";

export type MessageItemType = {
  status: "online" | "offline";
  firstName: string;
  lastName: string;
  avatar?: string;
  message: string;
  time: Date;
};

export default function MessageItem({
  status,
  firstName,
  lastName,
  avatar,
  message,
  time,
}: MessageItemType) {
  return (
    <li className="flex items-start gap-4 px-4 py-2 rounded-3xl hover:bg-slate-100 transition-colors duration-200">
      <div className="size-10 relative">
        {avatar ? (
          <Image
            src={avatar || ""}
            alt={firstName + " " + lastName}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="size-10 rounded-full bg-slate-300 text-slate-600 text-sm font-semibold flex flex-col items-center justify-center">
            <span>
              {firstName.charAt(0)}
              {lastName.charAt(0)}
            </span>
          </div>
        )}
        <span
          className={`absolute size-3 rounded-full top-0 -left-1 border border-white ${
            status === "online" ? "bg-green-600" : "bg-slate-400"
          }`}
        ></span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">
            {firstName} {lastName}
          </h3>
          <span className="text-slate-500">{formatDate(time, "HH:mm a")}</span>
        </div>

        <p className="text-slate-600 font-light">{message}</p>
      </div>
    </li>
  );
}
