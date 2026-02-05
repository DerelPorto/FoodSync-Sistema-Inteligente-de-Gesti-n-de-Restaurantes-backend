import express from 'express';
import userController from '../../controllers/user.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /users:
     *   get:
     *     summary: Retrieve all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: The list of users
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
     *                     users:
     *                       type: array
     *                       items:
     *                         type: object
     *   post:
     *     summary: Create a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *               role_id:
     *                 type: integer
     *     responses:
     *       201:
     *         description: The created user
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
     *                     user:
     *                       type: object
     */
    .get(userController.getAllUsers)
    .post(userController.createUser);

router
    .route('/:id')
    /**
     * @openapi
     * /users/{id}:
     *   get:
     *     summary: Get a user by ID
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The user ID
     *     responses:
     *       200:
     *         description: The user data
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
     *                     user:
     *                       type: object
     *   patch:
     *     summary: Update a user
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The user ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *               role_id:
     *                 type: integer
     *               active:
     *                 type: boolean
     *     responses:
     *       200:
     *         description: The updated user
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
     *     summary: Delete a user (soft delete)
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The user ID
     *     responses:
     *       204:
     *         description: User deleted successfully
     */
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

export default router;
