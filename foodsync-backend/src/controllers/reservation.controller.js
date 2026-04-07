import reservationService from '../services/reservation.service.js';
import catchAsync from '../utils/catchAsync.js';

class ReservationController {
    createReservation = catchAsync(async (req, res, next) => {
        const newReservation = await reservationService.createReservation(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                reservation: newReservation
            }
        });
    });

    getAvailableTables = catchAsync(async (req, res, next) => {
        const { date, time, people_count } = req.query;
        const tables = await reservationService.getAvailableTables(date, time, Number(people_count));

        res.status(200).json({
            status: 'success',
            results: tables.length,
            data: { tables }
        });
    });

    getReservationsByDate = catchAsync(async (req, res, next) => {
        const { date } = req.query;
        if (!date) {
            return res.status(400).json({ status: 'fail', message: 'Query "date" (YYYY-MM-DD) is required' });
        }
        const list = await reservationService.getReservationsByDateWithClients(date);
        res.status(200).json({
            status: 'success',
            results: list.length,
            data: { reservations: list }
        });
    });

    getAllReservations = catchAsync(async (req, res, next) => {
        const reservations = await reservationService.getAllReservations();

        res.status(200).json({
            status: 'success',
            results: reservations.length,
            data: {
                reservations
            }
        });
    });

    getReservation = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const reservation = await reservationService.getReservationById(id);

        res.status(200).json({
            status: 'success',
            data: {
                reservation
            }
        });
    });

    updateReservation = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const updatedReservation = await reservationService.updateReservation(id, req.body);

        res.status(200).json({
            status: 'success',
            data: {
                reservation: updatedReservation
            }
        });
    });

    cancelReservation = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const cancelledReservation = await reservationService.cancelReservation(id);

        res.status(200).json({
            status: 'success',
            message: 'Reservation cancelled',
            data: {
                reservation: cancelledReservation
            }
        });
    });

    completeReservation = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const { reservation, sale } = await reservationService.completeReservationWithSale(id, req.body);

        res.status(200).json({
            status: 'success',
            message: 'Reserva cerrada y venta registrada',
            data: {
                reservation,
                sale,
            },
        });
    });

    deleteReservation = catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await reservationService.deleteReservation(id);

        res.status(204).json({
            status: 'success',
            data: null
        });
    });
}

export default new ReservationController();
