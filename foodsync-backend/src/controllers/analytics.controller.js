import analyticsService from '../services/analytics.service.js';
import catchAsync from '../utils/catchAsync.js';

class AnalyticsController {
    getReservationsPatterns = catchAsync(async (req, res) => {
        const data = await analyticsService.getReservationsPatterns();
        res.status(200).json({ status: 'success', data });
    });

    getSalesPatterns = catchAsync(async (req, res) => {
        const data = await analyticsService.getSalesPatterns();
        res.status(200).json({ status: 'success', data });
    });

    getTopItems = catchAsync(async (req, res) => {
        const data = await analyticsService.getTopItems();
        res.status(200).json({ status: 'success', data });
    });

    getInventoryInsights = catchAsync(async (req, res) => {
        const data = await analyticsService.getInventoryInsights();
        res.status(200).json({ status: 'success', data });
    });

    getDashboard = catchAsync(async (req, res) => {
        const days = req.query.days ? parseInt(req.query.days, 10) : null;
        const data = await analyticsService.getDashboard(days);
        res.status(200).json({ status: 'success', data });
    });

    getKpis = catchAsync(async (req, res) => {
        const data = await analyticsService.getKpis();
        res.status(200).json({ status: 'success', data });
    });
}

export default new AnalyticsController();
