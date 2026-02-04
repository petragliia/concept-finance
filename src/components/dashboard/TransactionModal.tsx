'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useFinanceStore } from '@/stores/useFinanceStore';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function TransactionModal({ isOpen, onClose }: TransactionModalProps) {
    const { addTransaction } = useFinanceStore();

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'income' | 'expense'>('expense');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!description || !amount || !category) return;

        // Convert amount to positive number
        // Handle 'R$' or ',' input if user types it manually
        const numericAmount = parseFloat(amount.replace('R$', '').replace('.', '').replace(',', '.'));

        if (isNaN(numericAmount)) return;

        addTransaction({
            description,
            amount: numericAmount,
            type,
            category,
            date: new Date().toISOString(),
        });

        // Reset and close
        setDescription('');
        setAmount('');
        setCategory('');
        setType('expense');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Nova Transação</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Descrição</label>
                        <input
                            type="text"
                            placeholder="Ex: Aluguel, Freela..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Valor</label>
                        <input
                            type="number"
                            placeholder="0,00"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            step="0.01"
                            min="0"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo</label>
                            <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-xl">
                                <button
                                    type="button"
                                    onClick={() => setType('income')}
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${type === 'income'
                                        ? 'bg-emerald-500 text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Entrada
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setType('expense')}
                                    className={`py-2 rounded-lg text-sm font-medium transition-all ${type === 'expense'
                                        ? 'bg-red-500 text-white shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Saída
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Categoria</label>
                            <input
                                type="text"
                                placeholder="Ex: Moradia"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200 mt-4"
                    >
                        Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}
