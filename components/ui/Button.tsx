import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: ReactNode;
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-orange text-white hover:bg-brand-orange-dark focus-visible:outline-brand-orange disabled:hover:bg-brand-orange",
  secondary:
    "border border-brand-line bg-transparent text-brand-navy hover:border-brand-blue hover:text-brand-blue focus-visible:outline-brand-blue disabled:hover:border-brand-line disabled:hover:text-brand-navy",
};

export function Button({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-transparent px-6 py-3.5 text-sm font-semibold transition",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
