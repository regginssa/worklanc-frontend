import Image from "next/image";
import { SkillsGroup } from "../molecules";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type PorfolioCardItem = {
  title: string;
  img: string;
  skills?: string[];
  className?: string;
  titleClassName?: string;
  imageClassName?: string;
};

export default function PorfolioCard({
  title,
  img,
  skills,
  className,
  titleClassName,
  imageClassName,
}: PorfolioCardItem) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={cn("w-full space-y-2 cursor-pointer text-left", className)}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-md aspect-[4/3]",
          imageClassName
        )}
      >
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h3
        className={`text-sm font-light ${titleClassName} cursor-pointer hover:underline`}
      >
        {title}
      </h3>
      {skills && <SkillsGroup skills={skills} max={1} />}
    </motion.button>
  );
}
