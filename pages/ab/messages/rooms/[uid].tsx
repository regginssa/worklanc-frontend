import { Eye, Search } from "lucide-react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import {
  ContactListItemGroup,
  MessageForm,
  MessageItemGroup,
  StaySafeDialog,
} from "@/components/molecules";
import { Header } from "@/components/organisms";
import { Button, IconButton, SEO } from "@/components/atoms";
import { MOCK_CONTACTS } from "@/static/data/contacts";
import { MOCK_MESSAGES } from "@/static/data/messages";
import { IconLabel } from "@/components/common";
import Image from "next/image";
import UserPic from "@/public/assets/webps/avatars/man2.webp";
import { formatDate } from "date-fns";
import Link from "next/link";

export default function RoomPage() {
  const [openSafe, setOpenSafe] = useState(true);
  const messagesScrollRef = useRef<HTMLDivElement>(null);
  const { uid } = useRouter().query as { uid: string };
  const contacts = MOCK_CONTACTS;
  const messages = MOCK_MESSAGES;

  useEffect(() => {
    const container = messagesScrollRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages]);

  return (
    <>
      <SEO
        title="Messages"
        description="Messages"
        url={`/ab/messages/rooms/${uid}`}
      />
      <div className="flex h-dvh flex-col overflow-hidden">
        <div className="shrink-0">
          <Header variant="talent" />
        </div>
        <div className="relative z-10 shrink-0 -mt-10 bg-zinc-900 p-2">
          <div className="max-w-[90%] mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon icon="lets-icons:lamp" className="size-5 text-blue-600" />
              <p className="text-sm text-white font-medium">
                Desktop alerts are not enabled on this browser.{" "}
                <span className="underline cursor-pointer hover:text-blue-600">
                  Click Here
                </span>{" "}
                to enable desktop alerts.
              </p>
            </div>
          </div>
        </div>

        <main className="flex min-h-0 flex-1 overflow-hidden gap-6 px-6 mt-2">
          <div className="flex h-full min-h-0 w-1/4 shrink-0 flex-col overflow-hidden rounded-lg bg-slate-50 px-4 py-6">
            <div className="shrink-0 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Messages</h1>
                <div className="flex items-center gap-4">
                  <button type="button" className="cursor-pointer">
                    <Search className="size-6" />
                  </button>
                  <button type="button" className="cursor-pointer">
                    <Icon icon="mdi:dots-horizontal" className="size-6" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 px-4">
                <button type="button" className="cursor-pointer">
                  <Icon icon="mdi:mixer-settings" className="size-5" />
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-slate-300 px-4 py-1.5 text-sm font-light transition-colors duration-200 hover:bg-slate-100"
                >
                  Unread
                </button>
                <button
                  type="button"
                  className="cursor-pointer rounded-full border border-slate-300 px-4 py-1.5 text-sm font-light transition-colors duration-200 hover:bg-slate-100"
                >
                  Favorites
                </button>
              </div>
            </div>

            {contacts.length > 0 ? (
              <div className="mt-4 min-h-0 flex-1 overflow-y-auto custom-scroll">
                <ContactListItemGroup items={contacts} />
              </div>
            ) : (
              <div className="mt-4 flex min-h-0 flex-1 flex-col items-center justify-center">
                <p className="text-sm text-slate-500">
                  Conversations will appear here
                </p>
              </div>
            )}
          </div>

          <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg px-4 pt-6">
            {messages.length > 0 ? (
              <>
                <div className="shrink-0 border-b border-slate-200 pb-4">
                  <div className="flex w-full items-center justify-between gap-6">
                    <div className="min-w-0 flex-1 space-y-4">
                      <div className="flex items-center gap-4">
                        <h3 className="line-clamp-1 text-2xl font-medium">
                          Maaz Ansari, Gold Lake Tech International
                        </h3>
                        <button type="button" className="cursor-pointer">
                          <Icon icon="mdi:dots-horizontal" className="size-6" />
                        </button>
                      </div>

                      <div className="flex items-center gap-8">
                        <IconLabel
                          icon="mdi:clock-outline"
                          label="12:00 PM local time"
                        />
                        <IconLabel
                          icon="streamline-plump:bag-suitcase-4"
                          label="Software Engineer (Full Stack | US Clients | Remote | Long-Term"
                          labelClassName="line-clamp-1"
                        />
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <IconButton
                        variant="text"
                        icon="pepicons-pencil:camera"
                        iconClassName="size-6!"
                        onClick={() => {}}
                      />
                      <IconButton
                        variant="text"
                        icon="material-symbols-light:calendar-clock-outline"
                        iconClassName="size-6!"
                        onClick={() => {}}
                      />
                      <IconButton
                        variant="text"
                        icon="hugeicons:sidebar-right-01"
                        iconClassName="size-6!"
                        onClick={() => {}}
                      />
                    </div>
                  </div>
                </div>

                <div
                  ref={messagesScrollRef}
                  className="min-h-0 flex-1 overflow-y-auto"
                >
                  <div className="flex min-h-full flex-col justify-end py-4 custom-scroll">
                    <MessageItemGroup items={messages} />
                  </div>
                </div>

                <div className="shrink-0 pt-4">
                  <MessageForm />
                </div>
              </>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-8 text-slate-500">
                <Icon
                  icon="material-symbols-light:chat-outline"
                  className="size-14"
                />
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-medium">Welcome to messages</h2>
                  <p className="text-sm font-light">
                    Once you connect with a client, you'll be able to chat and
                    collaborate here
                  </p>
                </div>

                <Button
                  type="primary"
                  label="Search for jobs"
                  classname="px-5! py-2.5! text-sm! font-medium! rounded-full!"
                />
              </div>
            )}
          </div>

          <div className="h-full min-h-0 w-1/4 shrink-0 overflow-hidden rounded-lg bg-slate-50 py-10 relative">
            <button className="absolute text-slate-600 top-4 right-4 cursor-pointer hover:text-blue-600">
              <Icon icon="mdi:close" className="size-6" />
            </button>

            <div className="flex flex-col items-center justify-center gap-4">
              <div className="relative size-[60px]">
                <Image
                  src={UserPic}
                  alt="User"
                  className="rounded-full object-cover size-[60px]"
                />
                <span className="absolute top-0 left-1 size-3 rounded-full bg-green-600 border border-white"></span>
              </div>

              <div className="space-y-1 text-center">
                <h3 className="text-xl font-medium">Marco N.</h3>
                <div className="flex items-center gap-2 text-slate-600">
                  <Icon icon="mdi:building" className="size-4" />
                  <p className="text-sm font-light">
                    Gold Lake Tech International
                  </p>
                </div>
              </div>

              <p className="text-sm font-light text-slate-600">
                {formatDate(new Date(), "HH:mm a")} local time
              </p>

              <Link
                href="#"
                target="_blank"
                className="flex items-center justify-center gap-2 text-blue-600 cursor-pointer hover:underline"
              >
                <Eye className="size-4" />
                <span className="text-sm font-light">View proposal</span>
              </Link>
            </div>
          </div>
        </main>
      </div>

      <StaySafeDialog open={openSafe} onClose={() => setOpenSafe(false)} />
    </>
  );
}
