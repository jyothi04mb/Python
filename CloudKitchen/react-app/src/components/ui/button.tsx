import React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
  className?: string;
};

export function Button({
  variant = "default",
  size = "md",
  asChild,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    variant === "outline"
      ? "border border-border bg-transparent text-foreground hover:bg-background/90"
      : "bg-primary text-primary-foreground",
    size === "sm" ? "h-9 px-3 text-sm" : size === "lg" ? "h-12 px-6 text-base" : "h-10 px-4 text-sm",
    className,
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      className: cn(classes, children.props.className),
    });
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
