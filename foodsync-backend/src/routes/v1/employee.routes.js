import express from 'express';
import employeeController from '../../controllers/employee.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /employee:
     *   get:
     *     summary: Retrieve all employees
     *     tags: [Employee]
     *     responses:
     *       200:
     *         description: The list of employees
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
     *                     employees:
     *                       type: array
     *                       items:
     *                         type: object
     *                         properties:
     *                           employee_id:
     *                             type: integer
     *                           name:
     *                             type: string
     *                           position:
     *                             type: string
     *   post:
     *     summary: Create a new employee
     *     tags: [Employee]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - position
     *             properties:
     *               name:
     *                 type: string
     *               position:
     *                 type: string
     *     responses:
     *       201:
     *         description: The created employee
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
     *                     employee:
     *                       type: object
     */
    .get(employeeController.getAllEmployees)
    .post(employeeController.createEmployee);

router
    .route('/:id')
/**
 * @openapi
 * /employee/{id}:
 *   patch:
 *     summary: Update an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               position:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated employee
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
 *     summary: Delete an employee
 *     tags: [Employee]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The employee ID
 *     responses:
 *       204:
 *         description: Employee deleted successfully
 */

export default router;