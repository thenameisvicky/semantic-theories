
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

  const getVariantClasses = () => {
    const baseClasses = "transition-all duration-150 ease-out";
    const disabledClasses = rest.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    
    switch (variant) {
      case 'default':
        return `${baseClasses} ${variantClasses.default} bg-surface border-[var(--border)] text-primary hover:bg-surface-hover hover:border-[var(--border-hover)] ${disabledClasses}`;
      case 'icon':
        return `${baseClasses} ${variantClasses.icon} bg-transparent text-primary hover:bg-surface-hover ${disabledClasses}`;
      case 'text':
        return `${baseClasses} ${variantClasses.text} bg-surface border-[var(--border)] text-primary hover:bg-surface-hover hover:border-[var(--border-hover)] ${disabledClasses}`;
      default:
        return `${baseClasses} ${variantClasses.default} ${disabledClasses}`;
    }
  };

  return (
    <button
      className={`${getVariantClasses()} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}

