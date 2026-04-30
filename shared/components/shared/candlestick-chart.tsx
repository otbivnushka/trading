"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import {
  CandlestickSeries,
  createChart,
  type CandlestickData,
  type ISeriesApi,
  type SeriesType,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import { getChartTheme } from "@/shared/lib/chart-options";
import { useChartSyncStore } from "@/shared/store/chart-sync";
import { useMarketDataStore } from "@/shared/store/market-data";

type CandlestickChartProps = {
  id: string;
};

export function CandlestickChart({ id }: CandlestickChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const data = useMarketDataStore((state) => state.candles);
  const registerChart = useChartSyncStore((state) => state.registerChart);
  const { resolvedTheme } = useTheme();
  const chartTheme = useMemo(
    () => getChartTheme(resolvedTheme === "light" ? "light" : "dark"),
    [resolvedTheme],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const chart = createChart(container, {
      ...chartTheme,
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#86efac",
      wickDownColor: "#fca5a5",
    });

    series.setData(data as CandlestickData<UTCTimestamp>[]);
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
      priceByTime: new Map(data.map((point) => [point.time, point.close])),
    });

    return () => {
      unregister();
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [chartTheme, data, id, registerChart]);

  return <div ref={containerRef} className="h-full w-full" />;
}
