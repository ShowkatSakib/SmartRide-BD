import React from "react";
import { Clock, Users, Wind, TrendingUp, Star, AlertCircle } from "lucide-react";
import { TRANSPORT_META } from "../data/constants";
import clsx from "clsx";

export default function RideCard({ ride, isRecommended, rank, onClick }) {
  const meta = TRANSPORT_META[ride.transport_type] || {};
  const isHighSurge = ride.surge_multiplier >= 1.4;

  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative rounded-2xl border transition-all duration-200 active:scale-[.99] cursor-pointer overflow-hidden",
        isRecommended
          ? "border-orange-500/40 bg-orange-500/5"
          : "border-[#2e2e3f] bg-[#16161e]"
      )}
      style={{ boxShadow: isRecommended ? "0 0 24px rgba(249,115,22,.12)" : undefined }}
    >
      {/* Left accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: meta.color }} />

      {/* Recommended badge */}
      {isRecommended && (
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-bl-xl flex items-center gap-1">
          <Star size={9} fill="white" /> Best
        </div>
      )}

      <div className="p-4 pl-5">
        {/* Top row */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: meta.color + "18" }}>
            {meta.emoji}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-bold text-[#e8e8f4] text-base leading-tight">{ride.name}</span>
              {ride.ac && <span className="chip chip-blue text-[10px]"><Wind size={9} />AC</span>}
              {ride.negotiated && <span className="chip chip-yellow text-[10px]">🤝 Negotiate</span>}
              {ride.fixed_fare && <span className="chip chip-gray text-[10px]">Fixed</span>}
            </div>
            <div className="flex items-center gap-2 mt-1 text-xs text-[#666685] flex-wrap">
              <span className="flex items-center gap-1"><Clock size={10} />{ride.travel_time_minutes} min</span>
              <span className="flex items-center gap-1"><Users size={10} />{ride.capacity}</span>
              <span>{ride.distance_km} km</span>
            </div>
          </div>

          {/* Fare */}
          <div className="text-right flex-shrink-0 ml-1">
            <div className="font-black text-xl text-[#e8e8f4]" style={{ fontFamily: "'Syne', sans-serif" }}>
              ৳{ride.fare}
            </div>
            <div className="text-[10px] text-[#3a3a50] mt-0.5">৳{ride.fare_min}–{ride.fare_max}</div>
            {ride.surge_multiplier > 1.0 && (
              <div className={clsx("flex items-center justify-end gap-0.5 text-[10px] font-bold mt-0.5",
                isHighSurge ? "text-red-400" : "text-yellow-400")}>
                <TrendingUp size={9} />{ride.surge_multiplier}x
              </div>
            )}
          </div>
        </div>

        {/* Traffic chip */}
        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          <span className={clsx("chip text-[10px]",
            ride.traffic_label?.includes("Heavy") ? "chip-red"
            : ride.traffic_label === "Moderate" ? "chip-yellow"
            : "chip-green")}>
            🚦 {ride.traffic_label}
          </span>
          {ride.surge_multiplier >= 1.4 && (
            <span className="chip chip-red text-[10px]">🔥 {ride.surge_label}</span>
          )}
        </div>

        {/* Warning for negotiated */}
        {ride.negotiated && (
          <div className="flex items-start gap-2 mt-2.5 bg-yellow-500/5 border border-yellow-500/15 rounded-xl px-3 py-2">
            <AlertCircle size={11} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#a0a0c0] leading-relaxed">
              Agree fare <strong className="text-[#e8e8f4]">before boarding</strong>. No app pricing — negotiate with driver.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
