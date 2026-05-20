import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { TSEO } from "@/types/components.types";
import { SEO } from "@/components/atoms";
import { Progress } from "@/components/ui/progress";

interface CreateProfileLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  step: number;
  title: string;
  description: string;
}

export const CreateProfileLayout: React.FC<CreateProfileLayoutProps> = ({
  children,
  seo,
  step,
  title,
  description,
}) => {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex flex-col">
      {seo && <SEO {...seo} />}
      {/* Header */}
      <header className="w-full max-w-[80%] mx-auto p-6 flex items-center justify-between bg-white">
        <h1 className="text-2xl font-bold">WorkLanc</h1>
        <div ref={ref} className="relative">
          <button className="cursor-pointer" onClick={() => setOpen(true)}>
            <Icon
              icon="material-symbols-light:account-circle-outline"
              width={32}
            />

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
                    <Icon
                      icon="material-symbols-light:account-circle-outline"
                      width={100}
                    />
                    <div className="mt-2">
                      <h3 className="">Jhon Smthi</h3>
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
                      <span className="text-xs">Close account</span>
                    </button>
                  </div>
                </motion.ul>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Main */}
      <AnimatePresence mode="wait">
        <main className="flex-1 w-full max-w-7xl mx-auto mt-6">
          <div className="space-y-6 mb-6">
            <p className="text-sm text-slate-600">{step}/3</p>

            <Progress value={step * (100 / 3)} className="w-full" />

            <h1 className="text-3xl">{title}</h1>

            <p className="text-sm text-slate-900">{description}</p>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
          >
            {children}
          </motion.div>
        </main>
      </AnimatePresence>
    </div>
  );
};
