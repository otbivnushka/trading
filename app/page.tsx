'use client';

import { useEffect } from 'react';
import { TradingWorkspace } from '@/shared/components/shared/trading-workspace';
import { useMarketDataStore } from '@/shared/store/market-data';

export default function Home() {
  const timeframe = useMarketDataStore((state) => state.timeframe);
  const setCandles = useMarketDataStore((state) => state.setCandles);
  const candles = useMarketDataStore((state) => state.candles);
  const setPercent = useMarketDataStore((state) => state.setPercent);
  const instrument = useMarketDataStore((state) => state.instrument);

  useEffect(() => {
    async function fetchCandles() {
      const res = await fetch(`/api/candles?timeframe=${timeframe}&instrument=${instrument}`, {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch candles');
      }

      const { candles, percent } = await res.json();
      setCandles(candles);
      setPercent(percent);
    }

    fetchCandles();
  }, [timeframe, setCandles, setPercent, instrument]);

  return <TradingWorkspace candles={candles} />;
}
