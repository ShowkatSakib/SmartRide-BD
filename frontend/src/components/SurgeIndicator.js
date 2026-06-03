import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import clsx from "clsx";

export default function SurgeIndicator({ surge, reason }) {
  if (!surge) return null;
  const s = surge.surge_multiplier;
  const isHigh = s >= 1.4, isMed = s >= 1.2;

  return (
    <div className={clsx("rounded-2xl border flex items-center gap-3 px-4 py-3",
      isHigh ? "bg-red-500/8 border-red-500/20"
      : isMed ? "bg-yellow-500/8 border-yellow-500/20"
      : "bg-green-500/8 border-green-500/20")}>
      <span className={clsx("text-xl", isHigh && "animate-pulse")}>
        {!isMed ? "✅" : isHigh ? "🔥" : "⚡"}
      </span>
      <div className="flex-1 min-w-0">
        <div className={clsx("font-bold text-sm", isHigh?"text-red-400": isMed?"text-yellow-400":"text-green-400")}>
          {surge.surge_label}
          <span className="ml-1.5 font-mono">{s}×</span>
        </div>
        {reason && <p className="text-[11px] text-[#666685] truncate mt-0.5">{reason}</p>}
      </div>
      {surge.is_surge
        ? <TrendingUp size={15} className={isHigh?"text-red-400":"text-yellow-400"} />
        : <TrendingDown size={15} className="text-green-400" />}
    </div>
  );
}
