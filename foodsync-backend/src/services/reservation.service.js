import reservationRepository from '../repositories/reservation.repository.js';
import tableRepository from '../repositories/table.repository.js';
import clientRepository from '../repositories/client.repository.js';
import whatsappService from './whatsapp.service.js';
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

        const savedReservation = await reservationRepository.create(data);

        // Enviar notificación de confirmación de recepción
        try {
            const client = await clientRepository.findById(data.client_id);
            if (client && client.phone) {
                const msg = `🍽️ *FoodSync Restaurante*\n¡Hola ${client.name}! 👋\nHemos recibido tu solicitud de reservación para ${data.people_count} personas el día ${data.date} a las ${data.time}.\n\n⏳ Tu reserva está *Pendiente* de confirmación manual por nuestro equipo. Te avisaremos en breve.`;
                whatsappService.sendMessage(client.phone, msg);
            }
        } catch (err) {
            console.error('Error enviando WhatsApp en creación:', err);
        }

        return savedReservation;
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

        const updatedReservation = await reservationRepository.update(id, updates);

        // Check if we need to send a WS message
        if (updates.status === 'confirmed' || updates.status === 'cancelled' || updates.status === 'canceled') {
            try {
                const fullRes = await reservationRepository.findById(id);
                if (fullRes) {
                    const client = await clientRepository.findById(fullRes.client_id);
                    if (client && client.phone) {
                        let msg = '';
                        if (updates.status === 'confirmed') {
                            msg = `🍽️ *FoodSync Restaurante*\n¡Excelente noticia ${client.name}! ✅\n\nTu reservación ha sido *Confirmada* para el día ${fullRes.date} a las ${fullRes.time} (Mesa #${fullRes.table_id || fullRes.table_number}).\n\n¡Te esperamos!`;
                        } else {
                            msg = `🍽️ *FoodSync Restaurante*\nHola ${client.name}. Lamentamos informarte que tu solicitud de reservación para el día ${fullRes.date} a las ${fullRes.time} ha sido *Cancelada*. ❌\n\nComunícate por este medio para agendar en otra fecha u horario.`;
                        }
                        whatsappService.sendMessage(client.phone, msg);
                    }
                }
            } catch (err) {
                console.error('Error enviando WhatsApp en actualización:', err);
            }
        }

        return updatedReservation;
    }

    async cancelReservation(id) {
        const cancelledReservation = await reservationRepository.update(id, { status: 'cancelled' });
        try {
            const fullRes = await reservationRepository.findById(id);
            if (fullRes) {
                const client = await clientRepository.findById(fullRes.client_id);
                if (client && client.phone) {
                    const msg = `🍽️ *FoodSync Restaurante*\nHola ${client.name}. Lamentamos informarte que tu reservación para el día ${fullRes.date} a las ${fullRes.time} ha sido *Cancelada*. ❌\n\nComunícate por este medio para agendar en otra fecha u horario.`;
                    whatsappService.sendMessage(client.phone, msg);
                }
            }
        } catch (err) {
            console.error('Error enviando WhatsApp en cancelación:', err);
        }
        return cancelledReservation;
    }

    async deleteReservation(id) {
        return await reservationRepository.delete(id);
    }
}

export default new ReservationService();
