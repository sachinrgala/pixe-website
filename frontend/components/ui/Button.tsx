import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
    size?: "sm" | "md" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
                    {
                        "bg-primary text-white shadow-lg shadow-blue-500/25 hover:bg-primary-dark hover:-translate-y-0.5": variant === "primary",
                        "bg-slate-900 text-white shadow-lg hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5": variant === "secondary",
                        "border-2 border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-primary hover:text-primary": variant === "outline",
                        "text-slate-600 hover:text-primary hover:bg-slate-50": variant === "ghost",
                        "text-accent underline-offset-4 hover:underline": variant === "link",
                        "h-9 px-4 text-xs": size === "sm",
                        "h-11 px-6 text-sm": size === "md",
                        "h-14 px-8 text-base": size === "lg",
                        "h-10 w-10 p-0": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        );
    }
);
Button.displayName = "Button";

export { Button };
