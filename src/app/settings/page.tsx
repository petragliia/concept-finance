'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { User, Bell, Shield, Moon, Globe, LogOut, ChevronRight, Check, X } from 'lucide-react';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Mount effect to avoid hydration mismatch
    useEffect(() => setMounted(true), []);

    const [notifications, setNotifications] = useState(true);
    const [showLangModal, setShowLangModal] = useState(false);

    // Config state
    const [language, setLanguage] = useState('Português (BR)');
    const [currency, setCurrency] = useState('BRL (R$)');

    // Profile form state
    const [name, setName] = useState('João Vitor Martins Petraglia');
    const [email, setEmail] = useState('joao.petraglia@concept.com');
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveProfile = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const toggleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    // Prevent hydration mismatch for theme toggle
    if (!mounted) return null;

    return (
        <DashboardLayout>
            <div className="max-w-3xl border-l border-gray-100/0 md:border-gray-100/0 space-y-8 pb-10">
                <header>
                    <h2 className="text-2xl font-bold text-gray-800">Configurações</h2>
                    <p className="text-gray-500">Gerencie suas preferências e dados da conta.</p>
                </header>

                {/* Profile Section */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Perfil e Segurança</h3>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                        <div className="p-6 flex items-start gap-4 border-b border-gray-50">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-emerald-200">
                                JV
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg text-gray-800">João Vitor</h4>
                                <p className="text-gray-500 text-sm">joao.project@concept.com</p>
                                <button className="mt-2 text-sm text-emerald-600 font-medium hover:text-emerald-700">Alterar foto</button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-100 text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="pt-2 flex items-center gap-3">
                                <button
                                    onClick={handleSaveProfile}
                                    className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    {isSaved ? <Check size={18} /> : null}
                                    {isSaved ? 'Salvo!' : 'Salvar Alterações'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Preferences Section */}
                <section className="space-y-4">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider ml-1">Aparência e App</h3>
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm divide-y divide-gray-50">

                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                                    <Moon size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Modo Escuro</p>
                                    <p className="text-xs text-gray-500">Alternar entre temas claro e escuro</p>
                                </div>
                            </div>
                            <button
                                onClick={toggleDarkMode}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out cursor-pointer ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                                    <Bell size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Notificações</p>
                                    <p className="text-xs text-gray-500">Gerenciar alertas e avisos</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-11 h-6 rounded-full relative transition-colors duration-200 ease-in-out cursor-pointer ${notifications ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out ${notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
                            </button>
                        </div>

                        <div
                            onClick={() => setShowLangModal(true)}
                            className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">Idioma e Moeda</p>
                                    <p className="text-xs text-gray-500">{language} • {currency}</p>
                                </div>
                            </div>
                            <ChevronRight size={18} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                    </div>
                </section>

                <div className="flex justify-center pt-6">
                    <button className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-50 px-4 py-2 rounded-lg transition-colors">
                        <LogOut size={18} />
                        Sair da conta
                    </button>
                </div>
            </div>

            {/* Language/Currency Modal */}
            {showLangModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800">Preferências Regionais</h3>
                            <button onClick={() => setShowLangModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Idioma</label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none"
                                >
                                    <option>Português (BR)</option>
                                    <option>English (US)</option>
                                    <option>Español</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700">Moeda Padrão</label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-gray-900 focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all appearance-none"
                                >
                                    <option>BRL (R$)</option>
                                    <option>USD ($)</option>
                                    <option>EUR (€)</option>
                                </select>
                            </div>
                            <button
                                onClick={() => setShowLangModal(false)}
                                className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors"
                            >
                                Salvar Preferências
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    )
}
