
import express from 'express';
import dailyReportController from '../../controllers/dailyReport.controller.js';

const router = express.Router();

router
    .route('/')
    .get(dailyReportController.getAllReports)
    .post(dailyReportController.createReport);

router
    .route('/:id')
    .get(dailyReportController.getReportById);

export default router;

/**
 * @swagger
 * tags:
 *   name: DailyReports
 *   description: Daily Report management
 */

/**
 * @swagger
 * /daily-reports:
 *   get:
 *     summary: Get all daily reports
 *     tags: [DailyReports]
 *     responses:
 *       "200":
 *         description: OK
 *   post:
 *     summary: Create a daily report
 *     tags: [DailyReports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DailyReport'
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /daily-reports/{id}:
 *   get:
 *     summary: Get a daily report
 *     tags: [DailyReports]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: OK
 *       "404":
 *         description: Not found
 */
