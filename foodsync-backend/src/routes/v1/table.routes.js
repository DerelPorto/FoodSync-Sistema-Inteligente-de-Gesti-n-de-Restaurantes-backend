import express from 'express';
import tableController from '../../controllers/table.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /tables:
     *   get:
     *     summary: Retrieve all restaurant tables
     *     tags: [Tables]
     *     responses:
     *       200:
     *         description: The list of tables
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 results:
     *                   type: integer
     *                 data:
     *                   type: object
     *                   properties:
     *                     tables:
     *                       type: array
     *                       items:
     *                         type: object
     *   post:
     *     summary: Create a new tables
     *     tags: [Tables]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - table_number
     *               - capacity
     *             properties:
     *               table_number:
     *                 type: integer
     *               capacity:
     *                 type: integer
     *     responses:
     *       201:
     *         description: The created table
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
     *                     table:
     *                       type: object
     */
    .get(tableController.getAllTables)
    .post(tableController.createTable);

router
    .route('/:id')
    /**
     * @openapi
     * /tables/{id}:
     *   get:
     *     summary: Get a table by ID
     *     tags: [Tables]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The table ID
     *     responses:
     *       200:
     *         description: The table data
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
     *                     table:
     *                       type: object
     *   patch:
     *     summary: Update a table
     *     tags: [Tables]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The table ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               table_number:
     *                 type: integer
     *               capacity:
     *                 type: integer
     *     responses:
     *       200:
     *         description: The updated table
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
     *   delete:
     *     summary: Delete a table
     *     tags: [Tables]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The table ID
     *     responses:
     *       204:
     *         description: Table deleted successfully
     */
    .get(tableController.getTable)
    .patch(tableController.updateTable)
    .delete(tableController.deleteTable);

export default router;
