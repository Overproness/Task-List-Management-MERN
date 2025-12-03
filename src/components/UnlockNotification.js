"use client";

import { Card } from "@/components/ui/card";
import { useGame } from "@/contexts/GameContext";
import { TrendingUp, Trophy, X, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export default function UnlockNotification() {
  const { showUnlockNotification, setShowUnlockNotification } = useGame();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (showUnlockNotification) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => setShowUnlockNotification(null), 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showUnlockNotification, setShowUnlockNotification]);

  if (!showUnlockNotification) return null;

  const { type, message, desc, reward, xp } = showUnlockNotification;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <Card
        className={`p-6 w-96 shadow-2xl border-2 ${
          type === "levelUp"
            ? "bg-zinc-900 border-zinc-700"
            : "bg-zinc-900 border-zinc-700"
        } ${
          visible ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`p-3 rounded-full ${
              type === "levelUp" ? "bg-white" : "bg-white"
            }`}
          >
            {type === "levelUp" ? (
              <TrendingUp className="w-6 h-6 text-black" />
            ) : (
              <Trophy className="w-6 h-6 text-black" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{message}</h3>
            {desc && <p className="text-zinc-400 text-sm mb-2">{desc}</p>}
            {reward && <p className="text-zinc-500 text-sm mb-2">{reward}</p>}
            {xp && (
              <div className="flex items-center gap-2 mt-2">
                <Zap className="w-4 h-4 text-white" />
                <span className="text-white font-semibold">+{xp} XP</span>
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(() => setShowUnlockNotification(null), 300);
            }}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </Card>
    </div>
  );
}
