import React from "react";
import { cn } from "@/lib/utils";

type SheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-slate-900/40 transition-opacity duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={() => onOpenChange(false)}
      />
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-full w-full max-w-md overflow-y-auto bg-background shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {children}
      </div>
    </>
  );
}

export function SheetContent({ children, className }: WrapperProps) {
  return <div className={cn("flex min-h-full flex-col", className)}>{children}</div>;
}

export function SheetHeader({ children, className }: WrapperProps) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>;
}

export function SheetTitle({ children, className }: WrapperProps) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function SheetFooter({ children, className }: WrapperProps) {
  return <div className={cn("mt-auto", className)}>{children}</div>;
}
