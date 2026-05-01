import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';
import { Info } from 'lucide-react';

type ChartShellProps = {
  title: string;
  subtitle?: string;
  description?: string;
  height: string;
  children: ReactNode;
};

export function ChartShell({ title, subtitle, description, height, children }: ChartShellProps) {
  return (
    <section className="overflow-hidden rounded-sm bg-card text-card-foreground">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <div className="flex gap-2 items-center">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h2>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        {subtitle ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>{subtitle}</span>
          </div>
        ) : null}
      </div>
      <div style={{ height }} className="relative">
        {children}
      </div>
    </section>
  );
}
