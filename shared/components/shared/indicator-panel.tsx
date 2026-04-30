'use client';

import { useMemo } from 'react';
import { ChartShell } from '@/shared/components/ui/chart-shell';
import { IndicatorChart } from '@/shared/components/shared/indicator-chart';
import type { IndicatorDefinition } from '@/@types/types';
import { useMarketDataStore } from '@/shared/store/market-data';

type IndicatorPanelProps = {
  definition: IndicatorDefinition;
  candles?: Parameters<IndicatorDefinition['buildSeries']>[0];
};

export function IndicatorPanel({ definition, candles: candlesProp }: IndicatorPanelProps) {
  const candlesFromStore = useMarketDataStore((state) => state.candles);
  const candles = candlesProp ?? candlesFromStore;
  const series = useMemo(() => definition.buildSeries(candles), [candles, definition]);

  return (
    <ChartShell
      title={definition.name}
      description={definition.description}
      height={String(definition.height) + 'px'}
    >
      <IndicatorChart id={`indicator-${definition.id}`} series={series} />
    </ChartShell>
  );
}
