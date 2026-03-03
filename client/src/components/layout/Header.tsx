
'use client';

import { useAuth } from '@/hooks/useAuth';
import { Bell, Search, UserCircle } from 'lucide-react';

export default function Header() {
    const { user } = useAuth();

    return (
        <header className="h-16 bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-10 flex items-center justify-between px-6">
            <div className="flex items-center gap-4 w-1/3">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search orders, menu items..."
                        className="w-full bg-gray-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-orange-500 transition-colors text-white placeholder:text-gray-500"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border border-gray-900" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-semibold text-white">{user?.name || 'Admin User'}</p>
                        <p className="text-xs text-gray-500">Manager</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/20">
                        {user?.name?.[0] || 'U'}
                    </div>
                </div>
            </div>
        </header>
    );
}
