import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/utils/currency";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    variant?: 'default' | 'success' | 'danger';
}

export function SummaryCard({ title, value, icon: Icon, variant = 'default' }: SummaryCardProps) {
    const variantStyles = {
        default: "text-gray-900",
        success: "text-green-600",
        danger: "text-red-600",
    };

    return (
        <Card>
            <div className="flex items-center justify-between pb-2">
                <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                <Icon className={cn("h-4 w-4", variantStyles[variant])} />
            </div>
            <div className="text-2xl font-bold">
                {formatCurrency(value)}
            </div>
        </Card>
    );
}
