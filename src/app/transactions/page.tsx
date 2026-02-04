'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { Search, Filter, Download } from 'lucide-react';

export default function TransactionsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Transações</h2>
                        <p className="text-gray-500">Histórico completo de movimentações.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
                            <Download size={18} />
                            Exportar
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por descrição..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                        <Filter size={18} />
                        Filtros
                    </button>
                </div>

                {/* We are reusing the component. In a real app we might pass props to disable the "Recent" title or height */}
                <div className="h-full">
                    <TransactionTable />
                </div>
            </div>
        </DashboardLayout>
    );
}
