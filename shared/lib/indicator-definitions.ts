import type { IndicatorDefinition } from '../../@types/types';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export const indicatorDefinitions: IndicatorDefinition[] = [
  {
    id: 'macd',
    img: '/macd.svg',
    name: 'MACD',
    description: 'Momentum histogram with a mock signal line.',
    defaultEnabled: true,
    height: 150,
    buildSeries: (candles) => [
      {
        id: 'macd-histogram',
        label: 'Histogram',
        type: 'histogram',
        color: '#38bdf8',
        data: candles.map((candle, index) => ({
          time: candle.time,
          value: Number(
            (Math.sin(index / 7) * 1.8 + (candle.close - candle.open) * 0.65).toFixed(2)
          ),
        })),
      },
      {
        id: 'macd-signal',
        label: 'Signal',
        type: 'line',
        color: '#f59e0b',
        data: candles.map((candle, index) => ({
          time: candle.time,
          value: Number((Math.sin(index / 10) * 1.3).toFixed(2)),
        })),
      },
    ],
  },
  {
    id: 'rsi',
    img: '/rsi.svg',
    name: 'RSI',
    description: 'Bounded oscillator with overbought/oversold context.',
    defaultEnabled: true,
    height: 130,
    buildSeries: (candles) => [
      {
        id: 'rsi-line',
        label: 'RSI',
        type: 'line',
        color: '#a3e635',
        data: candles.map((candle, index) => ({
          time: candle.time,
          value: Number(
            clamp(50 + Math.sin(index / 9) * 23 + (candle.close - candle.open) * 5, 8, 92).toFixed(
              2
            )
          ),
        })),
      },
    ],
  },
  {
    id: 'mfi',
    img: '/mfi.svg',
    name: 'MFI',
    description: 'Volume-style flow proxy generated from price action.',
    defaultEnabled: false,
    height: 130,
    buildSeries: (candles) => [
      {
        id: 'mfi-line',
        label: 'MFI',
        type: 'line',
        color: '#f472b6',
        data: candles.map((candle, index) => ({
          time: candle.time,
          value: Number(
            clamp(48 + Math.cos(index / 11) * 28 + (candle.high - candle.low) * 1.6, 5, 96).toFixed(
              2
            )
          ),
        })),
      },
    ],
  },
];
