'use client';

import { useEffect } from 'react';
import { AppFrame } from '@/shared/components/shared/app-frame';
import { ChartStack } from '@/shared/components/shared/chart-stack';
import { IndicatorSidebar } from '@/shared/components/shared/indicator-sidebar';
import type { Candle } from '@/@types/types';
import { useMarketDataStore } from '@/shared/store/market-data';

type TradingWorkspaceProps = {
  candles: Candle[];
};

export function TradingWorkspace({ candles }: TradingWorkspaceProps) {
  const setCandles = useMarketDataStore((state) => state.setCandles);

  useEffect(() => {
    setCandles(candles);
  }, [candles, setCandles]);

  return <AppFrame charts={<ChartStack />} sidebar={<IndicatorSidebar />} />;
}
