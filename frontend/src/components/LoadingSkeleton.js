import React from "react";
export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-[#2e2e3f] bg-[#16161e] p-4">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-xl shimmer flex-shrink-0" />
        <div className="flex-1">
          <div className="h-4 w-24 shimmer rounded mb-2" />
          <div className="h-3 w-36 shimmer rounded" />
        </div>
        <div className="text-right">
          <div className="h-6 w-14 shimmer rounded mb-1" />
          <div className="h-2.5 w-10 shimmer rounded" />
        </div>
      </div>
    </div>
  );
}
export function BannerSkeleton() {
  return (
    <div className="rounded-2xl border border-[#2e2e3f] bg-[#16161e] p-4">
      <div className="h-3 w-28 shimmer rounded mb-3" />
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl shimmer flex-shrink-0" />
        <div className="flex-1">
          <div className="h-5 w-32 shimmer rounded mb-2" />
          <div className="h-3 w-48 shimmer rounded" />
        </div>
        <div className="h-6 w-12 shimmer rounded" />
      </div>
    </div>
  );
}
