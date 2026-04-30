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

export type IndicatorId = 'macd' | 'rsi' | 'mfi';

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
