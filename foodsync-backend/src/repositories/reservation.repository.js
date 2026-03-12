import supabase from '../config/supabase.js';
import AppError from '../utils/appError.js';

class ReservationRepository {
    async create(data) {
        const { data: newReservation, error } = await supabase
            .from('reservation')
            .insert(data)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return newReservation;
    }

    async findAll() {
        const { data, error } = await supabase
            .from('reservation')
            .select('*');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findById(id) {
        const { data, error } = await supabase
            .from('reservation')
            .select('*')
            .eq('reservation_id', id)
            .single();

        if (error) throw new AppError('Reservation not found', 404);
        return data;
    }

    async findByClient(clientId) {
        const { data, error } = await supabase
            .from('reservation')
            .select('*')
            .eq('client_id', clientId);

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async update(id, updates) {
        const { data, error } = await supabase
            .from('reservation')
            .update(updates)
            .eq('reservation_id', id)
            .select()
            .single();

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data;
    }

    async findOverlapping(tableId, date, time) {
        const { data, error } = await supabase
            .from('reservation')
            .select('reservation_id')
            .eq('table_id', tableId)
            .eq('date', date)
            .eq('time', time)
            .neq('status', 'cancelled');

        if (error) throw new AppError(`Supabase Error: ${error.message}`, 500);
        return data; // length > 0 means there is a conflict
    }

    async delete(id) {
        const { data, error } = await supabase
            .from('reservation')
            .update({ status: 'cancelled' })
            .eq('reservation_id', id)
            .select()
            .single();

        if (error) {
            if (error.code === '22P02') {
                throw new AppError('Formato de ID inválido.', 400);
            }
            throw new AppError(`Supabase Error: ${error.message}`, 500);
        }
        return data;
    }
}

export default new ReservationRepository();
