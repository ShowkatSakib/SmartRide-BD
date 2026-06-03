import React from "react";
import { Lightbulb, Clock, DollarSign } from "lucide-react";
import { TRANSPORT_META } from "../data/constants";

export default function RecommendationBanner({ recommendation }) {
  if (!recommendation) return null;
  const meta = TRANSPORT_META[recommendation.transport_type] || {};

  return (
    <div className="rounded-2xl border border-orange-500/30 bg-orange-500/5 p-4 fade-up"
      style={{ boxShadow: "0 0 24px rgba(249,115,22,.1)" }}>
      <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
        <Lightbulb size={11} /> AI Recommendation
      </div>
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{ background: meta.color + "18" }}>
          {meta.emoji}
        </div>
        <div>
          <div className="font-bold text-[#e8e8f4] text-lg leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            {recommendation.name}
          </div>
          <div className="text-xs text-[#a0a0c0] mt-0.5 leading-snug">{recommendation.reason}</div>
        </div>
        <div className="ml-auto text-right flex-shrink-0">
          <div className="font-black text-xl text-orange-400" style={{ fontFamily: "'Syne', sans-serif" }}>
            ৳{recommendation.fare}
          </div>
          <div className="text-[10px] text-[#666685]">{recommendation.travel_time_minutes} min</div>
        </div>
      </div>
      <div className="flex gap-3 pt-2 border-t border-[#2e2e3f]">
        <div className="flex items-center gap-1.5 text-[11px] text-[#666685]">
          <DollarSign size={11} className="text-green-400" />
          Cheapest: <strong className="text-[#e8e8f4]">{recommendation.cheapest?.name}</strong> ৳{recommendation.cheapest?.fare}
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-[#666685]">
          <Clock size={11} className="text-blue-400" />
          Fastest: <strong className="text-[#e8e8f4]">{recommendation.fastest?.name}</strong> {recommendation.fastest?.time}m
        </div>
      </div>
    </div>
  );
}
