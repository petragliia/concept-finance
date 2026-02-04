'use client';

import React, { useState } from 'react';
import {
    LayoutDashboard,
    Wallet,
    ArrowRightLeft,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

import FloatingPortfolioButton from './FloatingPortfolioButton';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
        { name: 'Transações', icon: ArrowRightLeft, href: '/transactions' },
        { name: 'Carteira', icon: Wallet, href: '/wallet' },
        { name: 'Configurações', icon: Settings, href: '/settings' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-sans">
            <FloatingPortfolioButton />
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                        Concept Finance
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${pathname === item.href
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <item.icon size={20} />
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <LogOut size={20} />
                        Sair
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-50">
                    <h1 className="text-xl font-bold text-gray-800">Concept Finance</h1>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </header>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="md:hidden fixed top-[65px] left-0 w-full h-[calc(100vh-65px)] bg-white z-40 shadow-lg animate-in slide-in-from-top-2 overflow-y-auto">
                        <nav className="p-4 space-y-2">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-semibold transition-colors
                                        ${pathname === item.href
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon size={24} />
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-gray-100 mt-4">
                            <button className="flex items-center gap-3 px-4 py-4 w-full text-lg font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                                <LogOut size={24} />
                                Sair
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 p-6 md:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
