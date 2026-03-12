
import dailyReportService from '../services/dailyReport.service.js';
import catchAsync from '../utils/catchAsync.js';

class DailyReportController {
    createReport = catchAsync(async (req, res, next) => {
        const newReport = await dailyReportService.createReport(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                dailyReport: newReport
            }
        });
    });

    getAllReports = catchAsync(async (req, res, next) => {
        const reports = await dailyReportService.getAllReports();

        res.status(200).json({
            status: 'success',
            results: reports.length,
            data: {
                dailyReports: reports
            }
        });
    });

    getReportById = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const report = await dailyReportService.getReportById(id);

        res.status(200).json({
            status: 'success',
            data: {
                dailyReport: report
            }
        });
    });

    deleteReport = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await dailyReportService.deleteReport(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new DailyReportController();
