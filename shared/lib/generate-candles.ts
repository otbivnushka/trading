import type { UTCTimestamp } from 'lightweight-charts';
import type { Candle } from '../../@types/types';

const DAY_IN_SECONDS = 24 * 60 * 60;

export function generateMockCandles(count = 160): Candle[] {
  const start = Date.UTC(2025, 8, 1) / 1000;
  let price = 182.5;

  return Array.from({ length: count }, (_, index) => {
    const wave = Math.sin(index / 8) * 1.7 + Math.cos(index / 19) * 2.2;
    const drift = 0.05 * index;
    const impulse = ((index * 17) % 11) / 10 - 0.5;
    const open = price;
    const close = Math.max(60, open + wave * 0.38 + impulse + drift / count);
    const spread = 1.4 + Math.abs(Math.sin(index / 5)) * 1.8;
    const high = Math.max(open, close) + spread;
    const low = Math.min(open, close) - spread * 0.82;

    price = close;

    return {
      time: (start + index * DAY_IN_SECONDS) as UTCTimestamp,
      open: round(open),
      high: round(high),
      low: round(low),
      close: round(close),
    };
  });
}

function round(value: number) {
  return Number(value.toFixed(2));
}
