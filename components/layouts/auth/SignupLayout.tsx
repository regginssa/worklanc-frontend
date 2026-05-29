import Link from "next/link";
import { motion } from "motion/react";
import { SEO, WorklancLogo } from "@/components/atoms";

type UserType = "client" | "talent";

interface SignupLayoutProps {
  children: React.ReactNode;
  isLogin?: boolean;
  userType?: UserType;
  toggleUserType?: () => void;
  hiddenToggle?: boolean;
}

const SignupLayout: React.FC<SignupLayoutProps> = ({
  children,
  isLogin,
  userType,
  toggleUserType,
  hiddenToggle,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Sign up to Worklanc"
        description="Sign up to Worklanc to find work you love or hire talent to help you grow your business."
        url="/nx/signup"
      />
      {/* Header */}
      <header className="h-20 w-full bg-white">
        <div className="w-[80%] h-full mx-auto flex items-center justify-between">
          <WorklancLogo />

          {!hiddenToggle && userType && toggleUserType && (
            <div className="flex items-center gap-4">
              <span className="">
                {userType === "client"
                  ? "Looking for work?"
                  : "Here to hire talent?"}
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 hover:underline transition-all duration-200 cursor-pointer"
                onClick={toggleUserType}
              >
                {userType === "client" ? "Apply as talent" : "Join as a Client"}
              </motion.button>
            </div>
          )}
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto">
        {children}
      </main>

      {/* Footer */}
      <footer className="h-20 w-full flex items-center justify-center">
        <div className="flex items-center gap-2 text-xs">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Link href="/nx/login" className="text-blue-600 underline">
            {isLogin ? "Sign Up" : "Log in"}
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default SignupLayout;
