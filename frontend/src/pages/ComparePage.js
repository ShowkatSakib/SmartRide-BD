import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, GitCompare } from "lucide-react";
import toast from "react-hot-toast";
import LocationInput from "../components/LocationInput";
import { compareRides } from "../utils/api";
import { WEATHER_OPTIONS, TRANSPORT_META } from "../data/constants";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#F59E0B","#EF4444","#10B981","#8B5CF6","#3B82F6","#6366F1"];

export default function ComparePage() {
  const now = new Date();
  const [form, setForm] = useState({ pickup:"", destination:"", weather:"clear", hour:now.getHours(), day_of_week:now.getDay() });
  const [result, setResult] = useState(null);

  const mutation = useMutation({
    mutationFn: compareRides,
    onSuccess: d => { setResult(d); toast.success("Comparison ready!"); },
    onError: () => toast.error("Backend offline?"),
  });

  const submit = () => {
    if (!form.pickup || !form.destination) { toast.error("Fill both locations"); return; }
    mutation.mutate(form);
  };

  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (
    <div className="px-4 pt-14 pb-4">
      <div className="mb-5 fade-up">
        <h1 className="text-2xl font-black text-[#e8e8f4] mb-1" style={{ fontFamily:"'Syne',sans-serif" }}>
          Compare <span className="text-orange-500">All Rides</span>
        </h1>
        <p className="text-sm text-[#666685]">Side-by-side comparison for your route</p>
      </div>

      {/* Form */}
      <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4 mb-4 fade-up delay-1">
        <div className="space-y-3 mb-4">
          <LocationInput label="📍 Pickup" value={form.pickup}
            onChange={v => setForm(f=>({...f,pickup:v}))} placeholder="Pickup…" />
          <LocationInput label="🏁 Destination" value={form.destination}
            onChange={v => setForm(f=>({...f,destination:v}))} placeholder="Destination…" />
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <div className="field-label">🌤️ Weather</div>
            <select value={form.weather} onChange={e=>setForm(f=>({...f,weather:e.target.value}))} className="input-field text-sm">
              {WEATHER_OPTIONS.map(w=><option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>
          <div>
            <div className="field-label flex justify-between">
              <span>🕐 Hour</span>
              <span className="text-orange-400 font-bold normal-case tracking-normal text-xs">
                {form.hour < 12 ? `${form.hour||12}am` : form.hour===12 ? "12pm" : `${form.hour-12}pm`}
              </span>
            </div>
            <input type="range" min="0" max="23" value={form.hour}
              onChange={e=>setForm(f=>({...f,hour:+e.target.value}))} />
          </div>
        </div>
        <div className="mb-4">
          <div className="field-label">📅 Day</div>
          <select value={form.day_of_week} onChange={e=>setForm(f=>({...f,day_of_week:+e.target.value}))} className="input-field text-sm">
            {DAYS.map((d,i)=><option key={d} value={i}>{d}</option>)}
          </select>
        </div>
        <button className="btn-primary" onClick={submit} disabled={mutation.isPending}>
          {mutation.isPending ? <><Loader2 size={15} className="animate-spin"/>Comparing…</> : <><GitCompare size={15}/>Compare All</>}
        </button>
      </div>

      {result && !mutation.isPending && (
        <div className="space-y-4 fade-up">
          {/* Rec pill */}
          {result.recommendation && (
            <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/25 rounded-2xl px-4 py-3">
              <span className="text-xl">{TRANSPORT_META[result.recommendation.transport_type]?.emoji}</span>
              <div>
                <div className="text-xs font-bold text-orange-400">Best Pick</div>
                <div className="text-sm text-[#e8e8f4] font-semibold">{result.recommendation.reason}</div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#2e2e3f]">
              <span className="text-sm font-bold text-[#e8e8f4]">Fare Breakdown</span>
              <span className="text-xs text-[#666685] ml-2">sorted cheapest first</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2e2e3f]">
                    {["Transport","Fare","Time","Surge"].map(h=>(
                      <th key={h} className="px-3 py-2.5 text-left text-[10px] font-bold text-[#3a3a50] uppercase tracking-wider first:pl-4 last:pr-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.comparisons.map((r,i)=>{
                    const isRec = r.transport_type === result.recommendation?.transport_type;
                    const meta  = TRANSPORT_META[r.transport_type] || {};
                    return (
                      <tr key={r.transport_type} className={`border-b border-[#2e2e3f] last:border-0 ${isRec?"bg-orange-500/5":""}`}>
                        <td className="px-3 py-3 pl-4">
                          <div className="flex items-center gap-2">
                            <span className="text-base">{meta.emoji}</span>
                            <div>
                              <div className="font-semibold text-[#e8e8f4] text-xs flex items-center gap-1">
                                {r.name}
                                {isRec && <span className="chip chip-orange" style={{fontSize:9,padding:"1px 5px"}}>Best</span>}
                              </div>
                              <div className="text-[10px] text-[#3a3a50]">৳{r.fare_min}–{r.fare_max}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-3">
                          <span className="font-black text-[#e8e8f4] text-sm" style={{fontFamily:"'Syne',sans-serif"}}>৳{r.fare}</span>
                        </td>
                        <td className="px-3 py-3 text-[#a0a0c0] text-xs">{r.travel_time_minutes}m</td>
                        <td className="px-3 py-3 pr-4 text-xs">
                          {r.surge_multiplier > 1.0
                            ? <span className={r.surge_multiplier>=1.4?"text-red-400":"text-yellow-400"}>{r.surge_multiplier}×</span>
                            : <span className="text-green-500">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bar chart */}
          <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4">
            <div className="text-sm font-bold text-[#e8e8f4] mb-3">Fare Comparison (৳)</div>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={result.comparisons} margin={{top:0,right:0,left:-20,bottom:0}}>
                <XAxis dataKey="name" tick={{fill:"#666685",fontSize:9}} axisLine={false} tickLine={false}
                  tickFormatter={n=>n.replace(" Bike","").replace("UberX ","").replace(" Auto","").replace(" Bus","")}/>
                <YAxis tick={{fill:"#666685",fontSize:9}} axisLine={false} tickLine={false} tickFormatter={v=>`৳${v}`}/>
                <Tooltip contentStyle={{background:"#16161e",border:"1px solid #2e2e3f",borderRadius:10,fontFamily:"DM Sans",fontSize:12}}
                  formatter={v=>[`৳${v}`,"Fare"]} cursor={{fill:"rgba(255,255,255,.03)"}}/>
                <Bar dataKey="fare" radius={[6,6,0,0]}>
                  {result.comparisons.map((_, i) => (
                    <Cell key={i} fill={COLORS[i%COLORS.length]} opacity={_.transport_type===result.recommendation?.transport_type?1:.6}/>
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Travel time */}
          <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4">
            <div className="text-sm font-bold text-[#e8e8f4] mb-3">Travel Time (min)</div>
            {result.comparisons.map((r,i)=>{
              const max = Math.max(...result.comparisons.map(x=>x.travel_time_minutes));
              const meta = TRANSPORT_META[r.transport_type]||{};
              return (
                <div key={r.transport_type} className="flex items-center gap-2 mb-2.5">
                  <span className="text-base w-6 text-center">{meta.emoji}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#a0a0c0]">{r.name}</span>
                      <span className="font-bold text-[#e8e8f4]">{r.travel_time_minutes}m</span>
                    </div>
                    <div className="h-1.5 bg-[#1e1e2a] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{width:`${(r.travel_time_minutes/max*100).toFixed(1)}%`,background:COLORS[i%COLORS.length]}}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
