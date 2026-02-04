# SPEC - Technical Specification: Dashboard de Gestão Financeira Pessoal

## 1. Visão Técnica (Lead Developer)
Este documento traduz os requisitos do `prd.md` em uma estrutura técnica executável. O foco é manutenibilidade, separação de responsabilidades (SoC) e escalabilidade.

**Stack Confirmada:**
*   Framework: Next.js 14+ (App Router)
*   Styling: Tailwind CSS
*   State Management: **Zustand** (Escolhido pela simplicidade e menor boilerplate comparado ao Context API para este escopo).
*   Icons: Lucide React

---

## 2. Estrutura de Arquivos Detalhada
Utilizaremos uma arquitetura modular, agrupando componentes por funcionalidade sempre que possível, e mantendo UI genérica separada.

```
src/
├── app/
│   ├── layout.tsx            # Layout Global (Fontes, Providers)
│   ├── page.tsx              # Dashboard Principal (Rota /)
│   └── transactions/
│       └── page.tsx          # Página detalhada de transações (Opcional, se o modal não bastar)
├── components/
│   ├── dashboard/            # Componentes específicos do Dashboard
│   │   ├── SummaryCard.tsx   # Card de KPI (Saldo, Receita)
│   │   ├── ExpenseChart.tsx  # Gráfico de Pizza/Donut (Recharts)
│   │   ├── TrendChart.tsx    # Gráfico de Linha/Área (Recharts)
│   │   ├── GoalsCard.tsx     # Card de Meta de Economia
│   │   └── DateFilter.tsx    # Seletor de período (Mês/Ano)
│   ├── transactions/         # Componentes de Transação
│   │   ├── TransactionList.tsx    # Lista/Tabela de transações recentes
│   │   ├── TransactionItem.tsx    # Linha individual da transação
│   │   └── TransactionForm.tsx    # Formulário (Modal) para Add/Edit
│   ├── ui/                   # Componentes Genéricos (Design System)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Modal.tsx
├── lib/                      # Configurações de libs
│   └── utils.ts              # cn() para Tailwind merge
├── hooks/
│   └── useFinanceMetrics.ts  # Hook para cálculos derivados (Saldos, Totais)
├── store/
│   └── useStore.ts           # Store Global (Zustand)
├── types/
│   └── index.ts              # Definições de Tipos (Transaction, Goal, etc)
└── utils/
    ├── currency.ts           # Formatadores de Moeda (Intl)
    └── date.ts               # Helpers de Data (date-fns wrappers)
```

---

## 3. Componentes Necessários

### 3.1. Dashboard
*   **`SummaryCardsSection`**: Container para os 4 cards principais.
*   **`SummaryCard`**:
    *   Props: `title`, `value`, `icon`, `trend` (opcional), `variant` (success, danger, neutral).
*   **`ExpenseChart`**:
    *   Usa `Recharts` (`PieChart`).
    *   Recebe dados agrupados por categoria.
*   **`TrendChart`**:
    *   Usa `Recharts` (`AreaChart`).
    *   Mostra evolução temporal.

### 3.2. Transações
*   **`TransactionTable`** (ou List):
    *   Itera sobre o array de transações filtrado.
*   **`TransactionFormModal`**:
    *   Gerencia o estado do formulário localmente.
    *   Chama a action `addTransaction` da Store ao submeter.

---

## 4. Estrutura do Estado (Zustand)

Optamos pelo **Zustand** para evitar o "Prop Drilling" e renderizações desnecessárias. O estado deve conter os dados brutos, enquanto os cálculos ficam nos Hooks/Seletores.

```typescript
// src/store/useStore.ts

import { create } from 'zustand';
import { Transaction, SavingsGoal } from '@/types';

interface FinanceStore {
  transactions: Transaction[];
  savingsGoal: SavingsGoal;
  selectedMonth: Date; // Mês atual selecionado no filtro

  // Actions
  addTransaction: (transaction: Transaction) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, updated: Partial<Transaction>) => void;
  setSavingsGoal: (goal: number) => void;
  setSelectedMonth: (date: Date) => void;
}

export const useStore = create<FinanceStore>((set) => ({
  transactions: [], // Inicialmente vazio ou com dados mockados
  savingsGoal: { target: 1000, current: 0 },
  selectedMonth: new Date(),

  addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
  removeTransaction: (id) => set((state) => ({ 
    transactions: state.transactions.filter((t) => t.id !== id) 
  })),
  // ... outras implementações
}));
```

---

## 5. Mock de Dados (JSON Structure)

Os dados devem ser estruturados para facilitar o trabalho com `date-fns` (datas em formato ISO string ou timestamp).

```json
{
  "transactions": [
    {
      "id": "t1",
      "description": "Salário Mensal",
      "amount": 5000.00,
      "type": "INCOME",
      "category": "Salário",
      "date": "2023-10-05T09:00:00.000Z"
    },
    {
      "id": "t2",
      "description": "Supermercado Semanal",
      "amount": 450.50,
      "type": "EXPENSE",
      "category": "Alimentação",
      "date": "2023-10-10T14:30:00.000Z"
    },
    {
      "id": "t3",
      "description": "Aluguel",
      "amount": 1200.00,
      "type": "EXPENSE",
      "category": "Moradia",
      "date": "2023-10-01T08:00:00.000Z"
    }
  ],
  "userSettings": {
    "currency": "BRL",
    "monthlySavingsTarget": 1000.00
  }
}
```

---

## 6. Lógica de Negócio (Isolamento)

**Regra de Ouro:** Componentes de UI **NÃO** devem calcular totais. Eles apenas exibem dados prontos.

Calcularemos métricas derivadas em um Custom Hook: `hooks/useFinanceMetrics.ts`.

### Por que?
1.  **Testabilidade:** É fácil testar o hook isoladamente.
2.  **Performance:** Podemos usar `useMemo` dentro do hook para evitar recálculos pesados a cada renderização.
3.  **Organização:** O componente `SummaryCard` fica limpo, recebendo apenas `totalBalance`.

### Exemplo de Implementação da Lógica:

```typescript
// src/hooks/useFinanceMetrics.ts
import { useStore } from '@/store/useStore';
import { useMemo } from 'react';
import { isSameMonth } from 'date-fns';

export const useFinanceMetrics = () => {
  const { transactions, selectedMonth, savingsGoal } = useStore();

  const metrics = useMemo(() => {
    // 1. Filtrar transações do mês selecionado
    const monthlyTransactions = transactions.filter(t => 
      isSameMonth(new Date(t.date), selectedMonth)
    );

    // 2. Calcular Totais
    const income = monthlyTransactions
      .filter(t => t.type === 'INCOME')
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = monthlyTransactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => acc + t.amount, 0);

    const balance = income - expense;

    // 3. Calcular Progresso da Meta
    const savingsPercentage = savingsGoal.target > 0 
      ? (balance / savingsGoal.target) * 100 
      : 0;

    return {
      monthlyIncome: income,
      monthlyExpense: expense,
      monthlyBalance: balance,
      savingsProgress: Math.min(savingsPercentage, 100),
      isPositive: balance >= 0
    };
  }, [transactions, selectedMonth, savingsGoal.target]);

  return metrics;
};
```
