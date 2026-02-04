'use client';

import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { useFinanceStore } from '@/stores/useFinanceStore';
import { startOfMonth, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function FinanceChart() {
    const { transactions } = useFinanceStore();

    // Process data for the chart (Group by Month)
    const data = React.useMemo(() => {
        // 1. Group transactions by month
        const grouped = transactions.reduce((acc, t) => {
            const date = parseISO(t.date);
            const monthKey = format(date, 'yyyy-MM');

            if (!acc[monthKey]) {
                acc[monthKey] = {
                    month: format(date, 'MMM', { locale: ptBR }),
                    income: 0,
                    expense: 0,
                    fullDate: date, // Keep basic date for sorting
                };
            }

            if (t.type === 'income') {
                acc[monthKey].income += t.amount;
            } else {
                acc[monthKey].expense += t.amount;
            }

            return acc;
        }, {} as Record<string, { month: string; income: number; expense: number; fullDate: Date }>);

        // 2. Convert to array and sort by date
        return Object.values(grouped).sort((a, b) => a.fullDate.getTime() - b.fullDate.getTime());
    }, [transactions]);

    // If empty or very few data points, show a mock "Empty Chart" state or just the empty grid
    if (data.length === 0) {
        return (
            <div className="h-96 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col items-center justify-center text-gray-400">
                <p>Ainda não há dados suficientes para o gráfico.</p>
            </div>
        );
    }

    return (
        <div className="h-96 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Evolução Mensal</h3>
            <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#9ca3af', fontSize: 12 }}
                            tickFormatter={(value) => `R$${value}`}
                        />
                        <Tooltip
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            formatter={(value?: number) => [value ? `R$ ${value.toFixed(2)}` : 'R$ 0,00', '']}
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            name="Receitas"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            name="Despesas"
                            stroke="#ef4444"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
