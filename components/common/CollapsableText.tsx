"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

export default function CollapsableText({
  text,
  maxLength = 200,
  className,
  textClassName,
}: {
  text: string;
  maxLength?: number;
  className?: string;
  textClassName?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [height, setHeight] = useState<number>();

  const isLong = text.length > maxLength;
  const displayText =
    expanded || !isLong
      ? text
      : `${text.slice(0, maxLength).trimEnd()}...`;

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    setHeight(contentRef.current.scrollHeight);
  }, [displayText]);

  return (
    <div className={cn(className)}>
      <motion.div
        initial={false}
        animate={{ height: height ?? "auto" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <motion.p
          ref={contentRef}
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={cn("text-sm text-slate-600", textClassName)}
        >
          {displayText}
        </motion.p>
      </motion.div>

      {isLong && (
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          className={cn(
            "mt-1 cursor-pointer text-sm text-black underline",
            textClassName
          )}
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "View less" : "View more"}
        </motion.button>
      )}
    </div>
  );
}
