import { useStore } from '@/store/useStore';
import { useMemo } from 'react';
import { isSameMonth } from 'date-fns';

export const useFinanceMetrics = () => {
    const { transactions, selectedMonth, savingsGoal } = useStore();

    const metrics = useMemo(() => {
        // 1. Filter transactions by selected month
        const monthlyTransactions = transactions.filter(t =>
            isSameMonth(new Date(t.date), selectedMonth)
        );

        // 2. Calculate Totals
        const income = monthlyTransactions
            .filter(t => t.type === 'INCOME')
            .reduce((acc, t) => acc + t.amount, 0);

        const expense = monthlyTransactions
            .filter(t => t.type === 'EXPENSE')
            .reduce((acc, t) => acc + t.amount, 0);

        const balance = income - expense;

        // 3. Calculate Savings Goal Progress
        const savingsPercentage = savingsGoal.target > 0
            ? (balance / savingsGoal.target) * 100
            : 0;

        return {
            monthlyIncome: income,
            monthlyExpense: expense,
            monthlyBalance: balance,
            savingsProgress: Math.min(savingsPercentage, 100),
            isPositive: balance >= 0,
        };
    }, [transactions, selectedMonth, savingsGoal.target]);

    return metrics;
};
