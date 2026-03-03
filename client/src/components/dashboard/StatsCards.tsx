
'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingBag, Users, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsProps {
    totalSales: number;
    totalOrders: number;
    // availableTables: number; // Future implementation
}

export default function StatsCards({ totalSales, totalOrders }: StatsProps) {
    const stats = [
        {
            label: 'Total Sales',
            value: `$${totalSales.toLocaleString()}`,
            change: '+12%',
            isPositive: true,
            icon: DollarSign,
            color: 'text-green-500',
            bg: 'bg-green-500/10'
        },
        {
            label: 'Total Orders',
            value: totalOrders.toString(),
            change: '+5%',
            isPositive: true,
            icon: ShoppingBag,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10'
        },
        // Placeholders for now until we connect more services
        {
            label: 'Reservations',
            value: '12',
            change: '-2%',
            isPositive: false,
            icon: Users,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10'
        },
        {
            label: 'Active Staff',
            value: '8',
            change: '0%',
            isPositive: true,
            icon: Activity,
            color: 'text-orange-500',
            bg: 'bg-orange-500/10'
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-gray-900 border border-white/5 rounded-2xl hover:border-white/10 transition-colors"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {stat.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            {stat.change}
                        </div>
                    </div>
                    <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
                    <p className="text-3xl font-bold mt-1 text-white">{stat.value}</p>
                </motion.div>
            ))}
        </div>
    );
}
