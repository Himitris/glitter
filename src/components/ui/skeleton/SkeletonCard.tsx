import React from "react";

interface SkeletonCardProps {
  variant?: "artist" | "experience" | "service";
}

const SkeletonCard: React.FC<SkeletonCardProps> = ({ variant = "artist" }) => {
  if (variant === "experience") {
    return (
      <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
        {/* Image skeleton */}
        <div className="aspect-[4/3] bg-gradient-to-r from-gray-200 to-gray-300" />
        {/* Content skeleton */}
        <div className="p-4">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 rounded-full w-16" />
            <div className="h-6 bg-gray-200 rounded-full w-20" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === "service") {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm animate-pulse h-full">
        {/* Icon skeleton */}
        <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl mb-4" />
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded w-2/3 mb-4" />
        {/* Features skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  // Default: artist variant
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gradient-to-r from-gray-200 to-gray-300" />
      {/* Content skeleton */}
      <div className="p-4">
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-1" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
};

export default SkeletonCard;
