"use client";

import { create } from "zustand";
import { indicatorDefinitions } from "@/shared/lib/indicator-definitions";
import type { IndicatorId } from "@/@types/types";

type ActiveIndicatorState = {
  activeIndicatorId: IndicatorId;
  setActiveIndicatorId: (id: IndicatorId) => void;
};

export const useActiveIndicatorStore = create<ActiveIndicatorState>((set) => ({
  activeIndicatorId: indicatorDefinitions[0]?.id ?? "macd",
  setActiveIndicatorId: (id) => set({ activeIndicatorId: id }),
}));
