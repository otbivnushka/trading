import type { ReactNode } from 'react';
import { TopNav } from '@/shared/components/shared/top-nav';
import { useActiveIndicatorStore } from '@/shared/store/active-indicator';
import { cn } from '@/shared/lib/utils';

type AppFrameProps = {
  charts: ReactNode;
  sidebarLeft: ReactNode;
  sidebarRight: ReactNode;
};

export function AppFrame({ charts, sidebarLeft, sidebarRight }: AppFrameProps) {
  const activeIndicatorId = useActiveIndicatorStore((state) => state.activeIndicatorId);

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav />
      <div
        className={cn(
          'grid min-h-0 flex-1 gap-1 p-1 grid-cols-[3rem_minmax(0,1fr)_16rem]',
          !activeIndicatorId && 'grid-cols-[3rem_minmax(0,1fr)_4rem]'
        )}
      >
        {sidebarLeft}
        <div className="min-w-0 overflow-y-auto pr-0 lg:pr-1">{charts}</div>
        {sidebarRight}
      </div>
    </main>
  );
}
