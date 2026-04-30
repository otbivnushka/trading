import type { ReactNode } from 'react';
import { TopNav } from '@/shared/components/shared/top-nav';

type AppFrameProps = {
  charts: ReactNode;
  sidebar: ReactNode;
};

export function AppFrame({ charts, sidebar }: AppFrameProps) {
  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground">
      <TopNav />
      <div className="grid min-h-0 flex-1 grid-cols-1 gap-2 p-0.5 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 overflow-y-auto pr-0 lg:pr-1">{charts}</div>
        {sidebar}
      </div>
    </main>
  );
}
