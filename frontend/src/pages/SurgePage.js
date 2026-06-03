import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSurgeInfo } from "../utils/api";
import { TRANSPORT_META } from "../data/constants";
import clsx from "clsx";
import { LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts";

const WX = [
  {value:"clear",label:"Clear",icon:"☀️"},
  {value:"cloudy",label:"Cloudy",icon:"⛅"},
  {value:"rain",label:"Rain",icon:"🌧️"},
  {value:"heavy_rain",label:"Heavy",icon:"🌩️"},
  {value:"storm",label:"Storm",icon:"⛈️"},
];
const WM = {clear:1.0,cloudy:1.05,rain:1.35,heavy_rain:1.65,storm:2.0};
const BASE = {uber_moto:120,pathao:130,uber_x:200,cng:150,rickshaw:80,bus:15};

function buildChart(weather) {
  return Array.from({length:24},(_,h)=>{
    let t; if(8<=h&&h<=10)t=1.45; else if(17<=h&&h<=20)t=1.55; else if(12<=h&&h<=14)t=1.2; else if(h>=22||h<=5)t=0.85; else t=1.0;
    return {h, label:`${h}`, surge: Math.round(Math.min(t*(WM[weather]||1),2.5)*100)/100};
  });
}

export default function SurgePage() {
  const [weather, setWeather] = useState("clear");
  const [hour, setHour]       = useState(new Date().getHours());
  const [chart, setChart]     = useState(buildChart("clear"));

  useEffect(()=>setChart(buildChart(weather)),[weather]);

  const { data: surge } = useQuery({
    queryKey: ["surge", hour, weather],
    queryFn: () => getSurgeInfo(hour, weather, new Date().getDay()),
    staleTime: 30000,
  });

  const s     = surge?.surge_multiplier || 1.0;
  const isHigh = s >= 1.4;
  const isMed  = s >= 1.2;
  const color  = isHigh ? "#ef4444" : isMed ? "#eab308" : "#22c55e";
  const pct    = Math.min(((s-0.8)/(2.5-0.8))*100, 100);

  const formatH = h => h===0?"12am":h<12?`${h}am`:h===12?"12pm":`${h-12}pm`;

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5 fade-up">
        <h1 className="text-2xl font-black text-[#e8e8f4] mb-1" style={{fontFamily:"'Syne',sans-serif"}}>
          Surge <span className="text-orange-500">Pricing</span>
        </h1>
        <p className="text-sm text-[#666685]">How time & weather affect fares</p>
      </div>

      {/* Weather picker */}
      <div className="mb-4 fade-up delay-1">
        <div className="field-label mb-2">Current Weather</div>
        <div className="grid grid-cols-5 gap-1.5">
          {WX.map(w=>(
            <button key={w.value} onClick={()=>setWeather(w.value)}
              className={clsx("flex flex-col items-center gap-1 py-2.5 px-1 rounded-xl text-center transition-all border text-xs",
                weather===w.value
                  ? "border-orange-500/50 bg-orange-500/10 text-[#e8e8f4]"
                  : "border-[#2e2e3f] bg-[#1e1e2a] text-[#666685] hover:text-[#a0a0c0]")}>
              <span className="text-xl">{w.icon}</span>
              <span className="font-semibold" style={{fontSize:9}}>{w.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Time slider */}
      <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4 mb-4 fade-up delay-2">
        <div className="flex items-center justify-between mb-3">
          <div className="field-label mb-0">🕐 Time of Day</div>
          <div className="font-black text-orange-400 text-lg" style={{fontFamily:"'Syne',sans-serif"}}>
            {formatH(hour)}
          </div>
        </div>
        <input type="range" min="0" max="23" value={hour} onChange={e=>setHour(+e.target.value)} />
        <div className="flex justify-between text-[10px] text-[#3a3a50] mt-1.5">
          <span>12am</span><span>6am</span><span>12pm</span><span>6pm</span><span>11pm</span>
        </div>
        <div className="flex gap-2 mt-3">
          {[{h:9,l:"Morning Rush"},{h:13,l:"Lunch"},{h:18,l:"Evening Rush"},{h:23,l:"Night"}].map(t=>(
            <button key={t.h} onClick={()=>setHour(t.h)}
              className={clsx("flex-1 py-1.5 text-[10px] font-semibold rounded-lg border transition-all",
                hour===t.h ? "border-orange-500/40 bg-orange-500/10 text-orange-400" : "border-[#2e2e3f] bg-[#1e1e2a] text-[#666685]")}>
              {t.l}
            </button>
          ))}
        </div>
      </div>

      {/* Live surge display */}
      <div className={clsx("rounded-2xl border p-5 mb-4 text-center fade-up delay-2 transition-all duration-500",
        isHigh ? "border-red-500/30 bg-red-500/5" : isMed ? "border-yellow-500/30 bg-yellow-500/5" : "border-green-500/20 bg-green-500/5")}>
        <div className="font-black mb-1" style={{fontFamily:"'Syne',sans-serif",fontSize:60,color,lineHeight:1}}>
          {s.toFixed(2)}×
        </div>
        <div className="font-bold text-base mb-2" style={{color}}>{surge?.surge_label || "Normal"}</div>
        <div className="h-2 rounded-full mb-3 overflow-hidden" style={{background:"#1e1e2a"}}>
          <div className="h-full rounded-full transition-all duration-700" style={{width:`${pct}%`,background:color}}/>
        </div>
        <p className="text-sm text-[#a0a0c0]">{surge?.reason || "Normal conditions"}</p>
        {isHigh && (
          <div className="mt-3 text-xs text-red-400 font-semibold animate-pulse">
            ⚠️ High demand — consider bus or waiting 15–20 mins
          </div>
        )}
      </div>

      {/* Fare impact */}
      <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl mb-4 overflow-hidden fade-up delay-3">
        <div className="px-4 py-3 border-b border-[#2e2e3f]">
          <span className="text-sm font-bold text-[#e8e8f4]">💸 Fare Impact</span>
          <span className="text-xs text-[#666685] ml-1">vs. base prices</span>
        </div>
        {Object.entries(TRANSPORT_META).map(([type, meta], i)=>{
          const base = BASE[type]||100;
          const isNeg = ["cng","rickshaw","bus"].includes(type);
          const adj  = isNeg ? base : Math.ceil(base * (WM[weather]||1) / 5) * 5;
          const diff = adj - base;
          return (
            <div key={type} className="flex items-center px-4 py-3 border-b border-[#2e2e3f] last:border-0">
              <span className="text-xl w-8">{meta.emoji}</span>
              <div className="flex-1 min-w-0 ml-2">
                <div className="text-sm font-semibold text-[#e8e8f4]">{meta.label}</div>
                <div className="text-[10px] text-[#666685] mt-0.5">
                  {isNeg ? "No app surge" : `Base ৳${base}`}
                </div>
              </div>
              <div className="text-right">
                <div className="font-black text-base text-[#e8e8f4]" style={{fontFamily:"'Syne',sans-serif"}}>৳{adj}</div>
                {diff > 0 && <div className="text-[10px] text-red-400 font-semibold">+৳{diff}</div>}
                {isNeg && <div className="text-[10px] text-green-500">Fixed</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* 24h chart */}
      <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4 fade-up delay-4">
        <div className="text-sm font-bold text-[#e8e8f4] mb-1">24-Hour Surge Forecast</div>
        <div className="text-[11px] text-[#666685] mb-3">Tap bars to set time · Orange line = current</div>
        <ResponsiveContainer width="100%" height={130}>
          <LineChart data={chart} margin={{top:5,right:5,left:-30,bottom:0}}>
            <XAxis dataKey="label" tick={{fill:"#3a3a50",fontSize:9}} axisLine={false} tickLine={false} interval={5}/>
            <YAxis domain={[0.7,2.6]} tick={{fill:"#3a3a50",fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`${v}×`}/>
            <Tooltip contentStyle={{background:"#16161e",border:"1px solid #2e2e3f",borderRadius:10,fontSize:11}}
              formatter={v=>[`${v}×`,"Surge"]}/>
            <ReferenceLine y={1.0} stroke="#22c55e" strokeDasharray="3 3" strokeOpacity={.4}/>
            <ReferenceLine y={1.5} stroke="#ef4444" strokeDasharray="3 3" strokeOpacity={.3}/>
            <ReferenceLine x={String(hour)} stroke="#f97316" strokeWidth={2} strokeOpacity={.8}/>
            <Line type="monotone" dataKey="surge" stroke="#f97316" strokeWidth={2.5} dot={false}
              activeDot={{r:4,fill:"#f97316",stroke:"#0f0f14",strokeWidth:2}}/>
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 text-[10px] text-[#3a3a50]">
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-green-500 inline-block"/>Normal 1.0×</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-red-500 inline-block"/>High 1.5×</span>
          <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-orange-500 inline-block"/>Now</span>
        </div>
      </div>
    </div>
  );
}
