import { formatDate } from "date-fns";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export type ContactListItemType = {
  client: {
    firstName: string;
    lastName: string;
    companyName: string;
    avatar?: string;
    status: "online" | "offline";
  };
  talent: {
    firstName: string;
    lastName: string;
    profession: string;
    avatar?: string;
    status: "online" | "offline";
  };
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: Date;
  lastSenderType: "client" | "talent";
};

export default function ContactListItem({
  client,
  talent,
  jobTitle,
  lastMessage,
  lastMessageTime,
  lastSenderType,
}: ContactListItemType) {
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const me = "talent";
  const sender = me === "talent" ? client : talent;

  return (
    <li
      className="flex items-start gap-2 group hover:bg-slate-200 cursor-pointer p-3 rounded-lg transition-colors duration-200 relative focus-within:bg-slate-200"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="size-10 relative">
        {sender.avatar ? (
          <Image
            src={sender.avatar || ""}
            alt={sender.firstName + " " + sender.lastName}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="size-10 rounded-full bg-slate-300 text-slate-600 text-sm font-semibold flex flex-col items-center justify-center">
            <span>
              {sender.firstName.charAt(0)}
              {sender.lastName.charAt(0)}
            </span>
          </div>
        )}
        <span className="absolute size-3 rounded-full bg-green-600 top-0 -left-1 border border-white"></span>
      </div>

      <div className="space-y-1 w-full">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-sm font-semibold line-clamp-1 flex-1">
            {sender.firstName} {sender.lastName},{" "}
            {me === "talent" && client.companyName}
          </h3>
          <span className="text-slate-600 text-sm font-light">
            {formatDate(lastMessageTime, "dd/MM/yy")}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="space-y-1 flex-1">
            <p className="text-sm font-medium text-slate-600 group-hover:text-black group-focus-within:text-black transition-colors duration-200 line-clamp-1">
              {me === "talent" ? jobTitle : talent.profession}
            </p>
            <p className="text-sm font-light text-slate-600 group-hover:text-black group-focus-within:text-black transition-colors duration-200 line-clamp-1">
              {lastSenderType === me
                ? "You"
                : lastSenderType === "client"
                ? client.firstName
                : talent.firstName}
              : {lastMessage}
            </p>
          </div>
          {(hovered || menuOpen) && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="cursor-pointer p-1 hover:bg-white rounded-full transition-colors duration-200"
                onClick={(event) => event.stopPropagation()}
              >
                <Icon icon="mdi:star-outline" className="size-5" />
              </button>
              <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="cursor-pointer p-1 hover:bg-white rounded-full transition-colors duration-200"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Icon icon="mdi:dots-horizontal" className="size-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  side="bottom"
                  className="min-w-56"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DropdownMenuItem className="cursor-pointer p-2">
                    <Icon icon="mdi:forum-outline" className="size-4" />
                    Go to 1:1 conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-2">
                    <Icon icon="mdi:star-outline" className="size-4" />
                    Add to favorites
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer p-2">
                    <Icon icon="mdi:eye-off-outline" className="size-4" />
                    Hide conversation
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer p-2"
                  >
                    <Icon icon="mdi:chat-remove-outline" className="size-4" />
                    End conversation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
