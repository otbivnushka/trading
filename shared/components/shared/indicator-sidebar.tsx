'use client';

import { IndicatorButton } from '@/shared/components/shared/indicator-button';
import { IndicatorDisplay } from '@/shared/components/shared/indicator-display';
import { indicatorDefinitions } from '@/shared/lib/indicator-definitions';

export function IndicatorSidebar() {
  return (
    <aside className="h-full flex flex-col justify-between rounded-sm border border-border bg-card p-4 text-card-foreground lg:sticky lg:top-4">
      <div className="space-y-2">
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
