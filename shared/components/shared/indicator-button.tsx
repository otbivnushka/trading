'use client';

import { cn } from '@/shared/lib/utils';
import type { IndicatorId } from '@/@types/types';
import { useActiveIndicatorStore } from '@/shared/store/active-indicator';
import { PanelBottomOpen } from 'lucide-react';

type IndicatorButtonProps = {
  id: IndicatorId;
  label: string;
};

export function IndicatorButton({ id, label }: IndicatorButtonProps) {
  const activeIndicatorId = useActiveIndicatorStore((state) => state.activeIndicatorId);
  const setActiveIndicatorId = useActiveIndicatorStore((state) => state.setActiveIndicatorId);
  const isActive = activeIndicatorId === id;

  return (
    <button
      type="button"
      onClick={() => setActiveIndicatorId(id)}
      className={cn(
        'group flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition',
        isActive
          ? 'bg-accent text-accent-foreground'
          : 'bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground'
      )}
    >
      <span>{label}</span>
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <PanelBottomOpen className="w-4" />
      </span>
    </button>
  );
}
