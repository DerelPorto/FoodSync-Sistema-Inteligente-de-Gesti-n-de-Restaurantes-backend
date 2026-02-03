import express from 'express';
import productController from '../../controllers/product.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /products:
     *   get:
     *     summary: Retrieve all products
     *     tags: [Products]
     *     responses:
     *       200:
     *         description: List of products
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
     *                     products:
     *                       type: array
     *   post:
     *     summary: Create a new product
     *     tags: [Products]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - unit_price
     *             properties:
     *               name:
     *                 type: string
     *               stock:
     *                 type: integer
     *               min_stock:
     *                 type: integer
     *               unit_price:
     *                 type: number
     *     responses:
     *       201:
     *         description: The created product
     */
    .get(productController.getAllProducts)
    .post(productController.createProduct);

router
    .route('/:id')
    /**
     * @openapi
     * /products/{id}:
     *   get:
     *     summary: Get a product by ID
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The product ID
     *     responses:
     *       200:
     *         description: The product data
     *   patch:
     *     summary: Update a product
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The product ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               stock:
     *                 type: integer
     *               min_stock:
     *                 type: integer
     *               unit_price:
     *                 type: number
     *     responses:
     *       200:
     *         description: The updated product
     *   delete:
     *     summary: Delete a product
     *     tags: [Products]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *         required: true
     *         description: The product ID
     *     responses:
     *       204:
     *         description: Product deleted successfully
     */
    .get(productController.getProductById)
    .patch(productController.updateProduct)
    .delete(productController.deleteProduct);

export default router;
