'use client';

import { create } from 'zustand';
import type { UTCTimestamp } from 'lightweight-charts';

export type TrendLine = {
  id: string;
  p1: { time: UTCTimestamp; price: number };
  p2: { time: UTCTimestamp; price: number };
};

export type DrawingMode = 'none' | 'trend-line';

type DrawingState = {
  mode: DrawingMode;
  setMode: (mode: DrawingMode) => void;
  lines: TrendLine[];
  addLine: (line: TrendLine) => void;
  removeLine: (id: string) => void;
};

export const useDrawingStore = create<DrawingState>((set) => ({
  mode: 'trend-line',
  setMode: (mode) => set({ mode }),
  lines: [],
  addLine: (line) => set((state) => ({ lines: [...state.lines, line] })),
  removeLine: (id) =>
    set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
}));
