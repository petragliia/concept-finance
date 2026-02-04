import { create } from 'zustand';
import { Transaction, mockTransactions } from '@/data/mockData';

export interface Card {
    id: string;
    type: 'credit' | 'debit';
    holder: string;
    balance: number;
    expiry: string;
    last4: string;
    color: 'emerald' | 'black' | 'blue' | 'purple';
    bankName: string;
    limit?: number; // Credit limit
    closingDay?: number; // Invoice closing day
}

interface FinanceStore {
    transactions: Transaction[];
    cards: Card[];
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    removeTransaction: (id: string) => void;
    addCard: (card: Omit<Card, 'id'>) => void;
    getSummary: () => {
        totalIncome: number;
        totalExpense: number;
        balance: number;
    };
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
    transactions: mockTransactions,
    cards: [
        {
            id: '1',
            type: 'credit',
            holder: 'JOAO VITOR',
            balance: 12450.90,
            expiry: '12/28',
            last4: '4242',
            color: 'emerald',
            bankName: 'Concept Bank'
        },
        {
            id: '2',
            type: 'debit',
            holder: 'CONCEPT MEMBER',
            balance: 0, // Credit limit or hidden
            expiry: '09/26',
            last4: '8899',
            color: 'black',
            bankName: 'Nubank'
        }
    ],

    addTransaction: (transaction) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
        };

        set((state) => ({
            transactions: [newTransaction, ...state.transactions],
        }));
    },

    removeTransaction: (id) => {
        set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
        }));
    },

    addCard: (card) => {
        const newCard = {
            ...card,
            id: crypto.randomUUID(),
        };
        set((state) => ({
            cards: [...state.cards, newCard]
        }));
    },

    getSummary: () => {
        const { transactions } = get();

        const totalIncome = transactions
            .filter((t) => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);

        const totalExpense = transactions
            .filter((t) => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    },
}));
