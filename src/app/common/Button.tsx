"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: "default" | "icon" | "text";
  className?: string;
  style?: React.CSSProperties;
};

export default function Button({
  children,
  variant = "default",
  className = "",
  style,
  ...rest
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    default: "px-3 py-2 rounded-md text-sm font-medium border transition-colors",
    icon: "bg-transparent border-none p-1.5 rounded transition-colors",
    text: "px-3 py-1.5 rounded-md text-sm font-medium border transition-colors",
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      color: 'var(--text)'
    },
    icon: {
      backgroundColor: 'transparent',
      color: 'var(--text)'
    },
    text: {
      backgroundColor: 'var(--surface)',
      borderColor: 'var(--border)',
      color: 'var(--text)'
    },
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rest.disabled) return;
    if (variant === 'default' || variant === 'text') {
      e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
      e.currentTarget.style.borderColor = 'var(--border-hover)';
    } else if (variant === 'icon') {
      e.currentTarget.style.backgroundColor = 'var(--surface-hover)';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (rest.disabled) return;
    if (variant === 'default' || variant === 'text') {
      e.currentTarget.style.backgroundColor = 'var(--surface)';
      e.currentTarget.style.borderColor = 'var(--border)';
    } else if (variant === 'icon') {
      e.currentTarget.style.backgroundColor = 'transparent';
    }
  };

  const disabledStyles: React.CSSProperties = rest.disabled ? {
    opacity: 0.5,
    cursor: 'not-allowed'
  } : {};

  return (
    <button
      className={`transition-all duration-150 ease-out ${variantClasses[variant]} ${className} ${rest.disabled ? '' : 'cursor-pointer'}`}
      style={{ ...variantStyles[variant], ...disabledStyles, ...style }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {children}
    </button>
  );
}

