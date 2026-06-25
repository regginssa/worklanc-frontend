import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { StaySafeDialog } from "@/components/molecules";
import { Header } from "@/components/organisms";
import { Button, SEO } from "@/components/atoms";

export default function RoomPage() {
  const [openSafe, setOpenSafe] = useState(true);
  const { uid } = useRouter().query as { uid: string };

  return (
    <>
      <SEO
        title="Messages"
        description="Messages"
        url={`/ab/messages/rooms/${uid}`}
      />
      <div className="flex min-h-screen flex-col">
        <Header variant="talent" />
        <div className="shrink-0 bg-zinc-900 -mt-10 p-2">
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

        <main className="flex min-h-0 flex-1 gap-10 px-6 py-2">
          <div className="flex min-h-0 w-1/4 shrink-0 flex-col rounded-lg bg-slate-50 px-4 py-6">
            <div className="space-y-4">
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

            <div className="flex flex-1 flex-col items-center justify-center">
              <p className="text-sm text-slate-500">
                Conversations will appear here
              </p>
            </div>
          </div>

          <div className="min-h-0 min-w-0 flex-1 rounded-lg">
            <div className="flex flex-col h-full items-center justify-center gap-8 text-slate-500">
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
          </div>

          <div className="min-h-0 w-1/4 shrink-0 rounded-lg bg-slate-50"></div>
        </main>
      </div>

      <StaySafeDialog open={openSafe} onClose={() => setOpenSafe(false)} />
    </>
  );
}
