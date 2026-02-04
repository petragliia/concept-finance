'use client';

import React from 'react';
import { useFinanceStore } from '@/stores/useFinanceStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { Trash2, Inbox } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function TransactionTable() {
    const { transactions, removeTransaction } = useFinanceStore();

    if (transactions.length === 0) {
        return (
            <div className="h-96 bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center justify-center text-center">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Inbox className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Nenhuma transação ainda</h3>
                <p className="text-gray-500 max-w-xs">
                    Adicione suas receitas e despesas para começar a visualizar seu controle financeiro.
                </p>
            </div>
        );
    }

    // Sort transactions by date (newest first)
    const sortedTransactions = [...transactions].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-96">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Transações Recentes</h3>
            </div>

            <div className="overflow-y-auto flex-1 p-0">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Descrição</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Valor</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Categoria</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data</th>
                            <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sortedTransactions.map((transaction) => (
                            <tr key={transaction.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                    {transaction.description}
                                </td>
                                <td className={`py-4 px-6 text-sm font-bold ${transaction.type === 'income' ? 'text-emerald-500' : 'text-red-500'
                                    }`}>
                                    {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-500">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                                        {transaction.category}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-500">
                                    {format(parseISO(transaction.date), "dd 'de' MMM, yyyy", { locale: ptBR })}
                                </td>
                                <td className="py-4 px-6 text-sm text-right">
                                    <button
                                        onClick={() => removeTransaction(transaction.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                        title="Excluir Transação"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
