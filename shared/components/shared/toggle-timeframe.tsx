import React from 'react';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { useMarketDataStore } from '@/shared/store/market-data';
import { TIMEFRAMES, Timeframe } from '@/@types/types';

interface ToggleTimeframeProps {
  className?: string;
}

const ToggleTimeframe: React.FC<ToggleTimeframeProps> = ({ className }) => {
  const timeframe = useMarketDataStore((state) => state.timeframe);
  const setTimeframe = useMarketDataStore((state) => state.setTimeframe);

  return (
    <div className={className}>
      <ToggleGroup
        className="rounded-2xl "
        value={[timeframe]}
        onValueChange={(value) => value.length > 0 && setTimeframe(value[0] as Timeframe)}
      >
        {TIMEFRAMES.map((timeframe) => (
          <ToggleGroupItem key={timeframe} value={timeframe} className={'text-sm font-medium'}>
            {timeframe.toUpperCase()}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export { ToggleTimeframe };
