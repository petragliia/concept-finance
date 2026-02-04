import { create } from 'zustand';
import { Transaction, SavingsGoal } from '@/types';

interface FinanceStore {
    transactions: Transaction[];
    savingsGoal: SavingsGoal;
    selectedMonth: Date; // Current selected month for filtering

    // Actions
    addTransaction: (transaction: Transaction) => void;
    removeTransaction: (id: string) => void;
    updateTransaction: (id: string, updated: Partial<Transaction>) => void;
    setSavingsGoal: (goal: number) => void;
    setSelectedMonth: (date: Date) => void;
}

export const useStore = create<FinanceStore>((set) => ({
    transactions: [
        {
            id: "t1",
            description: "Salário Mensal",
            amount: 5000.00,
            type: "INCOME",
            category: "Salário",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 5).toISOString() // Current month
        },
        {
            id: "t2",
            description: "Supermercado Semanal",
            amount: 450.50,
            type: "EXPENSE",
            category: "Alimentação",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 10).toISOString()
        },
        {
            id: "t3",
            description: "Aluguel",
            amount: 1200.00,
            type: "EXPENSE",
            category: "Moradia",
            date: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
        }
    ],
    savingsGoal: { target: 1000 },
    selectedMonth: new Date(),

    addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
    removeTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
    })),
    updateTransaction: (id, updated) => set((state) => ({
        transactions: state.transactions.map((t) => (t.id === id ? { ...t, ...updated } : t))
    })),
    setSavingsGoal: (goal) => set({ savingsGoal: { target: goal } }),
    setSelectedMonth: (date) => set({ selectedMonth: date }),
}));
