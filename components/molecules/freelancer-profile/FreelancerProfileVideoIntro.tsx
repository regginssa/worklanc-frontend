import ProfileSectionActions from "./ProfileSectionActions";
import { toYouTubeEmbedUrl } from "@/utils/youtube";

export interface FreelancerProfileVideoIntroProps {
  videoIntroUrl?: string | null;
  onAdd?: () => void;
  onEdit?: () => void;
}

export default function FreelancerProfileVideoIntro({
  videoIntroUrl,
  onAdd,
  onEdit,
}: FreelancerProfileVideoIntroProps) {
  const embedUrl = videoIntroUrl ? toYouTubeEmbedUrl(videoIntroUrl) : null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Video introduction</h3>
        <ProfileSectionActions
          onAdd={!videoIntroUrl ? onAdd : undefined}
          onEdit={videoIntroUrl ? onEdit : undefined}
        />
      </div>

      {embedUrl && (
        <div className="mt-4 aspect-video w-full overflow-hidden rounded-xl border border-slate-200">
          <iframe
            src={embedUrl}
            title="Video introduction"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
