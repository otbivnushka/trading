"use client";

import { create } from "zustand";
import { indicatorDefinitions } from "@/shared/lib/indicator-definitions";
import type { IndicatorId } from "@/@types/types";

type IndicatorVisibilityState = {
  enabledIndicators: Record<NonNullable<IndicatorId>, boolean>;
  toggleIndicator: (id: NonNullable<IndicatorId>, enabled: boolean) => void;
};

const initialIndicatorState = indicatorDefinitions.reduce(
  (state, indicator) => ({
    ...state,
    [indicator.id as NonNullable<IndicatorId>]: indicator.defaultEnabled,
  }),
  {} as Record<NonNullable<IndicatorId>, boolean>,
);

export const useIndicatorVisibilityStore = create<IndicatorVisibilityState>(
  (set) => ({
    enabledIndicators: initialIndicatorState,
    toggleIndicator: (id, enabled) =>
      set((state) => ({
        enabledIndicators: {
          ...state.enabledIndicators,
          [id]: enabled,
        },
      })),
  }),
);
