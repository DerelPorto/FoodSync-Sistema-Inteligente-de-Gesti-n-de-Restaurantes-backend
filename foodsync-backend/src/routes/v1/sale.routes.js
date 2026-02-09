
import express from 'express';
import saleController from '../../controllers/sale.controller.js';

const router = express.Router();

router
    .route('/')
    .get(saleController.getAllSales)
    .post(saleController.createSale);

router
    .route('/:id')
    .get(saleController.getSaleById);

export default router;
/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: Sale management and retrieval
 */

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     description: Retrieve all sales from the database.
 *     tags: [Sales]
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *   post:
 *     summary: Create a sale
 *     description: Create a new sale record with details.
 *     tags: [Sales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - items
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - item_name
 *                     - quantity
 *                     - price
 *                   properties:
 *                     item_name:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *                     price:
 *                       type: number
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 */

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get a sale
 *     description: Fetch a single sale by its ID.
 *     tags: [Sales]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Sale id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       "404":
 *         description: Sale not found
 */
