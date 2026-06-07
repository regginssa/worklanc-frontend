import { TabBar } from "@/components/atoms";
import { TTabItem } from "@/components/atoms/TabBar";
import Image from "next/image";
import BagOpenIcon from "@/public/assets/svgs/icons/other/bag_open.svg";
import ProfileSectionActions from "./ProfileSectionActions";

export interface FreelancerProfilePortfolioProps {
  tabs: TTabItem[];
  selectedTabIndex: number;
  onTab: (index: number) => void;
  onAdd?: () => void;
  emptyActionLabel?: string;
  onEmptyAction?: () => void;
  emptyDescription?: string;
  children?: React.ReactNode;
}

export default function FreelancerProfilePortfolio({
  tabs,
  selectedTabIndex,
  onTab,
  onAdd,
  emptyActionLabel = "Add a project.",
  onEmptyAction,
  emptyDescription = "Talent are hired 9x more often if they've published a portfolio.",
  children,
}: FreelancerProfilePortfolioProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-medium">Portfolio</h3>
        <ProfileSectionActions onAdd={onAdd} />
      </div>

      <TabBar
        tabs={tabs}
        selectedTabIndex={selectedTabIndex}
        onTab={onTab}
      />

      {children ?? (
        <div className="flex flex-col items-center justify-center space-y-6 py-10">
          <Image
            src={BagOpenIcon}
            alt="Bag"
            className="h-[130px] w-[145px] object-contain"
          />
          <p className="text-sm">
            {onEmptyAction ? (
              <button
                type="button"
                className="cursor-pointer text-blue-600 hover:underline"
                onClick={onEmptyAction}
              >
                {emptyActionLabel}
              </button>
            ) : (
              <span className="text-blue-600">{emptyActionLabel}</span>
            )}{" "}
            {emptyDescription}
          </p>
        </div>
      )}
    </div>
  );
}
