import { cn } from '@/shared/lib/utils';
import { LineDotRightHorizontal, RectangleCircle } from 'lucide-react';
import React from 'react';

interface DrawingSidebarProps {
  className?: string;
}

const DrawingSidebar: React.FC<DrawingSidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        className,
        'h-full flex flex-col rounded-sm bg-card p-2 pt-4 gap-2 text-card-foreground'
      )}
    >
      <button
        className="flex w-full items-center justify-between rounded-xl p-1 text-left transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        id="draw-rectangle"
        onClick={() => {}}
      >
        <RectangleCircle />
      </button>
      <button
        className="flex w-full items-center justify-between rounded-xl p-1 text-left transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
        id="draw-line"
        onClick={() => {}}
      >
        <LineDotRightHorizontal />
      </button>
      <input
        type="color"
        id="color"
        className="w-full rounded-xl p-1 transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
      />
    </aside>
  );
};

export { DrawingSidebar };
