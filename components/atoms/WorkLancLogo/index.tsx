import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/assets/logos/logo.png";

interface WorklancLogoProps {
  className?: string;
  href?: string;
  variant?: "light" | "dark";
}

const WorklancLogo: React.FC<WorklancLogoProps> = ({
  className = "",
  href = "/",
  variant = "light",
}) => {
  return (
    <Link
      href={href}
      className={`flex shrink-0 items-center gap-2 ${className}`}
    >
      <Image
        src={Logo}
        alt="Worklanc logo"
        width={60}
        height={60}
        className="object-contain"
        priority
      />
      <h1
        className={`text-2xl font-bold ${
          variant === "light" ? "text-black" : "text-white"
        }`}
      >
        Worklanc
      </h1>
    </Link>
  );
};

export default WorklancLogo;
