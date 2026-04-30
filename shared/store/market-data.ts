'use client';

import { create } from 'zustand';
import type { Candle, Timeframe } from '@/@types/types';

type MarketDataState = {
  candles: Candle[];
  setCandles: (candles: Candle[]) => void;
  timeframe: Timeframe;
  setTimeframe: (timeframe: Timeframe) => void;
  instrument: string;
  setInstrument: (instrument: string) => void;
  percent: number;
  setPercent: (percent: number) => void;
};

export const useMarketDataStore = create<MarketDataState>((set) => ({
  candles: [],
  setCandles: (candles) => set({ candles }),
  timeframe: '1d',
  setTimeframe: (timeframe) => set({ timeframe }),
  instrument: 'BTCUSD',
  setInstrument: (instrument) => set({ instrument }),
  percent: 0,
  setPercent: (percent) => set({ percent }),
}));
