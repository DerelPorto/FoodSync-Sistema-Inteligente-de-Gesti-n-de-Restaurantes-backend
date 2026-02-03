import express from 'express';
import reservationController from '../../controllers/reservation.controller.js';

const router = express.Router();

router
    .route('/')
    /**
     * @openapi
     * /reservations:
     *   get:
     *     summary: Retrieve all reservations
     *     tags: [Reservations]
     *     responses:
     *       200:
     *         description: The list of reservations
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
     *                     reservations:
     *                       type: array
     *                       items:
     *                         type: object
     *   post:
     *     summary: Create a new reservation
     *     tags: [Reservations]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - client_id
     *               - date
     *               - time
     *               - people_count
     *             properties:
     *               client_id:
     *                 type: integer
     *               table_id:
     *                 type: integer
     *               date:
     *                 type: string
     *                 format: date
     *               time:
     *                 type: string
     *                 format: time
     *               people_count:
     *                 type: integer
     *               status:
     *                 type: string
     *                 default: pending
     *     responses:
     *       201:
     *         description: The created reservation
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
     *                     reservation:
     *                       type: object
     */
    .get(reservationController.getAllReservations)
    .post(reservationController.createReservation);

router
    .route('/:id')
    /**
     * @openapi
     * /reservations/{id}:
     *   get:
     *     summary: Get a reservation by ID
     *     tags: [Reservations]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The reservation ID
     *     responses:
     *       200:
     *         description: The reservation data
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
     *                     reservation:
     *                       type: object
     *   patch:
     *     summary: Update a reservation
     *     tags: [Reservations]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The reservation ID
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               table_id:
     *                 type: integer
     *               date:
     *                 type: string
     *               time:
     *                 type: string
     *               people_count:
     *                 type: integer
     *               status:
     *                 type: string
     *     responses:
     *       200:
     *         description: The updated reservation
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
     *     summary: Delete a reservation
     *     tags: [Reservations]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The reservation ID
     *     responses:
     *       204:
     *         description: Reservation deleted successfully
     */
    .get(reservationController.getReservation)
    .patch(reservationController.updateReservation)
    .delete(reservationController.deleteReservation);

router
    .route('/:id/cancel')
    /**
     * @openapi
     * /reservations/{id}/cancel:
     *   patch:
     *     summary: Cancel a reservation
     *     tags: [Reservations]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: string
     *         required: true
     *         description: The reservation ID
     *     responses:
     *       200:
     *         description: The cancelled reservation
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   example: success
     *                 message:
     *                   type: string
     *                 data:
     *                   type: object
     */
    .patch(reservationController.cancelReservation);

export default router;
