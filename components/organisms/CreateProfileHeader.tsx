import { useEffect, useRef } from "react";
import { UserAvatar, WorklancLogo } from "../atoms";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useAppSelector } from "@/store/hooks";

export default function CreateProfileHeader({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { user } = useAppSelector((state) => state.user);

  const fullName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "";

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <header className="w-full max-w-[80%] mx-auto p-6 flex items-center justify-between bg-white">
      <WorklancLogo />
      <div className="relative" ref={menuRef}>
        <button
          className="cursor-pointer flex items-center"
          onClick={() => setOpen(!open)}
        >
          <UserAvatar avatarUrl={user?.avatarUrl} alt={fullName || "User"} size={32} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute bg-white top-full w-[240px] right-0 max-h-72 overflow-y-auto z-40 mt-1 shadow-md p-1 rounded-lg border border-slate-200 flex flex-col"
            >
              <div className="flex flex-col items-center justify-center pt-6 pb-4">
                <UserAvatar avatarUrl={user?.avatarUrl} alt={fullName || "User"} size={100} />
                <div className="mt-2 text-center">
                  <h3>{fullName || "Your profile"}</h3>
                  <p className="text-xs text-slate-600">Freelancer</p>
                </div>
              </div>

              <div>
                <button className="py-2 px-4 transition-all duration-200 hover:bg-slate-200 cursor-pointer w-full rounded-md flex items-center gap-4">
                  <Icon
                    icon="material-symbols-light:settings-outline"
                    width={24}
                  />
                  <span className="text-xs">Close account</span>
                </button>
                <button className="py-2 px-4 transition-all duration-200 hover:bg-slate-200 cursor-pointer w-full rounded-md flex items-center gap-4">
                  <Icon icon="material-symbols-light:logout" width={24} />
                  <span className="text-xs">Log out</span>
                </button>
              </div>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
