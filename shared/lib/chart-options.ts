import type { ChartOptions, DeepPartial } from 'lightweight-charts';

export type ChartColorMode = 'dark' | 'light';

export function getChartTheme(mode: ChartColorMode): DeepPartial<ChartOptions> {
  if (mode === 'light') {
    return {
      layout: {
        background: { color: '#ffffff' },
        textColor: '#334155',
        attributionLogo: false,
      },
      grid: {
        vertLines: { color: '#e5e7eb' },
        horzLines: { color: '#e5e7eb' },
      },
      crosshair: {
        vertLine: {
          color: '#0f172a',
          labelBackgroundColor: '#334155',
        },
        horzLine: {
          color: '#0f172a',
          labelBackgroundColor: '#334155',
        },
      },
      rightPriceScale: {
        borderColor: '#cbd5e1',
        scaleMargins: {
          top: 0.12,
          bottom: 0.12,
        },
      },
      timeScale: {
        borderColor: '#cbd5e1',
        timeVisible: true,
        secondsVisible: false,
      },
    };
  }

  return {
    layout: {
      background: { color: '#121212' },
      textColor: '#f5f5f5',
      attributionLogo: false,
    },
    grid: {
      vertLines: { color: '#2a2a2a' },
      horzLines: { color: '#2a2a2a' },
    },
    crosshair: {
      vertLine: {
        color: '#e2e8f0',
        labelBackgroundColor: '#1f1f1f',
      },
      horzLine: {
        color: '#e2e8f0',
        labelBackgroundColor: '#1f1f1f',
      },
    },
    rightPriceScale: {
      borderColor: '#333333',
      scaleMargins: {
        top: 0.12,
        bottom: 0.12,
      },
    },
    timeScale: {
      borderColor: '#333333',
      timeVisible: true,
      secondsVisible: false,
    },
    localization: {
      locale: 'en',
      dateFormat: "dd MMM 'yy",
    },
  };
}
