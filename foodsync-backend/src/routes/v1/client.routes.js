import express from 'express';
import clientController from '../../controllers/client.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /clients:
     *   get:
     *     summary: Retrieve all clients
     *     tags: [Clients]
     *     responses:
     *       200:
     *         description: The list of clients
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
     *                     clients:
     *                       type: array
     *                       items:
     *                         type: object
     *   post:
     *     summary: Create a new client
     *     tags: [Clients]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - phone
     *             properties:
     *               name:
     *                 type: string
     *               phone:
     *                 type: string
     *     responses:
     *       201:
     *         description: The created client
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
     *                     client:
     *                       type: object
     */
    .get(clientController.getAllClients)
    .post(clientController.createClient);

router
    .route('/:id')
    /**
     * @openapi
     * /clients/{id}:
     *   get:
     *     summary: Get a client by ID
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The client ID
     *     responses:
     *       200:
     *         description: The client data
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
     *                     client:
     *                       type: object
     *   patch:
     *     summary: Update a client
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The client ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               phone:
     *                 type: string
     *     responses:
     *       200:
     *         description: The updated client
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
     *     summary: Delete a client
     *     tags: [Clients]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The client ID
     *     responses:
     *       204:
     *         description: Client deleted successfully
     */
    .get(clientController.getClient)
    .patch(clientController.updateClient)
    .delete(clientController.deleteClient);

export default router;
