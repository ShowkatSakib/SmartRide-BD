import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Zap, BookOpen } from "lucide-react";
import clsx from "clsx";
import HomePage from "./pages/HomePage";
import ComparePage from "./pages/ComparePage";
import SurgePage from "./pages/SurgePage";
import FareInfoPage from "./pages/FareInfoPage";

const NAV = [
  { path: "/",        label: "Ride",    Icon: Home },
  { path: "/compare", label: "Compare", Icon: BarChart2 },
  { path: "/surge",   label: "Surge",   Icon: Zap },
  { path: "/fares",   label: "Fares",   Icon: BookOpen },
];

function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <nav className="bottom-nav fixed bottom-0 left-0 right-0 z-50 bg-[#16161e]/95 backdrop-blur-xl border-t border-[#2e2e3f] flex max-w-lg mx-auto">
      {NAV.map(({ path, label, Icon }) => {
        const active = location.pathname === path;
        return (
          <button key={path} onClick={() => navigate(path)}
            className={clsx(
              "flex-1 flex flex-col items-center justify-center gap-1 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-200 border-none bg-transparent cursor-pointer",
              active ? "text-orange-500" : "text-[#666685]"
            )}>
            <Icon size={20} strokeWidth={active ? 2.5 : 1.8}
              className={active ? "drop-shadow-[0_0_6px_rgba(249,115,22,.6)]" : ""} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0f0f14] max-w-lg mx-auto relative">
        {/* Background orbs */}
        <div className="fixed top-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="fixed bottom-32 left-0 w-56 h-56 bg-indigo-500/8 rounded-full blur-[70px] pointer-events-none" />

        <div className="main-content">
          <Routes>
            <Route path="/"        element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/surge"   element={<SurgePage />} />
            <Route path="/fares"   element={<FareInfoPage />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
