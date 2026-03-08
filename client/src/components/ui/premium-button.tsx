import * as React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  children: React.ReactNode;
}

const PremiumButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 ease-out focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 overflow-hidden group";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:-translate-y-0.5",
      outline: "border-gradient-gold text-foreground hover:bg-primary/5",
      ghost: "text-muted-foreground hover:text-primary hover:bg-primary/5",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs rounded-md",
      default: "h-11 px-8 text-sm rounded-md",
      lg: "h-14 px-10 text-base rounded-lg",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {variant === 'primary' && (
          <span className="absolute inset-0 w-full h-full -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />
        )}
        <span className="relative flex items-center gap-2">
          {children}
        </span>
      </button>
    )
  }
)
PremiumButton.displayName = "PremiumButton"

export { PremiumButton }
