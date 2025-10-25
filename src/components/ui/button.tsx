import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-105 dark:shadow-glow dark:hover:shadow-lg",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-lg shadow-destructive/20",
        outline: "border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-accent/10 hover:border-accent/50 shadow-md shadow-border/10 hover:shadow-lg hover:shadow-accent/20 transform hover:scale-105 dark:bg-transparent dark:hover:bg-card dark:hover:shadow-card",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md shadow-secondary/15 hover:shadow-lg hover:shadow-secondary/25",
        ghost: "hover:bg-accent/20 hover:text-accent-foreground transition-colors",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/80",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 transform hover:scale-105 font-semibold dark:shadow-glow dark:hover:shadow-xl",
        "hero-outline": "border-2 border-primary bg-background/80 backdrop-blur-sm text-primary hover:bg-primary/10 hover:border-primary/70 shadow-lg shadow-primary/15 hover:shadow-xl hover:shadow-primary/25 transform hover:scale-105 dark:bg-transparent dark:hover:shadow-glow",
        ai: "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105 font-semibold dark:shadow-nature",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-xl px-4",
        lg: "h-14 rounded-2xl px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
