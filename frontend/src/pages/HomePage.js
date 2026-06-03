import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Loader2, Navigation, RotateCcw, CloudRain, Clock, Info, ArrowUpDown } from "lucide-react";
import toast from "react-hot-toast";
import LocationInput from "../components/LocationInput";
import RideCard from "../components/RideCard";
import RecommendationBanner from "../components/RecommendationBanner";
import SurgeIndicator from "../components/SurgeIndicator";
import RideDetailModal from "../components/RideDetailModal";
import { CardSkeleton, BannerSkeleton } from "../components/LoadingSkeleton";
import { compareRides } from "../utils/api";
import { WEATHER_OPTIONS, POPULAR_ROUTES } from "../data/constants";

export default function HomePage() {
  const now = new Date();
  const [form, setForm] = useState({
    pickup: "", destination: "",
    weather: "clear",
    hour: now.getHours(),
    day_of_week: now.getDay(),
  });
  const [result, setResult]       = useState(null);
  const [selected, setSelected]   = useState(null);

  const mutation = useMutation({
    mutationFn: compareRides,
    onSuccess: (data) => { setResult(data); toast.success("Fares predicted!"); },
    onError:   ()     => toast.error("Backend offline? Run: cd backend && python app.py"),
  });

  const submit = () => {
    if (!form.pickup)      { toast.error("Enter pickup location");      return; }
    if (!form.destination) { toast.error("Enter destination");          return; }
    if (form.pickup === form.destination) { toast.error("Same pickup and destination"); return; }
    mutation.mutate(form);
  };

  const swap = () => setForm(f => ({ ...f, pickup: f.destination, destination: f.pickup }));
  const reset = () => {
    setResult(null);
    setSelected(null);
    setForm(f => ({ ...f, pickup: "", destination: "" }));
  };

  const surgeData = result?.comparisons?.[0];

  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  return (
    <div className="px-4 pt-14 pb-4">
      {/* Header */}
      <div className="mb-5 fade-up">
        <div className="flex items-center gap-2.5 mb-1">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center font-black text-white text-xs"
            style={{ fontFamily: "'Syne',sans-serif" }}>SR</div>
          <span className="font-black text-xl text-[#e8e8f4]" style={{ fontFamily: "'Syne',sans-serif" }}>
            SmartRide <span className="text-orange-500">BD</span>
          </span>
          <span className="chip chip-orange ml-auto text-[10px]">AI-Powered</span>
        </div>
        <p className="text-sm text-[#666685]">Real fare predictions for Dhaka transport</p>
      </div>

      {/* Form card */}
      <div className="bg-[#16161e] border border-[#2e2e3f] rounded-2xl p-4 mb-4 fade-up delay-1">
        {/* Pickup */}
        <div className="mb-3">
          <LocationInput label="📍 Pickup" value={form.pickup}
            onChange={v => setForm(f => ({ ...f, pickup: v }))} placeholder="Search pickup location…" />
        </div>

        {/* Swap */}
        <div className="flex justify-center my-1 mb-3">
          <button onClick={swap}
            className="flex items-center gap-1.5 text-xs text-[#666685] hover:text-orange-400 bg-[#1e1e2a] border border-[#2e2e3f] rounded-full px-3 py-1.5 transition-colors">
            <ArrowUpDown size={12} /> Swap
          </button>
        </div>

        {/* Destination */}
        <div className="mb-4">
          <LocationInput label="🏁 Destination" value={form.destination}
            onChange={v => setForm(f => ({ ...f, destination: v }))} placeholder="Search destination…" />
        </div>

        {/* Weather + Hour */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <div className="field-label flex items-center gap-1"><CloudRain size={10} />Weather</div>
            <select value={form.weather} onChange={e => setForm(f => ({ ...f, weather: e.target.value }))}
              className="input-field text-sm">
              {WEATHER_OPTIONS.map(w => <option key={w.value} value={w.value}>{w.label}</option>)}
            </select>
          </div>
          <div>
            <div className="field-label flex items-center justify-between">
              <span className="flex items-center gap-1"><Clock size={10} />Time</span>
              <span className="text-orange-400 font-bold text-xs normal-case tracking-normal">
                {form.hour === 0 ? "12am" : form.hour < 12 ? `${form.hour}am` : form.hour === 12 ? "12pm" : `${form.hour-12}pm`}
              </span>
            </div>
            <input type="range" min="0" max="23" value={form.hour}
              onChange={e => setForm(f => ({ ...f, hour: +e.target.value }))} />
          </div>
        </div>

        {/* Day */}
        <div className="mb-4">
          <div className="field-label">📅 Day</div>
          <select value={form.day_of_week} onChange={e => setForm(f => ({ ...f, day_of_week: +e.target.value }))}
            className="input-field text-sm">
            {DAYS.map((d, i) => <option key={d} value={i}>{d}</option>)}
          </select>
        </div>

        <div className="flex gap-2">
          <button className="btn-primary flex-1" onClick={submit} disabled={mutation.isPending}>
            {mutation.isPending
              ? <><Loader2 size={15} className="animate-spin" />Predicting…</>
              : <><Navigation size={15} />Find Best Ride</>}
          </button>
          {result && (
            <button onClick={reset}
              className="w-12 h-12 flex items-center justify-center bg-[#1e1e2a] border border-[#2e2e3f] rounded-xl text-[#666685] hover:text-white transition-colors flex-shrink-0">
              <RotateCcw size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Quick routes */}
      {!result && !mutation.isPending && (
        <div className="mb-5 fade-up delay-2">
          <div className="field-label mb-2">⚡ Popular Routes</div>
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none"
            style={{ scrollbarWidth: "none" }}>
            {POPULAR_ROUTES.map(r => (
              <button key={r.from + r.to}
                onClick={() => {
                  setForm(f => ({ ...f, pickup: r.from, destination: r.to }));
                  mutation.mutate({ ...form, pickup: r.from, destination: r.to });
                }}
                className="flex-shrink-0 bg-[#1e1e2a] border border-[#2e2e3f] hover:border-orange-500/30 hover:bg-orange-500/5 text-[#a0a0c0] hover:text-[#e8e8f4] text-xs px-3 py-2 rounded-full transition-all whitespace-nowrap">
                {r.from} → {r.to}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading */}
      {mutation.isPending && (
        <div className="space-y-3">
          <BannerSkeleton />
          {[1,2,3].map(i => <CardSkeleton key={i} />)}
        </div>
      )}

      {/* Results */}
      {result && !mutation.isPending && (
        <div className="space-y-3">
          {surgeData?.surge_multiplier > 1.0 && (
            <SurgeIndicator
              surge={{ surge_multiplier: surgeData.surge_multiplier, is_surge: true, surge_label: surgeData.surge_label }}
              reason={surgeData.surge_label} />
          )}
          <RecommendationBanner recommendation={result.recommendation} />
          <div className="space-y-2.5">
            {result.comparisons.map((ride, i) => (
              <div key={ride.transport_type} className={`fade-up delay-${Math.min(i+1,4)}`}>
                <RideCard ride={ride}
                  isRecommended={ride.transport_type === result.recommendation?.transport_type}
                  rank={i + 1}
                  onClick={() => setSelected(ride)} />
              </div>
            ))}
          </div>
          {/* Disclaimer */}
          <div className="flex gap-2 bg-[#1e1e2a] border border-[#2e2e3f] rounded-xl p-3 mt-2">
            <Info size={13} className="text-orange-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-[#666685] leading-relaxed">
              Fares from official Uber BD, Pathao & BRTA sources. Real fares may vary. Confirm in app or with driver before riding.
            </p>
          </div>
        </div>
      )}

      {/* Detail modal */}
      {selected && <RideDetailModal ride={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
