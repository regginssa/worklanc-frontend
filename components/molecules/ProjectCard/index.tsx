import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { TFreelancerBadge } from "@/types/components.types";
import { Badge, SAvatar } from "@/components/atoms";
import Link from "next/link";
import { TNavItem } from "@/components/layouts/NavLayout";
import Image from "next/image";
import { formatNumber } from "@/utils/math";

// Skeleton Loading Component
const ProjectCardSkeleton: React.FC = () => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative w-full h-56 bg-gray-200 animate-pulse" />

      {/* Content Skeleton */}
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="mb-3">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        </div>

        {/* Delivery Time and Price Skeleton */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-1" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
          </div>
          <div className="text-right">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
          </div>
        </div>

        {/* Seller Info Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full">
            {/* Avatar Skeleton */}
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse mr-2 flex-shrink-0" />

            {/* Name & Rating Skeleton */}
            <div className="w-full flex flex-col">
              <div className="w-full flex items-center justify-between mb-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mr-1" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-8 mr-1" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-10" />
                </div>
              </div>

              {/* Badge Skeleton */}
              <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ProjectCard Component
interface ProjectCardProps {
  images?: string[];
  title?: TNavItem;
  deliveryTime?: string;
  price?: string;
  seller?: {
    name: string;
    avatar: string;
    ranking: number;
    reviewCount: number;
    badge: TFreelancerBadge;
    isOnline?: boolean;
  };
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onClick?: () => void;
  isLoading?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  images,
  title,
  deliveryTime,
  price,
  seller,
  isFavorite = false,
  onFavoriteToggle,
  onClick,
  isLoading = false,
}) => {
  // Return skeleton if loading
  if (isLoading) {
    return <ProjectCardSkeleton />;
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [direction, setDirection] = useState(0); // Track slide direction

  const canGoLeft = currentImageIndex > 0;
  const canGoRight = images ? currentImageIndex < images.length - 1 : 0;

  const goLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoLeft) {
      setDirection(-1);
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const goRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (canGoRight) {
      setDirection(1);
      setCurrentImageIndex((prev) => prev + 1);
    }
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFavoriteToggle?.();
  };

  // Animation variants for image transitions
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  // Pulse animation variants
  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div
      className={`w-full bg-white border border-gray-300 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
        isHovered ? "shadow-xl" : "shadow-md"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image Container with Animated Slider */}
      <div
        className="relative w-full h-56 overflow-hidden"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentImageIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag={images && images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold && canGoRight) {
                setDirection(1);
                setCurrentImageIndex((prev) => prev + 1);
              } else if (swipe > swipeConfidenceThreshold && canGoLeft) {
                setDirection(-1);
                setCurrentImageIndex((prev) => prev - 1);
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={images ? images[currentImageIndex] : ""}
              alt={title?.label || ""}
              fill
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Heart/Favorite Button - Shows on card hover */}
        <motion.button
          onClick={handleFavoriteClick}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.2 }}
          className="absolute cursor-pointer top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-300 z-10 hover:scale-105 transition-all duration-150"
        >
          <motion.div
            animate={{
              scale: isFavorite ? [1, 1.2, 1] : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon
              icon="hugeicons:heart-add"
              className={`w-4 h-4 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-blue-600"
              }`}
            />
          </motion.div>
        </motion.button>

        {/* Image Navigation Buttons - Shows on image hover */}
        {images && images.length > 1 && (
          <>
            <motion.button
              onClick={goLeft}
              disabled={!canGoLeft}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isImageHovered && canGoLeft ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute left-2 top-1/2 border-2 border-gray-300 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center z-10 ${
                canGoLeft
                  ? "hover:bg-white cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <Icon
                icon="solar:arrow-left-linear"
                className={`w-4 h-4 ${
                  canGoLeft ? "text-blue-600" : "text-gray-400"
                }`}
              />
            </motion.button>

            <motion.button
              onClick={goRight}
              disabled={!canGoRight}
              initial={{ opacity: 0 }}
              animate={{
                opacity: isImageHovered && canGoRight ? 1 : 0,
              }}
              transition={{ duration: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute right-2 top-1/2 border-2 border-gray-300 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center z-10 ${
                canGoRight
                  ? "hover:bg-white cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <Icon
                icon="solar:arrow-right-linear"
                className={`w-4 h-4 ${
                  canGoRight ? "text-blue-600" : "text-gray-400"
                }`}
              />
            </motion.button>
          </>
        )}

        {/* Image Dots Indicator */}
        {images && images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: index === currentImageIndex ? 1.2 : 1,
                  opacity: index === currentImageIndex ? 1 : 0.5,
                }}
                transition={{ duration: 0.2 }}
                className={`w-1.5 h-1.5 rounded-full cursor-pointer ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDirection(index > currentImageIndex ? 1 : -1);
                  setCurrentImageIndex(index);
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <Link
          href={title?.path || ""}
          className="text-base underline font-medium mb-3 line-clamp-2 leading-tight hover:text-blue-600 transition-colors duration-200 block overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title?.label}
        </Link>

        {/* Delivery Time and Price */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center text-gray-600">
            <Icon icon="solar:clock-circle-linear" className="w-5 h-5 mr-1" />
            <span className="text-sm">{deliveryTime}</span>
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-600">From </span>
            <span className="text-sm font-semibold text-gray-900">{price}</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center w-full overflow-hidden">
            {/* Avatar with Status */}
            <SAvatar
              src={seller?.avatar || ""}
              alt={seller?.name || ""}
              size="md"
              isOnline={seller?.isOnline}
              className="mr-2 flex-shrink-0"
            />

            {/* Name & Rate & Reviews & Badge */}
            <div className="w-full flex flex-col items-start justify-between">
              {/* Name & Rate & Reviews */}
              <div className="w-full flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {seller?.name}
                </span>
                <div className="flex items-center">
                  <Icon
                    icon="mynaui:star-solid"
                    className="w-5 h-5 text-yellow-500 fill-current mr-1"
                  />
                  <span className="text-sm font-medium text-gray-900 mr-1">
                    {formatNumber(seller?.ranking || 0)}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({seller?.reviewCount})
                  </span>
                </div>
              </div>

              {/* Seller Badges */}
              {seller?.badge && (
                <div className="flex items-center mt-2">
                  <Badge type="FREELANCER" badge={seller.badge} size="sm" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
export { ProjectCardSkeleton };
