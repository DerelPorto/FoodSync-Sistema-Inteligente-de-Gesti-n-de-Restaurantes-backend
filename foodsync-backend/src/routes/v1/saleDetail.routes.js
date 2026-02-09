
import express from 'express';
import saleDetailController from '../../controllers/saleDetail.controller.js';

const router = express.Router();

router
    .route('/')
    .get(saleDetailController.getAllDetails);

router
    .route('/:id')
    .get(saleDetailController.getDetailById);

export default router;

/**
 * @swagger
 * tags:
 *   name: SaleDetails
 *   description: Sale Detail management and retrieval
 */

/**
 * @swagger
 * /sale-details:
 *   get:
 *     summary: Get all sale details
 *     description: Retrieve all sale details from the database.
 *     tags: [SaleDetails]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SaleDetail'
 */

/**
 * @swagger
 * /sale-details/{id}:
 *   get:
 *     summary: Get a sale detail
 *     description: Fetch a single sale detail by its ID.
 *     tags: [SaleDetails]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale Detail id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SaleDetail'
 *       "404":
 *         description: Sale Detail not found
 */
