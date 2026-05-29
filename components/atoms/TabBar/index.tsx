import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

export type TTabItem = {
  label: string;
  value: string;
};

interface TabBarProps {
  tabs: TTabItem[];
  selectedTabIndex: number;
  className?: string;
  onTab: (idx: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({
  tabs,
  className,
  selectedTabIndex,
  onTab,
}) => {
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const [tabOffsets, setTabOffsets] = useState<number[]>([]);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const calculateTabPositions = () => {
    const widths: number[] = [];
    const offsets: number[] = [];
    let cumulativeOffset = 0;

    tabRefs.current.forEach((ref, index) => {
      if (ref) {
        const width = ref.offsetWidth;
        widths[index] = width;
        offsets[index] = cumulativeOffset;
        cumulativeOffset += width + 32; // 32px is gap-8 (8 * 4px)
      }
    });

    setTabWidths(widths);
    setTabOffsets(offsets);
  };

  useEffect(() => {
    // Small delay to ensure DOM is rendered
    const timer = setTimeout(() => {
      calculateTabPositions();
    }, 100);

    return () => clearTimeout(timer);
  }, [tabs]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      calculateTabPositions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full relative">
      <div className="flex flex-row items-center gap-8 border-b-[1px] border-b-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el: any) => (tabRefs.current[index] = el)}
            className={`text-xl px-4 py-2 relative cursor-pointer hover:text-black ${
              selectedTabIndex === index ? "text-black" : "text-gray-600"
            } ${className}`}
            onClick={() => onTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Animated border indicator */}
      {tabWidths.length > 0 && tabOffsets.length > 0 && (
        <motion.div
          className="absolute bottom-0 h-0.5 bg-black"
          initial={false}
          animate={{
            x: (tabOffsets[selectedTabIndex] || 0) + 8,
            width: (tabWidths[selectedTabIndex] || 0) - 16,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      )}
    </div>
  );
};

export default TabBar;
