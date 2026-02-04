'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SummaryCards from '@/components/dashboard/SummaryCards';
import FinanceChart from '@/components/dashboard/FinanceChart';
import TransactionTable from '@/components/dashboard/TransactionTable';
import TransactionModal from '@/components/dashboard/TransactionModal';
import { Plus } from 'lucide-react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Visão Geral</h2>
            <p className="text-gray-500">Bem-vindo de volta ao seu controle financeiro.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-emerald-200"
          >
            <Plus size={20} />
            Nova Transação
          </button>
        </header>

        {/* Summary Cards */}
        <section>
          <SummaryCards />
        </section>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FinanceChart />
          </div>
          <div className="lg:col-span-1">
            <TransactionTable />
          </div>
        </div>

        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </DashboardLayout>
  );
}
