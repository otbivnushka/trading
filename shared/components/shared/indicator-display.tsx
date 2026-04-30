"use client";

import { ChartShell } from "@/shared/components/ui/chart-shell";
import { IndicatorPanel } from "@/shared/components/shared/indicator-panel";
import { indicatorDefinitions } from "@/shared/lib/indicator-definitions";
import { useActiveIndicatorStore } from "@/shared/store/active-indicator";
import { useMarketDataStore } from "@/shared/store/market-data";

export function IndicatorDisplay() {
  const candles = useMarketDataStore((state) => state.candles);
  const activeIndicatorId = useActiveIndicatorStore(
    (state) => state.activeIndicatorId,
  );

  const definition =
    indicatorDefinitions.find((item) => item.id === activeIndicatorId) ??
    indicatorDefinitions[0];

  if (!definition) {
    return (
      <ChartShell title="Indicator" subtitle="No indicator selected" height={320}>
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          Select an indicator
        </div>
      </ChartShell>
    );
  }

  return <IndicatorPanel definition={definition} candles={candles} />;
}
