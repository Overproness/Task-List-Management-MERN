"use client";

import { Switch } from "@/components/ui/switch";
import { useGame } from "@/contexts/GameContext";
import { Sparkles } from "lucide-react";

export default function ModeToggle() {
  const { mode, toggleMode, isImmersiveModeUnlocked } = useGame();

  if (!isImmersiveModeUnlocked) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-sm shadow-lg transition-all ${
          mode === "minimal"
            ? "bg-white/90 border border-gray-200"
            : "bg-slate-800/90 border border-blue-500/30"
        }`}
      >
        <span
          className={`text-sm font-medium ${
            mode === "minimal" ? "text-gray-700" : "text-blue-300"
          }`}
        >
          Minimal
        </span>
        <Switch
          checked={mode === "immersive"}
          onCheckedChange={toggleMode}
          className="data-[state=checked]:bg-blue-600 hover:cursor-pointer"
        />
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              mode === "minimal" ? "text-gray-700" : "text-blue-300"
            }`}
          >
            Immersive
          </span>
          {mode === "immersive" && (
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}
