import type { ReactNode } from 'react';

type ChartShellProps = {
  title: string;
  subtitle?: string;
  height: string;
  children: ReactNode;
};

export function ChartShell({ title, subtitle, height, children }: ChartShellProps) {
  return (
    <section className="overflow-hidden rounded-sm border border-border bg-card text-card-foreground">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h2>
          {subtitle ? <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live mock
        </div>
      </div>
      <div style={{ height }} className="relative">
        {children}
      </div>
    </section>
  );
}
