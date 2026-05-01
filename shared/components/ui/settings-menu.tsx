'use client';

import { Check, Monitor, Moon, Settings, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';

const themeOptions = [
  {
    value: 'dark',
    label: 'Dark',
    icon: Moon,
  },
  {
    value: 'light',
    label: 'Light',
    icon: Sun,
  },
  {
    value: 'system',
    label: 'System',
    icon: Monitor,
  },
] as const;

export function SettingsMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-background text-foreground transition hover:text-foreground"
      >
        <Settings className="h-5 w-5" />
        <span className="sr-only">Open settings</span>
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Theme settings"
          className="absolute right-0 z-50 mt-3 w-44 overflow-hidden rounded-2xl bg-popover p-1.5 text-sm text-popover-foreground"
        >
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Theme
          </p>
          {themeOptions.map((option) => {
            const Icon = option.icon;
            const isActive = theme === option.value;

            return (
              <button
                key={option.value}
                type="button"
                role="menuitemradio"
                aria-checked={isActive}
                onClick={() => {
                  setTheme(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition',
                  'hover:bg-accent hover:text-accent-foreground',
                  isActive && 'bg-accent text-primary'
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1">{option.label}</span>
                {isActive ? <Check className="h-4 w-4" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
