
'use client';

import { Sale } from '@/services/sales.service';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { ChefHat } from 'lucide-react';

interface RecentOrdersProps {
    orders: Sale[];
}

export default function RecentOrders({ orders }: RecentOrdersProps) {
    // Take only last 5
    const recentOrders = orders.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).slice(0, 5);

    return (
        <div className="p-6 bg-gray-900 border border-white/5 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Recent Orders</h3>
                <button className="text-sm text-orange-500 hover:text-orange-400">View All</button>
            </div>

            <div className="space-y-4">
                {recentOrders.length === 0 ? (
                    <div className="text-gray-500 text-center py-4">No recent orders found</div>
                ) : (
                    recentOrders.map((order) => (
                        <div key={order.sale_id} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                    <ChefHat size={20} />
                                </div>
                                <div>
                                    <p className="font-semibold text-white">Order #{order.sale_id}</p>
                                    <p className="text-xs text-gray-400">{format(parseISO(order.created_at), 'MMM dd, HH:mm')}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-white">${order.total}</p>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
                                    Completed
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
