'use client';

import React from 'react';
import { useFinanceStore } from '@/stores/useFinanceStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

export default function SummaryCards() {
    const { getSummary } = useFinanceStore();
    const { totalIncome, totalExpense, balance } = getSummary();

    const cards = [
        {
            title: 'Entradas',
            value: totalIncome,
            icon: ArrowUpCircle,
            color: 'text-emerald-500',
            bg: 'bg-emerald-50',
        },
        {
            title: 'Saídas',
            value: totalExpense,
            icon: ArrowDownCircle,
            color: 'text-red-500',
            bg: 'bg-red-50',
        },
        {
            title: 'Saldo Total',
            value: balance,
            icon: DollarSign,
            color: balance >= 0 ? 'text-blue-500' : 'text-red-500',
            bg: balance >= 0 ? 'bg-blue-50' : 'bg-red-50',
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => (
                <div
                    key={card.title}
                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-gray-500 font-medium">{card.title}</span>
                        <div className={`p-2 rounded-lg ${card.bg}`}>
                            <card.icon className={`w-6 h-6 ${card.color}`} />
                        </div>
                    </div>
                    <h3 className={`text-2xl font-bold ${card.title === 'Saldo Total' ? card.color : 'text-gray-800'}`}>
                        {formatCurrency(card.value)}
                    </h3>
                </div>
            ))}
        </div>
    );
}
