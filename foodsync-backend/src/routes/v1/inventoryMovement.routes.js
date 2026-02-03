import express from 'express';
import inventoryMovementController from '../../controllers/inventoryMovement.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /inventory-movements:
     *   get:
     *     summary: Retrieve all inventory movements
     *     tags: [Inventory Movements]
     *     responses:
     *       200:
     *         description: List of inventory movements
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 data:
     *                   type: object
     *                   properties:
     *                     movements:
     *                       type: array
     *   post:
     *     summary: Create a new inventory movement
     *     tags: [Inventory Movements]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - product_id
     *               - movement_type
     *               - quantity
     *             properties:
     *               product_id:
     *                 type: integer
     *               movement_type:
     *                 type: string
     *                 enum: [IN, OUT]
     *               quantity:
     *                 type: integer
     *     responses:
     *       201:
     *         description: The created movement
     */
    .get(inventoryMovementController.getAllMovements)
    .post(inventoryMovementController.createMovement);

router
    .route('/:id')
    /**
     * @openapi
     * /inventory-movements/{id}:
     *   get:
     *     summary: Get a movement by ID
     *     tags: [Inventory Movements]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The movement ID
     *     responses:
     *       200:
     *         description: The movement data
     */
    .get(inventoryMovementController.getMovementById);

router
    .route('/product/:productId')
    /**
     * @openapi
     * /inventory-movements/product/{productId}:
     *   get:
     *     summary: Get movements by Product ID
     *     tags: [Inventory Movements]
     *     parameters:
     *       - in: path
     *         name: productId
     *         schema:
     *           type: integer
     *         required: true
     *         description: The product ID
     *     responses:
     *       200:
     *         description: List of movements for the product
     */
    .get(inventoryMovementController.getMovementsByProduct);

export default router;
