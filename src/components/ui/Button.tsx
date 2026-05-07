import Link from 'next/link';
import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md font-semibold tracking-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green disabled:opacity-50';

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-sm',
} as const;

const variants: Record<Variant, string> = {
  primary: 'bg-brand-green text-black hover:bg-brand-green-hover hover:text-white',
  secondary: 'border border-brand-border bg-transparent text-white hover:border-brand-green',
  ghost: 'text-brand-green hover:underline',
  whatsapp: 'bg-brand-whatsapp text-black hover:opacity-90',
};

interface ButtonProps {
  variant?: Variant;
  size?: keyof typeof sizes;
  href?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  children,
  className,
  ariaLabel,
  type,
  disabled,
  onClick,
  target,
  rel,
}: ButtonProps) {
  const cls = cn(base, sizes[size], variants[variant], className);
  if (href) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel} target={target} rel={rel}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type ?? 'button'}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
