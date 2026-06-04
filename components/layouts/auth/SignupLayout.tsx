import Link from "next/link";
import { motion } from "motion/react";
import { SEO } from "@/components/atoms";
import { Header } from "@/components/organisms";

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
      <Header variant="intro" />
      {!hiddenToggle && userType && toggleUserType && (
        <div className="w-[80%] mx-auto -mt-12 mb-2 flex items-center justify-end gap-4 text-sm">
          <span>
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

      {/* Main */}
      <main className="flex-1 flex flex-col items-center justify-center overflow-x-hidden overflow-y-auto pt-20">
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
