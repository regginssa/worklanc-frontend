import { useState } from "react";
import { IconButton } from "../atoms";

export default function MessageForm() {
  const [message, setMessage] = useState("");

  return (
    <form className="w-full rounded-t-xl border border-slate-300 bg-white p-6">
      <textarea
        name="message"
        placeholder="Send a message..."
        className="flex-1 resize-none outline-none border-none bg-transparent text-sm font-light w-full no-scrollbar"
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconButton
            variant="text"
            icon="flowbite:text-underline-outline"
            className="p-1!"
            onClick={() => {}}
          />
          <IconButton
            variant="text"
            icon="material-symbols-light:attach-file"
            className="p-1!"
            onClick={() => {}}
          />
          <IconButton
            variant="text"
            icon="hugeicons:loom"
            className="p-1!"
            onClick={() => {}}
          />
          <IconButton
            variant="text"
            icon="mdi:emoji-outline"
            className="p-1!"
            onClick={() => {}}
          />
        </div>

        <div className="flex items-center gap-4">
          <IconButton
            variant="text"
            icon="material-symbols-light:settings-outline"
            className="p-1!"
            onClick={() => {}}
          />
          <IconButton
            variant="text"
            icon="material-symbols-light:send-outline-rounded"
            className="p-1!"
            onClick={() => {}}
          />
        </div>
      </div>
    </form>
  );
}
