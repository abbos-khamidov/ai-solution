'use client';

/**
 * GradientButton - Premium gradient button with shimmer effect
 */

import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface GradientButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  /** Show shimmer effect */
  shimmer?: boolean;
  /** Icon to render before text */
  icon?: React.ReactNode;
  /** Icon to render after text */
  iconRight?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: `
    bg-gradient-to-r from-[#0066FF] to-[#00D9FF] text-white
    shadow-lg shadow-blue-500/20
    hover:shadow-xl hover:shadow-blue-500/30
    active:shadow-md
  `,
  secondary: `
    bg-white text-[#0F1419]
    border border-[rgba(0,0,0,0.08)]
    shadow-card
    hover:shadow-card-hover hover:border-[rgba(0,0,0,0.12)]
  `,
  outline: `
    bg-transparent text-[#0066FF]
    border-2 border-[#0066FF]
    hover:bg-[#0066FF] hover:text-white
  `,
  ghost: `
    bg-transparent text-[#536471]
    hover:bg-[rgba(0,0,0,0.04)] hover:text-[#0F1419]
  `,
};

export function GradientButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  href,
  disabled = false,
  shimmer = false,
  icon,
  iconRight,
  type = 'button',
}: GradientButtonProps) {
  const baseClasses = `
    relative inline-flex items-center justify-center
    font-medium
    transition-all duration-300 ease-out-expo
    disabled:opacity-50 disabled:cursor-not-allowed
    overflow-hidden
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `.trim();

  const content = (
    <>
      {/* Shimmer overlay */}
      {shimmer && variant === 'primary' && (
        <span
          className="absolute inset-0 overflow-hidden rounded-inherit pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
            }}
          />
        </span>
      )}

      {/* Content */}
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="relative z-10">{children}</span>
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={baseClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
