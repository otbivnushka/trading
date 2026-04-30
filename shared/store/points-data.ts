'use client';

import { create } from 'zustand';
import type { Candle } from '@/@types/types';

type MarketDataState = {
  candles: Candle[];
  setCandles: (candles: Candle[]) => void;
};

export const useMarketDataStore = create<MarketDataState>((set) => ({
  candles: [],
  setCandles: (candles) => set({ candles }),
}));
