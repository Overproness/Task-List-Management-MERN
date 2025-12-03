'use client';

import { useGame } from '@/contexts/GameContext';
import MinimalMode from '@/components/MinimalMode';
import ImmersiveMode from '@/components/ImmersiveMode';
import ModeToggle from '@/components/ModeToggle';
import UnlockNotification from '@/components/UnlockNotification';

export default function Home() {
  const { mode } = useGame();

  return (
    <>
      <ModeToggle />
      <UnlockNotification />
      {mode === 'minimal' ? <MinimalMode /> : <ImmersiveMode />}
    </>
  );
}
