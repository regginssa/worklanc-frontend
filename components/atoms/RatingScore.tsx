import { Icon } from "@iconify/react";

interface RatingScoreProps {
  starClassName?: string;
  className?: string;
  score: number;
  maxStars?: number;
}

export default function RatingScore({
  starClassName,
  className,
  score,
  maxStars = 5,
}: RatingScoreProps) {
  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <div className="flex items-center gap-1">
        {Array.from({ length: maxStars }).map((_, index) => (
          <Icon
            key={index}
            icon="si:star-fill"
            className={`size-3 text-yellow-600 ${starClassName}`}
          />
        ))}
      </div>
      <span className="">
        <strong>{score}</strong>
      </span>
    </div>
  );
}
