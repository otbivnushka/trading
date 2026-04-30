import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useMarketDataStore } from '@/shared/store/market-data';
import { TIMEFRAMES } from '@/@types/types';

interface ToggleTimeframeProps {
  className?: string;
}

const ToggleTimeframe: React.FC<ToggleTimeframeProps> = ({ className }) => {
  const timeframe = useMarketDataStore((state) => state.timeframe);
  const setTimeframe = useMarketDataStore((state) => state.setTimeframe);

  return (
    <div className={className}>
      <ToggleGroup className="rounded-2xl" onValueChange={setTimeframe}>
        {TIMEFRAMES.map((timeframe) => (
          <ToggleGroupItem key={timeframe} value={timeframe}>
            {timeframe.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export { ToggleTimeframe };
