import React from "react";
import { X, Navigation } from "lucide-react";
import { TRANSPORT_META } from "../data/constants";

export default function RideDetailModal({ ride, onClose }) {
  if (!ride) return null;
  const meta = TRANSPORT_META[ride.transport_type] || {};

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-[#16161e] border border-[#2e2e3f] rounded-t-3xl w-full max-w-lg p-5 pb-[calc(20px+env(safe-area-inset-bottom))]">
        {/* Handle */}
        <div className="w-10 h-1 bg-[#2e2e3f] rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{ background: meta.color + "18" }}>{meta.emoji}</div>
          <div className="flex-1">
            <div className="font-bold text-[#e8e8f4] text-lg">{ride.name}</div>
            <div className="text-xs text-[#666685]">{ride.pickup} → {ride.destination}</div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1e1e2a] flex items-center justify-center text-[#666685] hover:text-white">
            <X size={16} />
          </button>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Est. Fare", value: `৳${ride.fare}`, sub: `৳${ride.fare_min}–${ride.fare_max}`, color: "#f97316" },
            { label: "Travel Time", value: `${ride.travel_time_minutes}m`, sub: `${ride.distance_km} km` },
            { label: "Surge", value: `${ride.surge_multiplier}×`, sub: ride.surge_label },
          ].map((s) => (
            <div key={s.label} className="bg-[#1e1e2a] border border-[#2e2e3f] rounded-xl p-3 text-center">
              <div className="font-black text-lg" style={{ fontFamily: "'Syne',sans-serif", color: s.color || "#e8e8f4" }}>
                {s.value}
              </div>
              <div className="text-[10px] text-[#666685] mt-0.5">{s.label}</div>
              <div className="text-[10px] text-[#3a3a50] mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Fare note */}
        <div className="bg-[#1e1e2a] border border-[#2e2e3f] rounded-xl p-3 mb-4">
          <p className="text-xs text-[#a0a0c0] leading-relaxed">{ride.fare_note}</p>
          <p className="text-[10px] text-[#3a3a50] mt-1.5">Source: {ride.source}</p>
        </div>

        <button className="btn-ghost" onClick={onClose}>
          <Navigation size={15} /> Close
        </button>
      </div>
    </div>
  );
}
