import type { IChartApi, ISeriesApi, SeriesType, Time, UTCTimestamp } from 'lightweight-charts';

export type Candle = {
  time: UTCTimestamp;
  open: number;
  high: number;
  low: number;
  close: number;
};

export type IndicatorPoint = {
  time: UTCTimestamp;
  value: number;
};

export type IndicatorSeriesKind = 'line' | 'histogram';

export type IndicatorSeries = {
  id: string;
  label: string;
  type: IndicatorSeriesKind;
  color: string;
  data: IndicatorPoint[];
};

export type IndicatorId = 'macd' | 'rsi' | 'mfi' | null;

export type IndicatorDefinition = {
  id: IndicatorId;
  img: string;
  name: string;
  description: string;
  defaultEnabled: boolean;
  height: number;
  buildSeries: (candles: Candle[]) => IndicatorSeries[];
};

export type ChartHandle = {
  id: string;
  chart: IChartApi;
  primarySeries: ISeriesApi<SeriesType, Time>;
  priceByTime: Map<Time, number>;
};

export const TIMEFRAMES = ['1m', '5m', '15m', '1h', '4h', '1d'] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];
