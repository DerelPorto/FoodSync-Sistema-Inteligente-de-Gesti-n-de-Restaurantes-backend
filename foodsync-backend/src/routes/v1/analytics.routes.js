import express from 'express';
import analyticsController from '../../controllers/analytics.controller.js';

const router = express.Router();

router.get('/reservations-patterns', analyticsController.getReservationsPatterns);
router.get('/sales-patterns', analyticsController.getSalesPatterns);
router.get('/top-items', analyticsController.getTopItems);
router.get('/inventory-insights', analyticsController.getInventoryInsights);
router.get('/dashboard', analyticsController.getDashboard);
router.get('/kpis', analyticsController.getKpis);

export default router;
