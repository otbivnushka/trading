import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

interface DrawingSidebarButtonProps {
  className?: string;
  id: string;
  description: string;
  icon: React.ReactNode;
}

const DrawingSidebarButton: React.FC<DrawingSidebarButtonProps> = ({
  className,
  id,
  description,
  icon,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger
        className={cn(
          className,
          'flex w-full items-center justify-between rounded-xl p-1 text-left transition bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground'
        )}
        id={id}
      >
        {icon}
      </TooltipTrigger>
      <TooltipContent>
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export { DrawingSidebarButton };
