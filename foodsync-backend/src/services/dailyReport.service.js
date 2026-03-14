
import dailyReportRepository from '../repositories/dailyReport.repository.js';
import DailyReport from '../models/dailyReport.model.js';
import AppError from '../utils/appError.js';

class DailyReportService {
    async createReport(data) {
        // Check if report for date already exists
        const existing = await dailyReportRepository.findByDate(data.date);
        if (existing) {
            throw new AppError('Report for this date already exists', 400);
        }

        const { notes, ...rest } = data;
        const payload = {
            ...rest,
            total_sales: data.total_sales ?? 0,
            total_reservations: data.total_reservations ?? 0,
        };
        const report = new DailyReport(payload);
        report.validate();
        return await dailyReportRepository.create(payload);
    }

    async getAllReports() {
        return await dailyReportRepository.findAll();
    }

    async getReportById(id) {
        return await dailyReportRepository.findById(id);
    }

    async deleteReport(id) {
        return await dailyReportRepository.delete(id);
    }
}

export default new DailyReportService();
