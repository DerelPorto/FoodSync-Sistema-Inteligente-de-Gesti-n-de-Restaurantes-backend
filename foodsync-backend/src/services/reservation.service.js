import reservationRepository from '../repositories/reservation.repository.js';
import tableRepository from '../repositories/table.repository.js';
import AppError from '../utils/appError.js';

class ReservationService {
    async createReservation(data) {
        // Validate required fields
        if (!data.client_id || !data.date || !data.time || !data.people_count) {
            throw new AppError('Client, date, time, and people count are required', 400);
        }

        // Default status
        if (!data.status) {
            data.status = 'pending';
        }

        // Validate email format only if provided
        if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            throw new AppError('Invalid email format', 400);
        }

        // --- Availability check ---
        const availableTables = await tableRepository.findAvailableByCapacity(
            data.people_count, data.date, data.time
        );

        if (availableTables.length === 0) {
            throw new AppError(
                'No hay mesas disponibles para la fecha, hora y cantidad de personas indicadas',
                409
            );
        }

        if (!data.table_id) {
            // Auto-assign the first available table
            data.table_id = availableTables[0].table_id;
        } else {
            // Validate that the client-chosen table is actually available
            const isAvailable = availableTables.some(t => t.table_id === Number(data.table_id));
            if (!isAvailable) {
                throw new AppError(
                    'La mesa seleccionada no está disponible para esa fecha y hora',
                    409
                );
            }
        }

        // Race-condition guard: final duplicate check before insert
        const conflicts = await reservationRepository.findOverlapping(
            data.table_id, data.date, data.time
        );
        if (conflicts.length > 0) {
            throw new AppError(
                'Ya existe una reservación en esa mesa, fecha y hora',
                409
            );
        }

        return await reservationRepository.create(data);
    }

    async getAvailableTables(date, time, peopleCount) {
        if (!date || !time || !peopleCount) {
            throw new AppError('date, time y people_count son requeridos', 400);
        }
        return await tableRepository.findAvailableByCapacity(Number(peopleCount), date, time);
    }

    async getAllReservations() {
        return await reservationRepository.findAll();
    }

    async getReservationById(id) {
        return await reservationRepository.findById(id);
    }

    async getReservationsByClient(clientId) {
        return await reservationRepository.findByClient(clientId);
    }

    async updateReservation(id, updates) {
        // Validate email format if provided
        if (updates.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updates.email)) {
            throw new AppError('Invalid email format', 400);
        }
        return await reservationRepository.update(id, updates);
    }

    async cancelReservation(id) {
        return await reservationRepository.update(id, { status: 'cancelled' });
    }

    async deleteReservation(id) {
        return await reservationRepository.delete(id);
    }
}

export default new ReservationService();
