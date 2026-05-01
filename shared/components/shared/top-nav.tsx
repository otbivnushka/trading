'use client';
import { SettingsMenu } from '@/shared/components/ui/settings-menu';
import { UserButton } from '@/shared/components/ui/user-button';
import { InstrumentMenu } from '../ui/instrument-menu';
import { ToggleTimeframe } from './toggle-timeframe';
import { useMarketDataStore } from '@/shared/store/market-data';
import { cn } from '@/shared/lib/utils';

export function TopNav() {
  const instrument = useMarketDataStore((state) => state.instrument);
  const percent = useMarketDataStore((state) => state.percent);

  return (
    <header className="flex h-16 items-center justify-between  bg-card px-5 text-card-foreground">
      <div className="flex items-center gap-1 md:gap-4">
        <UserButton className="hidden lg:visible" />
        <InstrumentMenu />
        <div className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          <span>{instrument}</span>
          <span className={cn(+percent < 0 ? 'text-red-500' : 'text-emerald-500')}>{percent}%</span>
        </div>
        <ToggleTimeframe />
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <SettingsMenu />
      </div>
    </header>
  );
}
