import Image from "next/image";
import ConsultationIcon from "@/public/assets/svgs/icons/other/consultation.svg";
import { IconLabel } from "@/components/common";
import SkillsGroup from "../SkillsGroup";
import { Button } from "@/components/atoms";

export default function FreelancerProfileBookConsultation() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">Book a consultation</h3>

      <div className="border border-slate-300 rounded-3xl p-6 flex items-center gap-6">
        <Image
          src={ConsultationIcon}
          alt="Consultation"
          className="w-[140px] h-[130px]"
        />

        <div className="flex items-start justify-between">
          <div className="space-y-6">
            <div className="flex items-start gap-6">
              <h4 className="text-xl font-medium">
                Development & IT Consultation
              </h4>

              <Button
                type="outline"
                label="Book a consultation"
                size="medium"
                classname="py-1! px-4! rounded-full! border! font-medium! text-sm!"
              />
            </div>

            <IconLabel
              icon="pepicons-pencil:camera"
              label="$100 per 30 min Zoom meeting"
            />

            <SkillsGroup skills={["Blockchain", "Web3"]} />
          </div>
        </div>
      </div>
    </div>
  );
}
