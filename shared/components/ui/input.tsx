"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className="block w-full">
        {label && (
          <span className="mb-1 block text-sm text-foreground">{label} </span>
        )}

        <input
          ref={ref}
          className={`
        w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none
        focus:border-ring focus:ring-1 focus:ring-ring
        ${error ? "border-destructive focus:border-destructive focus:ring-destructive" : ""}
        ${className || ""}
      `}
          {...props}
        />
        {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
      </label>
    );
  }
);

Input.displayName = "Input";
