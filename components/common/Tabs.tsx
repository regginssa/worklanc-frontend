"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

interface ITabItem {
  label: string;
  value: string;
}

const TAB_GAP_PX = 16;

export default function Tabs({
  tabs,
  selectedTabIndex,
  onTab,
}: {
  tabs: ITabItem[];
  selectedTabIndex: number;
  onTab: (index: number) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollActiveTabIntoView = useCallback((index: number) => {
    const container = scrollRef.current;
    const tab = tabRefs.current[index];
    if (!container || !tab) return;

    const padding = 8;
    const edgePeek = 72;
    const tabLeft = tab.offsetLeft;
    const tabRight = tabLeft + tab.offsetWidth;
    const scrollLeft = container.scrollLeft;
    const viewWidth = container.clientWidth;
    const viewRight = scrollLeft + viewWidth;
    const maxScroll = Math.max(0, container.scrollWidth - viewWidth);

    const prevTab = tabRefs.current[index - 1];
    const nextTab = tabRefs.current[index + 1];

    const scrollTo = (left: number) => {
      container.scrollTo({
        left: Math.min(Math.max(0, left), maxScroll),
        behavior: "smooth",
      });
    };

    if (tabRight > viewRight - padding) {
      const revealRight = nextTab
        ? nextTab.offsetLeft + Math.min(nextTab.offsetWidth, 56)
        : tabRight;
      scrollTo(revealRight - viewWidth + padding);
      return;
    }

    if (tabLeft < scrollLeft + padding) {
      const revealLeft = prevTab ? prevTab.offsetLeft : tabLeft;
      scrollTo(revealLeft - padding);
      return;
    }

    if (nextTab && tabRight > viewRight - edgePeek) {
      const peekRight =
        nextTab.offsetLeft + Math.min(nextTab.offsetWidth * 0.6, 48);
      if (peekRight > viewRight) {
        scrollTo(peekRight - viewWidth + padding);
        return;
      }
    }

    if (prevTab && tabLeft < scrollLeft + edgePeek) {
      const peekLeft = prevTab.offsetLeft;
      if (peekLeft < scrollLeft) {
        scrollTo(peekLeft - padding);
      }
    }
  }, []);

  useLayoutEffect(() => {
    scrollActiveTabIntoView(selectedTabIndex);
    const frame = requestAnimationFrame(() => {
      scrollActiveTabIntoView(selectedTabIndex);
    });
    return () => cancelAnimationFrame(frame);
  }, [selectedTabIndex, scrollActiveTabIntoView]);
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleResize = () => scrollActiveTabIntoView(selectedTabIndex);
    const observer = new ResizeObserver(handleResize);
    observer.observe(container);

    return () => observer.disconnect();
  }, [selectedTabIndex, scrollActiveTabIntoView]);

  return (
    <div className="w-full min-w-0">
      <div
        ref={scrollRef}
        className="w-full min-w-0 overflow-x-auto no-scrollbar rounded-full border-2 border-slate-200 p-1"
      >
        <div
          className="relative flex w-max items-center"
          style={{ gap: TAB_GAP_PX }}
        >
          {tabs.map((tab, index) => {
            const isSelected = selectedTabIndex === index;

            return (
              <button
                key={tab.value}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                onClick={() => onTab(index)}
                className={cn(
                  "relative shrink-0 cursor-pointer hover:bg-slate-100 rounded-full px-6 py-2 text-sm font-medium whitespace-nowrap transition-colors duration-200",
                  isSelected
                    ? "text-white"
                    : "text-zinc-800 hover:text-zinc-950"
                )}
              >
                {isSelected && (
                  <motion.span
                    layoutId="commonTabsIndicator"
                    className="absolute inset-0 rounded-full bg-zinc-800"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 35,
                    }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
