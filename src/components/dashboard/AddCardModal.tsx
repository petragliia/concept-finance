'use client';

import React, { useState } from 'react';
import { X, CreditCard, Palette } from 'lucide-react';
import { useFinanceStore, Card } from '@/stores/useFinanceStore';

interface AddCardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCardModal({ isOpen, onClose }: AddCardModalProps) {
    const { addCard } = useFinanceStore();

    const [bankName, setBankName] = useState('');
    const [holder, setHolder] = useState('');
    const [balance, setBalance] = useState('');
    const [expiry, setExpiry] = useState('');
    const [last4, setLast4] = useState('');
    const [color, setColor] = useState<Card['color']>('black');
    const [type, setType] = useState<'credit' | 'debit'>('credit');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!bankName || !holder || !balance || !expiry || !last4) return;

        const numericBalance = parseFloat(balance.replace('R$', '').replace('.', '').replace(',', '.'));

        if (isNaN(numericBalance)) return;

        addCard({
            type,
            holder: holder.toUpperCase(),
            balance: numericBalance,
            expiry,
            last4,
            color,
            bankName
        });

        // Reset and close
        setBankName('');
        setHolder('');
        setBalance('');
        setExpiry('');
        setLast4('');
        setColor('black');
        setType('credit');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800">Novo Cartão</h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nome do Banco</label>
                        <input
                            type="text"
                            placeholder="Ex: Nubank, Inter..."
                            value={bankName}
                            onChange={(e) => setBankName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Titular do Cartão</label>
                        <input
                            type="text"
                            placeholder="Nome impresso no cartão"
                            value={holder}
                            onChange={(e) => setHolder(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Saldo Atual (R$)</label>
                            <input
                                type="text"
                                placeholder="0,00"
                                value={balance}
                                onChange={(e) => setBalance(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Tipo</label>
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value as 'credit' | 'debit')}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none"
                            >
                                <option value="credit">Crédito</option>
                                <option value="debit">Débito</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Validade</label>
                            <input
                                type="text"
                                placeholder="MM/AA"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                                maxLength={5}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Últimos 4 dígitos</label>
                            <input
                                type="text"
                                placeholder="0000"
                                value={last4}
                                onChange={(e) => setLast4(e.target.value)}
                                maxLength={4}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                required
                            />
                        </div>
                    </div>

                    {type === 'credit' && (
                        <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-top-2 duration-200">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Limite do Cartão</label>
                                <input
                                    type="number"
                                    placeholder="R$ 0,00"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Dia Vencimento</label>
                                <input
                                    type="number"
                                    placeholder="Dia"
                                    min="1"
                                    max="31"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Palette size={16} /> Cor do Cartão
                        </label>
                        <div className="flex gap-3">
                            {(['emerald', 'black', 'blue', 'purple'] as const).map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setColor(c)}
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${color === c ? 'border-gray-900 scale-110' : 'border-transparent'}`}
                                    style={{
                                        backgroundColor:
                                            c === 'emerald' ? '#059669' :
                                                c === 'black' ? '#111827' :
                                                    c === 'blue' ? '#2563eb' : '#7c3aed'
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-emerald-200 mt-4"
                    >
                        Adicionar Cartão
                    </button>
                </form>
            </div>
        </div>
    );
}
