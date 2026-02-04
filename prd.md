# PRD - Dashboard de Gestão Financeira Pessoal

## 1. Visão Geral do Produto
O **Personal Finance Dashboard** é uma aplicação web focada em simplificar o controle financeiro pessoal. O objetivo é permitir que o usuário visualize para onde seu dinheiro está indo, defina metas de economia e tenha clareza sobre sua saúde financeira através de uma interface moderna e intuitiva.

### Proposta de Valor
*   **Simplicidade:** Foco em métricas essenciais, sem poluição visual.
*   **Visualização:** Gráficos interativos para fácil compreensão de tendências.
*   **Controle:** Ferramentas para categorizar gastos e acompanhar metas.

---

## 2. Requisitos Funcionais (Product Manager)

### 2.1. Dashboard Principal (Visão Geral)
*   **Resumo Mensal (Cards de KPI):**
    *   Receita Total (Mês atual).
    *   Despesas Totais (Mês atual).
    *   Saldo (Receita - Despesas).
    *   Economia (Comparativo com a meta).
*   **Gráfico de Tendência:** Evolução de Receitas vs. Despesas nos últimos 6 meses (Linha/Área).
*   **Distribuição de Gastos:** Gráfico de Pizza/Donut mostrando gastos por Categoria (Ex: Alimentação, Moradia, Lazer).
*   **Filtros de Data:** Seletor para alternar a visualização (Este Mês, Últimos 3 Meses, Ano Atual, Personalizado).

### 2.2. Gestão de Transações (CRUD)
*   **Listagem:** Tabela ou lista de transações recentes com paginação ou "load more".
*   **Adicionar Transação:**
    *   Tipo (Receita/Despesa).
    *   Valor (Input monetário).
    *   Data (DatePicker).
    *   Categoria (Dropdown personalizável).
    *   Descrição (Texto curto).
*   **Editar/Excluir:** Opções acessíveis em cada item da lista.
*   **Categorias:** O sistema deve vir com categorias padrão, mas permitir edição simples.

### 2.3. Metas de Economia
*   **Definição de Meta:** O usuário define um valor alvo para economizar no mês.
*   **Acompanhamento Visual:** Barra de progresso mostrando quanto já foi economizado vs. a meta.
*   **Alertas Visuais:** Indicador de cor (Verde = Dentro da meta, Vermelho = Perigo).

---

## 3. Arquitetura e Tecnologia (Software Architect)

### 3.1. Stack Tecnológico Sugerido
*   **Frontend Framework:** Next.js (App Router) + TypeScript.
*   **Estilização:** Tailwind CSS (para agilidade e consistência de design system).
*   **Ícones:** Lucide React (leve e consistente).
*   **Gerenciamento de Estado:** React Server Components (Server-Side) + React Hooks (Client-Side). Para estado global complexo (ex: filtros globais), considerar Zustand.

### 3.2. Bibliotecas Chave (Pesquisa & Análise)

#### A. Recharts (Visualização de Dados)
Biblioteca escolhida por ser composável, declarativa e baseada em React (SVG).
*   **Uso no Projeto:**
    *   `<AreaChart />`: Para o histórico de saldo/fluxo de caixa (visual suave e moderno).
    *   `<PieChart />` com `<Cell />`: Para categorias de despesas (Donut chart é mais limpo que pizza cheia).
    *   `<BarChart />`: Para comparativo Receita vs Despesa mês a mês.
    *   `<ResponsiveContainer />`: Obrigatório para garantir que os gráficos se adaptem ao mobile.
*   **Customização:** Tooltips customizados para mostrar valores formatados em BRL (R$).

#### B. date-fns (Manipulação de Datas)
Escolhida pela imutabilidade, modularidade (tree-shaking) e leveza em comparação ao Moment.js.
*   **Casos de Uso:**
    *   `format(date, 'dd/MM/yyyy')`: Para exibição em tabelas.
    *   `startOfMonth`, `endOfMonth`: Para filtros de "Este Mês".
    *   `subMonths`: Para calcular "Últimos 6 meses".
    *   `isSameMonth`: Para agrupar transações.
    *   `formatDistanceToNow`: "Adicionado há 2 horas" (opcional, para UX).
    *   **Localização:** Importar `ptBR` de `date-fns/locale` para garantir nomes de meses e dias em português.

### 3.3. Modelo de Dados (Schema Simplificado)

```typescript
type TransactionType = 'INCOME' | 'EXPENSE';

interface Transaction {
  id: string;
  amount: number; // Armazenar em centavos ou decimal
  date: Date;
  description: string;
  category: string;
  type: TransactionType;
  createdAt: Date;
}

interface SavingsGoal {
  month: string; // "MM-YYYY"
  targetAmount: number;
}
```

---

## 4. Diretrizes de UX/UI (Best Practices)

### 4.1. Design Limpo
*   **Fundo:** Usar tons neutros (branco ou cinza muito claro) para o fundo, cards brancos com sombras suaves (`shadow-sm` do Tailwind).
*   **Cores Semânticas:**
    *   Receita: Verde (Ex: `text-emerald-600`).
    *   Despesa: Vermelho/Rosa suave (Ex: `text-rose-600`), evitar vermelhos alarmantes.
    *   Meta: Azul ou Roxo (neutro/progresso).

### 4.2. Mobile First
*   Os gráficos devem empilhar verticalmente em telas pequenas.
*   O botão de "Nova Transação" deve ser um FAB (Floating Action Button) ou estar fixo na bottom bar em mobile para fácil acesso rápido.

### 4.3. Feedback
*   Mensagens de sucesso ao salvar transação.
*   Skeletons (loading states) enquanto os gráficos carregam.
