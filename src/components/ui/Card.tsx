import { cn } from "@/lib/utils";
import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-xl border bg-card text-card-foreground shadow-sm p-6",
                className
            )}
            {...props}
        />
    );
}
