'use client';

import { IndicatorButton } from '@/shared/components/shared/indicator-button';
import { IndicatorDisplay } from '@/shared/components/shared/indicator-display';
import { indicatorDefinitions } from '@/shared/lib/indicator-definitions';
import { useActiveIndicatorStore } from '@/shared/store/active-indicator';
import { PanelRightClose, PanelRightOpen } from 'lucide-react';

export function IndicatorSidebar() {
  const activeIndicatorId = useActiveIndicatorStore((state) => state.activeIndicatorId);
  const setActiveIndicatorId = useActiveIndicatorStore((state) => state.setActiveIndicatorId);
  if (!activeIndicatorId) {
    return (
      <aside className="h-full flex flex-col justify-between rounded-sm bg-card p-2 text-card-foreground lg:sticky lg:top-4">
        <div className="space-y-2">
          <button
            className="flex w-full items-center justify-between rounded-xl p-3 text-left transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
            onClick={() => setActiveIndicatorId('macd')}
          >
            <PanelRightOpen />
          </button>
        </div>
      </aside>
    );
  }
  return (
    <aside className="h-full flex flex-col justify-between rounded-sm bg-card p-4 text-card-foreground lg:sticky lg:top-4">
      <div className="space-y-2">
        <button
          className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground mb-4"
          onClick={() => setActiveIndicatorId(null)}
        >
          <PanelRightClose />
          Close Panel
        </button>
        <hr />
        {indicatorDefinitions.map((indicator) => (
          <IndicatorButton key={indicator.id} id={indicator.id} label={indicator.name} />
        ))}
      </div>

      <div className="mt-4">
        <IndicatorDisplay />
      </div>
    </aside>
  );
}
