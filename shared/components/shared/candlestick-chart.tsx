'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useTheme } from 'next-themes';
import {
  CandlestickSeries,
  createChart,
  type CandlestickData,
  type ISeriesApi,
  type SeriesType,
  type Time,
  type UTCTimestamp,
  type IChartApi,
  LineSeries,
} from 'lightweight-charts';

import { getChartTheme } from '@/shared/lib/chart-options';
import { useChartSyncStore } from '@/shared/store/chart-sync';
import { useMarketDataStore } from '@/shared/store/market-data';
import { RectangleDrawingTool } from '@/shared/plugins/rectangle-drawing-tool';
import { LineDrawingTool } from '@/shared/plugins/line-drawing-tool';

type CandlestickChartProps = {
  id: string;
};

export function CandlestickChart({ id }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<'Line'> | null>(null);
  const data = useMarketDataStore((state) => state.candles);
  const registerChart = useChartSyncStore((state) => state.registerChart);

  const { resolvedTheme } = useTheme();

  const chartTheme = useMemo(
    () => getChartTheme(resolvedTheme === 'light' ? 'light' : 'dark'),
    [resolvedTheme]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const chart = createChart(container, {
      ...chartTheme,
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#86efac',
      wickDownColor: '#fca5a5',
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#f59e0b',
      lineWidth: 2,
    });
    lineSeriesRef.current = lineSeries;

    new RectangleDrawingTool(
      chartRef.current,
      seriesRef.current,
      document.querySelector<HTMLButtonElement>('#draw-rectangle')!,
      document.querySelector<HTMLInputElement>('#color')!,
      {
        showLabels: false,
      }
    );

    new LineDrawingTool(
      chartRef.current,
      seriesRef.current,
      document.querySelector<HTMLButtonElement>('#draw-line')!,
      document.querySelector<HTMLInputElement>('#color')!,
      {
        lineWidth: 2,
        lineStyle: 'solid',
        showLabels: true,
      }
    );

    chart.timeScale().fitContent();
    const resizeObserver = new ResizeObserver(([entry]) => {
      if (entry) {
        chart.applyOptions({
          width: Math.floor(entry.contentRect.width),
          height: Math.floor(entry.contentRect.height),
        });
      }
    });

    resizeObserver.observe(container);

    const unregister = registerChart({
      id,
      chart,
      primarySeries: series as unknown as ISeriesApi<SeriesType, Time>,
      priceByTime: new Map(),
    });

    return () => {
      unregister();
      resizeObserver.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (!seriesRef.current || data.length === 0 || !chartRef.current) return;

    seriesRef.current.setData(data as CandlestickData<UTCTimestamp>[]);

    chartRef.current?.timeScale().scrollToRealTime();

    // line series
  }, [data]);

  useEffect(() => {
    if (!chartRef.current) return;

    chartRef.current.applyOptions(chartTheme);
  }, [chartTheme]);

  return <div ref={containerRef} className="h-full w-full" />;
}
