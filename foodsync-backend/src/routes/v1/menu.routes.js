import express from 'express';
import menuController from '../../controllers/menu.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /menu:
     *   get:
     *     summary: Retrieve all menu items
     *     tags: [Menu]
     *     responses:
     *       200:
     *         description: The list of menu items
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
     *                     menu:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           id:
     *                             type: string
     *                           name:
     *                             type: string
     *                           price:
     *                             type: number
     *   post:
     *     summary: Create a new menu item
     *     tags: [Menu]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - price
     *             properties:
     *               name:
     *                 type: string
     *               price:
     *                 type: number
     *               ingredients:
     *                 type: array
     *                 items:
     *                   type: object
     *                   properties:
     *                     ingredient_id:
     *                       type: string
     *                     quantity:
     *                       type: number
     *     responses:
     *       201:
     *         description: The created menu item
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
     *                     menu_item:
     *                       type: object
     */
    .get(menuController.getAllMenu)
    .post(menuController.createMenu);

router
    .route('/:id')
/**
 * @openapi
 * /menu/{id}:
 *   patch:
 *     summary: Update the price of a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - price
 *             properties:
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated menu item
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
 *     summary: Delete a menu item
 *     tags: [Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The menu item ID
 *     responses:
 *       204:
 *         description: Menu item deleted successfully
 */
    .patch(menuController.updatePrice)
    .delete(menuController.deleteMenu);

export default router;
