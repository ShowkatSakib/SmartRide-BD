import React, { useState, useRef, useEffect } from "react";
import { MapPin, X } from "lucide-react";
import { DHAKA_LOCATIONS } from "../data/constants";
import clsx from "clsx";

export default function LocationInput({ label, value, onChange, placeholder, icon }) {
  const [query, setQuery]             = useState(value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen]               = useState(false);
  const ref = useRef(null);

  // ── KEY FIX: sync internal query whenever parent changes `value` ──────────
  useEffect(() => {
    setQuery(value || "");
    if (!value) {
      setSuggestions([]);
      setOpen(false);
    }
  }, [value]);
  // ─────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    document.addEventListener("touchstart", fn);
    return () => {
      document.removeEventListener("mousedown", fn);
      document.removeEventListener("touchstart", fn);
    };
  }, []);

  const filter = (q) =>
    DHAKA_LOCATIONS.filter(l => l.toLowerCase().includes(q.toLowerCase())).slice(0, 8);

  const handleChange = (e) => {
    const q = e.target.value;
    setQuery(q);
    onChange("");
    const f = filter(q);
    setSuggestions(f);
    setOpen(q.length > 0 && f.length > 0);
  };

  const handleFocus = () => {
    const f = query ? filter(query) : DHAKA_LOCATIONS.slice(0, 8);
    setSuggestions(f);
    setOpen(true);
  };

  const handleSelect = (loc) => {
    setQuery(loc);
    onChange(loc);
    setOpen(false);
  };

  const handleClear = () => {
    setQuery("");
    onChange("");
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      {label && <div className="field-label">{label}</div>}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-500 pointer-events-none">
          {icon || <MapPin size={15} />}
        </div>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={placeholder || "Search location…"}
          autoComplete="off"
          className="input-field pl-9 pr-9"
        />
        {query && (
          <button
            onMouseDown={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666685] hover:text-white p-0.5"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-[#16161e] border border-[#2e2e3f] rounded-xl shadow-2xl overflow-hidden">
          {suggestions.map((loc) => (
            <button
              key={loc}
              onMouseDown={() => handleSelect(loc)}
              onTouchEnd={() => handleSelect(loc)}
              className={clsx(
                "w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors border-b border-[#2e2e3f] last:border-0",
                "hover:bg-[#1e1e2a] active:bg-[#252533]",
                query.toLowerCase() === loc.toLowerCase()
                  ? "text-orange-400 bg-orange-500/5"
                  : "text-[#a0a0c0]"
              )}
            >
              <MapPin size={12} className="text-[#3a3a50] flex-shrink-0" />
              <span>{loc}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
