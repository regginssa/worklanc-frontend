import { Button, TabBar } from "@/components/atoms";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import BagIcon from "@/public/assets/svgs/icons/other/bag.svg";
import CertificateIcon from "@/public/assets/svgs/icons/other/certificate.svg";
import Image from "next/image";
import SkillsGroup from "../SkillsGroup";
import { HightlightListItemType } from "@/components/common";
import HighlightListItemGroup from "../HighlightListItemGroup";

const tabs = [
  { label: "Worklanc jobs", value: "worklanc_jobs" },
  { label: "Portfolio", value: "portfolio" },
  { label: "Certificates", value: "certificates" },
];

const mockPortfolios = [
  {
    id: 1,
    title: "VoiceXML Script Writing",
    description:
      "Created a VoiceXML script for a client to help them with their voice project.",
    skills: ["VoiceXML"],
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    title: "Voice Actor for a Video Game",
    description:
      "Recorded voice lines for a video game to help them with their voice project.",
    skills: ["Voice Acting"],
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    title: "AI Voice Actor for a Video Game",
    description:
      "Used AI to create voice lines for a video game to help them with their voice project.",
    skills: ["AI Voice"],
    image:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function AddProfileHighlightsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(1);
  const [highlights, setHighlights] = useState<HightlightListItemType[]>([]);

  useEffect(() => {
    if (open) {
      setHighlights([]);
      setSelectedTabIndex(1);
    }
  }, [open]);

  const handleSelect = (id: number) => {
    const portfolio = mockPortfolios.find((item) => item.id === id);
    if (!portfolio || highlights.length >= 4) return;

    setHighlights((previousHighlights) => [
      ...previousHighlights.filter((highlight) => highlight.id !== id),
      {
        id: portfolio.id,
        title: portfolio.title,
        skills: portfolio.skills,
        image: portfolio.image,
      },
    ]);
  };

  const handleDelete = (id: number) => {
    setHighlights((previousHighlights) =>
      previousHighlights.filter((highlight) => highlight.id !== id)
    );
  };

  const handleReorder = (reorderedHighlights: HightlightListItemType[]) => {
    setHighlights(reorderedHighlights);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex min-w-6xl flex-col">
        <DialogHeader className="shrink-0 p-4">
          <DialogTitle className="text-3xl">Add profile highlights</DialogTitle>
          <DialogDescription>
            Please select up to four highlights and order them as they should
            appear in your proposal.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4">
          <TabBar
            tabs={tabs}
            className="font-medium!"
            selectedTabIndex={selectedTabIndex}
            onTab={setSelectedTabIndex}
          />

          <div className="h-[50vh] flex border-b border-slate-300">
            <div className="w-2/3 shrink-0 border-r border-slate-300 overflow-y-auto no-scrollbar py-6">
              {selectedTabIndex === 0 && (
                <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                  <Image
                    src={BagIcon}
                    alt="Bag"
                    className="w-[145px] h-[130px]"
                  />
                  <h4 className="text-xl font-medium">
                    You don't have any previous jobs
                  </h4>
                  <p className="text-sm text-slate-600">
                    Complete some jobs to highlight them in your proposals.
                  </p>
                </div>
              )}

              {selectedTabIndex === 1 && (
                <div>
                  <h2 className="text-2xl font-medium">
                    Portfolio ({mockPortfolios.length})
                  </h2>

                  <ul className="">
                    {mockPortfolios.map((portfolio) => (
                      <li className="py-4 border-b border-slate-300 flex items-start gap-6">
                        <div className="relative overflow-hidden rounded-md w-[123px] h-[94px]">
                          <Image
                            src={portfolio.image}
                            alt={portfolio.title}
                            width={123}
                            height={94}
                            className="object-contain"
                          />
                        </div>
                        <div className="space-y-3">
                          <h3 className="text-lg font-medium">
                            {portfolio.title}
                          </h3>
                          <p className="text-sm text-slate-800 line-clamp-1">
                            {portfolio.description}
                          </p>
                          <div className="flex items-center gap-2 text-slate-800">
                            <span className="text-sm">Skills</span>
                            <SkillsGroup skills={portfolio.skills} />
                          </div>
                          <Button
                            type="outline"
                            label={
                              highlights.some((h) => h.id === portfolio.id)
                                ? "Selected"
                                : "Select highlight"
                            }
                            size="medium"
                            classname="py-2.5! px-8! rounded-full! text-sm! font-medium! border!"
                            icon={
                              highlights.some((h) => h.id === portfolio.id)
                                ? "mdi:check"
                                : ""
                            }
                            disabled={highlights.some(
                              (h) => h.id === portfolio.id
                            )}
                            onClick={() => handleSelect(portfolio.id)}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTabIndex === 2 && (
                <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
                  <Image
                    src={CertificateIcon}
                    alt="Certificate"
                    className="w-[145px] h-[130px]"
                  />
                  <h4 className="text-xl font-medium">
                    You don't have any certificates.
                  </h4>
                  <p className="text-sm text-slate-600">
                    Add a certificate to highlight relevant skills you have
                    learned in your proposals.
                  </p>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
              <h3 className="text-2xl font-medium">
                Highlights ({highlights.length}/4)
              </h3>

              {highlights.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="text-sm text-slate-600">
                    No highlights selected
                  </p>
                </div>
              )}

              {highlights.length > 0 && (
                <HighlightListItemGroup
                  items={highlights}
                  onDelete={handleDelete}
                  onReorder={handleReorder}
                />
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <button className="py-2.5 px-5 cursor-pointer text-sm font-medium hover:underline">
              Cancel
            </button>
          </DialogClose>
          <Button
            type="primary"
            label="Add to highlights"
            classname="py-2.5! px-5! rounded-full! text-sm! font-medium!"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
