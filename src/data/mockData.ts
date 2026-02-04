export type TransactionType = 'income' | 'expense';

export interface Transaction {
    id: string;
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    date: string;
}

export const mockTransactions: Transaction[] = [
    {
        id: '1',
        description: 'Desenvolvimento de Site Freelance',
        amount: 5000,
        type: 'income',
        category: 'Trabalho',
        date: '2023-10-01',
    },
    {
        id: '2',
        description: 'Aluguel Apartamento',
        amount: 2200,
        type: 'expense',
        category: 'Moradia',
        date: '2023-10-02',
    },
    {
        id: '3',
        description: 'Supermercado Mensal',
        amount: 850.50,
        type: 'expense',
        category: 'Alimentação',
        date: '2023-10-05',
    },
    {
        id: '4',
        description: 'Venda de Curso Online',
        amount: 320,
        type: 'income',
        category: 'Vendas',
        date: '2023-10-07',
    },
    {
        id: '5',
        description: 'Conta de Energia',
        amount: 280,
        type: 'expense',
        category: 'Contas',
        date: '2023-10-10',
    },
    {
        id: '6',
        description: 'Academia',
        amount: 110,
        type: 'expense',
        category: 'Saúde',
        date: '2023-10-11',
    },
    {
        id: '7',
        description: 'Restaurante Fim de Semana',
        amount: 180,
        type: 'expense',
        category: 'Lazer',
        date: '2023-10-14',
    },
    {
        id: '8',
        description: 'Consultoria UI/UX',
        amount: 1500,
        type: 'income',
        category: 'Trabalho',
        date: '2023-10-15',
    },
    {
        id: '9',
        description: 'Uber/Transporte',
        amount: 65,
        type: 'expense',
        category: 'Transporte',
        date: '2023-10-18',
    },
    {
        id: '10',
        description: 'Spotify Premium',
        amount: 21.90,
        type: 'expense',
        category: 'Assinaturas',
        date: '2023-10-20',
    },
];
