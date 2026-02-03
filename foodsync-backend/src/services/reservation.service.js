import reservationRepository from '../repositories/reservation.repository.js';
import AppError from '../utils/appError.js';

class ReservationService {
    async createReservation(data) {
        // Validate required fields
        if (!data.client_id || !data.date || !data.time || !data.people_count) {
            throw new AppError('Client, date, time, and people count are required', 400);
        }

        // Validate Status default
        if (!data.status) {
            data.status = 'pending'; // Default status
        }

        // Potential logic: Check for table availability (future enhancement)
        // For now, just create

        return await reservationRepository.create(data);
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
        // Logic: preventing updates to past reservations? 
        // For now allow all.
        return await reservationRepository.update(id, updates);
    }

    async cancelReservation(id) {
        // Instead of hard delete, maybe just update status to 'cancelled'
        return await reservationRepository.update(id, { status: 'cancelled' });
    }

    async deleteReservation(id) {
        return await reservationRepository.delete(id);
    }
}

export default new ReservationService();
