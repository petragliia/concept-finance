'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Plus, CreditCard, Wallet as WalletIcon, MoreHorizontal } from 'lucide-react';
import { useFinanceStore, Card } from '@/stores/useFinanceStore';
import AddCardModal from '@/components/dashboard/AddCardModal';

export default function WalletPage() {
    const { cards } = useFinanceStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Helper to get card gradient/color
    const getCardStyle = (color: Card['color']) => {
        switch (color) {
            case 'emerald': return 'bg-gradient-to-br from-emerald-900 to-emerald-600 text-white';
            case 'black': return 'bg-gray-900 text-white';
            case 'blue': return 'bg-gradient-to-br from-blue-900 to-blue-600 text-white';
            case 'purple': return 'bg-gradient-to-br from-purple-900 to-purple-600 text-white';
            default: return 'bg-gray-900 text-white';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Minha Carteira</h2>
                        <p className="text-gray-500">Gerencie seus cartões e contas bancárias.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                    >
                        <Plus size={18} />
                        Novo Cartão
                    </button>
                </header>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                        <div
                            key={card.id}
                            className={`${getCardStyle(card.color)} p-6 rounded-2xl shadow-xl aspect-[1.586/1] flex flex-col justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300`}
                        >
                            {/* Decorative element for emerald/colored cards */}
                            {card.color !== 'black' && (
                                <div className="absolute -top-10 -right-10 p-8 opacity-10 transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                    <WalletIcon size={180} />
                                </div>
                            )}
                            {/* Decorative for black card */}
                            {card.color === 'black' && (
                                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/5 to-transparent pointer-events-none"></div>
                            )}

                            <div className="flex justify-between items-start z-10">
                                <div>
                                    <p className={`${card.color === 'emerald' ? 'text-emerald-100' : 'text-gray-300'} text-sm font-medium`}>
                                        {card.bankName}
                                    </p>
                                    <h3 className="text-2xl font-bold mt-1 tracking-tight">R$ {card.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3>
                                </div>
                                <CreditCard className={card.color === 'emerald' ? 'text-emerald-200' : 'text-gray-400'} size={32} />
                            </div>
                            <div className="space-y-6 z-10">
                                <div className="flex justify-between items-center">
                                    <div className="space-y-1">
                                        <div className={`${card.color === 'emerald' ? 'text-emerald-100/60' : 'text-white/60'} text-[10px] uppercase tracking-wider font-bold`}>Titular</div>
                                        <div className="font-medium tracking-wide text-sm">{card.holder}</div>
                                    </div>
                                    <div className="space-y-1 text-right">
                                        <div className={`${card.color === 'emerald' ? 'text-emerald-100/60' : 'text-white/60'} text-[10px] uppercase tracking-wider font-bold`}>Validade</div>
                                        <div className="font-medium text-sm">{card.expiry}</div>
                                    </div>
                                </div>
                                <p className={`font-mono text-lg tracking-widest ${card.color === 'emerald' ? 'text-emerald-50' : 'text-gray-300'}`}>
                                    **** **** **** {card.last4}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Add New Mock Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group aspect-[1.586/1]"
                    >
                        <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors shadow-sm">
                            <Plus size={24} />
                        </div>
                        <span className="font-medium">Adicionar novo banco</span>
                    </button>
                </div>

                {/* Accounts List (Using the same data for consistency or separating if needed, for now just static or mapped from cards if they are 'debit') */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-800">Contas Conectadas</h3>
                        <button className="text-emerald-600 text-sm font-medium hover:underline">Gerenciar</button>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {cards.map((card) => (
                            <div key={card.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shadow-sm ${card.color === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                                            card.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                                card.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-gray-100 text-gray-600'
                                        }`}>
                                        {card.bankName.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">{card.bankName}</p>
                                        <p className="text-sm text-gray-500">{card.type === 'credit' ? 'Cartão de Crédito' : 'Conta Corrente'} • Final {card.last4}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-semibold text-gray-700">R$ {card.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                                    <MoreHorizontal size={18} className="text-gray-400" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <AddCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </DashboardLayout>
    );
}
