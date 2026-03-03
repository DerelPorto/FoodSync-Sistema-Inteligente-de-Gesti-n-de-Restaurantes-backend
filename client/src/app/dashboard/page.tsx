
'use client';

import { useEffect, useState } from 'react';
import StatsCards from '@/components/dashboard/StatsCards';
import SalesChart from '@/components/dashboard/SalesChart';
import RecentOrders from '@/components/dashboard/RecentOrders';
import { salesService, Sale } from '@/services/sales.service';
import { reportService, DailyReport } from '@/services/report.service';
import { Download, Loader2 } from 'lucide-react';

export default function DashboardPage() {
    const [sales, setSales] = useState<Sale[]>([]);
    const [reports, setReports] = useState<DailyReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesData, reportsData] = await Promise.all([
                    salesService.getAllSales(),
                    reportService.getAllReports()
                ]);
                setSales(salesData);
                setReports(reportsData);
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader2 size={32} className="animate-spin text-orange-500" />
            </div>
        );
    }

    // Calculate totals
    const totalSales = sales.reduce((acc, curr) => acc + curr.total, 0);
    const totalOrders = sales.length;

    return (
        <div className="space-y-6 pb-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-gray-400 text-sm">Welcome back, here's what's happening today.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors text-white shadow-lg shadow-orange-500/20">
                    <Download size={16} />
                    Download Report
                </button>
            </div>

            <StatsCards totalSales={totalSales} totalOrders={totalOrders} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <SalesChart data={reports} />
                </div>
                <div>
                    <RecentOrders orders={sales} />
                </div>
            </div>
        </div>
    );
}
