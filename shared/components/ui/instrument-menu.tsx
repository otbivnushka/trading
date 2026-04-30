'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/utils';
import { Input } from './input';
import Image from 'next/image';
import { useMarketDataStore } from '@/shared/store/market-data';

const instruments = [
  {
    value: 'BTCUSD',
    label: 'BTCUSD',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
  },
  {
    value: 'EURUSD',
    label: 'EURUSD',
    icon: 'https://s3-symbol-logo.tradingview.com/country/EU.svg',
  },
  {
    value: 'ETHUSD',
    label: 'ETHUSD',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCETH.svg',
  },
];

export function InstrumentMenu() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
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

  const instrument = useMarketDataStore((state) => state.instrument);
  const setInstrument = useMarketDataStore((state) => state.setInstrument);

  const filteredInstruments = instruments.filter((instrument) =>
    instrument.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex h-8 w-30 items-center justify-left rounded-2xl border border-input bg-background px-3 text-foreground transition hover:border-ring hover:text-foreground"
      >
        <div>{instrument}</div>
      </button>

      {isOpen ? (
        <div
          role="menu"
          aria-label="Theme settings"
          className="absolute left-0 z-50 mt-3 w-124 overflow-hidden rounded-2xl border border-border bg-popover p-4 text-sm text-popover-foreground"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Search instruments
          </p>
          <div className="mb-3 text-xs">
            <Input
              placeholder="Search"
              className="outline-0"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
          </div>
          {filteredInstruments.map((instrumentItem) => {
            return (
              <button
                key={instrumentItem.value}
                type="button"
                role="menuitemradio"
                aria-checked={false}
                onClick={(e) => {
                  e.preventDefault();
                  setInstrument(instrumentItem.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left transition',
                  'hover:bg-accent hover:text-accent-foreground',
                  instrumentItem.value === instrument && 'bg-accent text-accent-foreground'
                )}
              >
                <Image
                  width={16}
                  height={16}
                  src={instrumentItem.icon}
                  alt=""
                  className="rounded-2xl"
                />
                <span className="flex-1">{instrumentItem.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
