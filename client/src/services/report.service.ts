
import api from './api';

export interface DailyReport {
    report_id: number;
    date: string;
    total_sales: number;
    total_reservations: number;
}

export const reportService = {
    async getAllReports(): Promise<DailyReport[]> {
        const response = await api.get<{ data: { dailyReports: DailyReport[] } }>('/daily-reports');
        return response.data.data.dailyReports;
    },

    async getReportById(id: number): Promise<DailyReport> {
        const response = await api.get<{ data: { dailyReport: DailyReport } }>(`/daily-reports/${id}`);
        return response.data.data.dailyReport;
    }
};
