import { Icon } from "@iconify/react";

interface RaterProps {
  rate: number;
  maxStars?: number;
}

const Rater: React.FC<RaterProps> = ({ rate, maxStars = 5 }) => {
  // Clamp rate between 0 and maxStars
  const clampedRate = Math.max(0, Math.min(rate, maxStars));

  // Format rate number
  const formatRate = (value: number): string => {
    if (value % 1 === 0) {
      return value.toFixed(1); // Show .0 for whole numbers
    }
    return value.toString(); // Keep original precision for decimals
  };

  // Generate star array
  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
      const isFilled = i <= clampedRate;
      const isPartial = i > clampedRate && i - 1 < clampedRate;

      if (isPartial) {
        // For partial stars, we'll use a filled star with reduced opacity
        // or you could implement a half-star icon
        const partialOpacity = clampedRate - Math.floor(clampedRate);
        stars.push(
          <div key={i} className="relative">
            <Icon icon="mynaui:star-solid" className="text-gray-300 w-6 h-6" />
            <Icon
              icon="mynaui:star-solid"
              className="text-yellow-500 w-6 h-6 absolute top-0 left-0"
              style={{
                clipPath: `inset(0 ${100 - partialOpacity * 100}% 0 0)`,
              }}
            />
          </div>
        );
      } else {
        stars.push(
          <Icon
            key={i}
            icon="mynaui:star-solid"
            className={`w-6 h-6 ${
              isFilled ? "text-yellow-500" : "text-gray-300"
            }`}
          />
        );
      }
    }

    return stars;
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-row items-center gap-0">{renderStars()}</div>
      <span className="text-lg text-[#001e00]">
        <strong>{formatRate(clampedRate)}</strong>
      </span>
    </div>
  );
};

export default Rater;
