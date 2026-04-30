import { SettingsMenu } from '@/shared/components/ui/settings-menu';
import { UserButton } from '@/shared/components/ui/user-button';
import { InstrumentMenu } from '../ui/instrument-menu';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';

export function TopNav() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-5 text-card-foreground">
      <div className="flex items-center gap-4">
        <UserButton />
        <InstrumentMenu />
        <div className="hidden items-center gap-4 text-sm text-muted-foreground md:flex">
          <span>BTCUSD</span>
          <span className="text-emerald-500">+2.18%</span>
        </div>
        <ToggleGroup>
          <ToggleGroupItem value="a">1D</ToggleGroupItem>
          <ToggleGroupItem value="b">5D</ToggleGroupItem>
          <ToggleGroupItem value="c">1M</ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <SettingsMenu />
      </div>
    </header>
  );
}
