export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string; // ISO string 2023-10-05T09:00:00.000Z
}

export interface SavingsGoal {
  target: number;
}
