"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "next-themes";
import {
  createChart,
  HistogramSeries,
  LineSeries,
  type HistogramData,
  type ISeriesApi,
  type LineData,
  type SeriesType,
  type Time,
  type UTCTimestamp,
} from "lightweight-charts";
import { getChartTheme } from "@/shared/lib/chart-options";
import type { IndicatorSeries } from "@/@types/types";
import { useChartSyncStore } from "@/shared/store/chart-sync";

type IndicatorChartProps = {
  id: string;
  series: IndicatorSeries[];
};

export function IndicatorChart({ id, series }: IndicatorChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const registerChart = useChartSyncStore((state) => state.registerChart);
  const { resolvedTheme } = useTheme();
  const chartTheme = useMemo(
    () => getChartTheme(resolvedTheme === "light" ? "light" : "dark"),
    [resolvedTheme],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container || series.length === 0) {
      return;
    }

    const chart = createChart(container, {
      ...chartTheme,
      width: container.clientWidth,
      height: container.clientHeight,
      rightPriceScale: {
        ...chartTheme.rightPriceScale,
        scaleMargins: { top: 0.2, bottom: 0.2 },
      },
    });

    const chartSeries = series.map((item) => {
      if (item.type === 'histogram') {
        const histogram = chart.addSeries(HistogramSeries, {
          color: item.color,
          priceFormat: { type: 'price', precision: 2, minMove: 0.01 },
        });
        histogram.setData(item.data as HistogramData<UTCTimestamp>[]);
        return histogram;
      }

      const line = chart.addSeries(LineSeries, {
        color: item.color,
        lineWidth: 2,
        priceLineVisible: false,
        lastValueVisible: true,
      });
      line.setData(item.data as LineData<UTCTimestamp>[]);
      return line;
    });

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

    const primarySeriesData = series[0]?.data ?? [];
    const unregister = registerChart({
      id,
      chart,
      primarySeries: chartSeries[0] as unknown as ISeriesApi<SeriesType, Time>,
      priceByTime: new Map(primarySeriesData.map((point) => [point.time, point.value])),
    });

    return () => {
      unregister();
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [chartTheme, id, registerChart, series]);

  return <div ref={containerRef} className="h-full w-full" />;
}
