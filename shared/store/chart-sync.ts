'use client';

import { create } from 'zustand';
import type { LogicalRange, MouseEventParams, Time } from 'lightweight-charts';
import type { ChartHandle } from '@/@types/types';

type ChartSyncState = {
  charts: Map<string, ChartHandle>;
  activeRangeSource: string | null;
  activeCrosshairSource: string | null;
  registerChart: (handle: ChartHandle) => () => void;
};

export const useChartSyncStore = create<ChartSyncState>((set, get) => ({
  charts: new Map(),
  activeRangeSource: null,
  activeCrosshairSource: null,
  registerChart: (handle) => {
    set((state) => {
      const charts = new Map(state.charts);
      charts.set(handle.id, handle);
      return { charts };
    });

    const syncRange = (range: LogicalRange | null) => {
      const state = get();
      if (!range || state.activeRangeSource) {
        return;
      }

      set({ activeRangeSource: handle.id });
      get().charts.forEach((target, targetId) => {
        if (targetId !== handle.id) {
          target.chart.timeScale().setVisibleLogicalRange(range);
        }
      });
      set({ activeRangeSource: null });
    };

    const syncCrosshair = (param: MouseEventParams<Time>) => {
      const state = get();
      if (state.activeCrosshairSource) {
        return;
      }

      set({ activeCrosshairSource: handle.id });

      if (!param.time) {
        get().charts.forEach((target, targetId) => {
          if (targetId !== handle.id) {
            target.chart.clearCrosshairPosition();
          }
        });
        set({ activeCrosshairSource: null });
        return;
      }

      const time = param.time;
      get().charts.forEach((target, targetId) => {
        if (targetId === handle.id) {
          return;
        }

        const price = target.priceByTime.get(time);
        if (price !== undefined) {
          target.chart.setCrosshairPosition(price, time, target.primarySeries);
        }
      });

      set({ activeCrosshairSource: null });
    };

    handle.chart.timeScale().subscribeVisibleLogicalRangeChange(syncRange);
    handle.chart.subscribeCrosshairMove(syncCrosshair);

    return () => {
      handle.chart.timeScale().unsubscribeVisibleLogicalRangeChange(syncRange);
      handle.chart.unsubscribeCrosshairMove(syncCrosshair);
      set((state) => {
        const charts = new Map(state.charts);
        charts.delete(handle.id);
        return { charts };
      });
    };
  },
}));
