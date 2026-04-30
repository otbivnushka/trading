import { Candle } from '@/@types/types';

export function getPercent(candles: Candle[]): number {
  if (candles.length < 2) return 0;

  const first = candles[0].close;
  const last = candles[candles.length - 1].close;

  if (first === 0) return 0;

  return ((last - first) / first) * 100;
}
