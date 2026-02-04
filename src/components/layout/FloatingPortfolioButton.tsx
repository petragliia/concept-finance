'use client';

import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function FloatingPortfolioButton() {
    return (
        <a
            href="https://concept-digital-portfolio.vercel.app/"
            className="fixed bottom-6 left-6 z-[60] group flex flex-col overflow-hidden rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 active:scale-95"
        >
            {/* Top Label */}
            <div className="bg-[#111827] px-4 py-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FDE68A] animate-pulse" />
                <span className="text-[10px] font-bold text-white tracking-[0.2em] uppercase">
                    Projeto Demonstrativo
                </span>
            </div>

            {/* Main Button Body */}
            <div className="bg-emerald-600 px-5 py-3 flex items-center justify-between gap-6 transition-colors group-hover:bg-emerald-700">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest leading-none mb-1">
                        Voltar ao
                    </span>
                    <span className="text-xl font-black text-white tracking-tighter leading-none">
                        PORTFÓLIO
                    </span>
                </div>

                <div className="bg-white/10 p-2 rounded-lg border border-white/20 group-hover:bg-white/20 transition-all">
                    <ArrowLeft size={24} className="text-white transform group-hover:-translate-x-1 transition-transform" />
                </div>
            </div>
        </a>
    );
}
