import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 blur-sm" />
        <textarea
          className={cn(
            "flex min-h-[120px] w-full rounded-lg border border-border/50 bg-secondary/50 px-4 py-3 text-sm text-foreground shadow-sm transition-all duration-300",
            "placeholder:text-muted-foreground/70",
            "focus-visible:outline-none focus-visible:border-primary/50 focus-visible:bg-secondary focus-visible:shadow-[0_0_15px_rgba(212,175,55,0.1)]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
