import { useStore } from "@/store/useStore";
import { format, subMonths, addMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function DateFilter() {
    const { selectedMonth, setSelectedMonth } = useStore();

    const handlePrevMonth = () => setSelectedMonth(subMonths(selectedMonth, 1));
    const handleNextMonth = () => setSelectedMonth(addMonths(selectedMonth, 1));

    return (
        <div className="flex items-center gap-4 bg-white p-2 rounded-lg border shadow-sm">
            <Button variant="ghost" onClick={handlePrevMonth}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="min-w-[150px] text-center font-medium capitalize">
                {format(selectedMonth, "MMMM yyyy", { locale: ptBR })}
            </span>
            <Button variant="ghost" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
