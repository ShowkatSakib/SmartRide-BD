import React, { useState } from "react";
import { TRANSPORT_CONFIG } from "../data/constants";
import { ChevronDown, ChevronUp, AlertCircle, CheckCircle } from "lucide-react";
import clsx from "clsx";

const TIPS = [
  { title:"Rain season (Jun–Oct)", body:"Bike rides (Uber Moto/Pathao) may become unavailable during heavy rain. CNG and car demand spikes. Book car early or take covered transport.", icon:"🌧️" },
  { title:"Rush hours (8–10am, 5–8pm)", body:"Bikes are fastest during rush — they weave through traffic. Cars can sit for 30+ mins. App bikes save significant time.", icon:"🚦" },
  { title:"CNG real street rate", body:"BRTA meter = ৳40/2km then ৳12/km. Drivers rarely follow the meter. Actual street fare is typically 1.5–2× meter. Always negotiate and agree the price before getting in.", icon:"🛺" },
  { title:"Rickshaw (short trips only)", body:"Best for distances under 2 km. No app — negotiate directly. Typical: ৳30–60 for nearby destinations. They don't follow any official rate.", icon:"🚲" },
  { title:"Bus (BRTC/local)", body:"Cheapest option by far. Only practical if you know the route. Expect crowding during rush hours. Not app-based.", icon:"🚌" },
  { title:"Night rides (10pm–5am)", body:"Less traffic, faster travel. Uber/Pathao tend to have lower surge. CNG and rickshaw may charge a premium late at night — negotiate firmly.", icon:"🌙" },
  { title:"Jummah Friday (12–2pm)", body:"Significant traffic around mosques across Dhaka. Bikes are still fastest but expect moderate surge on all app rides.", icon:"🕌" },
];

function TransportCard({ id, cfg }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl overflow-hidden mb-3">
      <button className="w-full flex items-center gap-3 px-4 py-3.5 text-left" onClick={()=>setOpen(o=>!o)}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
          style={{background:cfg.color+"18"}}>{cfg.emoji}</div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[#e8e8f4] text-sm">{cfg.name}</div>
          <div className="text-[10px] text-[#666685] mt-0.5 flex items-center gap-2">
            <span>৳{cfg.baseFare} base</span>
            <span>·</span>
            <span>৳{cfg.perKm}/km</span>
            <span>·</span>
            <span>min ৳{cfg.minFare}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {cfg.negotiated && <span className="chip chip-yellow" style={{fontSize:9}}>Negotiate</span>}
          {cfg.fixedFare  && <span className="chip chip-gray"   style={{fontSize:9}}>Fixed</span>}
          {cfg.surgeApplies && <span className="chip chip-orange" style={{fontSize:9}}>Surge</span>}
          {open ? <ChevronUp size={14} className="text-[#666685]"/> : <ChevronDown size={14} className="text-[#666685]"/>}
        </div>
      </button>

      {open && (
        <div className="border-t border-[#2e2e3f] px-4 py-3 space-y-3">
          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              {l:"Base Fare",v:`৳${cfg.baseFare}`},
              {l:"Per KM",  v:`৳${cfg.perKm}`},
              {l:"Per Min", v:cfg.perMin>0?`৳${cfg.perMin}`:"—"},
              {l:"Min Fare",v:`৳${cfg.minFare}`},
              {l:"Capacity",v:`${cfg.capacity} seat${cfg.capacity>1?"s":""}`},
              {l:"Avg Speed",v:`${cfg.avgSpeedKmh} km/h`},
            ].map(s=>(
              <div key={s.l} className="bg-[#1e1e2a] border border-[#2e2e3f] rounded-xl p-2.5 text-center">
                <div className="font-black text-sm text-[#e8e8f4]" style={{fontFamily:"'Syne',sans-serif"}}>{s.v}</div>
                <div className="text-[10px] text-[#666685] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="flex gap-2 flex-wrap">
            {cfg.ac && <span className="chip chip-blue">❄️ Air Conditioned</span>}
            {cfg.surgeApplies && <span className="chip chip-orange">📈 App surge pricing</span>}
            {cfg.negotiated && <span className="chip chip-yellow">🤝 Negotiate fare</span>}
            {cfg.fixedFare && <span className="chip chip-gray">🎫 Fixed route fare</span>}
          </div>

          {/* Note */}
          <div className="flex items-start gap-2 bg-[#1e1e2a] border border-[#2e2e3f] rounded-xl p-3">
            <AlertCircle size={12} className="text-orange-400 flex-shrink-0 mt-0.5"/>
            <p className="text-[11px] text-[#a0a0c0] leading-relaxed">{cfg.fareNote}</p>
          </div>
          <p className="text-[10px] text-[#3a3a50]">📌 {cfg.source}</p>
        </div>
      )}
    </div>
  );
}

export default function FareInfoPage() {
  const [showTips, setShowTips] = useState(false);
  const configs = Object.entries(TRANSPORT_CONFIG);

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5 fade-up">
        <h1 className="text-2xl font-black text-[#e8e8f4] mb-1" style={{fontFamily:"'Syne',sans-serif"}}>
          Fare <span className="text-orange-500">Reference</span>
        </h1>
        <p className="text-sm text-[#666685]">Official published rates for Dhaka transport</p>
      </div>

      {/* Data notice */}
      <div className="flex items-start gap-2.5 bg-orange-500/8 border border-orange-500/20 rounded-2xl p-3.5 mb-4 fade-up delay-1">
        <CheckCircle size={14} className="text-orange-500 flex-shrink-0 mt-0.5"/>
        <p className="text-xs text-[#a0a0c0] leading-relaxed">
          All fares sourced from <strong className="text-[#e8e8f4]">Uber Bangladesh official pricing</strong>, <strong className="text-[#e8e8f4]">Pathao official statement (Aug 2022)</strong>, and <strong className="text-[#e8e8f4]">BRTA government CNG meter directive (Feb 2025)</strong>. Fares in Bangladeshi Taka (৳ BDT).
        </p>
      </div>

      {/* Transport cards */}
      <div className="fade-up delay-2">
        {configs.map(([id, cfg]) => <TransportCard key={id} id={id} cfg={cfg} />)}
      </div>

      {/* Tips toggle */}
      <div className="mt-2 fade-up delay-3">
        <button onClick={()=>setShowTips(s=>!s)}
          className="w-full flex items-center justify-between px-4 py-3.5 bg-[#16161e] border border-[#2e2e3f] rounded-2xl text-sm font-bold text-[#e8e8f4]">
          <span>💡 Dhaka Commuter Tips ({TIPS.length})</span>
          {showTips ? <ChevronUp size={16} className="text-[#666685]"/> : <ChevronDown size={16} className="text-[#666685]"/>}
        </button>
        {showTips && (
          <div className="mt-2 space-y-2">
            {TIPS.map((t,i)=>(
              <div key={i} className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-lg">{t.icon}</span>
                  <span className="font-bold text-[#e8e8f4] text-sm">{t.title}</span>
                </div>
                <p className="text-xs text-[#a0a0c0] leading-relaxed pl-7">{t.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-center text-[10px] text-[#3a3a50] mt-6 px-4 leading-relaxed">
        Fares are estimates. Always confirm final fare in the app or with your driver before boarding.
      </p>
    </div>
  );
}
