import type { UTCTimestamp } from 'lightweight-charts';
import type { Candle, Timeframe } from '@/@types/types';

const TIMEFRAME_TO_SECONDS: Record<Timeframe, number> = {
  '1m': 60,
  '5m': 60 * 5,
  '15m': 60 * 15,
  '1h': 60 * 60,
  '4h': 60 * 60 * 4,
  '1d': 60 * 60 * 24,
};

const INSTRUMENT_TO_PRICE: Record<string, number> = { BTCUSD: 60000, ETHUSD: 4000, EURUSD: 1.3 };

export function generateMockCandles(
  count = 160,
  timeframe: Timeframe = '1d',
  instrument: string = 'BTCUSD'
): Candle[] {
  const step = TIMEFRAME_TO_SECONDS[timeframe];

  const now = Math.floor(Date.now() / 1000);
  const start = now - count * step;

  let price = INSTRUMENT_TO_PRICE[instrument];

  return Array.from({ length: count }, (_, index) => {
    const time = (start + index * step) as UTCTimestamp;

    const scale = step / 60;

    const wave = Math.sin(index / 8) * 1.7 * scale + Math.cos(index / 19) * 2.2 * scale;

    const drift = 0.11 * index * scale;
    const impulse = ((index * 17) % 11) / 10 - 0.5;

    const open = price;
    const close = Math.max(price - 0.5, open + wave * 0.15 + impulse + drift / count);

    const spread = 1.2 * scale + Math.abs(Math.sin(index / 5)) * 1.5 * scale;

    const high = Math.max(open, close) + spread * Math.random();
    const low = Math.min(open, close) - spread * 0.8;

    price = close;

    return {
      time,
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
