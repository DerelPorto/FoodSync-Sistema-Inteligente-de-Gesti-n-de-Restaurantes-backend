
import express from 'express';
import shiftController from '../../controllers/shift.controller.js';

const router = express.Router();

router
    .route('/')
    .get(shiftController.getAllShifts)
    .post(shiftController.createShift);

router
    .route('/:id')
    .get(shiftController.getShiftById)
    .patch(shiftController.updateShift)
    .delete(shiftController.deleteShift);

export default router;

/**
 * @swagger
 * tags:
 *   name: Shifts
 *   description: Shift management
 */

/**
 * @swagger
 * /shifts:
 *   get:
 *     summary: Get all shifts
 *     tags: [Shifts]
 *     responses:
 *       "200":
 *         description: OK
 *   post:
 *     summary: Create a shift
 *     tags: [Shifts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shift'
 *     responses:
 *       "201":
 *         description: Created
 */

/**
 * @swagger
 * /shifts/{id}:
 *   get:
 *     summary: Get a shift
 *     tags: [Shifts]
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
 *   patch:
 *     summary: Update a shift
 *     tags: [Shifts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Shift'
 *     responses:
 *       "200":
 *         description: OK
 *   delete:
 *     summary: Delete a shift
 *     tags: [Shifts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "204":
 *         description: Deleted
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Shift:
 *       type: object
 *       required:
 *         - employee_id
 *         - date
 *         - start_time
 *         - end_time
 *       properties:
 *         shift_id:
 *           type: integer
 *           description: Auto-generated ID
 *         employee_id:
 *           type: integer
 *           description: The employee ID
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the shift
 *         start_time:
 *           type: string
 *           format: time
 *           description: Start time (HH:mm:ss)
 *         end_time:
 *           type: string
 *           format: time
 *           description: End time (HH:mm:ss)
 *       example:
 *         employee_id: 1
 *         date: "2023-10-27"
 *         start_time: "09:00:00"
 *         end_time: "17:00:00"
 */
