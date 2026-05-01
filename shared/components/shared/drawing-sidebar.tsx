import { cn } from '@/shared/lib/utils';
import { LineDotRightHorizontal, RectangleCircle } from 'lucide-react';
import React from 'react';
import { DrawingSidebarButton } from './drawing-sidebar-button';

interface DrawingSidebarProps {
  className?: string;
}

const drawingTools = [
  {
    id: 'draw-rectangle',
    description: 'Rectangle',
    icon: <RectangleCircle />,
  },
  {
    id: 'draw-line',
    description: 'Line',
    icon: <LineDotRightHorizontal />,
  },
];

const DrawingSidebar: React.FC<DrawingSidebarProps> = ({ className }) => {
  return (
    <aside
      className={cn(
        className,
        'h-full flex flex-col rounded-sm bg-card p-2 pt-4 gap-2 text-card-foreground'
      )}
    >
      {drawingTools.map((tool) => (
        <DrawingSidebarButton
          key={tool.id}
          id={tool.id}
          description={tool.description}
          icon={tool.icon}
        />
      ))}
      <input
        type="color"
        id="color"
        className="w-full rounded-xl p-1 transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground"
      />
    </aside>
  );
};

export { DrawingSidebar };
