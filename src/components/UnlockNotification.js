'use client';

import { useEffect, useState } from 'react';
import { useGame } from '@/contexts/GameContext';
import { Zap, X, Trophy, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

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
          type === 'levelUp'
            ? 'bg-gradient-to-br from-purple-900 to-purple-800 border-purple-500'
            : 'bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-500'
        } ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      >
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${type === 'levelUp' ? 'bg-purple-500' : 'bg-yellow-500'}`}>
            {type === 'levelUp' ? (
              <TrendingUp className="w-6 h-6 text-white" />
            ) : (
              <Trophy className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-1">{message}</h3>
            {desc && <p className="text-purple-200 text-sm mb-2">{desc}</p>}
            {reward && <p className="text-purple-300 text-sm mb-2">{reward}</p>}
            {xp && (
              <div className="flex items-center gap-2 mt-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">+{xp} XP</span>
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
