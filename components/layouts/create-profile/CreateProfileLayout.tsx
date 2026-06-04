import { AnimatePresence, motion } from "motion/react";
import { TSEO } from "@/types/components.types";
import { SEO } from "@/components/atoms";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/organisms";
import { useOnboardingGuard } from "@/hooks/useAuth";

interface CreateProfileLayoutProps {
  children: React.ReactNode;
  seo: TSEO;
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  description: string;
}

export const CreateProfileLayout: React.FC<CreateProfileLayoutProps> = ({
  children,
  seo,
  currentStep,
  totalSteps,
  title,
  subtitle,
  description,
}) => {
  // Require auth + a talent account; bounce completed users to the dashboard.
  useOnboardingGuard();

  return (
    <div className="min-h-screen flex flex-col">
      {seo && <SEO {...seo} />}
      <Header />

      {/* Main */}
      <AnimatePresence mode="wait">
        <main className="flex-1 w-full max-w-7xl mx-auto mt-6 px-6 mb-10">
          <div className="space-y-6 mb-6">
            <div className="flex items-center gap-1 text-slate-600">
              {subtitle && <h2 className="text-lg font-medium">{subtitle}</h2>}
              <span className="text-sm">
                {currentStep}/{totalSteps}
              </span>
            </div>

            <Progress
              value={currentStep * (100 / totalSteps)}
              className="w-full"
            />

            <h1 className="text-3xl">{title}</h1>
            <p className="text-sm text-slate-900">{description}</p>
          </div>

          <motion.div
            key={currentStep}
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
