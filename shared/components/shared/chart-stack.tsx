'use client';

import { CandlestickChart } from '@/shared/components/shared/candlestick-chart';
import { ChartShell } from '@/shared/components/ui/chart-shell';
import { useMarketDataStore } from '@/shared/store/market-data';

export function ChartStack() {
  const candles = useMarketDataStore((state) => state.candles);
  const lastCandle = candles.at(-1);

  return (
    <div className="space-y-4 h-full">
      <ChartShell
        title="OHLC"
        description="Mock OHLC feed"
        subtitle={lastCandle ? `Last close ${lastCandle.close.toFixed(2)}` : ''}
        height={'calc(100vh - 64px - 54px)'}
      >
        <CandlestickChart id="main-price-chart" />
      </ChartShell>
    </div>
  );
}
