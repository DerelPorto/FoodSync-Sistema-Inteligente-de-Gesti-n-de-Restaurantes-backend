
'use client';

import { useAuth } from '@/hooks/useAuth';
import { LayoutDashboard, Users, Utensils, Calendar, Box, LogOut, ChartBar, Settings, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: ChartBar, label: 'Sales', href: '/dashboard/sales' },
    { icon: Box, label: 'Inventory', href: '/dashboard/inventory' },
    { icon: Utensils, label: 'Menu', href: '/dashboard/menu' },
    { icon: Calendar, label: 'Reservations', href: '/dashboard/reservations' },
    { icon: Users, label: 'Staff', href: '/dashboard/staff' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();

    return (
        <div className="h-screen w-64 bg-gray-900 border-r border-white/10 flex flex-col fixed left-0 top-0">
            <div className="p-6 flex items-center gap-3 border-b border-white/5">
                <div className="bg-orange-500 p-1.5 rounded-lg">
                    <ChefHat size={20} className="text-white" />
                </div>
                <span className="font-bold text-xl text-white tracking-tight">FoodSync</span>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-500 transition-all font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
}
